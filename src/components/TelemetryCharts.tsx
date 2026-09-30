import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  LineChart, 
  Activity, 
  Droplet, 
  Zap, 
  Ship, 
  Play, 
  Pause, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Gauge
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../utils/i18n';

interface Props {
  currentLang: Language;
}

interface SiphonEvaluation {
  status: 'STABLE' | 'WARNING' | 'ALERT' | 'CRITICAL_ERROR';
  code: string;
  message: string;
}

export const TelemetryCharts: React.FC<Props> = ({ currentLang }) => {
  const t = TRANSLATIONS[currentLang];
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active metric channel
  const [selectedChannel, setSelectedChannel] = useState<'rpm' | 'siphon_pressure' | 'solar_kw' | 'channel_depth'>('siphon_pressure');
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // System parameters
  const [nominalRpm, setNominalRpm] = useState<number>(45.0);
  const [siphonPressureKpa, setSiphonPressureKpa] = useState<number>(124.5); // Siphon pressure in kPa

  // History buffer for active canvas (50 points matching maxPoints)
  const historyRef = useRef<number[]>([]);

  // Siphon Validation Engine logic matching /app/models/hydrology.py
  const evaluateSiphonPressure = (pressure: number): SiphonEvaluation => {
    if (pressure < 45.0) {
      return {
        status: 'CRITICAL_ERROR',
        code: 'SILTATION_HAZARD_LOW_FLOW',
        message: 'Fluid velocity insufficient. Risk of sand accumulation inside under-bed lines. Activate stepwell flash-gates immediately.'
      };
    } else if (pressure >= 45.0 && pressure < 85.0) {
      return {
        status: 'WARNING',
        code: 'STAGNATION_WARNING',
        message: 'System operating under restricted flow head conditions. Monitor siphon channels closely.'
      };
    } else if (pressure >= 85.0 && pressure <= 165.0) {
      return {
        status: 'STABLE',
        code: 'OPTIMAL_NOMINAL_FLOW',
        message: 'Hydrostatic pressure values balanced. Inland waterway depth stable. Shipping channel clear.'
      };
    } else if (pressure > 165.0 && pressure < 280.0) {
      return {
        status: 'ALERT',
        code: 'HIGH_SURGE_FLOW',
        message: 'Monsoon roof-catchment volumes loading. Open secondary side pockets to distribute excess volume.'
      };
    } else {
      return {
        status: 'CRITICAL_ERROR',
        code: 'PRESSURE_OVERLOAD_BREACH',
        message: 'Pipeline structural limit exceeded! Shut down primary barrage inputs and divert all flow into deep aquifer recharge zones.'
      };
    }
  };

  const siphonStatus = evaluateSiphonPressure(siphonPressureKpa);

  // Initialize history
  useEffect(() => {
    const initData: number[] = [];
    for (let i = 0; i < 50; i++) {
      initData.push(siphonPressureKpa + (Math.sin(i * 0.3) * 4));
    }
    historyRef.current = initData;
  }, []);

  // Live Canvas Drawing Loop (TelemetryChartPipeline Engine)
  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const padding = 36;
    const data = historyRef.current;

    // Background fill
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, w, h);

    // 1. Grid Lines
    ctx.strokeStyle = '#1a273a';
    ctx.lineWidth = 1;
    const gridCount = 5;
    for (let i = 1; i < gridCount; i++) {
      const y = padding + ((h - 2 * padding) / gridCount) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(w - padding, y);
      ctx.stroke();
    }

    if (data.length < 2) return;

    // Scale boundaries depending on channel
    let minVal = 0;
    let maxVal = 100;
    let strokeColor = '#00ffcc';
    let unitLabel = '';

    if (selectedChannel === 'siphon_pressure') {
      minVal = 0;
      maxVal = 320; // Up to 320 kPa
      strokeColor = siphonStatus.status === 'CRITICAL_ERROR' ? '#f43f5e' : siphonStatus.status === 'WARNING' ? '#f59e0b' : '#00ffcc';
      unitLabel = 'kPa';
    } else if (selectedChannel === 'rpm') {
      minVal = 0;
      maxVal = 100;
      strokeColor = '#38bdf8';
      unitLabel = 'RPM';
    } else if (selectedChannel === 'solar_kw') {
      minVal = 0;
      maxVal = 600;
      strokeColor = '#facc15';
      unitLabel = 'kW';
    } else {
      minVal = 0;
      maxVal = 4.5;
      strokeColor = '#818cf8';
      unitLabel = 'm';
    }

    const graphW = w - 2 * padding;
    const graphH = h - 2 * padding;

    // Safety threshold markers on siphon pressure
    if (selectedChannel === 'siphon_pressure') {
      // 45 kPa min line
      const yMin = h - padding - ((45.0 - minVal) / (maxVal - minVal)) * graphH;
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.4)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding, yMin);
      ctx.lineTo(w - padding, yMin);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#f43f5e';
      ctx.font = '9px monospace';
      ctx.fillText('MIN SILT LIMIT (45 kPa)', padding + 6, yMin - 4);

      // 280 kPa max breach line
      const yMax = h - padding - ((280.0 - minVal) / (maxVal - minVal)) * graphH;
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.5)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding, yMax);
      ctx.lineTo(w - padding, yMax);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillText('CRITICAL BURST (280 kPa)', padding + 6, yMax - 4);
    }

    // 2. Data Curve
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (50 - 1)) * graphW;
      const normalizedY = (data[i] - minVal) / (maxVal - minVal);
      const y = h - padding - (normalizedY * graphH);

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }

    // 3. Render High-Visibility Glow Pipeline Style
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.8;
    ctx.shadowBlur = 10;
    ctx.shadowColor = strokeColor;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // 4. Render Telemetry Value Tags
    ctx.fillStyle = '#8a95a5';
    ctx.font = '11px monospace';
    const currentVal = data[data.length - 1].toFixed(1);
    ctx.fillText(`VAL: ${currentVal} ${unitLabel}`, w - padding - 100, padding - 10);
  };

  // Push new data points on interval
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      let nextVal = 0;

      if (selectedChannel === 'siphon_pressure') {
        const jitter = (Math.random() - 0.5) * 3.5;
        nextVal = Math.max(10, Math.min(310, siphonPressureKpa + jitter));
      } else if (selectedChannel === 'rpm') {
        const jitter = (Math.random() - 0.5) * 2.0;
        nextVal = Math.max(0, nominalRpm + jitter);
      } else if (selectedChannel === 'solar_kw') {
        nextVal = 440 + Math.sin(Date.now() / 2000) * 45;
      } else {
        nextVal = 2.85 + Math.sin(Date.now() / 3000) * 0.12;
      }

      historyRef.current.push(nextVal);
      if (historyRef.current.length > 50) {
        historyRef.current.shift();
      }

      renderCanvas();
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, selectedChannel, siphonPressureKpa, nominalRpm]);

  // Redraw when channel or pressure changes
  useEffect(() => {
    renderCanvas();
  }, [selectedChannel, siphonPressureKpa]);

  const handlePressureChange = (val: number) => {
    setSiphonPressureKpa(val);
    haptics.digitalTwinTick();

    const evalResult = evaluateSiphonPressure(val);
    if (evalResult.status === 'CRITICAL_ERROR') {
      sound.playLockHiss();
      haptics.heavy();
    } else if (evalResult.status === 'WARNING') {
      haptics.medium();
    } else if (evalResult.status === 'STABLE') {
      haptics.light();
    }
  };

  const getStatusBadge = (status: SiphonEvaluation['status']) => {
    switch (status) {
      case 'STABLE':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/60';
      case 'WARNING':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/60';
      case 'ALERT':
        return 'bg-orange-950/80 text-orange-300 border-orange-500/60';
      case 'CRITICAL_ERROR':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/60 animate-pulse';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
            <LineChart className="w-3.5 h-3.5 text-cyan-400" />
            HTML5 Canvas Pipeline (metrics_panel.js)
          </span>
          <h2 className="text-base font-heading tracking-wide text-white leading-tight">
            Live Telemetry Charts
          </h2>
        </div>

        <button
          onClick={() => {
            sound.playPageClick();
            haptics.medium();
            setIsRunning(!isRunning);
          }}
          className={`p-1.5 px-2.5 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
            isRunning
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
              : 'bg-amber-500/20 text-amber-300 border-amber-500/50'
          }`}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isRunning ? 'LIVE STREAM' : 'PAUSED'}</span>
        </button>
      </div>

      {/* Channel Selector Ribbon */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {[
          { id: 'siphon_pressure', label: 'Siphon Pressure (kPa)', icon: Droplet },
          { id: 'rpm', label: 'Ghatiyantra (RPM)', icon: Activity },
          { id: 'solar_kw', label: 'Solar Canopy (kW)', icon: Zap },
          { id: 'channel_depth', label: 'Channel Depth (m)', icon: Ship },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = selectedChannel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setSelectedChannel(tab.id as typeof selectedChannel);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Live Canvas Viewport Container */}
      <div className="p-3">
        <div className="rounded-xl border border-slate-800 bg-[#0a0f1d] overflow-hidden shadow-2xl relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={220}
            className="w-full h-56 block select-none"
          />

          <div className="px-3 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <span>50-Point Ring Buffer</span>
            <span className="text-cyan-400">Salipur Axis Reach Telemetry</span>
          </div>
        </div>
      </div>

      {/* Siphon Pressure Verification Panel (hydrology.py Integration) */}
      <div className="px-3 space-y-3">
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Siphon Hydrostatic Verification (hydrology.py)
              </h3>
            </div>

            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${getStatusBadge(siphonStatus.status)}`}>
              {siphonStatus.code}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
            {siphonStatus.message}
          </div>

          {/* Interactive Siphon Pressure Slider */}
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-300 mb-1.5">
              <span>Under-Riverbed Operational Pressure:</span>
              <span className={`font-bold ${siphonPressureKpa < 45 || siphonPressureKpa >= 280 ? 'text-rose-400' : 'text-cyan-400'}`}>
                {siphonPressureKpa.toFixed(1)} kPa
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="320"
              step="1"
              value={siphonPressureKpa}
              onChange={e => handlePressureChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
              <span className="text-rose-400">&lt;45 (Silt Hazard)</span>
              <span>85-165 (Optimal)</span>
              <span className="text-rose-400">&gt;280 (Overload)</span>
            </div>
          </div>
        </div>

        {/* Quick Reference Calibration Bounds */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block mb-0.5">LOW SILTATION LIMIT</span>
            <span className="text-rose-400 font-bold">45.0 kPa</span>
            <span className="text-slate-400 block text-[9px]">Flow velocity stalls</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block mb-0.5">OPTIMAL WORKING BAND</span>
            <span className="text-emerald-400 font-bold">85.0 - 165.0 kPa</span>
            <span className="text-slate-400 block text-[9px]">Torricelli balance</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block mb-0.5">MONSOON SURGE LIMIT</span>
            <span className="text-amber-400 font-bold">165.0 - 280.0 kPa</span>
            <span className="text-slate-400 block text-[9px]">Open side pockets</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block mb-0.5">CRITICAL BURST LIMIT</span>
            <span className="text-rose-400 font-bold">280.0 kPa</span>
            <span className="text-slate-400 block text-[9px]">Divert to deep aquifer</span>
          </div>
        </div>
      </div>
    </div>
  );
};
