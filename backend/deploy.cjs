// backend/deploy.cjs
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log(`🚀 Deploying with: ${deployer.address}`);

  // 1 — Token
  const LuckToken = await hre.ethers.getContractFactory("LuckToken");
  const token = await LuckToken.deploy(
    hre.ethers.utils.parseEther("1000000") // V5 FIX
  );
  await token.deployed();
  const TOKEN_ADDRESS = token.address;
  console.log(`✅ LuckToken deployed at: ${TOKEN_ADDRESS}`);

  // 2 — Lottery
  const Lottery = await hre.ethers.getContractFactory("Lottery");
  const lottery = await Lottery.deploy(
    TOKEN_ADDRESS,
    hre.ethers.utils.parseEther("1") // V5 FIX
  );
  await lottery.deployed();
  const LOTTERY_ADDRESS = lottery.address;
  console.log(`🎰 Lottery deployed at: ${LOTTERY_ADDRESS}`);

  // 3 — ABIs
  const lotteryArtifact = await hre.artifacts.readArtifact("Lottery");
  const tokenArtifact   = await hre.artifacts.readArtifact("LuckToken");

  // 4 — Write to front
  const FRONT_PATH = path.join(
    __dirname,
    "../frontend/src/constants.ts" // ⚠️ mets ton vrai chemin
  );

  const content = `
export const LOTTERY_ADDRESS = "${LOTTERY_ADDRESS}";
export const TOKEN_ADDRESS   = "${TOKEN_ADDRESS}";

export const LOTTERY_ABI = ${JSON.stringify(lotteryArtifact.abi, null, 2)} as const;
export const TOKEN_ABI   = ${JSON.stringify(tokenArtifact.abi, null, 2)} as const;
`;

  fs.writeFileSync(FRONT_PATH, content);
  console.log("📦 constants.ts updated successfully!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
