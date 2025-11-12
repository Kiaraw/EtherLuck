"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function CagnottePage() {
  const tickets = [
    { name: "Alice", amount: 25 },
    { name: "Noah", amount: 50 },
    { name: "Lina", amount: 10 },
  ];

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#c0c9db] text-[#f0dc92]">
      
      {/* --- Points décoratifs --- */}
      <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-[#7E52A0] opacity-40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#391B49] opacity-40 rounded-full blur-3xl animate-pulse delay-300"></div>
      <div className="absolute top-1/2 left-1/5 w-60 h-60 bg-gradient-to-br from-[#7E52A0] to-[#391B49] opacity-30 rounded-full blur-2xl animate-pulse delay-700"></div>

      {/* --- Contenu principal --- */}
      <div className="relative bg-gradient-to-br from-[#391B49] to-[#7E52A0] backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-[#8e99ac]/30 text-center w-[90%] max-w-2xl">
        
        {/* Titre */}
        <h1 className="text-3xl font-extrabold mb-8 tracking-wider uppercase text-[#f0dc92] drop-shadow-[0_1px_1px_#000]">
          loterie en cours
        </h1>

        {/* Numéro gagnant */}
        <Card className="bg-[#f0dc92] border-[#d2a941] text-[#292c36] inline-block mb-8 shadow-md">
          <CardContent className="py-3 px-10 font-semibold text-xl">
            numéro gagnant : <span className="font-bold text-[#d2a941]">7421</span>
          </CardContent>
        </Card>

        {/* Ligne décorative */}
        <div className="mt-2 mb-6 h-[2px] w-40 bg-gradient-to-r from-[#d2a941] via-[#f0dc92] to-[#d2a941] mx-auto rounded-full"></div>

        {/* Tickets gagnants */}
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide text-[#f0dc92]">
          tickets gagnants
        </h2>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          {tickets.map((ticket, i) => (
            <Card
              key={i}
              className="bg-[#d2a941] border-[#f0dc92]/40 w-60 h-28 shadow-lg"
            >
              <CardContent className="flex flex-col justify-center items-center h-full text-[#292c36]">
                <p className="font-bold text-lg">{ticket.name}</p>
                <p className="text-sm text-[#391B49]">
                  {ticket.amount} ELK misés
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
