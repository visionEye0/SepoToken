import { useEffect, useState } from "react";
import { ethers } from "ethers";
import FaucetABI from "./contractABIs/Faucet.json"; // ABI from Hardhat artifacts
import TokenABI from "./contractABIs/SepoToken.json";

const FAUCET_ADDRESS = process.env.REACT_APP_FAUCET_ADDRESS;
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;

function App() {
  const [account, setAccount] = useState("");

  const connectWallet = async () => {
    const [acc] = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(acc);
  };

  const requestTokens = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const faucet = new ethers.Contract(FAUCET_ADDRESS, FaucetABI, signer);
    await faucet.requestTokens();
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
