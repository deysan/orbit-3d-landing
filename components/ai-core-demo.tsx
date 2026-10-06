"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useRef, useState, useSyncExternalStore, type ReactNode, type PointerEvent } from "react";
import CoreFallback from "./core-fallback";

const AICoreScene = dynamic(() => import("./ai-core-scene"), { ssr: false });
const motionQuery = "(prefers-reduced-motion: reduce)";
let cachedWebGLSupport: boolean | null = null;

function subscribeMotion(onChange: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(motionQuery).matches;
}

function getWebGLSupport() {
  if (cachedWebGLSupport === null) {
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2");
      cachedWebGLSupport = context !== null;
      // Release the capability probe; the real Canvas owns its own context.
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      cachedWebGLSupport = false;
    }
  }
  return cachedWebGLSupport;
}

const subscribeSupport = () => () => {};
const serverSupport = () => null;
const serverMotion = () => true;

class SceneBoundary extends Component<
  { children: ReactNode; onUnavailable: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onUnavailable();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function AICoreDemo() {
  const supported = useSyncExternalStore(subscribeSupport, getWebGLSupport, serverSupport);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, serverMotion);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const pointer = useRef({ x: 0, y: 0 });
  const onReady = useCallback(() => setStatus("ready"), []);
  const onUnavailable = useCallback(() => setStatus("unavailable"), []);
  const unavailable = supported === false || status === "unavailable";
  const ready = !unavailable && status === "ready";

  function respondToPointer(event: PointerEvent<HTMLDivElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointer.current.x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width) * 2 - 1));
    pointer.current.y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height) * 2 - 1));
  }

  return (
    <div
      id="demo"
      className="core-stage"
      role="region"
      tabIndex={0}
      aria-label="AI Core interactive concept"
      aria-describedby="demo-description"
      aria-busy={!unavailable && !ready}
      data-state={unavailable ? "unavailable" : status}
      data-motion={reducedMotion ? "reduced" : "enabled"}
      onPointerMove={respondToPointer}
      onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; }}
    >
      <div className="stage-heading mono-label">
        <span>AI CORE / 001</span>
        <span className="stage-tag">INTERACTIVE CONCEPT</span>
      </div>
      <div className="core-viewport" aria-hidden={!unavailable}>
        {!ready && <CoreFallback unavailable={unavailable} />}
        {supported && !unavailable && (
          <SceneBoundary onUnavailable={onUnavailable}>
            <AICoreScene
              reducedMotion={reducedMotion}
              pointer={pointer}
              onReady={onReady}
              onUnavailable={onUnavailable}
            />
          </SceneBoundary>
        )}
      </div>
      <div className="stage-caption">
        <p role="status" aria-live="polite" className="model-status mono-label">
          <span className={`status-dot ${!ready && !unavailable ? "is-loading" : ""}`} aria-hidden="true" />
          {unavailable ? "STATIC VIEW" : ready ? (reducedMotion ? "CORE READY / MOTION REDUCED" : "CORE READY / LIVE 3D") : "LOADING THE AI CORE…"}
        </p>
        <p id="demo-description">A visual demo, not a working AI service.</p>
      </div>
    </div>
  );
}
