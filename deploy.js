const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
  ' ',// Add your own mnemonic here
  '' //rinkeby.infura.io paste that key here
);

let inbox;

const web3 = new Web3(provider);

const deploy = async() =>{
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy contract from account ', accounts[0] );

  const result = await new web3.eth.Contract(JSON.parse(interface))
            .deploy({ data: '0x' + bytecode })
            .send({ gas : '1000000', from : accounts[0]});
            console.log(result);

  // inbox = await new web3.eth.Contract(JSON.parse(interface))
  //      .deploy({data : bytecode, arguments : ['Hi There!!!']})
  //      .send({from : accounts[0], gas : '1000000'});


  result.setProvider(provider);
  console.log(interface);
  console.log('Contract deployed to ', result.options.address);
};
deploy();
