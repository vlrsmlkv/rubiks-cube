import React from "react";

import { Button, Row, Col } from 'antd';

import { rotationButtonsProps, buttonsDegree } from "../consts";

const gutter = { xs: 4, sm: 4, md: 4, lg: 6, xl: 6, xll: 6 };

const ButtonPanel = ({ onButtonClick }) => (
  <Row justify="center" gutter={[0, gutter]}>
    <Col span={24}>
      <Row justify="center" gutter={gutter}>
        {Object.keys(rotationButtonsProps).map(buttonName => (
          <Col key={`Button ${buttonName}`}>
            <Button
              className="square-shape"
              size="large"
              onClick={() => onButtonClick(buttonsDegree[buttonName], rotationButtonsProps[buttonName].axis, rotationButtonsProps[buttonName].axisLevel)}
            >
              {buttonName}
            </Button>
          </Col>
        ))}
      </Row>
    </Col>

    <Col span={24}>
      <Row justify="center" gutter={gutter}>
        {Object.keys(rotationButtonsProps).map(buttonName => (
          <Col key={`Button ${buttonName}`}>
            <Button
              className="square-shape"
              size="large"
              onClick={() => onButtonClick(-buttonsDegree[buttonName], rotationButtonsProps[buttonName].axis, rotationButtonsProps[buttonName].axisLevel)}
            >
              {buttonName}'
            </Button>
          </Col>
        ))}
      </Row>
    </Col>
  </Row>
);

export default ButtonPanel;