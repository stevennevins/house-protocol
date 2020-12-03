## Quickstart - Overview

House Protocol is a peer-to-pool protocol built on Ethereum and Chainlink.  House protocol has 3 types of participants: Players, Dealers (HDealer), and Bankroll Liquidity Providers (HPools & HTokens).  Players place bets with ERC20 tokens against HPool holding that ERC20 as collateral using an HDealer to route the bet to the appropriate HPool. The HDealer that routes the bet shares the House edge 50:50 with the HPool that receives the bet commitment.  Interest accumulates in real-time as bets are placed and interest on deposited collateral is tracked via HTokens, which track the owner's share of the collateral in the HPool.

Big picture ideas:

1. Imagine a casino accepting any ERC20 as a bet

2. All dealers share the same bankrolls and mutually benefit from their growth

3. Anyone who can capture a niche of player experience can deploy an HDealer from the HDealerFactory and earn revenue without having to take on the risk of raising and securing a bankroll

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

1. Play
    - Get link from [faucet](https://kovan.chain.link/) 
    - Get Kovan Eth from a [faucet](https://faucet.kovan.network/)
    - Get wBTC on Kovan from Compound [faucet](https://app.compound.finance/)
    - Approve the HDealer as a spender of Link
    - Approve the HPool as spender of the ERC20 token
    - Place a bet greater than 10000 wei (this is for precision)
    - Edge is deducted from winning bets and given to HPool and HDealer (Can be 0)

2. Deal
    - Deploy your own HDealer
    - Fork frontend and modify to capture your player niche
    - Earn 50% of the edge on bets that flow through your HDealer

 3. Earn
    - Approve HPool as spender of collateral
    - Swap in an out of the pool
    - Earn your share of 50% of the edge that flow through the HPool

## Quickstart - Deploy your own

First you will need a buidler account to deploy from

```
yarn run generate

```

Once you have your deployer account you will need to get some Kovan Eth : https://faucet.kovan.network/

Once you have Kovan eth in your deployer account you are ready to deploy the contracts

Navigate to the scripts directory in the builder package:

```bash

house-protocol/buidler/scripts

```

Edit the deploy script to deploy either part or all of the protocol.

If you want your own copy of the protocol to play around with you will need to add a line in the deploy script for each of the following:

- HDealerFactory.sol
- HPoolFactory.sol
- HDealer.sol
- HPool.sol

The deploy script will compile, deploy, and publish the contract info into the react application

> in a third terminal window:

```bash

yarn deploy

```


> 
