import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  MeshReflectorMaterial,
  PerspectiveCamera,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";

const START = {
  position: new THREE.Vector3(7.5, 0, 0.15),
  rotationY: -0.55,
};

const FINISH = {
  position: new THREE.Vector3(1.1, 0, 0),
  rotationY: -0.28,
};

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

function getAxisFromBox(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);

  if (size.x <= size.y && size.x <= size.z) return "x";
  if (size.y <= size.x && size.y <= size.z) return "y";
  return "z";
}

function makeWheelPivots(root) {
  const wheelRoots = [];
  const exactWheelRoot = /(^|[^a-z])(wheel|wheels)[_-]?(rr|rl|lr|fr|fl|lf)([^a-z]|$)/i;
  const rimRoot = /^rim_root/i;

  root.traverse((node) => {
    const name = node.name || "";

    if (exactWheelRoot.test(name) || rimRoot.test(name)) {
      const parentWheel = wheelRoots.some((wheel) => wheel.parent === node || node.parent === wheel);
      if (!parentWheel) wheelRoots.push(node);
    }
  });

  const pivots = [];

  wheelRoots.forEach((wheelRoot) => {
    if (!wheelRoot.parent) return;

    wheelRoot.updateWorldMatrix(true, true);
    const box = new THREE.Box3().setFromObject(wheelRoot);
    if (box.isEmpty()) return;

    const center = new THREE.Vector3();
    box.getCenter(center);

    const parent = wheelRoot.parent;
    const localCenter = parent.worldToLocal(center.clone());
    const pivot = new THREE.Group();
    pivot.name = `DrivePivot_${wheelRoot.name}`;
    pivot.position.copy(localCenter);

    parent.add(pivot);
    pivot.attach(wheelRoot);

    pivots.push({
      name: wheelRoot.name,
      pivot,
      axis: getAxisFromBox(wheelRoot),
    });
  });

  return pivots;
}

