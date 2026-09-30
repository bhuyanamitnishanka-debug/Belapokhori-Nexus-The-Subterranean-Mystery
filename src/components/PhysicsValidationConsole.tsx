import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  Calculator, 
  AlertTriangle, 
  CheckCircle2, 
  Droplet, 
  Ship, 
  Zap, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface Props {
  currentLang: Language;
}

export const PhysicsValidationConsole: React.FC<Props> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];

  // 1. Siphon Torricelli-Bernoulli Variables
  const [deltaH, setDeltaH] = useState<number>(3.8); // Net head (meters)
  const [pipeLength, setPipeLength] = useState<number>(140); // L (meters)
  const [pipeDiameter, setPipeDiameter] = useState<number>(2.2); // D (meters)
  const [darcyFriction, setDarcyFriction] = useState<number>(0.022); // f
  const [minorLosses, setMinorLosses] = useState<number>(1.5); // sum K_L

  // Gravity constant
  const g = 9.80665;

  // Calculate flow velocity: v = sqrt( (2 * g * deltaH) / (1 + f*(L/D) + sum(K_L)) )
  const lossDenominator = 1 + darcyFriction * (pipeLength / pipeDiameter) + minorLosses;
  const siphonVelocity = Math.sqrt((2 * g * deltaH) / lossDenominator);
  const isSiltHazard = siphonVelocity < 0.6;
  const siphonFlowLps = (Math.PI * Math.pow(pipeDiameter / 2, 2) * siphonVelocity * 1000).toFixed(0);

  // 2. Shipping Channel Clearance Variables
  const [baseDepth, setBaseDepth] = useState<number>(2.40); // meters
  const [riverInflow, setRiverInflow] = useState<number>(120); // m3/s
  const [siphonNetExchange, setSiphonNetExchange] = useState<number>(18); // m3/s
  const [riverReachArea, setRiverReachArea] = useState<number>(450000); // m2
  const [evapLoss, setEvapLoss] = useState<number>(2.5); // m3/s

  // d_channel = d_base + ( (Q_river + Q_siphon_net - Q_evap) * 3600 ) / Reach Area
  const netFluxM3PerSec = riverInflow + siphonNetExchange - evapLoss;
  const channelDepth = baseDepth + (netFluxM3PerSec * 1200) / riverReachArea;
  const isChannelSafe = channelDepth >= 2.50;

  // 3. Ghatiyantra Energy Balance Variables
  const [riverTorque, setRiverTorque] = useState<number>(3850); // N*m
  const [aqueductHeight, setAqueductHeight] = useState<number>(8.5); // m
  const [liftFlow, setLiftFlow] = useState<number>(0.08); // m3/s
  const [generatorPowerWatts, setGeneratorPowerWatts] = useState<number>(18500); // W
  const [shaftOmega, setShaftOmega] = useState<number>(4.71); // rad/s (~45 RPM)

  // Work balance check
  const waterLiftWork = 1000 * liftFlow * g * aqueductHeight * 0.92;
  const electricalWork = generatorPowerWatts / (shaftOmega * 0.94);
  const totalResistanceTorque = waterLiftWork / shaftOmega + electricalWork;
  const torqueBalanceRatio = (riverTorque / totalResistanceTorque).toFixed(2);
  const isTorqueBalanced = parseFloat(torqueBalanceRatio) >= 0.95 && parseFloat(torqueBalanceRatio) <= 1.25;

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            Deterministic Bounds Validator
          </span>
          <h2 className="text-base font-heading tracking-wide text-white leading-tight">
            Patent Physics Formulations
          </h2>
        </div>

        <button
          onClick={() => {
            sound.playPageClick();
            setDeltaH(3.8);
            setPipeLength(140);
            setPipeDiameter(2.2);
            setBaseDepth(2.40);
            setRiverInflow(120);
          }}
          className="p-1.5 rounded text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 transition-colors"
          title="Reset to Salipur Baseline"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 space-y-4">
        {/* SECTION 1: TORRICELLI-BERNOULLI UNDER-RIVERBED SIPHON */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Droplet className="w-4 h-4 text-cyan-400" />
              1. Under-Riverbed Siphon Hydrostatic Flow
            </h3>
            
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold flex items-center gap-1 ${
              isSiltHazard
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/50 animate-pulse'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
            }`}>
              {isSiltHazard ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
              {isSiltHazard ? t.siltAlert : t.siltSafe}
            </span>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 mb-3">
            ΔH = (z_stepwell - z_pond) = (v² / 2g) · [ 1 + f(L/D) + ΣK_L ]
          </div>

          {/* Live Outcome Metrics */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px] font-mono">FLOW VELOCITY (v)</div>
              <div className={`text-base font-bold font-mono ${isSiltHazard ? 'text-rose-400' : 'text-cyan-400'}`}>
                {siphonVelocity.toFixed(3)} m/s
              </div>
              <div className="text-[10px] font-mono text-slate-500">Min Threshold: 0.60 m/s</div>
            </div>

            <div className="p-2.5 rounded bg-slate-950/90 border border-slate-800 text-center">
              <div className="text-slate-500 text-[10px] font-mono">DISCHARGE FLUX</div>
              <div className="text-base font-bold font-mono text-emerald-400">
                {parseInt(siphonFlowLps).toLocaleString()} L/s
              </div>
              <div className="text-[10px] font-mono text-slate-500">Under-Riverbed Capacity</div>
            </div>
          </div>

          {/* Controls for Siphon */}
          <div className="space-y-2 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Hydraulic Head ΔH (Elevation Difference):</span>
                <span className="text-cyan-400 font-bold">{deltaH.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="6.0"
                step="0.1"
                value={deltaH}
                onChange={e => {
                  const val = parseFloat(e.target.value);
                  setDeltaH(val);
                  sound.playWaterDrip();
                  haptics.siphonFlow();
                }}
                className="w-full h-1 bg-slate-800 rounded appearance-none accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Conduit Length L:</span>
                <span className="text-cyan-400 font-bold">{pipeLength} m</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="5"
                value={pipeLength}
                onChange={e => {
                  setPipeLength(parseInt(e.target.value));
                  haptics.digitalTwinTick();
                }}
                className="w-full h-1 bg-slate-800 rounded appearance-none accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: SHIPPING CHANNEL DEPTH & DRAFT SAFETY */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <Ship className="w-4 h-4 text-cyan-400" />
              2. Shipping Channel Clearance & Equilibrium
            </h3>

            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold flex items-center gap-1 ${
              isChannelSafe
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : 'bg-rose-950/80 text-rose-300 border-rose-500/50 animate-pulse'
            }`}>
              {isChannelSafe ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
              {isChannelSafe ? 'DRAFT COMPLIANT (≥ 2.50m)' : 'GROUNDING HAZARD ALERT'}
            </span>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 mb-3">
            d_channel = d_base + [ (Q_river + ΣQ_siphon_in - ΣQ_siphon_out - Q_evap) / A_reach ]
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-center mb-3">
            <div className="text-slate-500 text-[10px] font-mono">LIVE WATERWAY WATER DEPTH</div>
            <div className={`text-xl font-bold font-mono ${isChannelSafe ? 'text-cyan-400' : 'text-rose-400'}`}>
              {channelDepth.toFixed(2)} meters
            </div>
            <div className="text-[10px] font-mono text-slate-400 mt-1">
              Required by Maritime Cargo Vessels: ≥ 2.50 meters clearance
            </div>
          </div>

          {/* Controls for Channel Depth */}
          <div className="space-y-2 text-xs font-mono">
            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Salipur River Reach Seasonal Inflow (Q_river):</span>
                <span className="text-cyan-400 font-bold">{riverInflow} m³/s</span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={riverInflow}
                onChange={e => {
                  setRiverInflow(parseInt(e.target.value));
                  haptics.digitalTwinTick();
                  sound.playPageClick();
                }}
                className="w-full h-1 bg-slate-800 rounded appearance-none accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-400 mb-1">
                <span>Net Siphon Water Injection (ΣQ_siphon):</span>
                <span className="text-cyan-400 font-bold">+{siphonNetExchange} m³/s</span>
              </div>
              <input
                type="range"
                min="-20"
                max="50"
                step="2"
                value={siphonNetExchange}
                onChange={e => {
                  setSiphonNetExchange(parseInt(e.target.value));
                  haptics.siphonFlow();
                }}
                className="w-full h-1 bg-slate-800 rounded appearance-none accent-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: GHATIYANTRA MECHANICAL TORQUE BALANCE */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              3. Ghatiyantra Hydro-Kinetic Torque Balance
            </h3>

            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${
              isTorqueBalanced
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
            }`}>
              Ratio: {torqueBalanceRatio} {isTorqueBalanced ? '(STABLE)' : '(UNBALANCED)'}
            </span>
          </div>

          <div className="p-2.5 rounded bg-slate-950 border border-slate-800 font-mono text-[10px] text-slate-300 mb-3">
            τ_river = η_mech · [ ρ_w · Q_lift · g · h_aqueduct ] + [ P_elec / (ω · η_alt) ]
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">River Torque Input (τ_river)</span>
              <span className="text-amber-400 font-bold text-sm">{riverTorque} N·m</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Combined Load Torque</span>
              <span className="text-cyan-400 font-bold text-sm">{totalResistanceTorque.toFixed(0)} N·m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
