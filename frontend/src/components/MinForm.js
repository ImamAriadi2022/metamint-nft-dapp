import React, { useState } from "react";
import { uploadToIPFS } from "../utils/ipfs";
import { mintNFT } from "../utils/contract";

const MintForm = () => {
  const [file, setFile] = useState(null);
  const [minting, setMinting] = useState(false);

  const handleMint = async () => {
    if (!file) return alert("Pilih file terlebih dahulu");

    setMinting(true);
    try {
      const metadataUrl = await uploadToIPFS(file);
      await mintNFT(metadataUrl);
      alert("NFT berhasil dimint!");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat minting");
    }
    setMinting(false);
  };

  return (
    <div className="container mt-5">
      <h3>Mint NFT</h3>
      <input
        type="file"
        className="form-control my-3"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button className="btn btn-primary" onClick={handleMint} disabled={minting}>
        {minting ? "Memproses..." : "Mint NFT"}
      </button>
    </div>
  );
};

export default MintForm;
