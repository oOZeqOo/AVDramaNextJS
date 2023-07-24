import React from "react";
import { Canvas } from "react-three-fiber";
import Heart from "./Heart";

const Play = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Heart />
    </Canvas>
  );
};

export default Play;
