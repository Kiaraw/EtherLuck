MANUEL D’UTILISATION – Projet Lucky Lottery (Back-end + Front-end)

===========================================================
INTRODUCTION

Ce guide explique comment lancer entièrement le projet Lucky Lottery :
– Exécuter le réseau Hardhat local
– Déployer les deux contrats (Token + Lottery)
– Configurer MetaMask
– Lancer le front-end
– Réaliser les trois transactions d’un utilisateur (connexion, approve, enter)

Il est conçu pour être suivi étape par étape, même sans connaissance avancée en blockchain.

===========================================================
	1.	PRÉREQUIS À INSTALLER
===========================================================

	1.	Installer Node.js (version conseillée : 22)
→ https://nodejs.org/
	2.	Installer MetaMask (extension navigateur)
→ https://metamask.io/
	3.	Installer les dépendances du projet

Terminal 1 : dossier back-end
cd backendandfrontbasic/luckylottery
npm install

Terminal 2 : dossier front-end
cd backendandfrontbasic/lottery-frontend
npm install

===========================================================
2. LANCER LE RÉSEAU LOCAL HARDHAT

Dans un terminal :

cd backendandfrontbasic/luckylottery
npx hardhat node

Cela démarre un réseau local (localhost:8545) avec :
– 20 comptes générés automatiquement
– chacun ayant 10000 ETH fictifs
– leurs clés privées visibles dans la console

NE PAS FERMER CE TERMINAL.

===========================================================
3. DÉPLOYER LES CONTRATS (TOKEN + LOTTERY)

Ouvrir un deuxième terminal :

cd backendandfrontbasic/luckylottery
npx hardhat run deploy.cjs –network localhost

Ce script :
– déploie LuckToken
– déploie Lottery
– met automatiquement à jour lottery-frontend/src/constants.ts
(avec TOKEN_ADDRESS, LOTTERY_ADDRESS et l’ABI)

À ce stade le front-end peut communiquer avec les contrats.

===========================================================
4. CONFIGURATION DE METAMASK

⸻

A. Ajouter un nouveau réseau

Dans MetaMask → Réseaux → Add network manually

Network Name : Hardhat Local
RPC URL : http://127.0.0.1:8545
Chain ID : 31337
Currency Symbol : ETH

Enregistrer.

⸻

B. Importer un compte

Dans le terminal où tourne “npx hardhat node”, repérer :

Account #0: 0xf39F…
Private Key: 0xabc123…

Dans MetaMask :
– Account
– Import Account
– coller la private key

On peut importer plusieurs comptes pour tester plusieurs joueurs.

===========================================================
5. AJOUTER LE TOKEN LUCKTOKEN DANS METAMASK

Dans MetaMask → Import Token

Token address = contenu de TOKEN_ADDRESS dans constants.ts

MetaMask détecte :
Symbol: LCK
Decimals: 18

Cliquer sur “Add”.

===========================================================
6. LANCER LE FRONT-END

Dans un terminal :

cd backendandfrontbasic/lottery-frontend
npm run dev

Ouvrir :
http://localhost:3000

===========================================================
7. SCÉNARIO COMPLET : LES 3 ACTIONS UTILISATEUR

⸻

	1.	Connexion du wallet

⸻

Cliquer sur le bouton :

Connect Wallet

MetaMask propose la connexion → valider.

⸻

	2.	Autoriser la loterie à dépenser les tokens (APPROVE)

⸻

Cliquer sur :

💰 Autoriser la loterie

Cette action :
– appelle LuckToken.approve(lotteryAddress, ticketPrice)
– ouvre MetaMask
– l’utilisateur signe l’autorisation

Une alerte confirme le succès.

⸻

	3.	Entrer dans la loterie (ENTER)

⸻

Cliquer sur :

🎟️ Participer à la loterie

Cette action :
– appelle Lottery.enter()
– consomme 1 ticket (1 token)
– ajoute le joueur dans players[]
– augmente la round si un winner est tiré

===========================================================
8. TESTER AVEC PLUSIEURS COMPTES

Pour simuler plusieurs joueurs :
	1.	Importer un autre compte Hardhat dans MetaMask
	2.	Changer de compte dans MetaMask
	3.	Recharger le front
	4.	Faire approve + enter

===========================================================
9. COMMANDES UTILES POUR VÉRIFIER LE BACK-END

Dans un terminal :

npx hardhat console –network localhost

Exemples :

Voir les joueurs :
(await lottery.players(0))
(await lottery.players(1))

Voir round :
(await lottery.round()).toString()

Voir solde tokens d’un joueur :
(await token.balanceOf(“0xAdresse”)).toString()

Voir prix du ticket :
(await lottery.ticketPrice()).toString()

===========================================================
10. RÉSUMÉ DES COMMANDES IMPORTANTES

Lancer le réseau :
npx hardhat node

Déployer les contrats :
npx hardhat run deploy.cjs –network localhost

Lancer le front :
npm run dev

===========================================================
FIN DU MANUEL