function CarModel({ modelPath, playKey }) {
  const { scene, animations } = useGLTF(modelPath);
  const carRef = useRef(null);
  const timelineRef = useRef(0);
  const wheelPivotsRef = useRef([]);
  const cameraTargetRef = useRef(new THREE.Vector3());
  const carScene = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    timelineRef.current = 0;
    wheelPivotsRef.current = [];

    carScene.position.set(0, 0, 0);
    carScene.rotation.set(0, 0, 0);
    carScene.scale.set(1, 1, 1);

    const meshNames = [];
    carScene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
        meshNames.push(node.name || "(unnamed mesh)");
      }
    });

    if (process.env.NODE_ENV === "development") {
      console.groupCollapsed("[Hero3DCar] GLB scene graph meshes");
      console.table(meshNames.map((name) => ({ name })));
      console.info(
        "[Hero3DCar] Animation clips:",
        animations?.map((clip) => clip.name) ?? []
      );
      console.groupEnd();
    }

    if (carRef.current) {
      carRef.current.position.copy(START.position);
      carRef.current.rotation.set(0, START.rotationY, 0);
    }

    wheelPivotsRef.current = makeWheelPivots(carScene);

    if (process.env.NODE_ENV === "development") {
      if (wheelPivotsRef.current.length > 0) {
        console.table(
          wheelPivotsRef.current.map((wheel) => ({
            wheel: wheel.name,
            axis: wheel.axis,
          }))
        );
      } else {
        console.warn(
          "[Hero3DCar] No separate wheel meshes found. This model needs separate wheel meshes for true wheel rotation."
        );
      }
    }
  }, [animations, carScene, playKey]);

  useFrame((state, delta) => {
    if (!carRef.current) return;

    timelineRef.current += delta;
    const time = timelineRef.current;
    const driveProgress = THREE.MathUtils.clamp((time - 0.1) / 1.7, 0, 1);
    const easedDrive = easeOutCubic(driveProgress);
    const slowdown = THREE.MathUtils.clamp((time - 1.5) / 0.5, 0, 1);
    const wheelSpeed = THREE.MathUtils.lerp(42, 0, easeOutCubic(slowdown)) * (1 - driveProgress * 0.1);
    const stopBounce = THREE.MathUtils.clamp((time - 1.8) / 0.4, 0, 1);

    const car = carRef.current;
    car.position.lerpVectors(START.position, FINISH.position, easedDrive);
    car.rotation.y = THREE.MathUtils.lerp(START.rotationY, FINISH.rotationY, easedDrive);

    if (time >= 1.8 && time <= 2.2) {
      const bounce = Math.sin(stopBounce * Math.PI * 2) * (1 - stopBounce) * 0.055;
      const pitch = Math.sin(stopBounce * Math.PI) * 0.018;
      car.position.y = FINISH.position.y + bounce;
      car.rotation.x = pitch;
    } else if (time > 2.2) {
      car.position.y = FINISH.position.y;
      car.rotation.x = 0;
    }

    if (driveProgress < 1 && wheelPivotsRef.current.length > 0) {
      wheelPivotsRef.current.forEach(({ pivot, axis }) => {
        pivot.rotation[axis] -= delta * wheelSpeed;
      });
    }

    const cameraProgress = easeOutCubic(THREE.MathUtils.clamp(time / 2.2, 0, 1));
    const cameraStart = new THREE.Vector3(4.8, 1.55, 7.8);
    const cameraFinish = new THREE.Vector3(3.1, 1.35, 6.35);
    const desiredCamera = cameraStart.lerp(cameraFinish, cameraProgress);

    state.camera.position.lerp(desiredCamera, 0.065);
    cameraTargetRef.current.set(
      THREE.MathUtils.lerp(2.1, 1.05, cameraProgress),
      THREE.MathUtils.lerp(0.25, 0.35, cameraProgress),
      0
    );
    state.camera.lookAt(cameraTargetRef.current);
  });

  return (
    <group ref={carRef} position={START.position} rotation={[0, START.rotationY, 0]}>
      <primitive object={carScene} scale={1} />
    </group>
  );
}

function StudioBackground() {
  return (
    <>
      <mesh position={[2.6, 2.1, -6]} scale={[13, 5, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ef1018" transparent opacity={0.38} depthWrite={false} />
      </mesh>
      <mesh position={[3, 0.35, -5.7]} scale={[9, 2.1, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#ff242b" transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function Hero3DCar({ modelPath, playKey }) {
  return (
    <div className="hero-3d-car" aria-hidden="true">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[4.8, 1.55, 7.8]} fov={35} />
        <color attach="background" args={["#070707"]} />
        <fog attach="fog" args={["#070707", 9, 20]} />

        <ambientLight intensity={0.72} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <spotLight position={[-3, 4.2, 3.5]} angle={0.55} penumbra={0.7} intensity={4.5} color="#ffffff" />
        <pointLight position={[1.5, 2.2, -3]} intensity={9} distance={8} color="#ef1018" />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <StudioBackground />

          <group position={[0, -0.72, 0]}>
            <CarModel modelPath={modelPath} playKey={playKey} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
              <planeGeometry args={[38, 18]} />
              <MeshReflectorMaterial
                blur={[550, 140]}
                resolution={1024}
                mixBlur={1.8}
                mixStrength={0.72}
                roughness={0.32}
                depthScale={0.55}
                minDepthThreshold={0.18}
                maxDepthThreshold={1.15}
                color="#dedede"
                metalness={0.28}
              />
            </mesh>

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.08, 0.004, 0.12]}>
              <circleGeometry args={[1.9, 64]} />
              <meshBasicMaterial color="#000000" transparent opacity={0.22} depthWrite={false} />
            </mesh>

            <ContactShadows
              position={[0, 0.01, 0]}
              resolution={1024}
              scale={11}
              blur={2.8}
              opacity={0.48}
              far={8}
              color="#050505"
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/velocity-x/velocity-x.glb");
