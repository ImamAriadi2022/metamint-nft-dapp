// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MetaMint is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    // Struktur untuk menyimpan informasi NFT
    struct NFT {
        uint256 tokenId;
        string tokenURI;
        uint256 price; // Harga NFT
        address owner; // Pemilik NFT
    }

    // Mapping tokenId ke NFT
    mapping(uint256 => NFT) public nfts;

    constructor(address initialOwner) ERC721("MetaMint", "MMT") Ownable(initialOwner) {
        tokenCounter = 0;
    }

    // Fungsi untuk mint NFT dengan harga
    function mintNFT(address recipient, string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        // Tambahkan NFT ke mapping
        nfts[newItemId] = NFT(newItemId, tokenURI, price, recipient);

        tokenCounter++;
        return newItemId;
    }

    // Fungsi untuk membeli NFT
    function buyNFT(uint256 tokenId) public payable {
        NFT storage nft = nfts[tokenId];

        require(msg.value >= nft.price, "Harga tidak mencukupi");
        require(nft.owner != address(0), "NFT tidak ditemukan");
        require(nft.owner != msg.sender, "Anda sudah memiliki NFT ini");

        // Transfer ETH ke pemilik sebelumnya
        payable(nft.owner).transfer(msg.value);

        // Transfer kepemilikan NFT
        _transfer(nft.owner, msg.sender, tokenId);

        // Perbarui pemilik NFT
        nft.owner = msg.sender;
    }

    // Fungsi untuk mendapatkan semua NFT yang sudah di-mint
    function getAllNFTs() public view returns (NFT[] memory) {
        NFT[] memory allNFTs = new NFT[](tokenCounter);
        for (uint256 i = 0; i < tokenCounter; i++) {
            allNFTs[i] = nfts[i];
        }
        return allNFTs;
    }
}