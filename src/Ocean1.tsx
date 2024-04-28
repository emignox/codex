import { useRef, PropsWithChildren } from "react";
import { useGLTF } from "@react-three/drei";
import { Sky } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import { TextureLoader, RepeatWrapping, PlaneGeometry, Vector3 } from "three";
import { Water } from "three-stdlib";
import { Stars } from "@react-three/drei";
// import { MeshPhongMaterial } from "three";

// ...

// Carica le texture necessarie

interface ModelProps extends GroupProps {
  // Se hai bisogno di altre props, puoi aggiungerle qui
}

export default function Model(props: PropsWithChildren<ModelProps>) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials } = useGLTF("/ocean1.gltf");
  const sphereMesh = useRef<THREE.Mesh>(null);
  const cylinderMesh = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  const loader = new TextureLoader();

  // Carica la mappa di colore
  // const colorMap = loader.load("../public/water.jpg");

  // Carica la mappa delle normali
  const waterNormals = loader.load(
    "../public/waternormals.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  );

  // Crea un materiale personalizzato per l'acqua
  // const waterMaterial = new MeshPhongMaterial({
  //   map: colorMap, // Usa la mappa di colore
  //   normalMap: waterNormals,
  //   alphaTest: 0.5,
  //   transparent: true,
  // });

  const water = new Water(new PlaneGeometry(10000, 10000), {
    textureWidth: 500, // Aumenta la risoluzione della texture
    textureHeight: 500, // Aumenta la risoluzione della texture
    waterNormals: waterNormals,
    alpha: 1,
    sunDirection: new Vector3(0, 0, 0),
    sunColor: parseInt("FFA500", 16),
    waterColor: 0x000033, // Blu molto scuro
    distortionScale: 3, // Onde più grandi
    fog: scene.fog !== undefined,
  });

  // Ruota e posiziona l'acqua
  water.rotateX((3 * Math.PI) / 2);
  water.position.x = -5;

  useFrame(({ clock }) => {
    if (sphereMesh.current) {
      sphereMesh.current.position.y =
        14.245 + Math.sin(clock.getElapsedTime()) * 0.5;
    }
    if (cylinderMesh.current) {
      cylinderMesh.current.rotation.y += 0.01;
    }
    water.material.uniforms["time"].value += 1.0 / 60.0;
  });
  const getTimePreset = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) {
      return [0.01, 0, 0];
    } else if (hour >= 12 && hour < 21) {
      return [0.01, 0, 0];
    } else {
      return [0, 0, 0];
    }
  };

  const timePreset = getTimePreset();

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={sphereMesh}
          name="Sfera"
          geometry={(nodes.Sfera as Mesh).geometry}
          material={materials["Materiale.001"]}
          position={[-0.129, 14.245, 0.381]}
          rotation={[0.908, 0.421, 2.66]}
        />
        {/* <mesh
          name="Piano"
          geometry={(nodes.Piano as Mesh).geometry}
          material={materials.Materiale}
          position={[-0.908, 8.778, 0.868]}
          scale={[500.24, 1, 500.24]}
        /> */}
        <primitive object={water} />

        <mesh
          ref={cylinderMesh}
          name="Cilindro"
          geometry={(nodes.Cilindro as Mesh).geometry}
          material={materials["Materiale.002"]}
          position={[-0.129, 10.545, 0.381]}
        />
      </group>
      <Sky
        sunPosition={timePreset as [number, number, number]}
        inclination={1} // 0 = sunrise, 0.5 = zenith, 1 = sunset
        azimuth={10} // Sun rotation around the Y axis
      />
      <Stars
        radius={1000}
        depth={50}
        count={1000}
        factor={2}
        saturation={100}
        fade
      />
    </group>
  );
}

useGLTF.preload("/ocean1.gltf");
