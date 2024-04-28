import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Rain = ({ count }: { count: number }) => {
  const mesh = useRef<THREE.InstancedMesh>(null);

  // Genera posizioni casuali
  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push(
        new THREE.Vector3(
          Math.random() * 100 - 50, // Aumenta la gamma di posizioni casuali
          Math.random() * 100 - 50,
          Math.random() * 100 - 50
        )
      );
    }
    return temp;
  }, [count]);

  useEffect(() => {
    if (mesh.current) {
      positions.forEach((position, i) => {
        const dummy = new THREE.Object3D();
        dummy.position.copy(position);
        mesh.current?.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  }, [positions]);

  useFrame(() => {
    if (mesh.current) {
      // Aggiorna le posizioni delle particelle di pioggia
      positions.forEach((position, i) => {
        position.y -= 0.5; // Aumenta la velocità di caduta
        if (position.y < -50) {
          // Aggiorna la posizione di reset
          position.y = 50;
        }
        const dummy = new THREE.Object3D();
        dummy.position.copy(position);
        mesh.current?.setMatrixAt(i, dummy.matrix);
      });
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[
        new THREE.SphereGeometry(0.01, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
        count,
      ]}
    />
  );
};

export default Rain;
