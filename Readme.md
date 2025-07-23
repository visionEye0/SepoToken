# 🚰 SepoToken – ERC20 Token + Faucet dApp

Welcome to **SepoToken**, a full-stack blockchain project demonstrating core smart contract development and frontend integration. Built with Solidity, Hardhat, and React, this dApp features an ERC20 token and a connected faucet system on the Sepolia testnet.

🔗 Live Demo: [sepo-token.vercel.app/](https://sepo-token.vercel.app/)
🔗 Repo: [github.com/visionEye0/SepoToken](https://github.com/visionEye0/SepoToken)

---

## ✨ Features

- 🪙 **ERC20 Token** (`SepoToken`) compliant with OpenZeppelin standards
- 🚰 **Faucet Contract** to allow users to request 100 tokens at a time
- 🧪 **Hardhat** for local development, testing, and deployment
- 🖼️ **React Frontend** to interact with the faucet (connect wallet, request tokens)
- 🌐 Deployed on the **Sepolia Testnet**

---


## 🧱 Project Structure

```
SepoToken/
├── contracts/ # Solidity smart contracts
│ ├── Faucet.sol
│ └── Token.sol
├── scripts/ # Deployment script
│ └── deploy.js
├── frontend/ # React frontend app
│ ├── public/
│ ├── src/
│ └── package.json
├── artifacts/ # Compiled contract artifacts (auto-generated)
├── cache/ # Build cache (auto-generated)
├── hardhat.config.js # Hardhat configuration
├── package.json # Node dependencies for Hardhat
└── README.md # You're here!
```
---

## ⚙️ Deployment (Sepolia)

```
npx hardhat run scripts/deploy.js --network sepolia

```

Make sure you have the following environment variables set in your .env file:

```
SEPOLIA_RPC_URL=your_infura_or_alchemy_rpc_url
SEPOLIA_WALLET_PRIVATE_KEY=your_private_key

```

## 💻 Frontend Usage

The frontend is built in React and interacts with the deployed faucet contract using ethers.js.

### 📦 Install Frontend Dependencies

```
cd frontend
npm install


```

### 🧪 Run Locally

```
npm start
```

## 🌐 Deploy (e.g., via Vercel)

You can deploy just the frontend/ folder with Vercel or Netlify. Make sure to add your environment variables:

```
REACT_APP_FAUCET_ADDRESS=0xYourFaucetAddress
REACT_APP_TOKEN_ADDRESS=0xYourTokenAddress


```

## 🙋‍♂️ Author

Built by [@visionEye0](https://github.com/visionEye0)
Feel free to fork, star, or contribute!