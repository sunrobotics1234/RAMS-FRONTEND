import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface ShapeBlurProps {
  variation?: number;
  pixelRatioProp?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
  className?: string;
}

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform float u_shapeSize;
  uniform float u_roundness;
  uniform float u_borderSize;
  uniform float u_circleSize;
  uniform float u_circleEdge;
  uniform int u_variation;
  varying vec2 vUv;

  float sdRoundedBox(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
  }

  void main() {
    vec2 uv = vUv;
    vec2 mouse = u_mouse / u_resolution;
    
    float aspectRatio = u_resolution.x / u_resolution.y;
    uv.x *= aspectRatio;
    mouse.x *= aspectRatio;
    
    uv = uv * 2.0 - 1.0;
    mouse = mouse * 2.0 - 1.0;
    
    float dist = sdRoundedBox(uv, vec2(u_shapeSize), u_roundness);
    float alpha = smoothstep(u_borderSize, 0.0, abs(dist));
    
    float mouseDist = length(uv - mouse);
    float circle = smoothstep(u_circleSize, u_circleSize - u_circleEdge, mouseDist);
    
    alpha = max(alpha, circle * 0.5);
    
    vec3 color = vec3(1.0);
    
    gl_FragColor = vec4(color, alpha * 0.15);
  }
`;

export const ShapeBlur: React.FC<ShapeBlurProps> = ({
  variation = 0,
  pixelRatioProp = 2,
  shapeSize = 1.2,
  roundness = 0.4,
  borderSize = 0.05,
  circleSize = 0.3,
  circleEdge = 0.5,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_resolution: { value: new THREE.Vector2() },
      u_mouse: { value: new THREE.Vector2() },
      u_shapeSize: { value: shapeSize },
      u_roundness: { value: roundness },
      u_borderSize: { value: borderSize },
      u_circleSize: { value: circleSize },
      u_circleEdge: { value: circleEdge },
      u_variation: { value: variation },
    }),
    []
  );

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const pixelRatio = pixelRatioProp || window.devicePixelRatio;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    rendererRef.current = renderer;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
    });
    materialRef.current = material;

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(pixelRatio);
      
      uniforms.u_resolution.value.set(width * pixelRatio, height * pixelRatio);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * pixelRatio,
        y: (rect.height - (e.clientY - rect.top)) * pixelRatio,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    handleResize();

    let animationFrameId: number;
    const animate = (time: number) => {
      uniforms.u_time.value = time * 0.001;
      uniforms.u_mouse.value.set(mouseRef.current.x, mouseRef.current.y);
      
      // Update dynamic uniforms
      uniforms.u_shapeSize.value = shapeSize;
      uniforms.u_roundness.value = roundness;
      uniforms.u_borderSize.value = borderSize;
      uniforms.u_circleSize.value = circleSize;
      uniforms.u_circleEdge.value = circleEdge;
      uniforms.u_variation.value = variation;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [uniforms, pixelRatioProp, shapeSize, roundness, borderSize, circleSize, circleEdge, variation]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    />
  );
};
