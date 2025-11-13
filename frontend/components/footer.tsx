"use client"

export default function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full bg-[#292c36] border-t border-[#8e99ac] py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
        <p className="text-[#c0c9db] text-center md:text-left text-sm leading-relaxed max-w-2xl">
          Jouer comporte des risques : <span className="text-[#d2a941]">endettement</span>, <span className="text-[#d2a941]">isolement</span>, <span className="text-[#d2a941]">dépendance</span>.<br />
          Pour être aidé, appelez le <span className="font-semibold text-[#d2a941]">09 74 75 13 13</span> (appel non surtaxé).
        </p>

        <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
          <a href="/regles" className="text-[#8e99ac] hover:text-[#d2a941] transition-colors duration-200">
            Conditions Générales d’Utilisation (CGU)
          </a>
          <a href="/regles" className="text-[#8e99ac] hover:text-[#d2a941] transition-colors duration-200">
            Règlement du Tirage
          </a>
          <a href="https://www.fdj.fr" target="_blank" rel="noopener noreferrer" className="text-[#8e99ac] hover:text-[#d2a941] transition-colors duration-200">
            Française des Jeux
          </a>
        </div>
      </div>
    </footer>
  )
}
