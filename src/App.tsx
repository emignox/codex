import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Model from "./Ocean1.tsx";
import { Suspense } from "react";
import Sound from "./sound";
import Rain from "./rain";

const getTimePreset = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return "dawn";
  } else if (hour >= 12 && hour < 21) {
    return "sunset";
  } else {
    return "night";
  }
};

const timePreset = getTimePreset();

const App = () => {
  return (
    <>
      <div className="w-screen h-screen overflow-hidden">
        <Sound />
        <Canvas className="w-full h-full">
          <Suspense fallback={null}>
            <ambientLight intensity={1} />
            <PerspectiveCamera makeDefault position={[0, 15.245, 50]} />
            <OrbitControls
              enableRotate={false}
              autoRotate
              autoRotateSpeed={0.3}
              minDistance={50}
              maxDistance={100}
            />
            <Model />
            <Environment preset={timePreset} />
            <Rain count={1000} />
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default App;
