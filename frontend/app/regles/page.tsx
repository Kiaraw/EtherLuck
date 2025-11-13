"use client";
import { useState } from "react";
import Head from "next/head";

export default function CGUReglement() {
  const [activeTab, setActiveTab] = useState("reglement");

  return (
    <>
      <Head>
        <title>CGU & Règlement EtherLuck</title>
        <meta
          name="description"
          content="Conditions Générales d'Utilisation et règlement officiel du tirage EtherLuck."
        />
      </Head>

      <main
        className="min-h-screen flex"
        style={{ backgroundColor: "#292C36", color: "#c0c9db" }}
      >
        {/* Barre latérale */}
        <aside
          className="w-64 p-6 flex flex-col gap-4 border-r"
          style={{ borderColor: "#8e99ac", backgroundColor: "#292C36" }}
        >
          <h1
            className="text-xl font-bold mb-4"
            style={{ color: "#7e52a0" }}
          >
            EtherLuck
          </h1>

          <button
            onClick={() => setActiveTab("reglement")}
            className="px-4 py-2 text-left font-semibold rounded-lg transition-all duration-200"
            style={{
              backgroundColor:
                activeTab === "reglement" ? "#d2a941" : "transparent",
              color: activeTab === "reglement" ? "#292C36" : "#8e99ac",
            }}
          >
            Règlement
          </button>

          <button
            onClick={() => setActiveTab("cgu")}
            className="px-4 py-2 text-left font-semibold rounded-lg transition-all duration-200"
            style={{
              backgroundColor:
                activeTab === "cgu" ? "#d2a941" : "transparent",
              color: activeTab === "cgu" ? "#292C36" : "#8e99ac",
            }}
          >
            CGU
          </button>
        </aside>

        {/* Contenu principal */}
        <div className="flex-1 px-10 py-8 max-w-4xl">
          <h1
            className="text-3xl font-bold mb-8 text-center"
            style={{ color: "#7e52a0" }}
          >
            CGU & Règlement du Tirage EtherLuck
          </h1>

          {activeTab === "reglement" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7e52a0" }}>
                Règlement Officiel du Tirage
              </h2>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                1. Objet du règlement
              </h3>
              <p>
                Le présent règlement définit les modalités d’organisation, de participation et d’attribution des gains
                dans le cadre du tirage unique organisé sur l’application EtherLuck, développée et exploitée par la Mairie
                d’Etherbay. Ce tirage vise à encourager la participation citoyenne à un projet local d’innovation numérique
                fondé sur la blockchain.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                2. Nature du tirage
              </h3>
              <p>
                Le tirage EtherLuck est une loterie municipale reposant sur un smart contract déployé sur une blockchain
                publique. Il est entièrement automatisé, transparent et vérifiable publiquement.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                3. Conditions de participation
              </h3>
              <ul className="list-disc list-inside">
                <li>Ouverte aux résidents majeurs (18 ans ou plus) de Etherbay.</li>
                <li>Wallet compatible + montant nécessaire pour acheter un ticket.</li>
                <li>Chaque ticket correspond à une participation unique.</li>
                <li>L’acceptation des présentes règles et des CGU est obligatoire.</li>
              </ul>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                4. Modalités du tirage
              </h3>
              <ul className="list-disc list-inside">
                <li>Tirage aléatoire vérifiable sur blockchain.</li>
                <li>Date et heure annoncées à l’avance.</li>
                <li>Tickets achetés après la date limite non valables.</li>
                <li>Résultats publiés sous 10 minutes.</li>
              </ul>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                5. Attribution des gains
              </h3>
              <ul className="list-disc list-inside">
                <li>Gagnants désignés automatiquement par le smart contract.</li>
                <li>Prix : cryptomonnaie locale ou bons d’achat numériques.</li>
                <li>Gains transférés automatiquement sur le wallet du gagnant.</li>
                <li>Aucun échange en argent liquide.</li>
              </ul>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                6. Validité et contrôle
              </h3>
              <p>
                Le tirage peut être audité par un tiers indépendant. En cas d’anomalie technique, la Mairie peut relancer ou
                annuler le tirage.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                7. Fiscalité et obligations légales
              </h3>
              <p>Les gains n’ont pas de valeur monétaire officielle et ne sont pas soumis à imposition.</p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                8. Responsabilité
              </h3>
              <p>
                La Mairie décline toute responsabilité en cas de perte de clé privée, erreur de wallet ou panne du réseau.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                9. Réclamations
              </h3>
              <p>
                Toute réclamation doit être adressée dans un délai d’un mois : <br />
                Mairie d’Etherbay – Service Innovation Numérique <br />
                Email : Maire@etherbay.fr <br />
                1 rue de la Poste, 97000 Etherbay
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                10. Acceptation du règlement
              </h3>
              <p>
                La participation implique l’acceptation totale du présent règlement, disponible dans l’application et sur le
                site officiel.
              </p>
            </section>
          )}

          {activeTab === "cgu" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7e52a0" }}>
                Conditions Générales d’Utilisation (CGU)
              </h2>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                1. Objet
              </h3>
              <p>
                Les présentes CGU régissent l’accès et l’utilisation de l’application EtherLuck, une plateforme municipale
                de loterie numérique gérée par la Mairie de Etherbay.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                2. Accès et conditions d’inscription
              </h3>
              <ul className="list-disc list-inside">
                <li>Réservée aux résidents majeurs de Etherbay.</li>
                <li>Création d’un wallet compatible nécessaire.</li>
                <li>Participation payante via un ticket en cryptomonnaie locale.</li>
              </ul>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                3. Fonctionnement de la loterie
              </h3>
              <ul className="list-disc list-inside">
                <li>Tirage vérifié sur blockchain.</li>
                <li>Règles publiées dans l’application.</li>
                <li>Gains en cryptomonnaie locale ou bons d’achat.</li>
                <li>Pas d’argent liquide ou de carte bancaire.</li>
              </ul>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                4. Nature expérimentale du service
              </h3>
              <p>
                Projet pilote encadré par la mairie, non un service commercial. Participation = acte citoyen.  
                Aide en cas de dépendance : 09 74 75 13 13 (appel non surtaxé).
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                5. Responsabilité
              </h3>
              <p>
                La Mairie et ses prestataires ne peuvent être tenus responsables des pertes de clés privées ou des
                interruptions du service.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                6. Protection des données personnelles (RGPD)
              </h3>
              <p>
                Les données sont traitées selon le RGPD. Aucune donnée n’est revendue. L’utilisateur peut exercer ses droits
                auprès du DPO de la Mairie.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                7. Propriété intellectuelle
              </h3>
              <p>
                L’ensemble des contenus (nom, logo, smart contract, interface) reste la propriété de la Mairie d’Etherbay.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                8. Modification des CGU
              </h3>
              <p>
                La Mairie peut modifier les CGU à tout moment. Les utilisateurs seront prévenus avant toute modification
                majeure.
              </p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                9. Loi applicable et juridiction
              </h3>
              <p>Droit français. Litiges soumis aux tribunaux administratifs compétents de Etherbay.</p>

              <h3 className="font-semibold mt-6" style={{ color: "#7e52a0" }}>
                10. Contact
              </h3>
              <p>
                Mairie de Etherbay – Service Innovation Numérique <br />
                Email : Maire@etherbay.fr <br />
                1 rue de la Poste, 97000 Etherbay
              </p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
