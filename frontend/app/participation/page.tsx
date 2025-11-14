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
  const [pricePerTicket, setPricePerTicket] = useState(1);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [confirmBeforeTx, setConfirmBeforeTx] = useState(false);

  const [contract, setContract] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  useEffect(() => {
    initBlockchain();
  }, []);

  const initBlockchain = async () => {
    try {
      console.log("INIT Participation…");

      // Provider Hardhat
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      console.log("STEP: Checking contract code");
      const code = await provider.getCode(LOTTERY_ADDRESS);
      console.log("Code:", code);

      if (code === "0x") {
        console.error("❌ CONTRAT INEXISTANT À CETTE ADRESSE");
        return;
      }

      // Lecture en READ-ONLY
      const contractRead = new ethers.Contract(
        LOTTERY_ADDRESS,
        LOTTERY_ABI,
        provider
      );

      const priceWei = await contractRead.ticketPrice();
      const price = Number(ethers.formatEther(priceWei));
      setPricePerTicket(price);

      // Préparation signer
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        setAccount(await signer.getAddress());

        setContract(
          new ethers.Contract(LOTTERY_ADDRESS, LOTTERY_ABI, signer)
        );

        setToken(
          new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
        );
      }
    } catch (e) {
      console.error("INIT ERROR:", e);
    }
  };

  const requestConfirmation = () => setConfirmBeforeTx(true);

  const confirmAndBuy = async () => {
    try {
      setTransactionStatus("Approbation des tokens…");

      const priceWei = ethers.parseEther(pricePerTicket.toString());
      const totalWei = priceWei * BigInt(tickets);

      const tx1 = await token.approve(LOTTERY_ADDRESS, totalWei);
      await tx1.wait();

      setTransactionStatus("Achat du ticket…");

      const tx2 = await contract.enter();
      await tx2.wait();

      setTransactionStatus("Achat confirmé !");
      setConfirmBeforeTx(false);
    } catch (e) {
      console.error("BUY ERROR:", e);
      setTransactionStatus("Erreur ou transaction refusée.");
      setConfirmBeforeTx(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "#292C36", color: "#c0c9db" }}>

      <Card className="max-w-lg w-full shadow-2xl rounded-2xl border"
        style={{ backgroundColor: "#391b49", borderColor: "#8e99ac" }}>
        
        <CardContent className="p-8 space-y-6">

          <h1 className="text-3xl font-bold text-center" style={{ color: "#c0c9db" }}>
            Participer à EtherLuck
          </h1>

          {account && (
            <div className="text-center text-sm py-2 rounded-lg"
              style={{ color: "#d2a941", backgroundColor: "#3b3e48" }}>
              Connecté : {account.slice(0,6)}...{account.slice(-4)}
            </div>
          )}

          {/* Inputs */}
          <div>
            <label className="block mb-2 font-medium" style={{ color: "#d2a941" }}>
              Nombre de tickets
            </label>

            <input
              type="number"
              min="1"
              value={tickets}
              onChange={(e) => setTickets(Number(e.target.value))}
              className="w-full rounded-lg p-2 text-center text-lg"
              style={{
                backgroundColor: "#391b49",
                color: "#f0dc92",
                border: "2px solid #7e52a0",
              }}
            />
          </div>

          <p className="text-center">
            Prix : <b>{pricePerTicket} ELK</b><br/>
            Total : <b>{tickets * pricePerTicket} ELK</b>
          </p>

          {!confirmBeforeTx ? (
            <Button onClick={requestConfirmation}
              className="w-full py-3 text-lg"
              style={{ backgroundColor: "#7e52a0", color: "white" }}>
              Acheter
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: "#3b3e48", color: "#f0dc92" }}>
                MetaMask va demander 2 confirmations (approve + enter).
              </div>

              <Button onClick={confirmAndBuy}
                className="w-full py-3 text-lg"
                style={{ backgroundColor: "#d2a941", color: "#391b49" }}>
                Continuer
              </Button>

              <Button onClick={() => setConfirmBeforeTx(false)}
                className="w-full py-3 text-lg"
                style={{ backgroundColor: "#7e52a0", color: "white" }}>
                Annuler
              </Button>
            </div>
          )}

          {transactionStatus && (
            <div className="text-center mt-4 p-2 rounded-lg"
              style={{ backgroundColor: "#3b3e48", color: "#f0dc92" }}>
              {transactionStatus}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
