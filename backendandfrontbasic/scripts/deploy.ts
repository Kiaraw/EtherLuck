import { createWalletClient, http, parseEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { hardhat } from "viem/chains";
import { waitForTransactionReceipt } from "viem/actions";
import hre from "hardhat";

// --- 1️⃣ Compte de déploiement Hardhat (clé privée par défaut) ---
const privateKey =
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
const account = privateKeyToAccount(privateKey);

// --- 2️⃣ Client connecté au nœud local Hardhat ---
const client = createWalletClient({
  account,
  chain: hardhat,
  transport: http("http://127.0.0.1:8545"),
});

async function main() {
  console.log("🚀 Déploiement via Viem direct…");

  // --- 3️⃣ Lecture des artefacts compilés ---
  const artifactToken = await hre.artifacts.readArtifact("LuckToken");
  const artifactLottery = await hre.artifacts.readArtifact("Lottery");

  // --- 4️⃣ Déploiement du Token ---
  console.log("📦 Déploiement de LuckToken...");
  const tokenHash = await client.deployContract({
    abi: artifactToken.abi,
    bytecode: artifactToken.bytecode as `0x${string}`,
    args: [1000n],
  });

  // Attente de confirmation de la transaction
  const tokenTx = await waitForTransactionReceipt(client, { hash: tokenHash });
  const tokenAddress = tokenTx.contractAddress!;
  console.log("✅ LuckToken déployé à :", tokenAddress);

  // --- 5️⃣ Déploiement de la Loterie ---
  console.log("🎰 Déploiement de Lottery...");
  const lotteryHash = await client.deployContract({
    abi: artifactLottery.abi,
    bytecode: artifactLottery.bytecode as `0x${string}`,
    args: [tokenAddress, parseEther("1")],
  });

  const lotteryTx = await waitForTransactionReceipt(client, { hash: lotteryHash });
  const lotteryAddress = lotteryTx.contractAddress!;
  console.log("✅ Lottery déployée à :", lotteryAddress);

  console.log("\n🎉 Déploiement terminé avec succès !");
}

main().catch((err) => {
  console.error("❌ Erreur pendant le déploiement :", err);
  process.exitCode = 1;
});