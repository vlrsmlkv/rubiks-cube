import React from "react";

import { Button } from 'antd';

import { rotationButtonsProps, buttonsDegree } from "../../consts";

const ButtonPanel = ({ onButtonClick }) => {
  
  return (
    <div className="control-button-panel">
      <div className="clockwise-rotation-button-panel">
        {Object.keys(rotationButtonsProps).map(buttonName => (
          <Button
            size="large"
            key={`Button ${buttonName}`}
            onClick={() => onButtonClick(buttonsDegree[buttonName], rotationButtonsProps[buttonName].axis, rotationButtonsProps[buttonName].axisLevel)}
          >
            {buttonName}
          </Button>
        ))}
      </div>

      <div className="counter-clockwise-rotation-button-panel">
        {Object.keys(rotationButtonsProps).map(buttonName => (
          <Button
            size="large"
            key={`Button ${buttonName}'`}
            onClick={() => onButtonClick(-buttonsDegree[buttonName], rotationButtonsProps[buttonName].axis, rotationButtonsProps[buttonName].axisLevel)}
          >
            {buttonName}'
          </Button>
        ))}
      </div>
    </div>
  );
};

export { ButtonPanel };