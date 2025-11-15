"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  LOTTERY_ADDRESS,
  LOTTERY_ABI,
  TOKEN_ADDRESS,
  TOKEN_ABI,
} from "@/src/constants";

export default function Participation() {
  const [account, setAccount] = useState("");
  const [tickets, setTickets] = useState(1);
  const [price, setPrice] = useState(1);
  const [txStatus, setTxStatus] = useState("");

  const [contract, setContract] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      console.log("----- INIT Participation -----");

      // Provider Hardhat
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      console.log("STEP: Vérification du contrat…");
      const code = await provider.getCode(LOTTERY_ADDRESS);
      if (code === "0x") {
        console.error("❌ Aucun contrat trouvé à LOTTERY_ADDRESS");
        return;
      }

      // Contrat lecture
      const contractRead = new ethers.Contract(
        LOTTERY_ADDRESS,
        LOTTERY_ABI,
        provider
      );

      const rawPrice = await contractRead.ticketPrice();
      setPrice(Number(ethers.formatEther(rawPrice)));

      // Wallet Metamask
      if (window.ethereum) {
        console.log("STEP: Connexion Metamask…");

        const browser = new ethers.BrowserProvider(window.ethereum);
        const signer = await browser.getSigner();
        const addr = await signer.getAddress();

        setAccount(addr);

        // Contrats écriture
        setContract(
          new ethers.Contract(LOTTERY_ADDRESS, LOTTERY_ABI, signer)
        );
        setToken(
          new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
        );
      }
    } catch (err) {
      console.error("❌ INIT ERROR:", err);
    }
  };

  const buy = async () => {
    try {
      if (!contract || !token) return;

      console.log("----- BUY START -----");
      setTxStatus("Approbation des tokens…");

      const totalCostWei = ethers.parseEther((price * tickets).toString());

      // APPROVE
      const approveTx = await token.approve(LOTTERY_ADDRESS, totalCostWei);
      await approveTx.wait();
      console.log("Approve OK");

      // ENTER
      setTxStatus("Participation à la loterie…");

      const enterTx = await contract.enter(tickets);
      await enterTx.wait();

      setTxStatus("Achat confirmé ! 🍀");
    } catch (err: any) {
      console.error("❌ BUY ERROR:", err);
      setTxStatus("Échec ou refus de la transaction.");
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#292C36", color: "#c0c9db" }}
    >
      <Card
        className="max-w-lg w-full shadow-2xl rounded-2xl border"
        style={{ backgroundColor: "#391b49", borderColor: "#8e99ac" }}
      >
        <CardContent className="p-8 space-y-6">

          <h1
            className="text-3xl font-bold text-center mb-6"
            style={{ color: "#c0c9db" }}
          >
            Participer à EtherLuck
          </h1>

          {account && (
            <div
              className="text-center text-sm py-2 rounded-lg"
              style={{
                color: "#d2a941",
                backgroundColor: "#3b3e48",
              }}
            >
              Connecté : {account.substring(0, 6)}...{account.slice(-4)}
            </div>
          )}

          <div>
            <label
              className="block mb-2 font-medium"
              style={{ color: "#d2a941" }}
            >
              Nombre de tickets
            </label>

            <input
              type="number"
              min="1"
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              className="w-full rounded-lg p-2 text-center text-lg font-semibold focus:outline-none"
              style={{
                backgroundColor: "#391b49",
                color: "#f0dc92",
                border: "2px solid #7e52a0",
              }}
            />
          </div>

          <div className="space-y-1 text-center text-sm" style={{ color: "#c0c9db" }}>
            <p>Prix par ticket : <span className="font-bold">{price} ELK</span></p>
            <p>Total : <span className="font-bold">{tickets * price} ELK</span></p>
          </div>

          <Button
            onClick={buy}
            className="w-full text-lg py-3 rounded-xl font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#7e52a0",
              color: "white",
            }}
          >
            Acheter mes tickets
          </Button>

          {txStatus && (
            <div
              className="text-center font-medium mt-4 p-2 rounded-lg"
              style={{ backgroundColor: "#3b3e48", color: "#f0dc92" }}
            >
              {txStatus}
            </div>
          )}

          <div className="text-center mt-6">
            <a
              href="/"
              className="font-semibold hover:underline"
              style={{ color: "#d2a941" }}
            >
              ← Retour à l’accueil
            </a>
          </div>

        </CardContent>
      </Card>
    </main>
  );
}
