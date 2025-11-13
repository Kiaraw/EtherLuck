"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { formatEther, parseEther } from "viem";

// ✅ Import unique depuis ton constants généré automatiquement
import { LOTTERY_ADDRESS, TOKEN_ADDRESS, LOTTERY_ABI } from "../src/constants";

// ✅ ABI du token LuckToken
const TOKEN_ABI = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
];

export default function Home() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContractAsync } = useWriteContract();

  const [price, setPrice] = useState<string>("???");
  const [loading, setLoading] = useState(false);
  const [approved, setApproved] = useState(false);

  // --- Lecture du prix du ticket ---
  const { data: ticketPrice, refetch } = useReadContract({
    address: LOTTERY_ADDRESS as `0x${string}`,
    abi: LOTTERY_ABI,
    functionName: "ticketPrice",
  });

  // 🔹 Lire le prix du ticket
  const handleGetPrice = async () => {
    try {
      const result = await refetch();
      const value = result.data as bigint;
      const formatted = formatEther(value);
      setPrice(formatted);
      console.log(`✅ Prix du ticket : ${formatted} LuckToken`);
    } catch (err) {
      console.error("❌ Erreur lors de la lecture du prix :", err);
      setPrice("Erreur");
    }
  };

  // 🔹 Autoriser la loterie à dépenser le token
  const handleApprove = async () => {
    try {
      if (!address) return alert("⚠️ Connecte ton wallet d'abord !");
      setLoading(true);

      const ticketValue = ticketPrice ? (ticketPrice as bigint) : parseEther("1");
      console.log("📤 Envoi de approve(", LOTTERY_ADDRESS, ",", ticketValue.toString(), ")");

      await writeContractAsync({
        address: TOKEN_ADDRESS as `0x${string}`,
        abi: TOKEN_ABI,
        functionName: "approve",
        args: [LOTTERY_ADDRESS, ticketValue],
      });

      setApproved(true);
      alert("✅ Autorisation réussie !");
    } catch (err) {
      console.error("❌ Erreur lors de approve :", err);
      alert("❌ Erreur lors de l’autorisation du token");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Participer à la loterie
  const handleEnter = async () => {
    try {
      if (!approved) return alert("⚠️ Tu dois d'abord autoriser la loterie !");
      setLoading(true);

      await writeContractAsync({
        address: LOTTERY_ADDRESS as `0x${string}`,
        abi: LOTTERY_ABI,
        functionName: "enter",
      });

      alert("🎉 Participation réussie !");
    } catch (err) {
      console.error("❌ Erreur lors de la participation :", err);
      alert("❌ Erreur lors de la transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#0e0e12] text-white">
      <h1 className="text-4xl font-bold mb-6">🎰 Lucky Lottery</h1>

      {!isConnected ? (
        <button
          onClick={() => connect({ connector: connectors[0] })}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="mb-4 text-gray-300">
            Connecté : {address?.slice(0, 8)}...{address?.slice(-4)}
          </p>

          <button
            onClick={handleGetPrice}
            className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-md font-medium transition"
          >
            🎟️ Voir le prix du ticket
          </button>

          <p className="mt-3 text-lg">
            Prix du ticket :{" "}
            <span className="font-semibold text-yellow-400">
              {price !== "???" ? `${price} LuckToken` : "???"}
            </span>
          </p>

          <button
            onClick={handleApprove}
            disabled={loading}
            className={`mt-6 px-6 py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "En cours..." : "💰 Autoriser la loterie"}
          </button>

          <button
            onClick={handleEnter}
            disabled={loading || !approved}
            className={`mt-3 px-6 py-3 rounded-lg font-semibold transition ${
              loading || !approved
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "En cours..." : "Participer à la loterie"}
          </button>

          <button
            onClick={() => disconnect()}
            className="mt-6 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md font-semibold transition"
          >
            Disconnect
          </button>
        </>
      )}
    </main>
  );
}