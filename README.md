## quickstart

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

> in a third terminal window:

```bash

yarn deploy

```
> Please change infura API keys eventually and don't use all my calls
```
🔏 Edit your smart contracts in `packages/buidler/contracts`

📝 Edit your frontend `App.jsx` in `packages/react-app/src`

📱 Open http://localhost:3000 to see the app
```
> You will also need kovan ETH and can get from a faucet with a github OAuth
