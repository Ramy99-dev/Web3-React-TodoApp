## Simple ToDo App Web3 Application with Ethereum Blockchain

This is a simple ToDo app web3 application using Ethereum blockchain, Solidity for creating smart contracts, and ReactJS for the frontend.

### Requirements:
- **Ganache:** Ganache provides a personal Ethereum blockchain for development purposes. It allows you to create a private Ethereum blockchain for testing your applications. Ganache also offers features like quick mining, account management, and transaction simulation.
- **Truffle:** Truffle is a development environment, testing framework, and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier. It offers tools for smart contract compilation, testing, deployment, and management.
- **MetaMask Extension:** MetaMask is a browser extension that serves as an Ethereum wallet and allows you to interact with the Ethereum blockchain. It enables users to run Ethereum dApps right in their browser without running a full Ethereum node.

### Steps:

1. **Start Ganache**: Launch Ganache to set up a local Ethereum blockchain environment. Ganache provides you with a set of test accounts, each loaded with test Ether, allowing you to deploy and interact with smart contracts.

2. **Initiate Truffle Project**: Begin by creating a new Truffle project with the command `truffle init`. Truffle will generate the basic project structure for you, including directories for contracts, migrations, and tests.

3. **Create Smart Contract**: Write your smart contract using Solidity. Solidity is a high-level programming language used for implementing smart contracts on the Ethereum platform. Define your ToDo list functionalities within the smart contract.

4. **Compile Contract**: Compile your Solidity smart contract using `truffle compile`. This step translates your human-readable Solidity code into bytecode that can be executed on the Ethereum Virtual Machine (EVM). Truffle will generate a migration folder containing JSON files with the ABI (Application Binary Interface) of your contracts.

5. **Configure ReactJS**: In the ReactJS project, integrate the smart contract ABI into your frontend application. This allows your frontend to interact with the smart contract deployed on the Ethereum blockchain. You can find the ABI in the generated JSON files within the migration folder. Additionally, obtain the Smart Contract address, which is outputted by the `truffle compile` command.

6. **Install Dependencies**: Install dependencies for the ReactJS project using `npm install`. One of the dependencies used is Web3JS, which provides a JavaScript library for interacting with the Ethereum blockchain. Web3JS allows your frontend to communicate with the Ethereum network and send transactions to your smart contract.

7. **Start React App**: After installing dependencies, start the React app with `npm start` command. This will launch your ToDo application, allowing users to interact with the smart contract functionalities through the frontend interface.


### Demo

![](https://github.com/Ramy99-dev/Web3-React-TodoApp/blob/master/media/demo.gif)
