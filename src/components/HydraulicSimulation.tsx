import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  Sliders, 
  Activity, 
  Droplet, 
  Zap, 
  ShieldCheck, 
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Award
} from 'lucide-react';

interface Props {
  onUnlockClue?: (clueId: string) => void;
  unlockedClues: string[];
}

export const HydraulicSimulation: React.FC<Props> = ({ onUnlockClue, unlockedClues }) => {
  // Hydraulic variables
  const [maglevFreq, setMaglevFreq] = useState(140); // Target 174 Hz
  const [siphonAperture, setSiphonAperture] = useState(50); // Target 75%
  const [stepwellLevel, setStepwellLevel] = useState(5); // Target 9 steps (the 9th tier)
  const [tideResistance, setTideResistance] = useState(60); // Target 80%

  // Check how close to 174 Hz harmonic equilibrium
  const freqDelta = Math.abs(maglevFreq - 174);
  const apertureDelta = Math.abs(siphonAperture - 75);
  const stepDelta = Math.abs(stepwellLevel - 9);

  // Equilibrium score 0 to 100%
  const score = Math.max(0, 100 - (freqDelta * 0.8 + apertureDelta * 0.6 + stepDelta * 6));
  const isHarmonized = score >= 90;

  const handleTune = (type: string, val: number) => {
    sound.playPageClick();
    haptics.digitalTwinTick();

    if (type === 'freq') {
      setMaglevFreq(val);
      if (Math.abs(val - 174) <= 3) {
        sound.playClueChime();
        haptics.ancientPulse();
      }
    } else if (type === 'siphon') {
      setSiphonAperture(val);
      sound.playWaterDrip();
      haptics.siphonFlow();
    } else if (type === 'step') {
      setStepwellLevel(val);
      sound.playAncientGong();
      if (val === 9) haptics.ancientPulse();
    } else if (type === 'tide') {
      setTideResistance(val);
      sound.playLockHiss();
      haptics.medium();
    }
  };

  const handleReset = () => {
    sound.playPageClick();
    setMaglevFreq(120);
    setSiphonAperture(40);
    setStepwellLevel(4);
    setTideResistance(50);
  };

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            Interactive Fluid Mechanics Console
          </span>
          <h2 className="text-base font-heading tracking-wide text-white leading-tight">
            The Belapokhori Resonator
          </h2>
        </div>

        <button
          onClick={handleReset}
          className="p-1.5 rounded text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 transition-colors"
          title="Reset Calibration"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Real-time Oscilloscope & Status Display */}
      <div className="mx-3 mt-3 p-4 rounded-xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Harmonic Coherence:</span>
            <span className={`font-bold ${isHarmonized ? 'text-emerald-400' : 'text-amber-400'}`}>
              {Math.round(score)}%
            </span>
          </div>

          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${
            isHarmonized
              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
              : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
          }`}>
            {isHarmonized ? 'Equilibrium Locked' : 'Tuning Required'}
          </span>
        </div>

        {/* Animated Waveform Canvas */}
        <div className="relative w-full h-24 rounded-lg bg-slate-950 border border-slate-800/80 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
          
          <svg viewBox="0 0 400 100" className="w-full h-full">
            {/* Target 174 Hz reference ghost wave */}
            <path
              d="M 0 50 Q 50 15 100 50 T 200 50 T 300 50 T 400 50"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.4"
            />
            {/* User live modulated wave */}
            <path
              d={`M 0 50 Q 50 ${50 - (maglevFreq - 100) * 0.4} 100 50 T 200 50 T 300 50 T 400 50`}
              fill="none"
              stroke={isHarmonized ? '#34d399' : '#f59e0b'}
              strokeWidth={isHarmonized ? 3 : 2}
              className={isHarmonized ? 'animate-pulse' : ''}
            />
          </svg>

          <div className="absolute bottom-1 right-2 text-[10px] font-mono text-slate-500">
            Current: {maglevFreq} Hz // Target: 174 Hz Solfeggio
          </div>
        </div>

        {/* Live System Feedback Metric Bar */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-center text-[11px] font-mono">
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Aquifer Head</div>
            <div className="text-cyan-300 font-bold">{(siphonAperture * 0.08 + 1.2).toFixed(1)} Bar</div>
          </div>
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Siphon Velocity</div>
            <div className="text-cyan-300 font-bold">{(siphonAperture * 550).toLocaleString()} L/s</div>
          </div>
          <div className="p-2 rounded bg-slate-950/80 border border-slate-800">
            <div className="text-slate-500 text-[10px]">Step Absorption</div>
            <div className="text-amber-300 font-bold">Tier {stepwellLevel} / 9</div>
          </div>
        </div>
      </div>

      {/* Calibration Controls */}
      <div className="p-3 space-y-3">
        {/* Slider 1: Frequency */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Mag-Lev Freight Harmonic Frequency
            </span>
            <span className="text-cyan-400 font-bold">{maglevFreq} Hz</span>
          </div>
          <input
            type="range"
            min="100"
            max="220"
            value={maglevFreq}
            onChange={e => handleTune('freq', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>100 Hz (Sub-harmonic)</span>
            <span className="text-cyan-400/80">174 Hz (Ancient Tone)</span>
            <span>220 Hz (Excessive)</span>
          </div>
        </div>

        {/* Slider 2: Siphon Aperture */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-blue-400" />
              Under-Riverbed Siphon Aperture
            </span>
            <span className="text-blue-400 font-bold">{siphonAperture}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={siphonAperture}
            onChange={e => handleTune('siphon', parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>10% (Starved)</span>
            <span className="text-blue-400/80">75% (Optimum Head)</span>
            <span>100% (Turbulent)</span>
          </div>
        </div>

        {/* Slider 3: Stepped Well Tier (1-9) */}
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              Belapokhori Step Sluice Calibration
            </span>
            <span className="text-amber-400 font-bold">Tier {stepwellLevel} of 9</span>
          </div>
          <div className="grid grid-cols-9 gap-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
              <button
                key={num}
                onClick={() => handleTune('step', num)}
                className={`py-2 rounded text-xs font-mono font-bold transition-all ${
                  stepwellLevel === num
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="text-[10px] text-slate-400 mt-2 italic font-ancient">
            "When the ninth sluice is engaged, the earth absorbs the Great Tide."
          </p>
        </div>
      </div>

      {/* Harmonization Success Banner */}
      {isHarmonized && (
        <div className="mx-3 p-4 rounded-xl border border-emerald-500/60 bg-emerald-950/40 text-emerald-200 shadow-2xl animate-fade-in">
          <div className="flex items-center gap-2 text-sm font-bold font-heading tracking-wide mb-1 text-emerald-300">
            <Award className="w-5 h-5 text-emerald-400" />
            <span>THE BELAPOKHORI-NEXUS IS HARMONIZED</span>
          </div>
          <p className="text-xs text-emerald-100/90 leading-relaxed mb-3">
            The kinetic momentum of freight trains, the Torricellian underbed siphon, and the 9-tier stepwell are operating in perfect perpetual resonance. The coastal aquifer is protected against salt intrusion for generations to come.
          </p>
          <div className="p-2.5 rounded bg-black/40 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
            Hydraulic Law Validated: Q = (V · A) · sin(174 Hz)
          </div>
        </div>
      )}
    </div>
  );
};
