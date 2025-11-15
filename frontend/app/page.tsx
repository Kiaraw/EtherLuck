"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ethers } from "ethers";
import { LOTTERY_ADDRESS, LOTTERY_ABI, TOKEN_ADDRESS, TOKEN_ABI } from "@/src/constants";
import { AgeGate } from "@/components/agesgate";

export default function HomePage() {
  const TOTAL_TICKETS = 100;

  const [ticketsSold, setTicketsSold] = useState(0);
  const [participants, setParticipants] = useState(0);
  const [ticketsLeft, setTicketsLeft] = useState(TOTAL_TICKETS);
  const [jackpot, setJackpot] = useState(0);

  useEffect(() => {
    initHomeData();
  }, []);

  const initHomeData = async () => {
    console.log("🏠 INIT Home — Connecting to blockchain…");

    try {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      // Contrat read-only
      const contract = new ethers.Contract(
        LOTTERY_ADDRESS,
        LOTTERY_ABI,
        provider
      );

      const token = new ethers.Contract(
        TOKEN_ADDRESS,
        TOKEN_ABI,
        provider
      );

      // ---------------------------
      // 1. Total tickets vendus
      // ---------------------------
      const total = await contract.totalTicketsSold();
      const totalNum = Number(total);
      console.log("🎫 totalTicketsSold =", totalNum);
      setTicketsSold(totalNum);

      setTicketsLeft(Math.max(TOTAL_TICKETS - totalNum, 0));

      // ---------------------------
      // 2. Nombre de participants uniques
      // via l'événement TicketPurchased
      // ---------------------------
      const events = await contract.queryFilter("TicketPurchased");
      console.log("🧾 Events Home =", events);

      // compter les adresses uniques
      const uniqueAddresses = new Set(
        events.map(e => e.args?.buyer?.toLowerCase())
      );
      setParticipants(uniqueAddresses.size);

      // ---------------------------
      // 3. Jackpot = solde du contrat en tokens ELK
      // ---------------------------
      const balance = await token.balanceOf(LOTTERY_ADDRESS);
      const formattedJackpot = Number(ethers.formatEther(balance));

      console.log("💰 Jackpot =", formattedJackpot);
      setJackpot(formattedJackpot);

    } catch (err) {
      console.error("❌ HOME ERROR:", err);
    }
  };

  return (
    <AgeGate>
    <main className="min-h-screen bg-[#292C36] text-[#C0C9DB] flex flex-col items-center">

      {/* HERO */}
      <motion.section
        className="w-full max-w-4xl text-center px-6 pt-24 pb-14"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#F0DC92] mb-6 uppercase tracking-wide">
          EtherLuck
        </h1>

        <p className="text-lg text-[#F0DC92] mb-4">
          Il reste <span className="font-bold text-[#D2A941]">{ticketsLeft}</span> tickets avant le tirage.
        </p>

        <Link
          href="/participation"
          className="inline-block px-10 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 active:scale-95"
          style={{ background: "#D2A941", color: "#292C36" }}
        >
          Participer maintenant
        </Link>
      </motion.section>

      {/* CARDS */}
      <motion.section
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        {[
          { label: "Participants", value: participants },
          { label: "Tickets restants", value: ticketsLeft },
          { label: "Cagnotte", value: `${jackpot} ELK` },
        ].map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="rounded-2xl p-6 shadow-lg border border-[#7E52A0]/40"
            style={{ background: "#391B49" }}
          >
            <p className="text-sm text-[#F0DC92] mb-2">{item.label}</p>
            <p className="text-3xl font-bold text-[#D2A941]">{item.value}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* COMMENT ÇA MARCHE */}
      <motion.section
        className="w-full max-w-5xl px-6 pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#F0DC92] mb-10 uppercase tracking-wide">
          Comment ça marche ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            "Achetez un ticket pour participer à la loterie.",
            "Chaque ticket augmente la probabilité d’être tiré au sort.",
            "Quand les tickets sont épuisés, un gagnant unique est choisi.",
          ].map((text, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              className="p-6 rounded-xl border border-[#7E52A0]/40 shadow-md"
              style={{ background: "#391B49" }}
            >
              <h3 className="text-[#D2A941] font-bold mb-3 text-lg">
                Étape {i + 1}
              </h3>
              <p className="text-sm leading-6 text-[#C0C9DB]">{text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
    </AgeGate>
  );
}
