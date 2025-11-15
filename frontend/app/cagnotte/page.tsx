"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LOTTERY_ADDRESS,
  LOTTERY_ABI
} from "@/src/constants";

export default function CagnottePage() {
  const TOTAL_TICKETS = 100;

  const [account, setAccount] = useState("");
  const [userTickets, setUserTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      console.log("🚀 INIT CAGNOTTE — START");

      // PROVIDER HARDHAT
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

      console.log("STEP 1.1 — Block actuel:", await provider.getBlockNumber());

      // INSTANCE READ
      console.log("STEP 2 — Instanciation du contrat…");
      const contract = new ethers.Contract(LOTTERY_ADDRESS, LOTTERY_ABI, provider);

      // TOTAL TICKETS
      console.log("STEP 3 — Lecture totalTicketsSold()…");
      const total = await contract.totalTicketsSold();
      console.log("🎫 TOTAL tickets vendus =", total.toString());
      setTotalTickets(Number(total));

      // WALLET
      if (window.ethereum) {
        console.log("STEP 4 — Connexion Metamask…");

        const browser = new ethers.BrowserProvider(window.ethereum);
        const signer = await browser.getSigner();
        const addr = await signer.getAddress();
        setAccount(addr);

        // USER TICKETS
        console.log("STEP 5 — Lecture tickets utilisateur…");
        const user = await contract.ticketsBought(addr);
        console.log("👤 Tickets achetés par l’utilisateur:", user.toString());
        setUserTickets(Number(user));
      }

      // EVENTS
      console.log("STEP 6 — Lecture des events TicketPurchased…");
      const logs = await contract.queryFilter("TicketPurchased", 0, "latest");
      console.log("🧾 Events bruts =", logs);

      const history = logs.map((log: any) => ({
        buyer: log.args.buyer,
        amount: Number(log.args.amount)
      }));

      console.log("📒 Activité récente brute =", history);
      setEvents(history.reverse());

    } catch (err) {
      console.error("❌ INIT ERROR:", err);
    }
  };

  const progress = Math.min((totalTickets / TOTAL_TICKETS) * 100, 100);

  return (
    <div className="min-h-screen bg-[#292C36] text-[#F5F5DC] flex flex-col items-center">

      {/* HEADER */}
      <section className="w-full text-center py-12 bg-gradient-to-br from-[#391B49] to-[#7E52A0]">
        <h2 className="text-4xl font-extrabold mb-3 text-[#F0DC92] uppercase tracking-wide">
          Loterie en cours
        </h2>

        <p className="text-[#bbc4ca] mb-4">
          Tickets vendus :
          <span className="text-[#D2A941] font-bold"> {totalTickets} </span>
          / {TOTAL_TICKETS}
        </p>

        {/* Progress bar */}
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
            Votre adresse :
            <span className="font-bold">
              {" "}
              {account.substring(0, 6)}...{account.slice(-4)}
            </span>
            <br />
            Tickets achetés :
            <span className="font-bold text-[#D2A941]"> {userTickets} </span>
          </p>
        )}
      </section>

      {/* RECENT EVENTS */}
      <section className="w-full max-w-6xl mt-10 mb-20 px-6">
        <h2 className="text-3xl font-bold text-[#F0DC92] mb-6">
          Activité récente
        </h2>

        {events.length === 0 ? (
          <div className="p-4 text-center text-[#bbc4ca] bg-[#391B49]/30 rounded-xl border border-[#7E52A0]/30">
            Aucun achat enregistré pour le moment…
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#7E52A0]/30">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#391B49]/60 text-[#F0DC92] uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Adresse</th>
                  <th className="px-4 py-3">Tickets achetés</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e, i) => (
                  <tr
                    key={i}
                    className={`border-t border-[#7E52A0]/30 ${
                      i % 2 === 0 ? "bg-[#7E52A0]/10" : "bg-[#391B49]/20"
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-[#F5F5DC]">
                      {e.buyer.substring(0, 6)}...{e.buyer.slice(-4)}
                    </td>
                    <td className="px-4 py-3 text-[#D2A941] font-semibold">
                      {e.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
