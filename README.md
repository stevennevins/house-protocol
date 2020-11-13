## Quickstart - Overview

House Protocol is an open-source protocol build on Ethereum and Chainlink where anyone can participate and earn revenue by becoming a part of the House.  There are two ways to earn revenue with House Protocol:

1. Contribute liquidty to an HPool, which are ERC20 backed bankrolls, and earn a proportional share of the revenue generated by that bankroll.

2. Mint your own HDealer from the HDealerFactory and connect it to a front and earn revenue from the bets placed through your HDealer contract.


## Quickstart - Frontend

```bash 
git clone https://github.com/dmintercept/house-protocol.git 

cd house-protocol 
```
>You might want to use tmux to manage the active terminal windows
```bash

yarn install

```

> you might get node-gyp errors, ignore them and run:

```bash

yarn start

```

> in a second terminal window:

```bash

yarn chain

```

## Quickstart - Deploy your own

First you will need a buidler account to deploy from

```
yarn run generate
```

Once you have your deployer account you will need to get some Kovan Eth:https://faucet.kovan.network/

Once you have Kovan eth in your deployer account you are ready to deploy the contracts

Navigate to the scripts directory in the builder package: house-protocol/buidler/scripts

Edit the deploy script to deploy either part or all of the protocol.

If you want your own copy of the protocol to play around with you will need to add a line in the deploy script for each of the following:

LinkTokenInterface.sol
IERC20.sol
HDealerFactory.sol
HPoolFactory.sol
HDealer.sol
HPool.sol

The deploy script will compile, deploy, and publish the contract info into the react application
> in a third terminal window:

```bash

yarn deploy

```


> 
