import React, { useState, useEffect, useRef } from "react";

import { message, Row, Col } from 'antd';
import { SmileOutlined } from "@ant-design/icons";

import { Canvas } from "@react-three/fiber";

import RubiksCube from "./RubiksCube";
import ButtonPanel from "./ButtonPanel";
import Labels from "./Labels";
import LabelsSwitch from "./LabelsSwitch";
import ProcessingButton from "./ProcessingButton";

import { create3DArray, getScrambleRandomParams } from "../utils";

import { buttonsDegree, rotationButtonsProps, appLayout } from "../consts";

const App = () => {

  const cubesRef = useRef(create3DArray(3));
  const ref = useRef(null);

  useEffect(() => {
    ref.current.focus();
  }, []);
  
  const [rotationAxis, setRotationAxis] = useState(null);
  const [rotationAxisLevel, setRotationAxisLevel] = useState(null);
  const [isClockwise, setIsClockwise] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isLabelSwitchChecked, setIsLabelSwitchChecked] = useState(false);
  const [scrambleRotationCounter, setScrambleRotationCounter] = useState(0);
  
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
      
      if (scrambleRotationCounter === 1) {
        message.success({
          content: "Rubik's Cube is scrambled!",
          duration: 2,
          icon: <SmileOutlined />
        })
      };
    };
  };

  const scrambleButtonClickHandler = () => {
    if (!isRotating) {
      scrambleRubiksCube();
      setScrambleRotationCounter(19);
    };
  };

  const scrambleRubiksCube = () => setRotationParams(...getScrambleRandomParams());

  return (
    <div className="app pt-3" tabIndex={0} onKeyUp={keyUpHandler} ref={ref}>
      <Row>
        <Col {...appLayout}>
          <Row justify="space-between" align="middle">
            <Col>
              <ProcessingButton
                name="Scramble"
                onButtonClick={scrambleButtonClickHandler}
                percent={100 - Number.parseInt(scrambleRotationCounter * 100 / 19)}
              />
            </Col>
            <Col>
              <LabelsSwitch 
                onLabelSwitch={setIsLabelSwitchChecked}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="canvas-container">
        <Col {...appLayout}>
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
        </Col>
      </Row>
      <Row>
        <Col
          className="fixed fixed--bottom fixed--full-width"
          {...appLayout}
        >
          <ButtonPanel onButtonClick={panelButtonClickHandler}/>
        </Col>
      </Row>
    </div>
  )
};

export default App;