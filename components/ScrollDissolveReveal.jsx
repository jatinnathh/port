"use client";

import React, { useRef, useMemo, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

const coverVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const coverFragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uGrayscale;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  varying vec2 vUv;

  mat3 sobelX = mat3(-1.0,0.0,1.0,-2.0,0.0,2.0,-1.0,0.0,1.0);
  mat3 sobelY = mat3(-1.0,-2.0,-1.0,0.0,0.0,0.0,1.0,2.0,1.0);

  float getLuminance(vec3 color) { return dot(color, vec3(0.299,0.587,0.114)); }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0, gy = 0.0;
    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i+1][j+1];
        gy += lum * sobelY[i+1][j+1];
      }
    }
    return sqrt(gx*gx + gy*gy);
  }

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }

  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a = hash(i); float b = hash(i+vec2(1.0,0.0));
    float c = hash(i+vec2(0.0,1.0)); float d = hash(i+vec2(1.0,1.0));
    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
  }

  float fbm(vec2 p) {
    float v=0.0, a=0.5, freq=1.0;
    for(int i=0;i<5;i++){v+=a*noise(p*freq);a*=0.5;freq*=2.0;}
    return v;
  }

  void main() {
    vec2 res = max(uResolution, vec2(1.0));
    vec2 imgRes = max(uImageResolution, vec2(1.0));

    vec2 ratio = vec2(
      min((res.x/res.y)/(imgRes.x/imgRes.y),1.0),
      min((res.y/res.x)/(imgRes.y/imgRes.x),1.0)
    );
    vec2 uv = vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5);
    vec4 texColor = texture2D(uTexture, uv);
    float gray = getLuminance(texColor.rgb);
    texColor.rgb = mix(texColor.rgb, vec3(gray), uGrayscale);

    vec2 centeredUv = vUv - uCenter;
    float aspect = res.x / res.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);
    float angle = atan(centeredUv.y, centeredUv.x);

    float noiseScale = 6.0;
    vec2 pixelatedUv = floor(vUv*res/noiseScale)*noiseScale/res;
    float blockNoise = fbm(pixelatedUv*100.0)*0.15;
    float angularNoise = fbm(vec2(angle*5.0,0.0))*0.15;
    float noisyDist = dist + blockNoise + angularNoise;

    float maxDist = length(vec2(aspect*0.5,0.5));
    float normalizedDist = noisyDist / maxDist;
    float dissolveThreshold = uDissolve * 1.5;

    vec2 texelSize = 1.0 / res;
    float edge = sobel(uTexture, uv, texelSize);
    edge = pow(edge,0.7)*2.0;
    edge = clamp(edge,0.0,1.0);

    float dissolveMask = smoothstep(dissolveThreshold-0.03, dissolveThreshold, normalizedDist);

    vec3 baseColor = mix(texColor.rgb, vec3(0.0), uGrayscale);
    vec3 finalColor = baseColor;
    float edgeGlow = edge * uEdgeIntensity * 2.0 * (1.0+uGrayscale*3.0);
    finalColor += vec3(1.0) * edgeGlow * uEdgeBrightness;

    float edgeZoneWidth = 0.15*(1.0-uDissolve)+0.02;
    float edgeZone = smoothstep(dissolveThreshold-edgeZoneWidth, dissolveThreshold-edgeZoneWidth+0.04, normalizedDist) *
                     smoothstep(dissolveThreshold+0.02, dissolveThreshold-0.02, normalizedDist);
    float sparkle = hash(floor(vUv*res/4.0)) * edgeZone;
    float edgeBrightness = (1.0-uDissolve)*uEdgeBrightness*(1.0+uGrayscale*2.0);
    finalColor += vec3(sparkle*3.0*edgeBrightness);

    gl_FragColor = vec4(finalColor, dissolveMask * texColor.a);
  }
