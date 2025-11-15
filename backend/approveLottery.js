import pkg from "ethers";
const { ethers } = pkg;
import fs from "fs";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

// Clé privée du compte #0 Hardhat (le deployer)
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const signer = new ethers.Wallet(privateKey, provider);

// ⚠️ IMPORTANT: Mets à jour ces adresses après le déploiement
const TOKEN_ADDRESS = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1";
const LOTTERY_ADDRESS = "0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE";

// Lecture de l'ABI
const artifact = JSON.parse(
  fs.readFileSync("./artifacts/contracts/LuckToken.sol/LuckToken.json", "utf8")
);

// Instanciation du contrat
const token = new ethers.Contract(TOKEN_ADDRESS, artifact.abi, signer);

async function main() {
  try {
    console.log("🪙 Approbation du contrat Lottery pour dépenser tes tokens...");
    console.log(`   Token: ${TOKEN_ADDRESS}`);
    console.log(`   Lottery: ${LOTTERY_ADDRESS}`);
    console.log(`   Signer: ${signer.address}`);

    // Vérifier le solde avant
    const balance = await token.balanceOf(signer.address);
    console.log(`\n💰 Solde actuel: ${ethers.utils.formatEther(balance)} LKT`);

    // Autorise la loterie à dépenser 1000 tokens
    const amount = ethers.utils.parseEther("1000");
    console.log(`\n📤 Envoi de la transaction approve...`);
    
    const tx = await token.approve(LOTTERY_ADDRESS, amount);
    console.log(`   Transaction hash: ${tx.hash}`);
    
    await tx.wait();
    console.log("✅ Approbation réussie !");

    // Vérifier l'allowance
    const allowance = await token.allowance(signer.address, LOTTERY_ADDRESS);
    console.log(`\n✔️  Allowance accordée: ${ethers.utils.formatEther(allowance)} LKT`);
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
}

main();