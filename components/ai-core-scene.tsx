"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { MathUtils, type Group } from "three";
import CoreFallback from "./core-fallback";

type SceneProps = {
  reducedMotion: boolean;
  pointer: RefObject<{ x: number; y: number }>;
  onReady: () => void;
  onUnavailable: () => void;
};

const MODEL_PATH = "/models/ai-core.glb";

// Match the Blender presentation orientation without moving the web camera off +Z.
const presentationQuaternion: [number, number, number, number] = [
  -0.06661631, -0.37968284, 0.42601427, 0.81848339,
];

function CoreModel({ reducedMotion, pointer, onReady }: Omit<SceneProps, "onUnavailable">) {
  const { scene } = useGLTF(MODEL_PATH);
  const model = useMemo(() => scene.clone(true), [scene]);
  const motion = useRef<Group>(null);
  const idleAngle = useRef(0);
  const viewport = useThree((state) => state.viewport);
  const scale = Math.min(1, viewport.width / 3.1);

  useEffect(() => { onReady(); }, [onReady]);

  useFrame((_, delta) => {
    if (reducedMotion || !motion.current) return;
    const step = Math.min(delta, 0.05);
    idleAngle.current += step * 0.065;
    motion.current.rotation.x = MathUtils.damp(motion.current.rotation.x, pointer.current.y * 0.035, 4, step);
    motion.current.rotation.y = MathUtils.damp(motion.current.rotation.y, idleAngle.current + pointer.current.x * 0.045, 4, step);
  });

  return (
    <group ref={motion} scale={scale}>
      <group quaternion={presentationQuaternion}>
        <primitive object={model} dispose={null} />
      </group>
    </group>
  );
}

function RendererHealth({ onUnavailable }: Pick<SceneProps, "onUnavailable">) {
  const gl = useThree((state) => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    function onContextLost(event: Event) {
      event.preventDefault();
      onUnavailable();
    }
    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => canvas.removeEventListener("webglcontextlost", onContextLost);
  }, [gl, onUnavailable]);
  return null;
}

export default function AICoreScene(props: SceneProps) {
  // Resolve the shared useGLTF cache before mounting the renderer. Asset errors
  // reach the DOM error boundary rather than becoming uncaught R3F errors.
  useGLTF(MODEL_PATH);

  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 38, near: 0.1, far: 30 }}
      dpr={[1, 1.5]}
      frameloop={props.reducedMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={<CoreFallback unavailable />}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute("aria-hidden", "true");
        gl.domElement.setAttribute("tabindex", "-1");
      }}
    >
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#cee9f3", "#17212b", 1.4]} />
      <directionalLight position={[2, 4, 5]} intensity={4} color="#e2f4ff" />
      <directionalLight position={[-4, 1, 1]} intensity={1.5} color="#67dcca" />
      <directionalLight position={[2, -1, -3]} intensity={2} color="#9b8acb" />
      <RendererHealth onUnavailable={props.onUnavailable} />
      <Suspense fallback={null}>
        <CoreModel reducedMotion={props.reducedMotion} pointer={props.pointer} onReady={props.onReady} />
      </Suspense>
    </Canvas>
  );
}
