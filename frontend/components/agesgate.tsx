"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const AGE_STORAGE_KEY = "etherluck_is_adult_v1";

export function AgeGate({ children }: { children: React.ReactNode }) {
  const [isAdult, setIsAdult] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(AGE_STORAGE_KEY);
      if (stored === "true") {
        setIsAdult(true);
      }
    } catch (e) {
      console.error("AgeGate localStorage error:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleConfirmAdult = () => {
    try {
      window.localStorage.setItem(AGE_STORAGE_KEY, "true");
    } catch (e) {
      console.error("AgeGate localStorage write error:", e);
    }
    setIsAdult(true);
  };

  const handleMinor = () => {
    // Pas de redirection obligatoire, juste dissuasion
    alert("Si tu as moins de 18 ans, tu n’es pas autorisé à utiliser EtherLuck.");
  };

  if (loading) return null;

  if (!isAdult) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ backgroundColor: "#292C36", color: "#C0C9DB" }}
      >
        <div
          className="max-w-md w-full rounded-2xl shadow-2xl border p-8 space-y-6 text-center"
          style={{ backgroundColor: "#391B49", borderColor: "#7E52A0" }}
        >
          <h1 className="text-3xl font-extrabold mb-2" style={{ color: "#F0DC92" }}>
            Accès réservé aux +18
          </h1>

          <p className="text-sm leading-relaxed">
            EtherLuck est une loterie expérimentale.  
            En continuant, tu confirmes :
            <br />
            <span className="font-semibold text-[#D2A941]">
              • Avoir au moins 18 ans  
              <br />
              • Comprendre qu’il s’agit d’un jeu impliquant un jeton virtuel
            </span>
          </p>

          <div className="space-y-3">
            <Button
              onClick={handleConfirmAdult}
              className="w-full py-3 text-lg rounded-xl font-semibold"
              style={{ backgroundColor: "#D2A941", color: "#292C36" }}
            >
              ✅ J’ai plus de 18 ans
            </Button>

            <Button
              onClick={handleMinor}
              className="w-full py-3 text-sm rounded-xl font-semibold"
              style={{ backgroundColor: "#7E52A0", color: "#F5F5DC" }}
            >
              🚫 J’ai moins de 18 ans
            </Button>
          </div>

          <p className="text-xs mt-2 text-[#bbc4ca]">
            Ce contrôle n’est pas une vérification d’identité réelle, mais une
            déclaration sur l’honneur.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
