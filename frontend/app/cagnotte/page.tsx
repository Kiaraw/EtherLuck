"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CagnottePage() {
  const TOTAL_PARTICIPANTS = 100;

  const [participants, setParticipants] = useState([
    { name: "Emma", tickets: 3 },
    { name: "Noah", tickets: 2 },
    { name: "Alice", tickets: 5 },
    { name: "Lina", tickets: 1 },
    { name: "Ethan", tickets: 4 },
    { name: "Maya", tickets: 2 },
    { name: "Leo", tickets: 3 },
  ]);

  const [winner, setWinner] = useState<any>(null);

  const totalTickets = participants.reduce((sum, p) => sum + p.tickets, 0);
  const remainingTickets = Math.max(TOTAL_PARTICIPANTS - totalTickets, 0);

  // Ajout automatique + tirage
  useEffect(() => {
    if (winner) return;

    const interval = setInterval(() => {
      if (totalTickets >= TOTAL_PARTICIPANTS) return;

      const names = [
        "Chloé",
        "Sacha",
        "Nina",
        "Omar",
        "Lucas",
        "Clara",
        "Eliott",
        "Mila",
        "Arthur",
        "Zoe",
      ];

      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomTickets = Math.ceil(Math.random() * 5);

      setParticipants((prev) => {
        const existing = prev.find((p) => p.name === randomName);
        const updated = existing
          ? prev.map((p) =>
              p.name === randomName
                ? { ...p, tickets: p.tickets + randomTickets }
                : p
            )
          : [...prev, { name: randomName, tickets: randomTickets }];

        const newTotal = updated.reduce((s, p) => s + p.tickets, 0);

        // Tirage quand on atteint 100 tickets
        if (newTotal >= TOTAL_PARTICIPANTS && !winner) {
          const pool: any[] = [];

          updated.forEach((p) => {
            for (let i = 0; i < p.tickets; i++) pool.push(p);
          });

          const chosen = pool[Math.floor(Math.random() * pool.length)];
          setWinner(chosen);
        }

        return updated;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [totalTickets, winner]);

  return (
    <div className="min-h-screen bg-[#292C36] text-[#F5F5DC] flex flex-col items-center">

      {/* HERO SECTION */}
      <section className="w-full text-center py-12 bg-gradient-to-br from-[#391B49] to-[#7E52A0] shadow-lg">

        {winner ? (
          <>
            <h2 className="text-5xl font-extrabold mb-6 text-[#F0DC92] uppercase tracking-wide">
              🎉 Gagnant 🎉
            </h2>

            <p className="text-3xl font-bold text-[#D2A941] mb-3">
              {winner.name}
            </p>

            <p className="text-lg text-[#F0DC92]">
              a misé <span className="font-bold">{winner.tickets}</span> ticket
              {winner.tickets > 1 ? "s" : ""}
            </p>

            <p className="text-[#bbc4ca] mt-6 italic">Le tirage est terminé.</p>
          </>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold mb-3 text-[#F0DC92] uppercase tracking-wide">
              Loterie en cours
            </h2>

            <p className="text-[#bbc4ca] mb-4">
              Il reste{" "}
              <span className="text-[#D2A941] font-bold">
                {remainingTickets}
              </span>{" "}
              participations avant le tirage !
            </p>

            {/* Barre de progression */}
            <div className="w-64 h-3 bg-[#391B49]/50 mx-auto rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-[#D2A941] transition-all duration-700"
                style={{ width: `${(totalTickets / TOTAL_PARTICIPANTS) * 100}%` }}
              />
            </div>

            <Button className="bg-[#F0DC92] text-[#292C36] font-semibold px-6 py-3 hover:bg-[#D2A941] transition">
              Acheter vos tickets
            </Button>
          </>
        )}
      </section>

      {/* A C T I O N S */}
      {!winner && (
        <section className="w-full max-w-4xl mt-14 px-6 flex flex-col items-center text-center">

          {/* CARD : Acheter vos tickets */}
          <Card className="bg-[#391B49]/60 border-[#7E52A0]/40 shadow-lg w-full max-w-md">
            <CardContent className="p-6">
              <h3 className="font-bold text-[#F0DC92] mb-3 uppercase text-xl">
                Acheter vos tickets
              </h3>
              <p className="text-sm text-[#bbc4ca] mb-5">
                Achetez un ticket pour 0.1 ELK et rejoignez la loterie.
              </p>
              <Button className="bg-[#D2A941] text-[#292C36] hover:bg-[#F0DC92] transition">
                Commencer
              </Button>
            </CardContent>
          </Card>

          {/* BLOCS CÔTE À CÔTÉ */}
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 w-full">

            <div className="px-4">
              <h3 className="text-[#F0DC92] font-bold uppercase text-lg mb-2">
                Atteindre le seuil
              </h3>
              <p className="text-[#bbc4ca] text-sm max-w-sm mx-auto">
                Le tirage démarre dès que 100 tickets sont vendus.
              </p>
            </div>

            <div className="px-4">
              <h3 className="text-[#F0DC92] font-bold uppercase text-lg mb-2">
                Voir le gagnant
              </h3>
              <p className="text-[#bbc4ca] text-sm max-w-sm mx-auto">
                Un seul gagnant remportera toute la cagnotte.
              </p>
            </div>

          </div>

          {/* SÉPARATEUR */}
          <div className="w-full max-w-5xl mt-16 mb-10">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-[#7E52A0] to-transparent opacity-60"></div>
          </div>
        </section>
      )}

      {/* ACTIVITÉ DES JOUEURS */}
      {!winner && (
        <section className="w-full max-w-6xl mt-4 mb-20 px-6">
          <h2 className="text-3xl font-bold text-[#F0DC92] mb-6">Activité récente</h2>

          <div className="overflow-x-auto rounded-lg border border-[#7E52A0]/40">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#391B49]/60 text-[#F0DC92] uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Utilisateur</th>
                  <th className="px-4 py-3">Tickets achetés</th>
                </tr>
              </thead>
              <tbody>
                {participants.map((p, i) => (
                  <tr
                    key={i}
                    className={`border-t border-[#7E52A0]/30 ${
                      i % 2 === 0 ? "bg-[#7E52A0]/10" : "bg-[#391B49]/20"
                    } hover:bg-[#D2A941]/10 transition`}
                  >
                    <td className="px-4 py-3 font-semibold text-[#F5F5DC]">{p.name}</td>
                    <td className="px-4 py-3 text-[#D2A941] font-semibold">
                      {p.tickets} ticket{p.tickets > 1 ? "s" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
