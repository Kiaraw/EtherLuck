// deploy.cjs
const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`🚀 Deploying contracts with: ${deployer.address}`);

  // 1️⃣ Déploiement du token
  const initialSupply = ethers.utils.parseEther("1000000"); // 1 million de tokens
  const LuckToken = await ethers.getContractFactory("LuckToken");
  const luckToken = await LuckToken.deploy(initialSupply);
  await luckToken.deployed();
  console.log(`✅ LuckToken deployed to: ${luckToken.address}`);

  // 2️⃣ Déploiement de la loterie
  const Lottery = await ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(
    luckToken.address,
    ethers.utils.parseEther("1")
  );
  await lottery.deployed();
  console.log(`🎲 Lottery deployed to: ${lottery.address}`);

  // 3️⃣ Récupération de l'ABI au BON format (objet JSON propre)
  const abiJsonString = Lottery.interface.format(ethers.utils.FormatTypes.json);
  const abiArray = JSON.parse(abiJsonString); // Convertit la string JSON → tableau JS

  // 4️⃣ Mise à jour automatique du front (constants.ts)
  const content = `export const LOTTERY_ADDRESS = "${lottery.address}";
export const TOKEN_ADDRESS = "${luckToken.address}";

export const LOTTERY_ABI = ${JSON.stringify(abiArray, null, 2)} as const;
`;

  fs.writeFileSync("./lottery-frontend/src/constants.ts", content);

  console.log("💾 Adresses et ABI mises à jour dans lottery-frontend/src/constants.ts");
  console.log("\n📜 Déploiement terminé avec succès !");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});