`;

const coverFragmentShaderReverse = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uTime;
  uniform float uBrightness;
  uniform float uEdgeIntensity;
  uniform float uDarkness;
  uniform float uGrayscale;
  varying vec2 vUv;

  mat3 sobelX = mat3(-1.0,0.0,1.0,-2.0,0.0,2.0,-1.0,0.0,1.0);
  mat3 sobelY = mat3(-1.0,-2.0,-1.0,0.0,0.0,0.0,1.0,2.0,1.0);
  float getLuminance(vec3 c){return dot(c,vec3(0.299,0.587,0.114));}
  float sobel(sampler2D tex,vec2 uv,vec2 ts){
    float gx=0.0,gy=0.0;
    for(int i=-1;i<=1;i++){for(int j=-1;j<=1;j++){
      vec2 o=vec2(float(i),float(j))*ts;float l=getLuminance(texture2D(tex,uv+o).rgb);
      gx+=l*sobelX[i+1][j+1];gy+=l*sobelY[i+1][j+1];}}
    return sqrt(gx*gx+gy*gy);
  }

  void main() {
    vec2 res = max(uResolution, vec2(1.0));
    vec2 imgRes = max(uImageResolution, vec2(1.0));

    vec2 ratio = vec2(
      min((res.x/res.y)/(imgRes.x/imgRes.y),1.0),
      min((res.y/res.x)/(imgRes.y/imgRes.x),1.0)
    );
    vec2 uv = vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5);
    vec4 texColor = texture2D(uTexture, uv);
    float gray = getLuminance(texColor.rgb);
    texColor.rgb = mix(texColor.rgb, vec3(gray), uGrayscale);

    vec2 texelSize = 1.0/res;
    float edge = sobel(uTexture,uv,texelSize);
    edge = pow(edge,0.7)*2.0; edge = clamp(edge,0.0,1.0);

    vec3 baseColor = mix(texColor.rgb, vec3(0.0), uDarkness);
    baseColor += vec3(1.0)*edge*uEdgeIntensity*2.0;
    gl_FragColor = vec4(clamp(baseColor,0.0,1.0), texColor.a);
  }
`;

function Scene({ images, scrollYProgress, onIndexChange }) {
  const textures = useTexture(images);
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const { size } = useThree();
  const lastIdx = useRef(0);

  const uniforms1 = useMemo(() => ({
    uTexture: { value: textures[0] },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uImageResolution: { value: new THREE.Vector2(1024, 1024) },
    uDissolve: { value: 0.0 },
    uCenter: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0.0 },
    uGrayscale: { value: 0.0 },
    uEdgeIntensity: { value: 0.0 },
    uEdgeBrightness: { value: 1.0 },
  }), [size, textures]);

  const uniforms2 = useMemo(() => ({
    uTexture: { value: textures[1] || textures[0] },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uImageResolution: { value: new THREE.Vector2(1024, 1024) },
    uTime: { value: 0.0 },
    uBrightness: { value: 0.0 },
    uEdgeIntensity: { value: 0.6 },
    uDarkness: { value: 1.0 },
    uGrayscale: { value: 1.0 },
  }), [size, textures]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const progress = Math.max(0, Math.min(1, scrollYProgress.get()));
    const numT = images.length - 1;
    const overall = progress * numT;
    let idx = Math.floor(overall);
    let local = overall - idx;
    if (idx >= numT) { idx = numT - 1; local = 1.0; }
    if (idx < 0) { idx = 0; local = 0.0; }

    const reportIdx = Math.min(Math.round(overall), images.length - 1);
    if (reportIdx !== lastIdx.current) { lastIdx.current = reportIdx; onIndexChange(reportIdx); }

    const texF = textures[idx];
    const texB = textures[Math.min(idx + 1, textures.length - 1)];
    const imgDim = (tex) => { const img = tex.image; return [img?.naturalWidth||img?.width||1024, img?.naturalHeight||img?.height||1024]; };

    if (frontRef.current) {
      const u = frontRef.current.uniforms;
      u.uTime.value = t; u.uResolution.value.set(size.width, size.height);
      u.uTexture.value = texF;
      const [w,h] = imgDim(texF); u.uImageResolution.value.set(w,h);
      u.uDissolve.value = local;
      u.uGrayscale.value = Math.min(1.0, local / 0.4);
      u.uEdgeIntensity.value = local * 0.5;
      u.uEdgeBrightness.value = 1.0 - local;
    }
    if (backRef.current) {
      const u = backRef.current.uniforms;
      u.uTime.value = t; u.uResolution.value.set(size.width, size.height);
      u.uTexture.value = texB;
      const [w,h] = imgDim(texB); u.uImageResolution.value.set(w,h);
      const acc = Math.min(1.0, local * 1.1);
      u.uEdgeIntensity.value = 0.6 * (1.0 - acc);
      u.uDarkness.value = 1.0 - acc;
      u.uGrayscale.value = 1.0 - acc;
    }
  });

  return (
    <>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={backRef} vertexShader={coverVertexShader} fragmentShader={coverFragmentShaderReverse} uniforms={uniforms2} transparent />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial ref={frontRef} vertexShader={coverVertexShader} fragmentShader={coverFragmentShader} uniforms={uniforms1} transparent />
      </mesh>
    </>
  );
}

