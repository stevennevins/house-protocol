import React, { useState } from "react";
import { useTokenBalance } from "eth-hooks";

/*
  <Balance
    contract = {erc20Address}
    address={account}
    provider={props.provider}
    dollarMultiplier={props.price}
  />
*/

export default function E20Balance({ address, contract, provider }) {
  const [dollarMode, setDollarMode] = useState(true);
  console.log("address:", address);
  console.log("contract:", contract);
  const balance = useTokenBalance(contract, address, provider);

  return (
    <span
      style={{
        verticalAlign: "middle",
        fontSize: 24,
        padding: 8,
        cursor: "pointer",
      }}
      onClick={() => {
        setDollarMode(!dollarMode);
      }}
    >
      {parseFloat(balance)}
    </span>
  );
}
