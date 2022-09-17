import React from "react";
import { Switch, Row, Col } from "antd";

const SwitchButton = ({ name, onSwitch }) => (
  <Row gutter={9}>
    <Col>
      <span>{name}</span>
    </Col>
    <Col>
      <Switch
        onChange={onSwitch}
      />
    </Col>
  </Row>
);

export default SwitchButton;