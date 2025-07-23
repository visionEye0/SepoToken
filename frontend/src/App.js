import { useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import FaucetABI from "./contractABIs/Faucet.json";
import TokenABI from "./contractABIs/SepoToken.json";
import './App.css';

const FAUCET_ADDRESS = process.env.REACT_APP_FAUCET_ADDRESS;
const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS;

function App() {
  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Install MetaMask!");

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      console.error(err);
      alert("Connection failed.");
    }
  };

  const requestTokens = async () => {
    if (!window.ethereum) return alert("MetaMask not detected.");

    setLoading(true);
    setStatus("Requesting tokens...");

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const faucet = new Contract(FAUCET_ADDRESS, FaucetABI.abi, signer);

      const tx = await faucet.requestTokens();
      await tx.wait();
      setStatus("✅ 100 SPT sent to your wallet!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Transaction failed.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">🚰 SepoToken Faucet</h1>

      {!account ? (
        <button className="button" onClick={connectWallet}>
          Connect Wallet
        </button>
      ) : (
        <>
          <p className="address">Connected: {account.slice(0, 6)}...{account.slice(-4)}</p>
          <button className="button" onClick={requestTokens} disabled={loading}>
            {loading ? "Requesting..." : "Request 100 SPT"}
          </button>
          {status && <p className="status">{status}</p>}
        </>
      )}
    </div>
  );
}

export default App;
