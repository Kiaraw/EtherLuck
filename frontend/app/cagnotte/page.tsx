"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function CagnottePage() {
  const tickets = [
    { name: "Alice", amount: 25 },
    { name: "Noah", amount: 50 },
    { name: "Lina", amount: 10 },
    { name: "Ethan", amount: 70 },
    { name: "Maya", amount: 40 },
    { name: "Leo", amount: 15 },
    { name: "Clara", amount: 30 },
    { name: "Hugo", amount: 55 },
    { name: "Nina", amount: 20 },
    { name: "Omar", amount: 65 },
    { name: "Zoé", amount: 35 },
    { name: "Lucas", amount: 45 },
    { name: "Emma", amount: 80 },
    { name: "Sacha", amount: 12 },
    { name: "Chloé", amount: 90 },
  ];

  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setRotation(window.scrollY * 0.15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#391B49] to-[#7E52A0] text-[#f0dc92]">
      
      {/* --- Logo en fond tournant --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Image
          src="/logo.png"
          alt="Logo BlockLucky"
          width={600}
          height={600}
          className="opacity-70 transition-transform duration-75"
          style={{
            transform: `rotate(${rotation}deg)`,
          }}
        />
      </div>

      {/* --- Conteneur principal --- */}
      <div className="relative bg-[#c0c9db]/20 backdrop-blur-lg rounded-2xl p-10 shadow-2xl border border-[#8e99ac]/30 text-center w-[90%] max-w-4xl z-10">
        
        {/* Titre */}
        <h1 className="text-3xl font-extrabold mb-8 tracking-wider uppercase text-[#f0dc92] drop-shadow-[0_1px_1px_#000]">
          loterie en cours
        </h1>

        {/* Numéro gagnant */}
        <Card className="bg-[#f0dc92] border-[#d2a941] text-[#292c36] inline-block mb-8 shadow-md">
          <CardContent className="py-3 px-10 font-semibold text-xl">
            Numéro gagnant : <br></br>
            <span className="font-bold text-[#d2a941]">7421</span>
          </CardContent>
        </Card>

        {/* Séparateur décoratif */}
        <div className="mt-2 mb-6 h-[2px] w-40 bg-gradient-to-r from-[#d2a941] via-[#f0dc92] to-[#d2a941] mx-auto rounded-full"></div>

        {/* Tickets gagnants */}
        <h2 className="text-2xl font-bold mb-6 uppercase tracking-wide text-[#f0dc92]">
          tickets gagnants
        </h2>

        {/* Grille responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {tickets.map((ticket, i) => (
            <Card
              key={i}
              className="bg-[#d2a941] border-[#f0dc92]/40 w-56 h-24 shadow-lg"
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

        {/* Bas de page */}
        <div className="mt-10 text-[#bbc4ca] text-sm italic">
          <span className="text-[#bbc4ca] font-regular">
            Vous n'avez aucune limite de participation
          </span>
        </div>
      </div>
    </div>
  );
}
