import "./App.css";

import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ReactNode, Suspense, useRef } from "react";
import * as THREE from "three";
import { loaderStyles } from "./utils";
import { BobbyPin } from "./components/BobbyPin";

function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);

  //higher the 60 number, the less it moves
  //lower the 0.03 number, slower it responds (dampening)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        (state.mouse.x * Math.PI) / 120,
        0.03
      );

      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        (state.mouse.y * Math.PI) / 120,
        0.03
      );
    }
  });

  return <group ref={ref}>{children}</group>;
}

function App() {
  return (
    <>
      <div className="fixed top-0 left-0 bottom-0 w-screen h-screen flex justify-center z-50">
        <Canvas className="z-20">
          <Suspense fallback={null}>
            <Environment files="clear_land.hdr" blur={0.01} />
            <OrbitControls />

            <Rig>
              <BobbyPin
                scale={30}
                position={[0, 0, 0]}
                floatingAmplitude={0.2}
                floatingSpeed={1}
              />
            </Rig>
          </Suspense>
        </Canvas>
      </div>
      <Loader
        containerStyles={loaderStyles.container}
        innerStyles={loaderStyles.inner}
        barStyles={loaderStyles.bar}
        dataStyles={loaderStyles.data}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </>
  );
}

export default App;
