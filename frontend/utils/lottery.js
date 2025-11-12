import { ethers } from "ethers";
import abi from "./abi.json";

const contractAddress = "ADRESSE_DEPLOYEE"; // à remplir après déploiement

export const getLotteryContract = () => {
    if (!window.ethereum) throw new Error("MetaMask non détecté");
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, abi, signer);
};
