import React, { useState } from "react";
import {Descriptions, Row, Col, Input, Button, Tooltip } from "antd";
import Blockies from "react-blockies";
import { SendOutlined, } from "@ant-design/icons";
import { parseEther } from "@ethersproject/units";
import { Transactor } from "../helpers";
import {useCustomContractLoader} from "../hooks";
import Wallet from "./Wallet";

export default function Roll({ userProvider, localProvider, tx, edge, chance,  poolAddress, dealerAddress, writeContracts}) {
  const [bet, setBet] = useState();
  let icon;
  if (poolAddress && typeof poolAddress.toLowerCase === "function") {
    icon = <Blockies seed={poolAddress.toLowerCase()} size={8} scale={4} />;
  } else {
    icon = <div />;
  }


  return (
    <Row>
    <Col span={20}>
      <Input
        placeholder="1"
        prefix={icon}
        value={bet}
        onChange={e => {
          setBet(e.target.value);
        }}
      />
    </Col>
    <Col>
            <Button
              onClick={() => {
                       tx(writeContracts.HDealer.attach(dealerAddress).roll('100000', '1','10000000000000000', '0xd3A691C852CDB01E281545A27064741F0B7f6825', '1'));
                      setBet("");
              }}
              icon={<SendOutlined />}
            />
    </Col>
    </Row>
  );
}
