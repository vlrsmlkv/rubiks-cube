import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import { colors } from "../consts";

import sourceTexture from "../resources/texture.svg";

const Cube = ({ position, index, cubesRefHandler }) => {

  const [texture] = useLoader(TextureLoader, [sourceTexture]);
  
  return (
    <mesh
      ref={meshRef => {
        const [x, y, z] = index;
        cubesRefHandler({ref: meshRef, position: {x, y, z}});
      }}
    >
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        {colors.map((faceColor, i) =>
          <meshBasicMaterial 
            color={faceColor} 
            attachArray="material" 
            map={texture}
            key={`faceColor${i}`}
          />
        )}
      </mesh>
    </mesh>
  )
};

export default Cube;