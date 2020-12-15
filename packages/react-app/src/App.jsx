import React, { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import "./App.css";
import { Menu } from "antd";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useUserAddress } from "eth-hooks";
import { formatEther } from "@ethersproject/units";
import { useExchangePrice, useGasPrice, useUserProvider, useContractLoader, useBalance } from "./hooks";
import { Account, Contract } from "./components";
import { Transactor } from "./helpers";
import { Pool, Game, Play, Deal, Earn } from "./views";

import { INFURA_ID } from "./constants";

const DEBUG = true;

// 🔭 block explorer URL
const blockExplorer = "https://etherscan.io/"; // for xdai: "https://blockscout.com/poa/xdai/"

// 🛰 providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");
// const mainnetProvider = getDefaultProvider("mainnet", { infura: INFURA_ID, etherscan: ETHERSCAN_KEY, quorum: 1 });
// const mainnetProvider = new InfuraProvider("mainnet",INFURA_ID);
const mainnetProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
// ( ⚠️ Getting "failed to meet quorum" errors? Check your INFURA_ID)

// 🏠 Your local provider is usually pointed at your local blockchain
const localProviderUrl = "https://kovan.infura.io/v3/" + INFURA_ID; // for xdai: https://dai.poa.network
// as you deploy to other networks you can set REACT_APP_PROVIDER=https://dai.poa.network in packages/react-app/.env
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = new JsonRpcProvider(localProviderUrlFromEnv);

function App() {
  const [injectedProvider, setInjectedProvider] = useState();
  /* 💵 this hook will get the price of ETH from 🦄 Uniswap: */
  const price = useExchangePrice(mainnetProvider); // 1 for xdai

  /* 🔥 this hook will get the price of Gas from ⛽️ EtherGasStation */
  const gasPrice = useGasPrice("fast"); // 1000000000 for xdai

  // Use your injected provider from 🦊 Metamask or if you don't have it then instantly generate a 🔥 burner wallet.
  const userProvider = useUserProvider(injectedProvider, localProvider);
  const address = useUserAddress(userProvider);

  // The transactor wraps transactions and provides notificiations
  const tx = Transactor(userProvider, gasPrice);

  // 🏗 scaffold-eth is full of handy hooks like this one to get your balance:
  const yourLocalBalance = useBalance(localProvider, address);
  if (DEBUG) console.log("💵 yourLocalBalance", yourLocalBalance ? formatEther(yourLocalBalance) : "...");

  // just plug in different 🛰 providers to get your balance on different chains:
  const yourMainnetBalance = useBalance(mainnetProvider, address);
  if (DEBUG) console.log("💵 yourMainnetBalance", yourMainnetBalance ? formatEther(yourMainnetBalance) : "...");

  // Load in your local 📝 contract and read a value from it:
  const readContracts = useContractLoader(localProvider);
  if (DEBUG) console.log("📝 readContracts", readContracts);

  // If you want to make 🔐 write transactions to your contracts, use the userProvider:
  const writeContracts = useContractLoader(userProvider);
  if (DEBUG) console.log("🔐 writeContracts", writeContracts);

  /*
  Web3 modal helps us "connect" external wallets:
*/
  const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: INFURA_ID,
        },
      },
    },
  });

  const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };
  const loadWeb3Modal = useCallback(async () => {
    const provider = await web3Modal.connect();
    setInjectedProvider(new Web3Provider(provider));
  }, [setInjectedProvider]);

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal();
    }
  }, [loadWeb3Modal]);

  const [route, setRoute] = useState();
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div className="App">
      <BrowserRouter>
        <Menu selectedKeys={[route]} mode="horizontal">
          <Menu.Item key="/Play">
            <Link
              onClick={() => {
                setRoute("/Play");
              }}
              to="/Play"
            >
              Play
            </Link>
          </Menu.Item>
          <Menu.Item key="/Deal">
            <Link
              onClick={() => {
                setRoute("/Deal");
              }}
              to="/Deal"
            >
              Deal
            </Link>
          </Menu.Item>
          <Menu.Item key="/Earn">
            <Link
              onClick={() => {
                setRoute("/Earn");
              }}
              to="/Earn"
            >
              Earn
            </Link>
          </Menu.Item>

          <Menu.SubMenu title="Testing-UI">
            <Menu.Item key="/Factory">
              <Link
                onClick={() => {
                  setRoute("/Factory");
                }}
                to="/Factory"
              >
                Factory Page
              </Link>
            </Menu.Item>
            <Menu.Item key="/LP">
              <Link
                onClick={() => {
                  setRoute("/LP");
                }}
                to="/LP"
              >
                LP Page
              </Link>
            </Menu.Item>
            <Menu.Item key="/Game">
              <Link
                onClick={() => {
                  setRoute("/Game");
                }}
                to="/Game"
              >
                Game
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
        <Switch>
          <Route exact path="/">
            <Play
              address={address}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              yourLocalBalance={yourLocalBalance}
              price={price}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
          </Route>
          <Route exact path="/Play">
            <Play
              address={address}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
          </Route>
          <Route exact path="/Deal">
            <Deal
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              price={price}
              tx={tx}
              readContracts={readContracts}
            />
          </Route>
          <Route exact path="/Earn">
            <Earn
              address={address}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              price={price}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
          </Route>

          <Route exact path="/Factory">
            <Contract
              name="HPoolFactory"
              signer={userProvider.getSigner()}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
            />
            <Contract
              name="HDealerFactory"
              signer={userProvider.getSigner()}
              provider={localProvider}
              address={address}
              blockExplorer={blockExplorer}
            />
          </Route>
          <Route path="/LP">
            <Pool
              mainnetProvider={mainnetProvider}
              userProvider={userProvider}
              localProvider={localProvider}
              readContracts={readContracts}
            />
          </Route>
          <Route path="/Game">
            <Game
              userProvider={userProvider}
              localProvider={localProvider}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
          </Route>
        </Switch>
      </BrowserRouter>

      {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
      <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 0 }}>
        <Account
          address={address}
          localProvider={localProvider}
          userProvider={userProvider}
          mainnetProvider={mainnetProvider}
          price={price}
          web3Modal={web3Modal}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
          blockExplorer={blockExplorer}
        />
      </div>
    </div>
  );
}

export default App;