export function ScrollDissolveReveal({ items, className, containerClassName }) {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const handleIndexChange = useCallback((i) => setCurrentIndex(i), []);
  const currentItem = items[currentIndex] || items[0];
  const images = useMemo(() => items.map((item) => item.image), [items]);

  return (
    <div
      ref={containerRef}
      className={containerClassName || ""}
      style={{ height: `${items.length * 100}vh`, position: "relative", width: "100%" }}
    >
      <div
        className={className || ""}
        style={{ position: "sticky", top: "5rem", height: "calc(100vh - 6rem)", width: "100%", overflow: "hidden", borderRadius: "1.25rem", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Top overlay */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          padding: "2rem 2.5rem 4rem",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
          zIndex: 10, pointerEvents: "none",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div style={{ pointerEvents: "auto" }}>
            <p style={{ fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.35)", marginBottom: "0.5rem", fontFamily: "monospace" }}>
              Project {currentIndex + 1} / {items.length}
              {currentItem.period && <span style={{ marginLeft: "1rem", color: "rgba(255,255,255,0.25)" }}>· {currentItem.period}</span>}
            </p>
            <h2 style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.2, margin: 0, maxWidth: "500px" }}>
              {currentItem.title}
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.625rem", pointerEvents: "auto", flexShrink: 0, marginTop: "0.25rem" }}>
            {currentItem.liveUrl && (
              <a href={currentItem.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Demo" className="proj__link-btn">
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            )}
            {currentItem.githubUrl && (
              <a href={currentItem.githubUrl} target="_blank" rel="noopener noreferrer" title="GitHub" className="proj__link-btn">
                <i className="fab fa-github" /> GitHub Link
              </a>
            )}
          </div>
        </div>

        {/* WebGL Canvas */}
        <div style={{ position: "absolute", inset: 0, borderRadius: "inherit", overflow: "hidden", pointerEvents: "none" }}>
          <Canvas 
            gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }} 
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
            style={{ background: "transparent" }}
          >
            <OrthographicCamera makeDefault manual left={-1} right={1} top={1} bottom={-1} near={0.1} far={10} position={[0, 0, 1]} />
            <React.Suspense fallback={null}>
              <Scene images={images} scrollYProgress={scrollYProgress} onIndexChange={handleIndexChange} />
            </React.Suspense>
          </Canvas>
        </div>

        {/* Bottom overlay */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "5rem 2.5rem 2rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)",
          zIndex: 10,
        }}>
          {currentItem.description && (
            <p style={{ fontSize: "clamp(0.8125rem, 1.2vw, 0.9375rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, marginBottom: "1.25rem", maxWidth: "600px" }}>
              {currentItem.description}
            </p>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {currentItem.tags?.map((tag) => (
              <span key={`${currentIndex}-${tag}`} className="glass-tag">{tag}</span>
            ))}
          </div>
          <p style={{ fontSize: "0.625rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", marginTop: "1.25rem", fontFamily: "monospace" }}>
            ↓ scroll to explore projects
          </p>
        </div>
      </div>
    </div>
  );
}
