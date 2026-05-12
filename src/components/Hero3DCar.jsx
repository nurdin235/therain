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
  position: new THREE.Vector3(7.8, 0, 1.35),
  rotationY: -0.7,
  scale: 0.94,
};

const FINISH = {
  position: new THREE.Vector3(1.25, 0, 0.12),
  rotationY: 0.35,
  scale: 1,
};

const DRIVE_CURVE = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(7.8, 0, 1.35),
    new THREE.Vector3(5.2, 0, 1.05),
    new THREE.Vector3(2.8, 0, 0.35),
    new THREE.Vector3(0.4, 0, -0.55),
    new THREE.Vector3(-1.15, 0, -0.85),
    new THREE.Vector3(-0.35, 0, -0.45),
    new THREE.Vector3(1.25, 0, 0.12),
  ],
  false,
  "centripetal",
  0.35
);

const DRIVE_DURATION = 2.6;

const CAMERA_START = new THREE.Vector3(0.55, 1.7, 7.4);
const CAMERA_FINISH = new THREE.Vector3(0, 1.55, 6.45);
const LOOK_START = new THREE.Vector3(1.7, 0.46, 0);
const LOOK_FINISH = new THREE.Vector3(0.6, 0.55, 0);

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const easeInOutCubic = (value) =>
  value < 0.5 ? 4 * value * value * value : 1 - Math.pow(-2 * value + 2, 3) / 2;

function clamp01(value) {
  return Math.min(Math.max(value, 0), 1);
}

function smootherstep(value) {
  const t = clamp01(value);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerpAngle(from, to, alpha) {
  const delta = Math.atan2(Math.sin(to - from), Math.cos(to - from));
  return from + delta * alpha;
}

function dampAngle(current, target, lambda, delta) {
  const alpha = 1 - Math.exp(-lambda * delta);
  return lerpAngle(current, target, alpha);
}

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
    const isWheelRoot = exactWheelRoot.test(name) || rimRoot.test(name);
    const insideFoundWheel = wheelRoots.some((wheel) => {
      let current = node.parent;
      while (current) {
        if (current === wheel) return true;
        current = current.parent;
      }
      return false;
    });

    if (isWheelRoot && !insideFoundWheel) {
      wheelRoots.push(node);
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

function CarModel({ modelPath, playKey, studio }) {
  const { scene, animations } = useGLTF(modelPath);
  const carRef = useRef(null);
  const shadowRef = useRef(null);
  const timelineRef = useRef(0);
  const previousCarPositionRef = useRef(START.position.clone());
  const yawRef = useRef(START.rotationY);
  const wheelPivotsRef = useRef([]);
  const cameraTargetRef = useRef(new THREE.Vector3());
  const carScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.name = `hero-car-slide-${playKey}`;
    return clone;
  }, [scene, playKey]);

  useEffect(() => {
    timelineRef.current = 0;
    wheelPivotsRef.current = [];
    previousCarPositionRef.current.copy(START.position);
    yawRef.current = START.rotationY;
    cameraTargetRef.current.copy(LOOK_START);

    carScene.position.set(0, 0, 0);
    carScene.rotation.set(0, 0, 0);
    carScene.scale.set(1, 1, 1);

    const nodeNames = [];
    const wheelSearch = /wheel|tire|tyre|rim|front|rear|fl|fr|rl|rr/i;

    carScene.traverse((node) => {
      if (node.isMesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }

      if (process.env.NODE_ENV === "development") {
        nodeNames.push({
          type: node.type,
          name: node.name || "(unnamed)",
          wheelCandidate: wheelSearch.test(node.name || ""),
        });
      }
    });

    if (process.env.NODE_ENV === "development") {
      console.groupCollapsed(`[Hero3DCar] Scene graph for slide ${playKey}`);
      console.table(nodeNames);
      console.info(
        "[Hero3DCar] Animation clips:",
        animations?.map((clip) => clip.name) ?? []
      );
      console.groupEnd();
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

    if (carRef.current) {
      carRef.current.position.copy(START.position);
      carRef.current.rotation.set(0, START.rotationY, 0);
      carRef.current.scale.setScalar(START.scale);
    }

    if (shadowRef.current?.material) {
      shadowRef.current.material.opacity = 0.12;
    }
  }, [animations, carScene, playKey]);

  useFrame((state, delta) => {
    if (!carRef.current) return;

    timelineRef.current += delta;
    const time = timelineRef.current;
    const rawProgress = clamp01((time - 0.1) / DRIVE_DURATION);
    const easedProgress = smootherstep(rawProgress);
    const wheelFactor = 1 - smootherstep((rawProgress - 0.76) / 0.24);

    const car = carRef.current;
    const curvePoint = DRIVE_CURVE.getPoint(easedProgress);
    const lookAheadProgress = Math.min(easedProgress + 0.025, 1);
    const lookAheadPoint = DRIVE_CURVE.getPoint(lookAheadProgress);
    const direction = lookAheadPoint.clone().sub(curvePoint).normalize();
    const pathYaw = Math.atan2(direction.x, direction.z);
    const finalBlend = smootherstep((rawProgress - 0.65) / 0.35);
    const steeringCorrection = Math.sin(rawProgress * Math.PI) * (studio.steering ?? 0.025) * (1 - finalBlend);
    const desiredYaw = lerpAngle(pathYaw - steeringCorrection, FINISH.rotationY, finalBlend);

    car.position.copy(curvePoint);
    car.position.y = 0;
    yawRef.current = dampAngle(yawRef.current, desiredYaw, 6.5, delta);
    car.rotation.y = yawRef.current;
    car.scale.setScalar(THREE.MathUtils.lerp(START.scale, FINISH.scale, easedProgress));

    const frameTravel = car.position.distanceTo(previousCarPositionRef.current);
    previousCarPositionRef.current.copy(car.position);

    if (rawProgress > 0.9) {
      const weight = studio.settle ?? 1;
      const settleTime = (rawProgress - 0.9) * 10;
      const bounce = Math.sin(settleTime * 14) * 0.035 * Math.exp(-settleTime * 5);
      const pitch = Math.sin(settleTime * 12) * 0.018 * Math.exp(-settleTime * 5);
      car.position.y = FINISH.position.y + bounce * weight;
      car.rotation.x = pitch * weight;
    } else {
      car.position.y = FINISH.position.y;
      car.rotation.x = 0;
    }

    if (rawProgress < 1 && wheelPivotsRef.current.length > 0) {
      const wheelSpeed = frameTravel * 7.2 * (studio.wheelBoost ?? 1) * wheelFactor;
      wheelPivotsRef.current.forEach(({ pivot, axis }) => {
        pivot.rotation[axis] -= wheelSpeed;
      });
    }

    if (shadowRef.current?.material) {
      shadowRef.current.position.x = car.position.x;
      shadowRef.current.position.z = car.position.z + 0.05;
      shadowRef.current.material.opacity = THREE.MathUtils.lerp(
        0.16,
        studio.shadowOpacity ?? 0.48,
        easeInOutCubic(easedProgress)
      );
      const shadowScale = THREE.MathUtils.lerp(0.78, 1, easeOutCubic(easedProgress));
      shadowRef.current.scale.set(2.55 * shadowScale, 0.82 * shadowScale, 1);
    }

    const cameraProgress = smootherstep(clamp01(time / 2.75));
    const desiredCamera = CAMERA_START.clone().lerp(CAMERA_FINISH, cameraProgress);
    const carFollow = new THREE.Vector3(car.position.x * 0.12, 0, car.position.z * 0.18);
    const desiredLook = LOOK_START.clone().lerp(LOOK_FINISH, cameraProgress).add(carFollow.multiplyScalar(1 - cameraProgress));

    state.camera.position.lerp(desiredCamera, 0.075);
    cameraTargetRef.current.lerp(desiredLook, 0.1);
    state.camera.lookAt(cameraTargetRef.current);
  });

  return (
    <>
      <group ref={carRef} position={START.position} rotation={[0, START.rotationY, 0]} scale={START.scale}>
        <primitive object={carScene} />
      </group>

      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]} position={[START.position.x, 0.018, 0.05]}>
        <circleGeometry args={[1, 80]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} depthWrite={false} />
      </mesh>
    </>
  );
}

