const hre = require("hardhat");

async function main() {
  // Dapatkan kontrak MetaMint
  const MetaMint = await hre.ethers.getContractFactory("MetaMint");

  // Alamat pemilik awal
  const initialOwner = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"; // Ganti dengan alamat Anda

  // Deploy kontrak
  const metaMint = await MetaMint.deploy(initialOwner);
  console.log("Deploy transaction hash:", metaMint.deployTransaction.hash);

  // Tunggu hingga transaksi deploy selesai
  const receipt = await metaMint.deployTransaction.wait();
  console.log("MetaMint deployed to:", metaMint.address);
  console.log("Deployment receipt:", receipt);

  // Contoh mint NFT setelah deploy
  const recipient = initialOwner; // Ganti dengan alamat penerima
  const tokenURI = "https://example.com/nft1"; // Ganti dengan URI NFT
  const price = hre.ethers.parseEther("0.1"); // Harga NFT dalam ETH

  const mintTx = await metaMint.mintNFT(recipient, tokenURI, price);
  const mintReceipt = await mintTx.wait();

  console.log(`NFT minted to ${recipient} with tokenURI: ${tokenURI} and price: ${price.toString()} wei`);
  console.log("Mint transaction hash:", mintTx.hash);
  console.log("Mint receipt:", mintReceipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});