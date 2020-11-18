import React, { useState } from "react";
import { Row, Col, Input, Button, Tooltip } from "antd";
import Blockies from "react-blockies";
import { SendOutlined, } from "@ant-design/icons";
import { parseEther } from "@ethersproject/units";
import { Transactor } from "../helpers";
import Wallet from "./Wallet";

export default function Roll(props) {
  const [bet, setBet] = useState();

  const poolAddress = '';
  const dealerAddress = '';
 

  let icon;
  if (poolAddress && typeof poolAddress.toLowerCase === "function") {
    icon = <Blockies seed={poolAddress.toLowerCase()} size={8} scale={4} />;
  } else {
    icon = <div />;
  }

  const tx = Transactor(props.localProvider);

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
                tx({
                  to: dealerAddress,
                  value: parseEther(bet),
                });
                setBet("");
              }}
              icon={<SendOutlined />}
            />
    </Col>
    </Row>
  );
}
