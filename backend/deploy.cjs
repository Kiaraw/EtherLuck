// backend/deploy.cjs
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`🚀 Deploying with: ${deployer.address}`);

  // 1️⃣ Déploiement du token
  const initialSupply = ethers.utils.parseEther("1000000");
  const LuckToken = await ethers.getContractFactory("LuckToken");
  const token = await LuckToken.deploy(initialSupply);
  await token.deployed();
  console.log(`✅ LuckToken deployed at: ${token.address}`);

  // 2️⃣ Déploiement de la loterie (2 arguments obligatoires)
  const Lottery = await ethers.getContractFactory("EtherLuckLottery");


  const lottery = await Lottery.deploy(
    token.address,                     // 1️⃣ address du token
    ethers.utils.parseEther("1")       // 2️⃣ prix du ticket en ELK
  );
  await lottery.deployed();
  console.log(`🎰 Lottery deployed at: ${lottery.address}`);

  // 3️⃣ Mise à jour du front
  const content = `
export const TOKEN_ADDRESS = "${token.address}";
export const LOTTERY_ADDRESS = "${lottery.address}";

export const LOTTERY_ABI = ${Lottery.interface.format(
    ethers.utils.FormatTypes.json
  )};
export const TOKEN_ABI = ${LuckToken.interface.format(
    ethers.utils.FormatTypes.json
  )};
`;

  fs.writeFileSync("../frontend/src/constants.ts", content);
  console.log("💾 ABI + addresses updated");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
