import React, { useState, useEffect, useRef } from "react";

import { Button } from 'antd';

import { Canvas } from "@react-three/fiber";

import RubiksCube from "./RubiksCube";
import { ButtonPanel } from "./ButtonPanel";
import Labels from "./Labels";
import LabelsSwitch from "./LabelsSwitch";

import { create3DArray } from "../../utils";

import { buttonsDegree, rotationButtonsProps } from "../../consts";

const App = () => {

  const cubesRef = useRef(create3DArray(3));
  const ref = useRef(null);

  const [isLabelSwitchChecked, setIsLabelSwitchChecked] = useState(false);
  const [scrambleRotationCounter, setScrambleRotationCounter] = useState(0);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const [rotationAxis, setRotationAxis] = useState(null);
  const [rotationAxisLevel, setRotationAxisLevel] = useState(null);
  const [isClockwise, setIsClockwise] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  
  const setRotationParams = (degree, axis, axisLevel) => {
    setRotationAxis(axis);
    setRotationAxisLevel(axisLevel);
    setIsClockwise(degree < 0);
    setIsRotating(true);
  };
  
  const panelButtonClickHandler = (...params) => {
    if (!isRotating) {
      setRotationParams(...params);
    };
  };

  const keyUpHandler = (event) => {
    const pressedKey = event.code.slice(-1);
    if (Object.keys(rotationButtonsProps).includes(pressedKey)) {
      const degree = !event.shiftKey ? buttonsDegree[pressedKey] : -buttonsDegree[pressedKey];
      if (!isRotating) {
        setRotationParams(degree, rotationButtonsProps[pressedKey].axis, rotationButtonsProps[pressedKey].axisLevel);
      };
    };
  };

  const onLastRotatingHandler = () => {
    setIsRotating(false);
    
    if (scrambleRotationCounter !== 0) {
      scrambleRubiksCube();
      setScrambleRotationCounter(scrambleRotationCounter - 1);
    };
  };

  const getScrambleRandomParams = () => {
    const randomAxisNumber = Math.floor(Math.random() * 3);
    const axisArray = ["x", "y", "z"];
    const randomAxis = axisArray[randomAxisNumber];
    const randomAxisLevel = Math.floor(Math.random() * 3);
    const randomDegreeNumber = Math.floor(Math.random() * 2);
    const degree = randomDegreeNumber === 0 ? -90 : 90;
    return [degree, randomAxis, randomAxisLevel];
  };

  const scrambleButtonClickHandler = () => {
    if (!isRotating) {
      scrambleRubiksCube();
      setScrambleRotationCounter(19);
    };
  };

  const scrambleRubiksCube = () => setRotationParams(...getScrambleRandomParams());

  return (
    <div className="container" tabIndex={0} onKeyUp={keyUpHandler} ref={ref}>
      <div className="top-button-panel">
        <Button 
          type="primary"
          onClick={scrambleButtonClickHandler}
        >
          Scramble
        </Button>
        <LabelsSwitch 
          onLabelSwitch={(checked) => setIsLabelSwitchChecked(checked)}
        />
      </div>
      <div className="rubiks-cube-container">
        <Canvas
          dpr={Math.max(window.devicePixelRatio, 2)} 
          camera={{ fov: 75, near: 0.1, far: 1000, position: [-8, 5, 15], zoom: 3.5}}
        >
          <RubiksCube
            cubesRef={cubesRef}
            rotationAxis={rotationAxis}
            rotationAxisLevel={rotationAxisLevel}
            isClockwise={isClockwise}
            isRotating={isRotating}
            onLastRotating={onLastRotatingHandler}
          />
          <Labels 
            isVisible={isLabelSwitchChecked}
          />
        </Canvas>
      </div>
      <ButtonPanel onButtonClick={panelButtonClickHandler}/>
    </div>
  )
};

export default App;