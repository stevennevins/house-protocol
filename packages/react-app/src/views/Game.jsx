import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin, Select} from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, AddressInput, Balance, CustomContract} from "../components";
import { useContractReader, useEventListener, useResolveName, useCustomContractLoader } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

export default function Game({address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {

  //📟 Listen for broadcast events
  const dealerMinted = useEventListener(readContracts, "HDealerFactory", "DealerMinted", localProvider, 1);
  console.log("📟 Dealer Minted:",dealerMinted)
  const { Option } = Select;
  const [selected, setSelected] = useState(0);
 
function onChange(value) {
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
                    {dealerMinted.map(item=>(
                            <Option key={item[0]}>{item[0]}</Option>
                    ))}
  </Select>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
<CustomContract
              name="HDealer"
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
          dataSource={dealerMinted}
          renderItem={(item) => {
            return (
              <List.Item key={item.blockNumber+"_"+item.sender}>
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

    </div>
  );
}
