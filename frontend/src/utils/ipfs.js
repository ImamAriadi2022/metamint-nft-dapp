import { Web3Storage } from 'web3.storage';

const token = process.env.STORAGE_TOKEN;
const client = new Web3Storage({ token });

export async function uploadToIPFS(file) {
  const metadata = {
    name: file.name,
    description: "NFT dari MetaMint",
    image: file.name,
  };

  const metadataBlob = new Blob([JSON.stringify(metadata)], {
    type: "application/json",
  });  

  console.log("Uploading to IPFS...");

  const files = [file, new File([metadataBlob], "metadata.json")];
  const cid = await client.put(files);
  return `https://${cid}.ipfs.w3s.link/metadata.json`;
}
