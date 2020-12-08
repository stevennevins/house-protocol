import React, { useState } from "react";
import { List, Divider, Select } from "antd";
import { Address, CustomContract } from "../components";
import { useEventListener } from "../hooks";

export default function Pool({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {

  //📟 Listen for broadcast events
  const PoolMinted = useEventListener(readContracts, "HPoolFactory", "PoolMinted", localProvider, 1);
  console.log("📟 Pool Minted:", PoolMinted)
  const { Option } = Select;
  const [selected, setSelected] = useState(0);

  const erc20 = PoolMinted.filter(event => event[0] == selected)[0] || { 0: '', 1: '' };
  console.log('logging erc20');
  console.log(erc20);
  function onChange(value) {
    console.log('logging pool change');
    console.log(value);
    setSelected(value);
  }

  function onBlur() {
    console.log('blur');
  }

  function onFocus() {
    console.log('focus');
  }

  function onSearch(val) {
    console.log('search:', val);
  }
  /*
  const addressFromENS = useResolveName(mainnetProvider, "austingriffith.eth");
  console.log("🏷 Resolved austingriffith.eth as:",addressFromENS)
  */
  const blockExplorer = "https://etherscan.io/"

  return (
    <div>
      <Divider />
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Selected a Liquidity Pool"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {PoolMinted.map(item => (
          <Option key={item[0]} value={item[0]}>{item[0]}</Option>
        ))}
      </Select>
      {/*
⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
*/}
      <CustomContract
        name="HPool"
        address={selected}
        signer={userProvider.getSigner()}
        provider={localProvider}
        blockExplorer={blockExplorer}
      />

      <Divider />
      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        <h2>Events:</h2>
        <List
          bordered
          dataSource={PoolMinted}
          renderItem={(item) => {
            return (
              <List.Item key={item.blockNumber + "_" + item.sender}>
                <Address
                  value={item[0]}
                  ensProvider={mainnetProvider}
                  fontSize={16}
                /> =>
                {item[1]}
              </List.Item>
            )
          }}
        />
      </div>
      <CustomContract
        name="IERC20"
        signer={userProvider.getSigner()}
        provider={localProvider}
        blockExplorer={blockExplorer}
        address={erc20[1]}
      />

    </div>
  );
}
