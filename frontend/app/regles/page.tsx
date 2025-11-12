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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          CGU & Règlement du Tirage EtherLuck
        </h1>

        {/* Onglets */}
        <div className="flex justify-center mb-8 border-b border-gray-300">
          <button
            onClick={() => setActiveTab("reglement")}
            className={`px-6 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === "reglement"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
          >
            Règlement
          </button>
          <button
            onClick={() => setActiveTab("cgu")}
            className={`px-6 py-2 -mb-px font-semibold border-b-2 ${
              activeTab === "cgu"
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-600 hover:text-blue-500"
            }`}
          >
            CGU
          </button>
        </div>

        {/* Contenu */}
        <div>
          {activeTab === "reglement" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Règlement Officiel du Tirage
              </h2>

              <h3 className="font-semibold mt-4">1. Objet du règlement</h3>
              <p>
                Le présent règlement définit les modalités d’organisation, de
                participation et d’attribution des gains dans le cadre du
                tirage unique organisé sur l’application EtherLuck, développée
                et exploitée par la Mairie d’Etherbay. Ce tirage vise à
                encourager la participation citoyenne à un projet local
                d’innovation numérique fondé sur la blockchain.
              </p>

              <h3 className="font-semibold mt-4">2. Nature du tirage</h3>
              <p>
                Le tirage EtherLuck est une loterie municipale, reposant sur un
                smart contract déployé sur une blockchain publique. Le tirage
                est entièrement automatisé, transparent et vérifiable
                publiquement via l’explorateur blockchain indiqué dans
                l’application.
              </p>

              <h3 className="font-semibold mt-4">3. Conditions de participation</h3>
              <ul className="list-disc list-inside">
                <li>Ouverte aux résidents majeurs (18 ans ou plus) de Etherbay.</li>
                <li>Wallet compatible + montant nécessaire pour acheter un ticket.</li>
                <li>Chaque ticket correspond à une participation au tirage unique.</li>
                <li>Participation implique acceptation des règles et CGU.</li>
              </ul>

              <h3 className="font-semibold mt-4">4. Modalités du tirage</h3>
              <ul className="list-disc list-inside">
                <li>Tirage aléatoire vérifiable sur blockchain.</li>
                <li>Date et heure annoncées à l’avance.</li>
                <li>Tickets après la date limite non valables.</li>
                <li>Résultats publiés sur blockchain et dans l’application sous 10 min.</li>
              </ul>

              <h3 className="font-semibold mt-4">5. Attribution des gains</h3>
              <ul className="list-disc list-inside">
                <li>Gagnants désignés par le smart contract.</li>
                <li>Prix : crypto locale ou bons d’achat numériques.</li>
                <li>Transfert automatique sur le wallet gagnant.</li>
                <li>Aucun gain échangé contre de l’argent liquide.</li>
              </ul>

              <h3 className="font-semibold mt-4">6. Validité et contrôle</h3>
              <p>
                La Mairie garantit transparence et traçabilité. Le tirage peut
                être audité par un tiers indépendant. En cas de bug, la Mairie
                peut annuler ou relancer le tirage.
              </p>

              <h3 className="font-semibold mt-4">7. Fiscalité et obligations légales</h3>
              <p>Les gains n’ont pas de valeur monétaire officielle et ne sont pas soumis à imposition.</p>

              <h3 className="font-semibold mt-4">8. Responsabilité</h3>
              <p>
                La Mairie décline toute responsabilité en cas de perte de clé
                privée, erreur de wallet ou indisponibilité du réseau. La
                participation est aux risques du joueur.
              </p>

              <h3 className="font-semibold mt-4">9. Réclamations</h3>
              <p>
                Toute réclamation doit être adressée dans un délai d’un mois : <br />
                Mairie d’Etherbay – Service Innovation Numérique <br />
                Email : Maire@etherbay.fr <br />
                Adresse : 1 rue de la Poste, 97000 Etherbay
              </p>

              <h3 className="font-semibold mt-4">10. Acceptation du règlement</h3>
              <p>
                La participation implique l’acceptation sans réserve du règlement,
                consultable à tout moment sur l’application ou sur le site officiel
                de la Mairie.
              </p>
            </section>
          )}

          {activeTab === "cgu" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Conditions Générales d’Utilisation (CGU)</h2>

              <h3 className="font-semibold mt-4">1. Objet</h3>
              <p>Les CGU régissent l’accès et l’utilisation de l’application EtherLuck, mise en œuvre par la Mairie de Etherbay.</p>

              <h3 className="font-semibold mt-4">2. Accès et conditions d’inscription</h3>
              <ul className="list-disc list-inside">
                <li>Réservée aux résidents majeurs de Etherbay.</li>
                <li>Création d’un wallet compatible nécessaire.</li>
                <li>Accès gratuit, participation nécessite un ticket en crypto locale.</li>
              </ul>

              <h3 className="font-semibold mt-4">3. Fonctionnement de la loterie</h3>
              <ul className="list-disc list-inside">
                <li>Tirage enregistré sur blockchain pour transparence.</li>
                <li>Règles publiées dans l’application.</li>
                <li>Gains en crypto locale ou bons d’achat.</li>
                <li>Aucune participation en argent liquide ou carte bancaire.</li>
              </ul>

              <h3 className="font-semibold mt-4">4. Nature expérimentale du service</h3>
              <p>
                Projet pilote encadré par la mairie, non un service de jeu commercial. Participation = acte citoyen, avec risques. Aide : 09-74-75-13-13.
              </p>

              <h3 className="font-semibold mt-4">5. Responsabilité</h3>
              <p>La Mairie et prestataires ne sont pas responsables des pertes de clés ou interruptions de service. L’utilisateur est responsable de ses identifiants et matériel.</p>

              <h3 className="font-semibold mt-4">6. Protection des données personnelles (RGPD)</h3>
              <p>
                Les données sont traitées selon le RGPD et ne sont pas revendue. L’utilisateur peut exercer ses droits via le DPO de la Mairie.
              </p>

              <h3 className="font-semibold mt-4">7. Propriété intellectuelle</h3>
              <p>Tout contenu appartient à la Mairie ou ses partenaires. Reproduction interdite sans autorisation.</p>

              <h3 className="font-semibold mt-4">8. Modification des CGU</h3>
              <p>La Mairie peut modifier les CGU à tout moment avec notification aux utilisateurs.</p>

              <h3 className="font-semibold mt-4">9. Loi applicable et juridiction</h3>
              <p>Droit français. Litiges devant tribunaux administratifs compétents de Etherbay.</p>

              <h3 className="font-semibold mt-4">10. Contact</h3>
              <p>
                Mairie de Etherbay – Service Innovation Numérique <br />
                Email : Maire@etherbay.fr <br />
                Adresse : 1 rue de la Poste, 97000 Etherbay
              </p>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
