"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LOTTERY_ADDRESS,
  LOTTERY_ABI,
} from "@/src/constants";

export default function CagnottePage() {
  const TOTAL_TICKETS = 100;

  const [account, setAccount] = useState("");
  const [userTickets, setUserTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [lottery, setLottery] = useState<any>(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      const contract = new ethers.Contract(
        LOTTERY_ADDRESS,
        LOTTERY_ABI,
        provider
      );
      setLottery(contract);

      const total = await contract.totalTicketsSold();
      setTotalTickets(Number(total));

      if (window.ethereum) {
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await browserProvider.getSigner();
        const addr = await signer.getAddress();
        setAccount(addr);

        const userCount = await contract.ticketsBought(addr);
        setUserTickets(Number(userCount));
      }
    } catch (e) {
      console.error("INIT ERROR:", e);
    }
  };

  const progress = Math.min((totalTickets / TOTAL_TICKETS) * 100, 100);

  return (
    <div className="min-h-screen bg-[#292C36] text-[#F5F5DC] flex flex-col items-center">

      {/* HERO */}
      <section className="w-full text-center py-12 bg-gradient-to-br from-[#391B49] to-[#7E52A0]">

        <h2 className="text-4xl font-extrabold mb-3 text-[#F0DC92] uppercase tracking-wide">
          Loterie en cours
        </h2>

        <p className="text-[#bbc4ca] mb-4">
          Tickets vendus :{" "}
          <span className="text-[#D2A941] font-bold">{totalTickets}</span> / {TOTAL_TICKETS}
        </p>

        {/* Barre de progression */}
        <div className="w-64 h-3 bg-[#391B49]/50 mx-auto rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-[#D2A941] transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>

        <Button
          className="bg-[#F0DC92] text-[#292C36] font-semibold px-6 py-3 hover:bg-[#D2A941] transition"
          onClick={() => (window.location.href = "/participation")}
        >
          Acheter vos tickets
        </Button>

        {account && (
          <p className="text-[#F0DC92] mt-4 text-lg">
            Votre adresse :{" "}
            <span className="font-bold">
              {account.substring(0, 6)}...{account.slice(-4)}
            </span>
            <br />
            Tickets achetés :{" "}
            <span className="font-bold text-[#D2A941]">{userTickets}</span>
          </p>
        )}
      </section>

      {/* ACTIVITÉ RECENTE (placeholder tant qu’on n’a pas les events) */}
      <section className="w-full max-w-6xl mt-10 mb-20 px-6">
        <h2 className="text-3xl font-bold text-[#F0DC92] mb-6">
          Activité récente
        </h2>

        <div className="p-4 text-center text-[#bbc4ca] bg-[#391B49]/30 rounded-xl border border-[#7E52A0]/30">
          Connexion aux events en préparation…
        </div>
      </section>
    </div>
  );
}
