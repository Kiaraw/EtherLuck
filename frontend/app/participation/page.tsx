"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Participation() {
  const [account, setAccount] = useState("");
  const [tickets, setTickets] = useState(1);
  const [pricePerTicket, setPricePerTicket] = useState(1); // 1 ELK par ticket
  const [remainingTickets, setRemainingTickets] = useState(100);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [elkBalance, setElkBalance] = useState(100); // solde fictif

  useEffect(() => {
    const saved = localStorage.getItem("elk_balance");
    if (saved) setElkBalance(Number(saved));
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
        const saved = localStorage.getItem("elk_balance");
        if (!saved) localStorage.setItem("elk_balance", String(elkBalance));
      } catch (err) {
        console.error("Erreur connexion wallet:", err);
      }
    } else {
      alert("MetaMask non détecté");
    }
  };

  const buyTickets = async () => {
    const totalCost = pricePerTicket * tickets;
    if (tickets < 1) {
      setTransactionStatus("Choisissez au moins 1 ticket.");
      return;
    }
    if (totalCost > elkBalance) {
      setTransactionStatus("Solde insuffisant en etherluckies (ELK).");
      return;
    }

    try {
      setTransactionStatus("Transaction en cours...");
      await new Promise((resolve) => setTimeout(resolve, 1800));

      const newBalance = Number((elkBalance - totalCost).toFixed(4));
      setElkBalance(newBalance);
      localStorage.setItem("elk_balance", String(newBalance));
      setRemainingTickets((prev) => Math.max(0, prev - tickets));
      setTransactionStatus(`Achat confirmé : -${totalCost} ELK. Solde restant : ${newBalance} ELK. Bonne chance 🍀`);
    } catch (err) {
      console.error(err);
      setTransactionStatus("Erreur pendant la transaction.");
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
            Participer à la loterie EtherLuck
          </h1>

          {!account ? (
            <Button
              onClick={connectWallet}
              className="w-full text-lg py-3 rounded-xl font-semibold transition-all duration-200"
              style={{
                backgroundColor: "#d2a941",
                color: "#391b49",
              }}
            >
              Se connecter à MetaMask
            </Button>
          ) : (
            <div
              className="text-center text-sm py-2 rounded-lg"
              style={{ color: "#d2a941", backgroundColor: "#3b3e48" }}
            >
              Connecté : {account.substring(0, 6)}...{account.substring(account.length - 4)}
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
            <p>
              Prix par ticket :{" "}
              <span className="font-bold" style={{ color: "#c0c9db" }}>
                {pricePerTicket} ELK
              </span>
            </p>
            <p>
              Coût total :{" "}
              <span className="font-bold" style={{ color: "#c0c9db" }}>
                {pricePerTicket * tickets} ELK
              </span>
            </p>
            <p>
              Tickets restants :{" "}
              <span className="font-bold" style={{ color: "#c0c9db" }}>
                {remainingTickets}
              </span>
            </p>
            <p>
              Solde (ELK) :{" "}
              <span className="font-bold" style={{ color: "#c0c9db" }}>
                {elkBalance} ELK
              </span>
            </p>
          </div>

          <Button
            onClick={buyTickets}
            disabled={!account}
            className="w-full text-lg py-3 rounded-xl font-semibold transition-all duration-200"
            style={{
              backgroundColor: "#7e52a0",
              color: "white",
              opacity: !account ? 0.5 : 1,
            }}
          >
            Acheter mes tickets
          </Button>

          {transactionStatus && (
            <div
              className="text-center font-medium mt-4 p-2 rounded-lg"
              style={{ backgroundColor: "#3b3e48", color: "#f0dc92" }}
            >
              {transactionStatus}
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
