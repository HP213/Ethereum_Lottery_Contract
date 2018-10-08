# Ethereum_Lottery_Contract

So this is my very first actually ethereum project and this project will let you to understand the Blockchain in a good manner!

Firstly we need some ethereum coins, but wait a moment are we going to buy coins for this projects? **N0......** 

We will use a Ethereum test network called **Rinkbey Test Network** which will give us a feel of real Blockchain network.

![capture11](https://user-images.githubusercontent.com/34127674/46625375-63165e80-cb51-11e8-989c-1339f96e9e55.PNG)

Now install **Metamask** in your chrome or whatever browser you use and it's totally free! Link(Chrome):-https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en 

Once you installed it, just go and register yourself and make sure copy and paste the mnemonic safely because this will be used in future.

After all set now make sure move from **Main Ethereum Network** to **Rinkbey Test Network** as show below:
![capture3](https://user-images.githubusercontent.com/34127674/46625573-1d0dca80-cb52-11e8-88c1-f5e1a7d8fc6c.PNG)

Once all done you are nearly set, but hey we need some coins!!!. It's simple just open the given link: https://faucet.rinkeby.io/
Follow the steps there and while posting something they will ask you to add your public key so just go to your account in metamask and simply click on Account(public key) on the top there and it will copy on your clipboard.

All set! Now you have definitely sufficient ether to move on like this: 
![capture4](https://user-images.githubusercontent.com/34127674/46625756-cce33800-cb52-11e8-89ec-1265eb1ab622.PNG)

Now download all the files from above and go to deploy.js file and copy paste your mnenonic there which you earlier copied while making account on metamask.

Now go to this link :- https://infura.io/ and Register there and add required details. Then create new project there and add all the required details and it will provide you an API key, there will be option of ENDPOINT, just select rinkbey there and below provided a link or key start with rinkbey.infura.... just copy it and paste in deploy.js

Now all set!!!!. Just open terminal and run node deploy.js

At the end of 3-4 min. you will see a line like this deployed contract to 0x............... just copy it and paste in searh bar of https://rinkeby.etherscan.io/ and you will find your first contract deployed.
You can also use remix solidity a compiler for solidity to run this and test like a real.
