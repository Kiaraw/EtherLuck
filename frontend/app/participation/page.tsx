"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Participation() {
  const [account, setAccount] = useState('');
  const [tickets, setTickets] = useState(1);
  // prix en "etherluckies" (ELK)
  const [pricePerTicket, setPricePerTicket] = useState(1); // 1 ELK par ticket
  const [remainingTickets, setRemainingTickets] = useState(100);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [elkBalance, setElkBalance] = useState(100); // solde fictif en ELK

  useEffect(() => {
    // récupérer un solde fictif depuis le localStorage si présent
    const saved = localStorage.getItem('elk_balance');
    if (saved) setElkBalance(Number(saved));
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        // à la connexion, on peut initialiser ou synchroniser le solde fictif
        const saved = localStorage.getItem('elk_balance');
        if (!saved) localStorage.setItem('elk_balance', String(elkBalance));
      } catch (err) {
        console.error('Erreur connexion wallet:', err);
      }
    } else {
      alert('MetaMask non détecté');
    }
  };

  const buyTickets = async () => {
    const totalCost = pricePerTicket * tickets;
    if (tickets < 1) {
      setTransactionStatus('Choisissez au moins 1 ticket.');
      return;
    }
    if (totalCost > elkBalance) {
      setTransactionStatus('Solde insuffisant en etherluckies (ELK).');
      return;
    }

    try {
      setTransactionStatus('Transaction en cours...');
      // Simulation de transaction (à remplacer par le smart contract réel)
      await new Promise(resolve => setTimeout(resolve, 1800));

      // mise à jour du solde fictif
      const newBalance = Number((elkBalance - totalCost).toFixed(4));
      setElkBalance(newBalance);
      localStorage.setItem('elk_balance', String(newBalance));

      // mise à jour des tickets restants
      setRemainingTickets(prev => Math.max(0, prev - tickets));

      setTransactionStatus(`Achat confirmé : -${totalCost} ELK. Solde restant : ${newBalance} ELK. Bonne chance 🍀`);
    } catch (err) {
      console.error(err);
      setTransactionStatus('Erreur pendant la transaction.');
    }
  };

  return (
    <div className="min-h-screen bg-[#c0c9db] flex flex-col items-center justify-center p-6 text-[#d2a941]">
      <Card className="max-w-lg w-full shadow-2xl rounded-2xl bg-white">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-[#d2a941]">Participer à la loterie</h1>

          {!account ? (
            <Button onClick={connectWallet} className="w-full bg-[#7e52a0] hover:bg-[#391b49] text-white text-lg py-3 rounded-xl">
              Se connecter à MetaMask
            </Button>
          ) : (
            <div className="text-center text-sm text-[#f0dc92]">
              Connecté : {account.substring(0, 6)}...{account.substring(account.length - 4)}
            </div>
          )}

          <div>
            <label className="block mb-2 font-medium text-[#d2a941]">Nombre de tickets</label>
            <input
              type="number"
              min="1"
              value={tickets}
              onChange={e => setTickets(Number(e.target.value))}
              className="w-full border-2 border-[#7e52a0] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#d2a941] text-[#391b49]"
            />
          </div>

          <div className="space-y-2 text-center">
            <p>Prix par ticket : <span className="font-bold">{pricePerTicket} ELK</span></p>
            <p>Coût total : <span className="font-bold">{pricePerTicket * tickets} ELK</span></p>
            <p>Tickets restants : <span className="font-bold">{remainingTickets}</span></p>
            <p>Solde (etherluckies) : <span className="font-bold">{elkBalance} ELK</span></p>
          </div>

          <Button onClick={buyTickets} disabled={!account} className="w-full bg-[#7e52a0] hover:bg-[#391b49] text-white text-lg py-3 rounded-xl">
            Acheter mes tickets
          </Button>

          {transactionStatus && (
            <div className="text-center font-medium mt-4 text-[#f0dc92]">
              {transactionStatus}
            </div>
          )}

          <div className="text-center mt-6">
            <a href="/" className="text-[#d2a941] hover:underline font-medium">
              ← Retour à l’accueil
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
