import { readFileSync } from "fs";
import pkg from "ethers";
const { ethers } = pkg;

// ✅ Adresse de ton contrat Token (à mettre à jour après déploiement)
const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ACCOUNT = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; // compte #0 Hardhat

// ✅ Lecture de l'ABI depuis les artefacts compilés
const artifact = JSON.parse(
  readFileSync("./artifacts/contracts/LuckToken.sol/LuckToken.json", "utf8")
);

// ✅ Connexion au nœud local Hardhat (ethers v5)
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// ✅ Création de l'instance du contrat
const token = new ethers.Contract(TOKEN_ADDRESS, artifact.abi, provider);

// ✅ Lecture du solde
async function checkBalance() {
  try {
    const balance = await token.balanceOf(ACCOUNT);
    console.log(`💰 Balance du token pour ${ACCOUNT}:`);
    console.log(`   ${ethers.utils.formatEther(balance)} LKT`);
    
    const symbol = await token.symbol();
    const name = await token.name();
    console.log(`\n📋 Informations du token:`);
    console.log(`   Nom: ${name}`);
    console.log(`   Symbole: ${symbol}`);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

checkBalance();