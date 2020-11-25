import React, { useCallback, useEffect, useState } from "react";
import { Row, Descriptions, Col, Button, List, Select, Divider, Input, InputNumber, Card, DatePicker, Slider, Switch, Progress, Spin } from "antd";
import { E20Balance, Address, Roll, AddressInput, Balance, Faucet, EtherInput, TokenBalance } from "../components";
import { useContractReader, useEventListener, useResolveName, useCustomContractLoader } from "../hooks";

import { parseEther, formatEther } from "@ethersproject/units";
//https://ant.design/components/select/#components-select-demo-custom-dropdown-menu
//https://codesandbox.io/s/vydi8?file=/index.js
export default function Play({address, mainnetProvider, userProvider, localProvider, yourLocalBalance, price, tx, readContracts, writeContracts }) {
//Contract info loading
        const poolMinted = useEventListener(readContracts, "HPoolFactory", "PoolMinted", localProvider, 1);
        const dealerMinted = useEventListener(readContracts, "HDealerFactory", "DealerMinted", localProvider, 1);
        const { Option } = Select;
        const [selected, setSelected] = useState(0);
        
        const [chance, setChance] = useState(0);
        const [edge, setEdge] = useState(0);
        const [dealer, setDealer] = useState(0);
        const poolContractReader = useCustomContractLoader(localProvider, "HPool", selected);
        const poolContractWriter = useCustomContractLoader(userProvider, "HPool", selected);
        function onChange(value) {
                console.log('logging pool change');
                console.log(value);
                setSelected(value);
        }
        function dealOnChange(value) {
                console.log('logging dealer change');
                console.log(value);
                setDealer(value);
        }

        function chanceOnChange(value){
                console.log('logging chance');
                setChance(value);
        }

        function edgeOnChange(value){
                console.log('logging edge');
                setEdge(value);
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
  return (
          <div style = {{border:"1px solid #CCCCCC", padding:16, width:400, margin:"auto", marginTop:32}}>
                       <Divider />
            <Descriptions title="Choose your Dealer" />
            <Select
                              showSearch
                              style={{ width: 200 }}
                             placeholder="Select your dealer"
                             optionFilterProp="children"
                             onChange={dealOnChange}
                           onFocus={onFocus}
                           onBlur={onBlur}
                           onSearch={onSearch}
                             filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                      {dealerMinted.map(item=>(
                                              <Option key={item[0]} value={item[0]}>{item[0]}</Option>
                                      ))}
            </Select>
                  <br />
                  <br />
                <Address
                        value={dealer}
                        ensProvider={mainnetProvider}
                        fontSize={16}
                />

                                <Divider />
                <Descriptions title="Select the Currency for Your Bet"/>
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
                                      {poolMinted.map(item=>(
                                              <Option key={item[0]} value={item[0]}>{item[0]}</Option>
                                      ))}
            </Select>
 
                                <br/>
                <br/>
               
                <E20Balance
                        address={selected}
                        provider={localProvider}
                        dollarMultiplier={price}
                />


                <Address
                        value={selected}
                        ensProvider={mainnetProvider}
                        fontSize={16}
                />
                <Balance
                        address={selected}
                        provider={localProvider}
                        dollarMultiplier={price}
                />

                <Divider />
                <Row>
                <Col span={4}>
                        Edge
                </Col>
                <Col span={12}>
                <Slider 
                        min={0} 
                        max={100}
                        onChange={edgeOnChange}
                        value={edge}

                        />
                </Col>
                <Col span = {4}>
                        <InputNumber style={{marginLeft:16}} onChange={edgeOnChange} value={edge}/>
                </Col>
                </Row>
                <Row>
                        <Col span={4}>
                                Chance
                        </Col>
                <Col span = {12}>
                <Slider 
                        min={0} 
                        max={100}
                        onChange={chanceOnChange}
                        value={chance}

                />
                </Col>
                <Col span={4}>
                        <InputNumber style={{marginLeft:16}} onChange={chanceOnChange} value={chance} />
                </Col>
                </Row>
                <Divider />
                <Row>
                  <Col span={4}>
                          Bet Size
                  </Col>
                  <Col span={16}>
                  <Roll 
                          userProvider={userProvider}
                          localProvider={localProvider}
                          tx={tx}
                          edge = {edge}
                          chance = {chance}
                          poolAddress={selected}
                          dealerAddress={dealer}
                          writeContracts={writeContracts}
                  >
                  </Roll>
                  </Col>
                </Row>
                  <Divider />
                  <Button onClick={ ()=>{
                  tx(writeContracts.LinkTokenInterface.approve(dealer,'1000000000000000000000000000'));
                  }
                  }
                  >Approve Link
                  </Button>
                  <Button onClick={ ()=>{
                  tx(writeContracts.IERC20.approve(selected, '1000000000000000000000000000000'));
                  }
                          }
                  >Approve Pool
                  </Button>

          </div>
  );
}
