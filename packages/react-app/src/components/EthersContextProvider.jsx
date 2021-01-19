import React, { useState, useEffect } from "react";

import { EthersContext, House } from "../context";

export default function EthersContextProvider({ children }) {
  const [house, setHouse] = useState();
  useEffect(() => {
    if (true) {
      const chainId = 1;
      const houseLib = new House(1, 2, false, {
        defaultAccount: "address",
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: "6000000",
        defaultGasPrice: "1000000000000",
        accounts: [],
        ethereumNodeTimeout: 10000,
      });
      setHouse(houseLib);
    }
  }, ["ethereum"]);

  return <EthersContext.Provider value={house}>{children}</EthersContext.Provider>;
}
