import { BrowserProvider, Contract } from "ethers";
import contractAbi from "./abi.json"; // file ABI hasil compile
const CONTRACT_ADDRESS = "ALAMAT_KONTRAK_KAMU";

export const mintNFT = async (tokenURI) => {
  if (!window.ethereum) throw new Error("MetaMask tidak ditemukan");

  const provider = new BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();

  const contract = new Contract(CONTRACT_ADDRESS, contractAbi, signer);
  const tx = await contract.mintNFT(await signer.getAddress(), tokenURI);
  await tx.wait();
};