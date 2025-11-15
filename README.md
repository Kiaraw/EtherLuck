# **EtherLuck**

Plateforme décentralisée de loterie fonctionnant avec un smart contract Ethereum (réseau local Hardhat).
Les utilisateurs achètent des tickets via MetaMask, payent en tokens ELK, et un gagnant est automatiquement tiré au sort lorsque la limite de tickets est atteinte.

[GitHub](https://github.com/Kiaraw/EtherLuck.git)

---

## **Table des Matières**

* [Prérequis](#prérequis)
* [Installation](#installation)
  * [Installation frontend](#installation-frontend)
  * [Installation backend](#installation-backend)
* [Fonctionnalités](#fonctionnalités)
* [Lancement de l’application](#lancement-de-lapplication)
  * [1. Démarrer Hardhat](#1-démarrer-hardhat)
  * [2. Déployer les smart contracts](#2-déployer-les-smart-contracts)
  * [3. Démarrer le frontend](#3-démarrer-le-frontend)
* [Structure du projet](#structure-du-projet)
* [Contributeurs](#contributeurs)

---

## **Prérequis**

Avant de commencer, installez :

* **Node.js (version LTS recommandée)**
* **pnpm**
* Extension Google **MetaMask**
* **VS Code** avec :

  * Extension **Solidity**

---

## **Installation**

### **Installation frontend**

```bash
cd frontend
pnpm install
```

### **Installation backend**

```bash
cd backend
npm install
npx hardhat compile
```

---

## **Fonctionnalités**

### Achat de tickets

* Connexion utilisateur via MetaMask
* Paiement en tokens ELK (ERC20)
* Calcul dynamique du nombre total de tickets

### Loterie automatique

* Tirage du gagnant dès que la limite de tickets est atteinte
* Pop-up d’annonce du gagnant

### Suivi en temps réel

* Tickets restants
* Tickets achetés par le wallet connecté
* Activité récente 


---

## **Lancement de l’application**

### **1. Démarrer Hardhat**

```bash
cd backend
npx hardhat node
```

---

### **2. Déployer les smart contracts**

```bash
npx hardhat run deploy.cjs --network localhost
```

Ce script va automatiquement :

* Déployer `LuckToken`
* Déployer `EtherLuckLottery`
* Mettre à jour `frontend/src/constants.ts` (adresses + ABI)

---

### **3. Démarrer le frontend**

```bash
cd frontend
pnpm dev
```

Accéder ensuite à :

[http://localhost:3000/](http://localhost:3000/)

### **Configuration MetaMask requise :**

```
Réseau : Hardhat Localhost
RPC : http://127.0.0.1:8545
Chain ID : 31337
```
**Importer un compte Hardhat :**

Copier une clé privée affichée dans la console du npx hardhat node

L’importer dans MetaMask → “Importer un compte”

MetaMask sera ainsi connecté sur le même réseau que le backend.

---

## **Structure du projet**

```
EtherLuck/
├── backend/
│   ├── contracts/
│   │   ├── LuckToken.sol
│   │   └── EtherLuckLottery.sol
│   ├── scripts/deploy.cjs
│   └── hardhat.config.js
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Page d'accueil
│   │   ├── participation/page.tsx   # Achat des tickets
│   │   └── cagnotte/page.tsx        # Suivi
│   ├── src/constants.ts
│   └── components/ui/
│
└── README.md
```

---

## **Contributeurs**

* [Alix Orfeuvre](https://github.com/AlixOrf)
* [Kiara Wurtz](https://github.com/Kiaraw)
* [Esteban Videra Dumont](https://github.com/Esteban-13)
* [Awab Maaloum](https://github.com/awab26)
* [Vigile Gain](https://github.com/VirgileGain)
