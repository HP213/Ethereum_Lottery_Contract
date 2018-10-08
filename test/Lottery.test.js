const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 =  new Web3(provider);
const {interface, bytecode} = require('../compile');

let accounts;
let lottery;

beforeEach(async () =>{
  //Get list of all the accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy a contracts
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode})
    .send({from : accounts[0], gas : '1000000'});

    lottery.setProvider(provider);
});

//*******Test for that contract is deployed to some address and message is send to it or not!!!*****
describe('Lottery Contrat', ()=>{
  it('deploys a contract', ()=>{
    assert.ok(lottery.options.address);
    console.log(lottery.options.address);
  });

  it('allows one account to enter', async()=>{
    await lottery.methods.enter().send({
        from : accounts[0],
        value : web3.utils.toWei('0.002', 'ether')
    });

  const players = await lottery.methods.getPlayers().call({
    from : accounts[0]
  });

  assert.equal(accounts[0], players[0]);
  assert.equal(1, players.length);
  });

  it('allows multiple accounts to enter', async()=>{
    await lottery.methods.enter().send({
        from : accounts[0],
        value : web3.utils.toWei('0.002', 'ether')
    });
    await lottery.methods.enter().send({
        from : accounts[1],
        value : web3.utils.toWei('0.002', 'ether')
    });
    await lottery.methods.enter().send({
        from : accounts[2],
        value : web3.utils.toWei('0.002', 'ether')
    });

  const players = await lottery.methods.getPlayers().call({
    from : accounts[0]
  });

  assert.equal(accounts[0], players[0]);
  assert.equal(accounts[1], players[1]);
  assert.equal(accounts[2], players[2]);
  assert.equal(3, players.length);
  });

  it('requires a minimum amount of ether to perform test', async()=>{
    try{
      await lottery.methods.enter().send({
        from : account[0],
        value : 2
      });
      // assert(false);
    }
    catch(err){
      assert(err);
    }
  });

  it('only manager can pick winner', async()=>{
    try{
      await lottery.methods.pickWinner().send({
        from : account[1]
      });
      assert(false);
    }
    catch(err){
      assert(err);
    }
  })

  it('send money to  winner and reset he player array', async()=>{
    await lottery.methods.enter().send({
      from : accounts[0],
      value : web3.utils.toWei('1', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    await lottery.methods.pickWinner().send({from : accounts[0]});
    const finalBalance = await web3.eth.getBalance(accounts[0]);

    console.log('initialBalance = ', initialBalance);
    console.log('finalBalance = ', finalBalance);
    console.log(finalBalance - initialBalance);

  })
});
