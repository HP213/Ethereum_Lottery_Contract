const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 =  new Web3(provider);
const {interface, bytecode} = require('../compile');


let accounts;
let inbox;

beforeEach(async () =>{
  //Get list of all the accounts
  accounts = await web3.eth.getAccounts();

  //use one of those accounts to deploy a contracts
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data : bytecode, arguments : ['Hi There!!!']})
    .send({from : accounts[0], gas : '1000000'});

    inbox.setProvider(provider);
});



//*******Test for that contract is deployed to some address and message is send to it or not!!!*****
// describe('Inbox', ()=>{
//   it('deploys a contract', ()=>{
//     assert.ok(inbox.options.address);
//     console.log(inbox.options.address);
//   });
// });


//******See if the the contract has a default message or not?*************
describe('Inbox', ()=>{
  it('deploys a contract', ()=>{
    assert.ok(inbox.options.address);
    console.log(inbox.options.address);
  });

  it('has a default message', async ()=>{
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi There!!!');
  });

  //Change the message and the task is also asynchronous
  it('can chaange the message', async() =>{
    await inbox.methods.setMessage('bye').send({ from : accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});








// class Car{
//   park(){
//     return 'stopped';
//   }
//
//   drive(){
//     return 'vroom';
//   }
// }
//
// let car;
//
// beforeEach(() =>{
//    car = new Car();
// });
//
// describe('Car', () =>{
//   it('can park', () =>{
//     assert.equal(car.park(), 'stopped');
//   });
//
//   it('can drive', () =>{
//     assert.equal(car.drive(), 'vroom');
//   });
// });
