require('@nomiclabs/hardhat-ethers');
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};