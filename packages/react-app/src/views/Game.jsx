import React, { useState } from "react";
import { List, Divider, Select } from "antd";
import { Address, CustomContract } from "../components";
import { useEventListener } from "../hooks";

export default function Game({ address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {
  //📟 Listen for broadcast events
  const dealerMinted = useEventListener(readContracts, "HDealerFactory", "DealerMinted", localProvider, 1);
  console.log("📟 Dealer Minted:", dealerMinted)
  const { Option } = Select;
  const [selected, setSelected] = useState(0);

  function onChange(value) {
    console.log(readContracts.HDealer.address);
    readContracts.HDealer.attach(value);
    console.log(readContracts.HDealer.address);
    console.log(writeContracts.HDealer.address);
    writeContracts.HDealer.attach(value);
    console.log(writeContracts.HDealer.address);
    setSelected(value);
    console.log(value);
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

  const blockExplorer = "https://etherscan.io/"

  return (
    <div>
      <Divider />
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select a Game Contract"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {dealerMinted.map(item => (
          <Option key={item[0]}>{item[0]}</Option>
        ))}
      </Select>
      <CustomContract
        name="HDealer"
        signer={userProvider.getSigner()}
        provider={localProvider}
        blockExplorer={blockExplorer}
        address={selected}
      />

      <Divider />
      <div style={{ width: 600, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
        <h2>Events:</h2>
        <List
          bordered
          dataSource={dealerMinted}
          renderItem={(item) => {
            return (
              <List.Item key={item.blockNumber + "_" + item.sender}>
                <Address
                  value={item[0]}
                  ensProvider={localProvider}
                  fontSize={16}
                /> =>
                {item[0]}
              </List.Item>
            )
          }}
        />
      </div>
      <CustomContract
        name="LinkTokenInterface"
        signer={userProvider.getSigner()}
        provider={localProvider}
        blockExplorer={blockExplorer}
        address='0xa36085F69e2889c224210F603D836748e7dC0088'
      />

    </div>
  );
}
