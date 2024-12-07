const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { abi, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'siege flee clog exile body nice diesel guitar latin tomato bone rent',
  'https://sepolia.infura.io/v3/70855f468b9c4a22a2ef023b841d7cec' // Update with your Infura endpoint
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const inbox = await new web3.eth.Contract(abi) // Use 'abi' here
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gasPrice: '8000000000', gas: '4700000' });

  console.log('Contract deployed to', inbox.options.address);

  provider.engine.stop();
};

deploy();
