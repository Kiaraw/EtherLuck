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
import { AgeGate } from "@/components/agesgate";

export default function Participation() {
  const [account, setAccount] = useState("");
  const [tickets, setTickets] = useState(1);
  const [pricePerTicket, setPricePerTicket] = useState(1);
  const [transactionStatus, setTransactionStatus] = useState("");
  const [confirmBeforeTx, setConfirmBeforeTx] = useState(false);

  const [contract, setContract] = useState<any>(null);
  const [token, setToken] = useState<any>(null);

  // Popup gagnant
  const [winnerPopup, setWinnerPopup] = useState<string | null>(null);

  useEffect(() => {
    initBlockchain();
  }, []);

  const initBlockchain = async () => {
    try {
      console.log("----- INIT Participation -----");

      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      const code = await provider.getCode(LOTTERY_ADDRESS);
      if (code === "0x") {
        console.error("❌ Aucun contrat à cette adresse");
      }

      // Contrat lecture seule
      const contractRead = new ethers.Contract(
        LOTTERY_ADDRESS,
        LOTTERY_ABI,
        provider
      );

      const priceWei = await contractRead.ticketPrice();
      const formatted = Number(ethers.formatEther(priceWei));
      setPricePerTicket(formatted);

      // Connexion wallet
      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const signerAddress = await signer.getAddress();
        setAccount(signerAddress);

        const contractWrite = new ethers.Contract(
          LOTTERY_ADDRESS,
          LOTTERY_ABI,
          signer
        );

        const tokenWrite = new ethers.Contract(
          TOKEN_ADDRESS,
          TOKEN_ABI,
          signer
        );

        setContract(contractWrite);
        setToken(tokenWrite);
      }
    } catch (e) {
      console.error("❌ INIT ERROR:", e);
    }
  };

  const requestConfirmation = () => {
    setConfirmBeforeTx(true);
  };

  const confirmAndBuy = async () => {
    try {
      if (!contract || !token) {
        setTransactionStatus("Erreur: contrat non initialisé.");
        return;
      }

      setTransactionStatus("Approbation des tokens (approve)…");

      // Calcul du montant total
      const priceWei = ethers.parseEther(pricePerTicket.toString());
      const totalWei = priceWei * BigInt(tickets);

      // Lire total avant achat
      const previousTotal = Number(await contract.totalTicketsSold());
      const futureTotal = previousTotal + Number(tickets);

      // APPROVE
      const tx1 = await token.approve(LOTTERY_ADDRESS, totalWei);
      await tx1.wait();

      setTransactionStatus("Achat du ticket…");

      // ENTER avec quantité
      const tx2 = await contract.enter(tickets);
      await tx2.wait();

      // ---------- TIRAGE AUTO ----------
      if (futureTotal >= 100) {
        setTransactionStatus("Tirage du gagnant…");

        const tx3 = await contract.pickWinner();
        const receipt = await tx3.wait();

        // Extraction event WinnerPicked
        const event = receipt.logs
          .map((log: any) => {
            try {
              return contract.interface.parseLog(log);
            } catch {
              return null;
            }
          })
          .find((e: any) => e && e.name === "WinnerPicked");

        if (event) {
          const winnerAddress = event.args.winner;

          console.log("🎉 Gagnant tiré =", winnerAddress);

          // Suspense 3 sec
          setTimeout(() => {
            setWinnerPopup(winnerAddress);
          }, 3000);
        }

        setTransactionStatus("🎉 Gagnant tiré automatiquement !");
      } else {
        setTransactionStatus("Achat confirmé ! Bonne chance 🍀");
      }

      setConfirmBeforeTx(false);
    } catch (e: any) {
      console.error("❌ BUY ERROR:", e);
      setTransactionStatus("Transaction refusée ou échouée.");
      setConfirmBeforeTx(false);
    }
  };

  return (
    <AgeGate>
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
            <p>Prix par ticket : <span className="font-bold">{pricePerTicket} ELK</span></p>
            <p>Total : <span className="font-bold">{tickets * pricePerTicket} ELK</span></p>
          </div>

          {!confirmBeforeTx ? (
            <Button
              onClick={requestConfirmation}
              className="w-full text-lg py-3 rounded-xl font-semibold transition-all duration-200"
              style={{
                backgroundColor: "#7e52a0",
                color: "white",
              }}
            >
              Acheter mes tickets
            </Button>
          ) : (
            <div className="space-y-3">

              <div
                className="p-3 rounded-lg text-sm"
                style={{ backgroundColor: "#3b3e48", color: "#f0dc92" }}
              >
                MetaMask va demander :
                <br />– Approver vos tokens ELK  
                <br />– Confirmer la participation ensuite
                <br /><br />
                C’est normal et sécurisé.
              </div>

              <Button
                onClick={confirmAndBuy}
                className="w-full py-3 text-lg rounded-xl font-semibold"
                style={{ backgroundColor: "#d2a941", color: "#391b49" }}
              >
                Continuer
              </Button>

              <Button
                onClick={() => setConfirmBeforeTx(false)}
                className="w-full py-3 text-lg rounded-xl font-semibold"
                style={{ backgroundColor: "#7e52a0", color: "white" }}
              >
                Annuler
              </Button>
            </div>
          )}

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

      {/* POP-UP GAGNANT */}
      {winnerPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
          onClick={() => setWinnerPopup(null)}
        >
          <div
            className="p-6 rounded-2xl shadow-2xl text-center"
            style={{ backgroundColor: "#391b49", border: "2px solid #d2a941" }}
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: "#f0dc92" }}>
              🎉 Gagnant du tirage !
            </h2>

            <p className="text-lg mb-6" style={{ color: "#d2a941" }}>
              {winnerPopup.substring(0, 6)}...{winnerPopup.slice(-4)}
            </p>

            <Button
              onClick={() => setWinnerPopup(null)}
              style={{ backgroundColor: "#d2a941", color: "#391b49" }}
            >
              Fermer
            </Button>
          </div>
        </div>
      )}

    </main>
    </AgeGate>
  );
}
