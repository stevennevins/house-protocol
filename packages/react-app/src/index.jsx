import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { EthersContextProvider } from "./components";
import "./index.css";
import App from "./App";

// This is the official Uniswap v1 subgraph. You can replace it with your own, if you need to.
// See all subgraphs: https://thegraph.com/explorer/
const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
});

ReactDOM.render(
  // <EthersContextProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
  // </EthersContextProvider>,
  document.getElementById("root"),
);
