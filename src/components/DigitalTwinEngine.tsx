import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Layers, 
  Zap, 
  Activity, 
  Gauge, 
  Cpu, 
  Compass, 
  Maximize2,
  Sliders,
  Sparkles,
  ShieldCheck,
  Vibrate
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface Props {
  currentLang: Language;
}

export const DigitalTwinEngine: React.FC<Props> = ({ currentLang }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[currentLang];

  // Simulation parameters
  const [rpm, setRpm] = useState<number>(45.0);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'shaded' | 'wireframe' | 'exploded'>('shaded');
  const [riverSpeed, setRiverSpeed] = useState<number>(2.4); // m/s (Salipur Birupa canal flow)

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rotationalGroupRef = useRef<THREE.Group | null>(null);
  const staticGroupRef = useRef<THREE.Group | null>(null);
  const reqIdRef = useRef<number | null>(null);

  // Mouse interaction state for camera orbit
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const cameraSphericalRef = useRef({ radius: 18, theta: Math.PI / 4, phi: Math.PI / 3 });

  // Calculated telemetry matching patent specification
  // Flywheel formula: 0.5 * 1250.0 * (rpm * 0.1047197)^2
  const angularVelocity = rpm * 0.1047197; // rad/s
  const flywheelEnergyJoules = 0.5 * 1250.0 * Math.pow(angularVelocity, 2);
  const flywheelEnergyKJ = (flywheelEnergyJoules / 1000).toFixed(1);
  const torqueNM = Math.round(2800 + riverSpeed * 450);
  const powerKw = ((torqueNM * angularVelocity * 0.88) / 1000).toFixed(2);
  const waterLiftLps = (rpm * 4.2).toFixed(1);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080d1a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(14, 10, 14);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.replaceChildren(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keySpot = new THREE.SpotLight(0x38bdf8, 2.5);
    keySpot.position.set(16, 24, 16);
    keySpot.castShadow = true;
    scene.add(keySpot);

    const warmFill = new THREE.DirectionalLight(0xf59e0b, 1.2);
    warmFill.position.set(-14, 6, -10);
    scene.add(warmFill);

    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 1.0);
    cyanRim.position.set(0, -12, 10);
    scene.add(cyanRim);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(24, 24, 0x0ea5e9, 0x1e293b);
    gridHelper.position.y = -4.5;
    scene.add(gridHelper);

    // Build Mechanical Assembly
    const rotationalGroup = new THREE.Group();
    const staticGroup = new THREE.Group();
    rotationalGroupRef.current = rotationalGroup;
    staticGroupRef.current = staticGroup;

    // Materials
    const polishedSteelMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.18,
    });

    const heavyBronzeMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.3,
    });

    const copperWindingMat = new THREE.MeshStandardMaterial({
      color: 0xcd6e36,
      metalness: 0.75,
      roughness: 0.35,
    });

    // 1. Central Forged Shaft
    const shaftGeom = new THREE.CylinderGeometry(0.25, 0.25, 9, 32);
    shaftGeom.rotateX(Math.PI / 2);
    const mainShaft = new THREE.Mesh(shaftGeom, polishedSteelMat);
    rotationalGroup.add(mainShaft);

    // 2. Ghatiyantra Core Wheel Hub
    const wheelHubGeom = new THREE.CylinderGeometry(0.9, 0.9, 0.7, 32);
    wheelHubGeom.rotateX(Math.PI / 2);
    const wheelHub = new THREE.Mesh(wheelHubGeom, heavyBronzeMat);
    wheelHub.position.set(0, 0, -2.0);
    rotationalGroup.add(wheelHub);

    // 3. 12 Radial Spokes & 12 Interlocking Perimeter Water Pots (Ghats)
    const spokeCount = 12;
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i / spokeCount) * Math.PI * 2;

      // Spoke Arm
      const spokeGeom = new THREE.BoxGeometry(0.12, 3.8, 0.12);
      const spokeMesh = new THREE.Mesh(spokeGeom, polishedSteelMat);
      spokeMesh.position.set(Math.cos(angle) * 1.9, Math.sin(angle) * 1.9, -2.0);
      spokeMesh.rotation.z = angle + Math.PI / 2;
      rotationalGroup.add(spokeMesh);

      // Kalinga Bronze Water Catchment Pot (Ghati)
      const potGeom = new THREE.CylinderGeometry(0.38, 0.24, 0.75, 16);
      const potMesh = new THREE.Mesh(potGeom, heavyBronzeMat);
      potMesh.position.set(Math.cos(angle) * 3.8, Math.sin(angle) * 3.8, -2.0);
      potMesh.rotation.z = angle;
      rotationalGroup.add(potMesh);
    }

    // 4. Heavy Flywheel Ring (for kinetic inertia)
    const flywheelGeom = new THREE.TorusGeometry(3.8, 0.16, 16, 48);
    const flywheelMesh = new THREE.Mesh(flywheelGeom, heavyBronzeMat);
    flywheelMesh.position.set(0, 0, -2.0);
    rotationalGroup.add(flywheelMesh);

    // 5. Step-Up Gearbox Assembly Housing
    const gearBoxHousingGeom = new THREE.BoxGeometry(2.4, 2.4, 2.0);
    const gearBoxHousing = new THREE.Mesh(gearBoxHousingGeom, polishedSteelMat);
    gearBoxHousing.position.set(0, 0, 1.2);
    staticGroup.add(gearBoxHousing);

    // 6. High-Speed Electromagnetic Alternator Stator
    const generatorStatorGeom = new THREE.CylinderGeometry(1.35, 1.35, 2.4, 32);
    generatorStatorGeom.rotateX(Math.PI / 2);
    const generatorStator = new THREE.Mesh(generatorStatorGeom, copperWindingMat);
    generatorStator.position.set(0, 0, 3.6);
    staticGroup.add(generatorStator);

    // 7. Internal Coupled Generator Rotor
    const rotorGeom = new THREE.CylinderGeometry(0.65, 0.65, 2.6, 24);
    rotorGeom.rotateX(Math.PI / 2);
    const generatorRotor = new THREE.Mesh(rotorGeom, polishedSteelMat);
    generatorRotor.position.set(0, 0, 3.6);
    rotationalGroup.add(generatorRotor);

    scene.add(rotationalGroup);
    scene.add(staticGroup);

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      renderer.dispose();
    };
  }, []);

  // Animation Loop driven by RPM state
  useEffect(() => {
    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);

      if (rotationalGroupRef.current && isSimulating) {
        // (RPM * 2 * PI) / (60 * 60)
        const radPerFrame = (rpm * 2 * Math.PI) / (60 * 60);
        rotationalGroupRef.current.rotation.z += radPerFrame;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    reqIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
    };
  }, [rpm, isSimulating]);

  // View Mode Handler (shaded, wireframe, exploded)
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => (m.wireframe = viewMode === 'wireframe'));
        } else {
          child.material.wireframe = viewMode === 'wireframe';
        }
      }
    });

    // Exploded view animation offset
    if (staticGroupRef.current) {
      staticGroupRef.current.position.z = viewMode === 'exploded' ? 2.5 : 0;
    }
  }, [viewMode]);

  // Mouse / Touch Drag Orbit Handler
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !cameraRef.current) return;
    const deltaX = e.clientX - previousMousePositionRef.current.x;
    const deltaY = e.clientY - previousMousePositionRef.current.y;

    const spherical = cameraSphericalRef.current;
    spherical.theta -= deltaX * 0.008;
    spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - deltaY * 0.008));

    const x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    const y = spherical.radius * Math.cos(spherical.phi);
    const z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);

    cameraRef.current.position.set(x, y, z);
    cameraRef.current.lookAt(0, 0, 0);

    // Subtle tactile tick during 3D rotation
    haptics.digitalTwinTick();

    previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleResetCamera = () => {
    sound.playPageClick();
    haptics.medium();
    if (!cameraRef.current) return;
    cameraSphericalRef.current = { radius: 18, theta: Math.PI / 4, phi: Math.PI / 3 };
    cameraRef.current.position.set(14, 10, 14);
    cameraRef.current.lookAt(0, 0, 0);
  };

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            Salipur, Odisha Digital-Twin Canvas
          </span>
          <h2 className="text-base font-heading tracking-wide text-white leading-tight">
            {t.ghatiyantraShaft}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              sound.playPageClick();
              haptics.medium();
              setIsSimulating(!isSimulating);
            }}
            className={`p-2 rounded-lg border transition-colors ${
              isSimulating
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
            }`}
            title={isSimulating ? 'Pause Engine' : 'Resume Engine'}
          >
            {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={handleResetCamera}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Reset 3D Camera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spatial Location Indicator (Far-Left Immediate Bank Line & Combined Sewerage Outfall) */}
      <div className="mx-3 mt-2 px-3 py-2 rounded-lg bg-slate-950 border border-amber-500/30 text-[11px] font-mono text-slate-300 flex items-start gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-amber-400 font-bold">Spatial Position: </span>
          Immediate bank line on the far left where inland waterway meets land infrastructure (<span className="text-cyan-300 font-semibold">Kinetic Energy Conversion System</span>), integrated with underground combined urban sewerage outfalls & transmission channels.
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative mx-3 mt-3 rounded-2xl border border-cyan-500/30 overflow-hidden bg-slate-950 shadow-2xl">
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          className="w-full aspect-[4/3] min-h-[300px] cursor-grab active:cursor-grabbing touch-none"
        />

        {/* Floating Viewport Overlays */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-lg p-2 text-[10px] font-mono text-slate-300 pointer-events-none">
          <div className="text-cyan-400 font-bold mb-0.5">WebGL Three.js Core</div>
          <div>Drag to Orbit · Real-time 3D Axle</div>
        </div>

        {/* View Mode Controls (Shaded / Wireframe / Exploded) */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-slate-950/90 backdrop-blur-md border border-slate-800 p-1 rounded-lg">
          {(['shaded', 'wireframe', 'exploded'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setViewMode(mode);
              }}
              className={`px-2 py-1 text-[10px] font-mono rounded capitalize transition-colors ${
                viewMode === mode
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Live Bottom Telemetry HUD Bar */}
        <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 px-3 py-2 grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
          <div>
            <div className="text-slate-500">SPEED</div>
            <div className="text-cyan-400 font-bold text-xs">{rpm.toFixed(1)} RPM</div>
          </div>
          <div>
            <div className="text-slate-500">KINETIC</div>
            <div className="text-amber-400 font-bold text-xs">{flywheelEnergyKJ} kJ</div>
          </div>
          <div>
            <div className="text-slate-500">TORQUE</div>
            <div className="text-emerald-400 font-bold text-xs">{torqueNM} N·m</div>
          </div>
          <div>
            <div className="text-slate-500">YIELD</div>
            <div className="text-purple-400 font-bold text-xs">{powerKw} kW</div>
          </div>
        </div>
      </div>

      {/* Real-time Telemetry Sliders and Engine Controls */}
      <div className="p-3 space-y-3">
        {/* RPM Modulation Slider */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              {t.operationalRPM}
            </span>
            <span className="text-cyan-400 font-bold">{rpm.toFixed(1)} RPM</span>
          </div>
          <input
            type="range"
            min="0"
            max="120"
            step="0.5"
            value={rpm}
            onChange={e => {
              setRpm(parseFloat(e.target.value));
              haptics.digitalTwinTick();
              if (parseFloat(e.target.value) % 10 === 0) sound.playPageClick();
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0 RPM (Stationary)</span>
            <span className="text-cyan-400/80">45.0 RPM (Nominal Salipur River Head)</span>
            <span>120 RPM (Peak Flood)</span>
          </div>
        </div>

        {/* River Velocity Modulation */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 shadow-lg">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Salipur Birupa Canal Inflow Velocity
            </span>
            <span className="text-amber-400 font-bold">{riverSpeed.toFixed(2)} m/s</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="5.0"
            step="0.1"
            value={riverSpeed}
            onChange={e => {
              setRiverSpeed(parseFloat(e.target.value));
            }}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>0.5 m/s (Dry Winter)</span>
            <span className="text-amber-400/80">2.4 m/s (Standard Season)</span>
            <span>5.0 m/s (Monsoon Swell)</span>
          </div>
        </div>

        {/* Patent Physics Formula Breakdown Card */}
        <div className="p-4 rounded-xl border border-cyan-500/30 bg-slate-950 shadow-xl space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>PostgreSQL Generated DDL Formula Check:</span>
          </div>
          
          <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-cyan-200">
            E_k = 0.5 * 1250.0 * (RPM * 0.1047197)^2 = <span className="font-bold text-amber-300">{flywheelEnergyKJ} kJ</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Water Lifted by Pots</span>
              <span className="text-slate-200 font-bold">{waterLiftLps} Liters/sec</span>
            </div>
            <div className="p-2 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Gearbox Efficiency</span>
              <span className="text-emerald-400 font-bold">94.5% Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
