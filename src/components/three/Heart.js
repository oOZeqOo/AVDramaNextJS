import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

const Heart = () => {
  const heartRef = useRef();

  useFrame(() => {
    const time = Date.now() * 0.001;

    // Levitation animation
    const yPos = Math.sin(time * 2) * 1.5;
    heartRef.current.position.y = yPos;
  });

  // Create the heart geometry
  const heartShape = new THREE.Shape();
  heartShape.moveTo(0, 0);
  heartShape.bezierCurveTo(2, 2, 2, 6, 0, 8);
  heartShape.bezierCurveTo(-2, 6, -2, 2, 0, 0);

  const extrudeSettings = {
    depth: 2,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 1,
    bevelThickness: 1,
  };
  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

  // Merge vertices for better performance
  geometry.mergeVertices();
  geometry.computeVertexNormals();

  return (
    <mesh ref={heartRef} geometry={geometry}>
      <meshPhongMaterial color="#ff0000" />
    </mesh>
  );
};

export default Heart;
