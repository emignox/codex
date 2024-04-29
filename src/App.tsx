import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Model from "./Ocean1.tsx";
import { Suspense } from "react";
import Sound from "./sound";
import Text from "./text";
import { useState, useEffect } from "react";

const getTimePreset = () => {
  const hour = new Date().getHours();

  if (hour >= 6 && hour < 12) {
    return "dawn";
  } else if (hour >= 12 && hour < 21) {
    return "sunset";
  } else {
    return "forest";
  }
};

const timePreset = getTimePreset();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Tempo di caricamento del modello 3D

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className={`fixed z-50 w-screen h-screen transition-opacity duration-1000 bg-black flex items-center justify-center ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="text-3xl text-white opacity-100">CHARGING..</div>
      </div>
      <div className="w-screen h-screen overflow-hidden">
        {(timePreset === "forest" && <Sound className="text-white " />) || (
          <Sound />
        )}
        <Text className="text-white" />
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
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default App;
