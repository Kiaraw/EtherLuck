// IMPORTS DIRECTS DES ARTIFACTS HARDHAT
import LotteryJson from "../../backend/artifacts/contracts/EtherLuckLottery.sol/Lottery.json";
import TokenJson from "../../backend/artifacts/contracts/LuckToken.sol/LuckToken.json";

// ADRESSES VÉRIFIÉES APRÈS DEPLOY HARDHAT
export const LOTTERY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ABIs RÉELLES (PAS DE COPIER/COLLER MANUEL)
export const LOTTERY_ABI = LotteryJson.abi;
export const TOKEN_ABI   = TokenJson.abi;
