"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#391b49] text-[#f0dc92] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/logo.png"
            alt="Logo BlockLucky"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-[#d2a941] hover:text-[#f0dc92] transition">
            BlockLucky
          </span>
        </Link>

        <div className="flex space-x-6 text-lg font-medium">
          <Link href="/" className="hover:text-[#d2a941] transition">
            Accueil
          </Link>
          <Link href="/participation" className="hover:text-[#d2a941] transition">
            Participation
          </Link>
          <Link href="/cagnotte" className="hover:text-[#d2a941] transition">
            Cagnotte
          </Link>
          <Link href="/apropos" className="hover:text-[#d2a941] transition">
            À propos
          </Link>
        </div>
      </div>
    </nav>
  );
}