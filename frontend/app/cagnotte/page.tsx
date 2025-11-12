"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CagnottePage() {
  const draws = [
    { user: "Alice", numbers: [1, 9, 3, 7, 5], prize: 8000 },
    { user: "Noah", numbers: [4, 8, 2, 6, 1], prize: 4000 },
    { user: "Lina", numbers: [3, 7, 9, 2, 4], prize: 5990 },
    { user: "Ethan", numbers: [5, 8, 6, 1, 0], prize: 6900 },
    { user: "Maya", numbers: [7, 2, 3, 4, 9], prize: 9000 },
    { user: "Leo", numbers: [1, 0, 5, 8, 2], prize: 3000 },
    { user: "Clara", numbers: [6, 4, 8, 2, 1], prize: 8975 },
  ];

  return (
    <div className="min-h-screen bg-[#292C36] text-[#F5F5DC] flex flex-col items-center">
      {/* HEADER */}
      <header className="w-full bg-gradient-to-r from-[#391B49] to-[#7E52A0] py-6 px-10 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Logo" width={50} height={50} className="rounded-full" />
          <h1 className="text-2xl font-bold text-[#F0DC92]">BlockLucky</h1>
        </div>
        <Button className="bg-[#D2A941] text-[#292C36] font-semibold hover:bg-[#F0DC92] transition">
          Mon profil
        </Button>
      </header>

      {/* HERO SECTION */}
      <section className="w-full text-center py-12 bg-gradient-to-br from-[#391B49] to-[#7E52A0] shadow-lg">
        <h2 className="text-4xl font-extrabold mb-3 text-[#F0DC92] uppercase tracking-wide">
          Jackpot en cours
        </h2>
        <p className="text-[#bbc4ca] mb-6">Prochain tirage dans :</p>

        {/* Timer factice */}
        <div className="text-3xl font-mono text-[#D2A941] mb-8">09:34:51</div>

        <Button className="bg-[#F0DC92] text-[#292C36] font-semibold px-6 py-3 hover:bg-[#D2A941] transition">
          Acheter un ticket
        </Button>
      </section>

      {/* ACTIONS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12 px-6">
        {[
          {
            title: "Acheter un ticket",
            desc: "Achetez un ticket pour 0.1 ELK et choisissez vos numéros.",
          },
          {
            title: "Attendre le tirage",
            desc: "Patientez pendant la génération aléatoire des numéros gagnants.",
          },
          {
            title: "Vérifier vos gains",
            desc: "Consultez vos tickets et découvrez si vous avez gagné.",
          },
        ].map((item, i) => (
          <Card key={i} className="bg-[#391B49]/60 border-[#7E52A0]/40 shadow-md">
            <CardContent className="p-6 text-center">
              <h3 className="font-bold text-[#F0DC92] mb-3 uppercase">{item.title}</h3>
              <p className="text-sm text-[#bbc4ca]">{item.desc}</p>
              <Button className="mt-4 bg-[#D2A941] text-[#292C36] hover:bg-[#F0DC92] transition">
                Commencer
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* TABLE DES GAGNANTS */}
      <section className="w-full max-w-6xl mt-16 mb-20 px-6">
        <h2 className="text-3xl font-bold text-[#F0DC92] mb-6">Derniers gagnants</h2>

        <div className="overflow-x-auto rounded-lg border border-[#7E52A0]/40">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#391B49]/60 text-[#F0DC92] uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Résultat</th>
                <th className="px-4 py-3">Utilisateur</th>
                <th className="px-4 py-3">Numéros</th>
                <th className="px-4 py-3">Gain</th>
              </tr>
            </thead>
            <tbody>
              {draws.map((draw, i) => (
                <tr
                  key={i}
                  className={`border-t border-[#7E52A0]/30 ${
                    i % 2 === 0 ? "bg-[#7E52A0]/10" : "bg-[#391B49]/20"
                  } hover:bg-[#d2a941]/10 transition`}
                >
                  <td className="px-4 py-3 text-[#F0DC92]">🎉 Jackpot</td>
                  <td className="px-4 py-3 font-semibold text-[#F5F5DC]">
                    {draw.user}
                  </td>
                  <td className="px-4 py-3 flex space-x-2">
                    {draw.numbers.map((num, idx) => (
                      <span
                        key={idx}
                        className="bg-[#F0DC92] text-[#292C36] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                      >
                        {num}
                      </span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-[#D2A941] font-semibold">
                    {draw.prize.toLocaleString()} ELK
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#391B49]/80 py-6 text-center text-[#8E99AC] text-sm">
        © 2025 BlockLucky — Loterie transparente sur blockchain ·
        <span className="text-[#F0DC92]"> Powered by EtherLuck</span>
      </footer>
    </div>
  );
}
