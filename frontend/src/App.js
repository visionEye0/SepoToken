import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import FaucetABI from "./contractABIs/Faucet.json";
import TokenABI from "./contractABIs/SepoToken.json";

const FAUCET_ADDRESS = process.env.REACT_APP_FAUCET_ADDRESS;
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;

function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  };

  const requestTokens = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
      return;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const faucet = new Contract(FAUCET_ADDRESS, FaucetABI, signer);

    try {
      const tx = await faucet.requestTokens();
      await tx.wait();
      alert("✅ Tokens requested successfully!");
    } catch (error) {
      console.error(error);
      alert("❌ Transaction failed: " + (error.message || "Unknown error"));
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🚰 SepoToken Faucet</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <>
          <p>Wallet: {account}</p>
          <button onClick={requestTokens}>Request 100 SPT</button>
        </>
      )}
    </div>
  );
}

export default App;
