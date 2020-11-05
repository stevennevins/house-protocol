import React, { useCallback, useEffect, useState } from "react";
import { Button, List, Divider, Input, Card, DatePicker, Slider, Switch, Progress, Spin, Select} from "antd";
import { SyncOutlined } from '@ant-design/icons';
import { Address, AddressInput, Balance } from "../components";
import { useContractReader, useEventListener, useResolveName } from "../hooks";
import { parseEther, formatEther } from "@ethersproject/units";

export default function Game({address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {

  //📟 Listen for broadcast events
  const dealerMinted = useEventListener(readContracts, "HDealerFactory", "DealerMinted", localProvider, 1);
  console.log("📟 Dealer Minted:",dealerMinted)

        const { Option } = Select;

function onChange(value) {
  console.log(`selected ${value}`);
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

  return (
    <div>
            <Divider/>
            <Select
            showSearch
          style={{ width: 200 }}
         placeholder="Select a person"
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
                            <Option key={item.blockNumber+"_"+item.sender}>{item[0]}</Option>
                    ))}
  </Select>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{border:"1px solid #cccccc", padding:16, width:400, margin:"auto",marginTop:64}}>
        <h2>Games:</h2>

        <Divider/>
      </div>

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
                    ensProvider={mainnetProvider}
                    fontSize={16}
                  /> =>
                {item[1]}
              </List.Item>
            )
          }}
        />
      </div>

    </div>
  );
}
