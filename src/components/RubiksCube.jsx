import React, { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Quaternion, Vector3 } from "three";

import Cube from "./Cube";

import { getFaceCoordinates, getMoveCoordinates, transform3DArray, isReversedMoveCoordinates } from "../../utils";

import { moveUnit, rotationAngleUnit, cubesPositions } from "../../consts";

const RubiksCube = ({ cubesRef, isClockwise, rotationAxis, rotationAxisLevel, isRotating, onLastRotating }) => {

  const [rotationCounter, setRotationCounter] = useState(0);
  
  const cubesRefHandler = (state) => {
    if (!cubesRef.current[state.position.z][state.position.y][state.position.x]) {
      cubesRef.current[state.position.z][state.position.y][state.position.x] = {ref: state.ref};
    };
  };

  const rotate = (cubesRef, moveValue, axis, axisLevel) => {
    
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {

        const z = axis === "z" ? axisLevel : i;
        const y = axis === "y" ? axisLevel : j;
        const k = axis === "y" ? j : i;
        const x = axis === "x" ? axisLevel : k;

        const quaternion = new Quaternion();
        const axisVector = new Vector3(axis === "x" ? 1 : 0, axis === "y" ? 1 : 0, axis === "z" ? 1 : 0);
        quaternion.setFromAxisAngle(axisVector, moveValue);

        cubesRef.current[z][y][x].ref.quaternion.multiplyQuaternions(quaternion, cubesRef.current[z][y][x].ref.quaternion)
      };
    };
    
    setRotationCounter(rotationCounter + 1);
  };
  
  const alignCubes = (cubesRef, axis, axisLevel, alignValue) => {
    rotate(cubesRef, alignValue, axis, axisLevel);
  };
  
  const isLastRotation = (rotationAngle, turnsNum, moveValue) => (
    Math.abs(rotationAngle - turnsNum * moveValue) < Math.abs(moveValue)
  );

  const resetCubesRefAfterFullRotation = () => {
    const elementsToMove = getFaceCoordinates(rotationAxis, rotationAxisLevel);
    const moveCoordinates = getMoveCoordinates(elementsToMove, rotationAxis, isReversedMoveCoordinates(rotationAxis, isClockwise));
    cubesRef.current = transform3DArray(cubesRef.current, elementsToMove, moveCoordinates);
  };

  useFrame(() => {

    const moveValue = isClockwise ? -moveUnit : moveUnit;
    const rotationAngleValue = isClockwise ? -rotationAngleUnit : rotationAngleUnit;

    if (isRotating && !isLastRotation(rotationAngleValue, rotationCounter, moveValue)) {
      rotate(cubesRef, moveValue, rotationAxis, rotationAxisLevel);
    };

    if (isLastRotation(rotationAngleValue, rotationCounter, moveValue)) {
      const alignValue = rotationAngleValue - rotationCounter * moveValue;
      alignCubes(cubesRef, rotationAxis, rotationAxisLevel, alignValue);
      setRotationCounter(0);
      resetCubesRefAfterFullRotation();
      onLastRotating();
    };
  });

  return (
    <>
      <mesh>
        {cubesPositions.map((face, z) => 
          face.map((row, y) =>
            row.map(((cube, x) =>
              <Cube
                key={`Cube (${cube.position})`} 
                position={cube.position}
                cubesRefHandler={cubesRefHandler}
                index={[x, y, z]}
              />
            ))
          )
        )}
      </mesh>
      <OrbitControls enablePan={false} zoomSpeed={0.7} maxDistance={36} minDistance={12} />
    </>
  )
};

export default RubiksCube;