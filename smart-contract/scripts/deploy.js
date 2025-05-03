const hre = require("hardhat");

async function main() {
  const MetaMint = await hre.ethers.getContractFactory("MetaMint");
  const metaMint = await MetaMint.deploy();
  await metaMint.deployed();
  console.log("MetaMint deployed to:", metaMint.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
