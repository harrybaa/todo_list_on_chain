// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Greeting = await ethers.getContractFactory("Greeting");
  const greeting = await Greeting.deploy();
  await greeting.deployed();

  console.log("Greeting address:", greeting.address);

  const TodoList = await ethers.getContractFactory("TodoList");
  const todoList = await TodoList.deploy();
  await todoList.deployed();

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();

  console.log("Token address:", token.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(greeting, todoList, token);
}

function saveFrontendFiles(greeting, todoList, token) {
  const fs = require("fs");
  const contractsDir = path.join(
    __dirname,
    "..",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ 
      Greeting: greeting.address,
      TodoList: todoList.address,
      Token: token.address,
    }, undefined, 2)
  );

  const GreetArtifact = artifacts.readArtifactSync("Greeting");
  const TodoListArtifact = artifacts.readArtifactSync("TodoList");
  const TokenArtifact = artifacts.readArtifactSync("Token");

  fs.writeFileSync(
    path.join(contractsDir, "Greeting.json"),
    JSON.stringify(GreetArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "TodoList.json"),
    JSON.stringify(TodoListArtifact, null, 2)
  );

  fs.writeFileSync(
    path.join(contractsDir, "Token.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
