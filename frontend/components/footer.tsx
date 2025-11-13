"use client"
export default function Footer() {
    return (
        <footer className="bottom-0 left-0 w-full bg-[#292c36] border-t border-[#8e99ac]-200 py-5">
            <div className="max-w-8xl mx-auto flex justify-between items-center px-6 text-sm font-regular text-[#8e99ac]">
                <p>Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09-74-75-13-13 (appel non surtaxé)</p>
                <div className="flex space-x-6">
                    <a href="/regles" className="hover:underline">
                        Conditions Générale d’Utilisation (CGU)
                    </a>
                    <a href="/regles" className="hover:underline">
                        Règlement Officiel du Tirage
                    </a>
                    <a href="https://www.fdj.fr" className="hover:underline">
                        Française des Jeux
                    </a>
                </div>
            </div>
        </footer>
    );
}