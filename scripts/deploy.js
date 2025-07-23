const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  // Deploy SepoToken contract
  const Token = await ethers.getContractFactory("SepoToken");
  const token = await Token.deploy(ethers.parseEther("1000000")); // 1 million tokens
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  // Deploy Faucet contract
  const Faucet = await ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(tokenAddress);
  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();
  console.log("Faucet deployed to:", faucetAddress);

  // Transfer tokens to the faucet
  const transferTx = await token.transfer(faucetAddress, ethers.parseEther("100000"));
  await transferTx.wait();
  console.log("100,000 tokens transferred to the Faucet.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
