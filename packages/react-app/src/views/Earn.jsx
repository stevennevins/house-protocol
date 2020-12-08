import React, { useState } from "react";
import { Row, Descriptions, Col, Button, Select, Divider, Input } from "antd";
import { Address, Balance, E20Balance } from "../components";
import { useEventListener, useCustomContractLoader } from "../hooks";

export default function Earn({
  address,
  mainnetProvider,
  userProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const poolMinted = useEventListener(readContracts, "HPoolFactory", "PoolMinted", localProvider, 1);
  const { Option } = Select;
  const [pool, setPool] = useState(0);
  const [erc, setERC] = useState(0);
  const e20Contract = useCustomContractLoader(localProvider, "IERC20", erc);

  function onChange(key, value) {
    console.log("logging pool change");
    console.log("erc20: ", value.value);
    console.log("pool: ", value.key);
    setERC(value.value);
    setPool(value.key);
  }
  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }
  return (
    <div style={{ border: "1px solid #CCCCCC", padding: 16, width: 400, margin: "auto", marginTop: 32 }}>
      <Divider />

      <Descriptions title="Modify Your Bankroll Positions" />
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="pool a Liquidity Pool"
        optionFilterProp="children"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onSearch={onSearch}
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {poolMinted.map(item => (
          <Option key={item[0]} value={item[1]}>
            {item[0]}
          </Option>
        ))}
      </Select>

      <br />
      <br />
      <E20Balance contract={e20Contract} address={address} provider={localProvider} />
      <Address value={address} ensProvider={mainnetProvider} fontSize={16} />
      <Balance address={pool} provider={localProvider} dollarMultiplier={price} />

      <Divider />
      <Row>
        <Col span={16}>
          <Input></Input>
        </Col>
        <Col>
          <Button>SwapIn</Button>
        </Col>
      </Row>
      <br></br>
      <Row>
        <Col span={16}>
          <Input></Input>
        </Col>
        <Col>
          <Button>SwapOut</Button>
        </Col>
      </Row>
      <Divider />
      <Button
        onClick={() => {
          console.log(pool);
          tx(writeContracts.IERC20.approve(pool, "10000000000000000000000000000000000000"));
        }}
      >
        Approve Pool
      </Button>
    </div>
  );
}