function StudioBackground({ studio }) {
  return (
    <>
      <mesh position={[1.8, 2.2, -6]} scale={[13.5, 4.9, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={studio.glow} transparent opacity={0.34} depthWrite={false} />
      </mesh>
      <mesh position={[2.75, 0.5, -5.7]} scale={[9.5, 2.15, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color={studio.glowSoft} transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function Hero3DCar({ modelPath, playKey, studio }) {
  return (
    <div className="hero-3d-car" aria-hidden="true">
      <Canvas shadows dpr={[1, 1.8]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={CAMERA_START.toArray()} fov={36} />
        <color attach="background" args={[studio.bgBottom || "#070707"]} />
        <fog attach="fog" args={[studio.bgBottom || "#070707", 9.5, 21]} />

        <ambientLight intensity={studio.mood === "electric" ? 0.95 : 0.66} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={studio.mood === "power" ? 2.45 : 2.15}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
        />
        <spotLight position={[-2.8, 4.4, 3.2]} angle={0.52} penumbra={0.78} intensity={4.2} color="#ffffff" />
        <pointLight position={[1.6, 2.2, -3]} intensity={8.5} distance={8} color={studio.glow} />
        <pointLight position={[4.2, 1.1, 2.8]} intensity={2.4} distance={7} color={studio.glowSoft} />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <StudioBackground studio={studio} />

          <group position={[0, -0.72, 0]}>
            <CarModel modelPath={modelPath} playKey={playKey} studio={studio} />

            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
              <planeGeometry args={[38, 18]} />
              <MeshReflectorMaterial
                blur={[560, 150]}
                resolution={1024}
                mixBlur={1.65}
                mixStrength={studio.reflection ?? 0.68}
                roughness={studio.mood === "electric" ? 0.22 : 0.34}
                depthScale={0.55}
                minDepthThreshold={0.18}
                maxDepthThreshold={1.15}
                color={studio.floor || "#dedede"}
                metalness={0.28}
              />
            </mesh>

            <ContactShadows
              position={[0, 0.01, 0]}
              resolution={1024}
              scale={11.5}
              blur={studio.mood === "power" ? 2.2 : 3}
              opacity={studio.shadowOpacity ?? 0.45}
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
