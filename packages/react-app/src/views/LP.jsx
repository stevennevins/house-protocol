import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin, Select} from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, AddressInput, Balance, CustomContract} from "../components";
import { useContractReader, useEventListener, useResolveName, useCustomContractLoader } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

export default function Pool({address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {

  //📟 Listen for broadcast events
  const PoolMinted = useEventListener(readContracts, "HPoolFactory", "PoolMinted", localProvider, 1);
  console.log("📟 Pool Minted:",PoolMinted)
  const { Option } = Select;
  const [selected, setSelected] = useState(0);
 
function onChange(value) {
        readContracts.HPool.attach(value);
        writeContracts.HPool.attach(value);
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
            <Divider/>
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
                    {PoolMinted.map(item=>(
                            <Option key={item[0]}>{item[0]}</Option>
                    ))}
  </Select>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
<CustomContract
              name="HPool"
              address = {selected} 
              signer={userProvider.getSigner()}
              provider={localProvider}
              blockExplorer={blockExplorer}
            />

        <Divider/>
      <div style={{ width:600, margin: "auto", marginTop:32, paddingBottom:32 }}>
        <h2>Events:</h2>
        <List
          bordered
          dataSource={PoolMinted}
          renderItem={(item) => {
            return (
              <List.Item key={item.blockNumber+"_"+item.sender}>
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
                    signer = {userProvider.getSigner()}
                    provider = {localProvider}
                    blockExplorer={blockExplorer}
                    address = {selected}
            />


    </div>
  );
}
