import React from "react";
import { Text } from "@react-three/drei";

const textDefaultProps = {
  fontSize: 0.6,
  outlineWidth: 0.015,
};

const textInvisible = {
  fillOpacity: 0,
  outlineOpacity: 0,
};

const Label = ({ children, isVisible, position, rotation }) => (
  <Text
    position={position}
    rotation={rotation}
    {...!isVisible ? textInvisible : {}}
    {...textDefaultProps}
  >
    {children}
  </Text>
);

const Labels = (props) => (
  <>
    <Label
      {...props}
      position={[0, 0, 2.5]}
    >
      Front
    </Label>

    <Label
      {...props}
      position={[0, 0, -2.5]}
      rotation={[0,Math.PI,0]}
    >
      Back
    </Label>

    <Label
      {...props}
      position={[0, 2.5, 0]}
      rotation={[-Math.PI/2,0,0]}
    >
      Up
    </Label>

    <Label
      {...props}
      position={[0, -2.5, 0]}
      rotation={[Math.PI/2,0,0]}
    >
      Down
    </Label>

    <Label
      {...props}
      position={[-2.5, 0, 0]}
      rotation={[0,-Math.PI/2,0]}
    >
      Left
    </Label>

    <Label
      {...props}
      position={[2.5, 0, 0]}
      rotation={[0,Math.PI/2,0]}
    >
      Right
    </Label>
  </>
);

export default Labels;