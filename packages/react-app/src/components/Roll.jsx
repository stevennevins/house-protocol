import React, { useState } from "react";
import { InputNumber, Row, Col, Button } from "antd";
import Blockies from "react-blockies";
import { SendOutlined } from "@ant-design/icons";

export default function Roll({ tx, edge, chance, poolAddress, dealerAddress, writeContracts }) {
  const [bet, setBet] = useState();
  let icon;
  if (poolAddress && typeof poolAddress.toLowerCase === "function") {
    icon = <Blockies seed={poolAddress.toLowerCase()} size={8} scale={4} />;
  } else {
    icon = <div />;
  }
  function onBetChange(value) {
    console.log("logging change in bet");
    console.log(JSON.stringify(value));
    setBet(value.toString());
  }

  return (
    <Row>
      <Col span={20}>
        <InputNumber placeholder="10000" prefix={icon} onChange={onBetChange} />
      </Col>
      <Col>
        <Button
          onClick={() => {
            console.log(bet);
            console.log(JSON.stringify(edge));
            console.log(poolAddress);
            console.log(JSON.stringify((1 / (chance / 100)) * 1 * 10 ** 18));
            tx(
              writeContracts.HDealer.attach(dealerAddress).roll(
                bet,
                edge,
                JSON.stringify((1 / (chance / 100)) * 1 * 10 ** 18),
                "0xd3A691C852CDB01E281545A27064741F0B7f6825",
                "1",
              ),
            );
            setBet("");
          }}
          icon={<SendOutlined />}
        />
      </Col>
    </Row>
  );
}
