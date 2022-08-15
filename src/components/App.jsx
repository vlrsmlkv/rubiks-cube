import React, { useState, useEffect, useRef } from "react";

import { Canvas } from "@react-three/fiber";

import RubiksCube from "./RubiksCube";
import { ButtonPanel } from "./ButtonPanel";

import { create3DArray } from "../../utils";

import { buttonsDegree, rotationButtonsProps } from "../../consts";

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
  
  const panelButtonClickHandler = (degree, axis, axisLevel) => {
    console.log(degree, axis, axisLevel)
    if (!isRotating) {
      setRotationAxis(axis);
      setRotationAxisLevel(axisLevel);
      setIsClockwise(degree < 0);
      setIsRotating(true);
    };
  };

  const keyUpHandler = (event) => {
    const pressedKey = event.code.slice(-1);
    if (Object.keys(rotationButtonsProps).includes(pressedKey)) {
      const degree = !event.shiftKey ? buttonsDegree[pressedKey] : -buttonsDegree[pressedKey];
      panelButtonClickHandler(degree, rotationButtonsProps[pressedKey].axis, rotationButtonsProps[pressedKey].axisLevel);
    };
  };

  return (
    <div className="container" tabIndex={0} onKeyUp={keyUpHandler} ref={ref}>
      <div className="rubiks-cube-container">
        <Canvas
          dpr={Math.max(window.devicePixelRatio, 2)} 
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 15], zoom: 3}}
        >
          <RubiksCube
            cubesRef={cubesRef}
            rotationAxis={rotationAxis}
            rotationAxisLevel={rotationAxisLevel}
            isClockwise={isClockwise}
            isRotating={isRotating}
            onLastRotating={() => setIsRotating(false)}
          />
        </Canvas>
      </div>
      <ButtonPanel onButtonClick={panelButtonClickHandler}/>
    </div>
  )
};

export default App;