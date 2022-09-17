import React from "react";
import { Button, Progress, Row, Col } from "antd";

const ProcessingButton = ({ name, onButtonClick, percent, disabled }) => (
  <Row gutter={9} align="middle">
    <Col>
      <Button
        className={disabled ? "disabled" : ""}
        type="primary"
        onClick={onButtonClick}
      >
        {name}
      </Button>
    </Col>
    <Col>
      {(percent < 100) && <Progress
        type="circle"
        width={25}
        showInfo={false}
        percent={percent}
      />}
    </Col>
  </Row>
);

export default ProcessingButton;