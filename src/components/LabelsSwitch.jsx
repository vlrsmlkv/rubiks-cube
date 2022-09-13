import React from "react";
import { Switch, Row, Col } from "antd";

const LabelsSwitch = ({ onLabelSwitch }) => (
  <Row gutter={9}>
    <Col>
      <span>Labels</span>
    </Col>
    <Col>
      <Switch
        onChange={onLabelSwitch}
      />
    </Col>
  </Row>
);

export default LabelsSwitch;