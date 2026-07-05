"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  /** URL of a .glb / .gltf model (local like "/models/x.glb" or a full URL). */
  src: string;
  alt?: string;
  /** Name of an animation embedded in the model to autoplay (loops). */
  animationName?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  className?: string;
  /** Shown only while the 3D library itself is loading (never over the model). */
  fallback?: ReactNode;
};

// Renders a free .glb model with Google's <model-viewer>. The library is
// imported client-side only (it registers a custom element and needs the DOM).
export default function ModelViewer({
  src,
  alt = "Interactive 3D model",
  animationName,
  autoRotate = false,
  cameraControls = true,
  className,
  fallback,
}: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    import("@google/model-viewer")
      .then(() => { if (active) setReady(true); })
      .catch(() => { /* leave fallback showing */ });
    return () => { active = false; };
  }, []);

  // The fallback is only shown before the library loads. It must NOT be a
  // child of <model-viewer>, or it would render on top of the 3D model.
  if (!ready) return <>{fallback ?? null}</>;

  return (
    <model-viewer
      src={src}
      alt={alt}
      camera-controls={cameraControls ? true : undefined}
      auto-rotate={autoRotate ? true : undefined}
      autoplay={animationName ? true : undefined}
      animation-name={animationName}
      loading="eager"
      reveal="auto"
      rotation-per-second="18deg"
      interaction-prompt="none"
      disable-zoom={true}
      shadow-intensity="0.7"
      exposure="1.05"
      className={className}
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
}
