import React, { useState } from 'react';
import { SCHEMATIC_NODES } from '../data/novelData';
import { SchematicNode } from '../types';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  Waves, 
  Zap, 
  Layers, 
  Eye, 
  Info, 
  Compass, 
  Radio, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react';

interface Props {
  onSelectNodeInStory?: (nodeId: string) => void;
  unlockedClues: string[];
}

export const InteractiveSchematic: React.FC<Props> = ({ onSelectNodeInStory, unlockedClues }) => {
  const [selectedNode, setSelectedNode] = useState<SchematicNode | null>(SCHEMATIC_NODES[2]); // Default to Stepwell
  const [viewFilter, setViewFilter] = useState<'all' | 'surface' | 'subterranean' | 'ancient' | 'energy'>('all');
  const [showFlowSimulation, setShowFlowSimulation] = useState<boolean>(true);
  const [activeXRay, setActiveXRay] = useState<boolean>(false);

  const filteredNodes = SCHEMATIC_NODES.filter(node => 
    viewFilter === 'all' ? true : node.category === viewFilter
  );

  const handleNodeClick = (node: SchematicNode) => {
    sound.playPageClick();
    if (node.category === 'ancient') {
      sound.playAncientGong();
      haptics.ancientPulse();
    } else if (node.category === 'subterranean') {
      sound.playWaterDrip();
      haptics.siphonFlow();
    } else if (node.category === 'energy') {
      sound.playMaglevWhoosh();
      haptics.medium();
    } else {
      haptics.light();
    }
    setSelectedNode(node);
  };

  return (
    <div className="flex flex-col h-full bg-[#050811] text-slate-100 overflow-y-auto pb-24">
      {/* Top Controls & Mode Switcher */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <span className="text-[11px] font-mono tracking-wider text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Structural Cross-Section Matrix
            </span>
            <h2 className="text-lg font-heading tracking-wide text-white leading-tight">
              Belapokhori-Nexus Cutaway
            </h2>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                sound.playPageClick();
                if (!activeXRay) {
                  sound.playAncientGong();
                  haptics.ancientPulse();
                } else {
                  haptics.light();
                }
                setActiveXRay(!activeXRay);
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors flex items-center gap-1 ${
                activeXRay 
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{activeXRay ? 'Ancient Radar' : 'Modern'}</span>
            </button>
            <button
              onClick={() => {
                sound.playPageClick();
                if (!showFlowSimulation) {
                  sound.playWaterDrip();
                  haptics.siphonFlow();
                } else {
                  haptics.light();
                }
                setShowFlowSimulation(!showFlowSimulation);
              }}
              className={`p-1.5 rounded border transition-colors ${
                showFlowSimulation
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-900 text-slate-400 border-slate-800'
              }`}
              title="Toggle Live Hydro-Flow"
            >
              <Waves className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Filter categories as unboxed buttons */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {[
            { id: 'all', label: 'All 10 Sectors' },
            { id: 'surface', label: 'Surface Port & Rail' },
            { id: 'subterranean', label: 'Sub-River Siphons' },
            { id: 'ancient', label: 'Ancient Stepwell' },
            { id: 'energy', label: 'Kinetic & Turbines' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                sound.playPageClick();
                setViewFilter(tab.id as typeof viewFilter);
              }}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                viewFilter === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive Isometric Diagram Canvas */}
      <div className="relative mx-3 mt-3 rounded-xl border border-cyan-500/30 overflow-hidden bg-gradient-to-b from-[#080d1a] to-[#04060c] shadow-2xl shadow-cyan-950/30">
        {/* Background Grid & Watermark-Free Blueprint Texture */}
        <div className="absolute inset-0 blueprint-grid opacity-60 pointer-events-none" />

        {/* SVG Schematic Render representing the user's Belapokhori-Nexus Project diagram */}
        <div className="relative w-full aspect-[16/10] min-h-[280px]">
          <svg
            viewBox="0 0 1000 620"
            className="w-full h-full object-cover select-none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="solarCanopyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#818cf8" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.85" />
              </linearGradient>

              <linearGradient id="groundBedrockGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3f2e21" />
                <stop offset="40%" stopColor="#251a14" />
                <stop offset="100%" stopColor="#120c09" />
              </linearGradient>

              <linearGradient id="aquiferGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0369a1" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#082f49" stopOpacity="0.95" />
              </linearGradient>

              <linearGradient id="ancientStoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="50%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" />
              </linearGradient>

              <pattern id="gravelPattern" width="12" height="12" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#94a3b8" opacity="0.4" />
                <circle cx="8" cy="7" r="2" fill="#cbd5e1" opacity="0.5" />
                <circle cx="4" cy="10" r="1" fill="#64748b" opacity="0.3" />
                <circle cx="10" cy="3" r="1.2" fill="#06b6d4" opacity="0.6" />
              </pattern>

              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* SKY & HORIZON: Seaport & Regional Airport */}
            <rect x="0" y="0" width="1000" height="150" fill="#0c162c" />
            <line x1="0" y1="150" x2="1000" y2="150" stroke="#1e293b" strokeWidth="1.5" />

            {/* Distant Seaport Horizon with Cargo Cranes & Ships */}
            <g opacity="0.6">
              <path d="M120 70 L280 70 L340 120 L60 120 Z" fill="#0f2648" />
              {/* Distant ships */}
              <rect x="180" y="90" width="60" height="14" rx="2" fill="#334155" />
              <rect x="250" y="85" width="45" height="12" rx="2" fill="#475569" />
              <rect x="200" y="76" width="12" height="14" fill="#0284c7" />
              {/* Regional Airport runway line */}
              <line x1="450" y1="90" x2="620" y2="80" stroke="#64748b" strokeWidth="3" strokeDasharray="6 4" />
              {/* Aircraft silhouette */}
              <path d="M470 65 L485 70 L470 75 L474 70 Z" fill="#94a3b8" />
              <text x="495" y="70" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">REGIONAL AIRPORT</text>
              <text x="140" y="65" fill="#38bdf8" fontSize="10" fontFamily="sans-serif">GLOBAL SEAPORT</text>
            </g>

            {/* RAIL & ROAD ARTERY */}
            <path d="M60 170 L980 135 L960 185 L50 220 Z" fill="#1e293b" />
            {/* Road lines */}
            <line x1="70" y1="180" x2="970" y2="145" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="12 8" />
            <line x1="60" y1="205" x2="960" y2="170" stroke="#e2e8f0" strokeWidth="1.2" strokeDasharray="8 6" />

            {/* Heavy-Freight Railway dual-track */}
            <path d="M50 220 L960 170 L950 205 L40 255 Z" fill="#0f172a" />
            <line x1="55" y1="228" x2="955" y2="178" stroke="#94a3b8" strokeWidth="2.5" />
            <line x1="50" y1="234" x2="950" y2="184" stroke="#94a3b8" strokeWidth="2.5" />
            {/* Animated freight train on rail */}
            <g>
              <rect x="220" y="200" width="180" height="22" rx="3" fill="#ea580c" />
              <rect x="225" y="204" width="30" height="14" fill="#f97316" />
              <rect x="260" y="204" width="35" height="14" fill="#0284c7" />
              <rect x="300" y="204" width="35" height="14" fill="#059669" />
              <rect x="340" y="204" width="40" height="14" fill="#eab308" />
            </g>

            {/* OPEN INLAND WATERWAY (Right half) */}
            <path d="M480 180 L960 170 L930 430 L420 440 Z" fill="url(#waterGrad)" />
            {/* Water flow ripples */}
            <path d="M500 240 Q 650 230 800 240 T 940 235" stroke="#38bdf8" strokeWidth="1" opacity="0.4" fill="none" />
            <path d="M480 320 Q 640 310 820 325 T 920 315" stroke="#38bdf8" strokeWidth="1.2" opacity="0.5" fill="none" />

            {/* Cargo Container Ship on Inland Waterway */}
            <g transform="translate(620, 260) rotate(-2)">
              <path d="M0 20 L25 5 L160 5 L180 20 L160 40 L25 40 Z" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
              {/* Containers */}
              <rect x="35" y="10" width="22" height="12" fill="#ef4444" rx="1" />
              <rect x="60" y="10" width="22" height="12" fill="#3b82f6" rx="1" />
              <rect x="85" y="10" width="22" height="12" fill="#10b981" rx="1" />
              <rect x="110" y="10" width="22" height="12" fill="#f59e0b" rx="1" />
              <rect x="35" y="24" width="22" height="12" fill="#6366f1" rx="1" />
              <rect x="60" y="24" width="22" height="12" fill="#14b8a6" rx="1" />
              <rect x="85" y="24" width="22" height="12" fill="#ec4899" rx="1" />
              {/* Bridge */}
              <rect x="135" y="12" width="18" height="22" fill="#e2e8f0" rx="1" />
              <circle cx="148" cy="18" r="2" fill="#0284c7" />
            </g>

            {/* SOLAR-CANOPY MAG-LEV TRACKS (Center-Left) */}
            <g>
              {/* Arched glass canopy */}
              <path 
                d="M130 330 C 130 250, 480 220, 480 290 L 830 230 C 830 180, 520 190, 520 250 Z" 
                fill="url(#solarCanopyGrad)" 
                opacity="0.85" 
                stroke="#38bdf8" 
                strokeWidth="1.5" 
              />
              {/* Solar cell grid lines on canopy */}
              <path d="M180 270 L 530 220" stroke="#bae6fd" strokeWidth="0.8" opacity="0.6" />
              <path d="M230 280 L 580 230" stroke="#bae6fd" strokeWidth="0.8" opacity="0.6" />
              <path d="M280 290 L 630 240" stroke="#bae6fd" strokeWidth="0.8" opacity="0.6" />
              <path d="M330 300 L 680 250" stroke="#bae6fd" strokeWidth="0.8" opacity="0.6" />
              {/* Maglev train inside canopy */}
              <rect x="240" y="285" width="140" height="16" rx="8" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" filter="url(#glowEffect)" />
              <line x1="250" y1="293" x2="360" y2="293" stroke="#38bdf8" strokeWidth="2" />
            </g>

            {/* SUB-SURFACE CROSS-SECTION CUTAWAY (Bottom Left & Center) */}
            {/* Earth / Bedrock strata */}
            <path d="M50 360 L450 320 L450 610 L50 610 Z" fill="url(#groundBedrockGrad)" />
            <path d="M450 320 L960 300 L950 610 L450 610 Z" fill="#1e1814" />

            {/* DEEP AQUIFER RECHARGING HUB (Bottom Deep Stratum) */}
            <rect x="50" y="490" width="400" height="110" fill="url(#aquiferGrad)" opacity="0.9" />
            <line x1="50" y1="490" x2="450" y2="490" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />

            {/* ANCIENT STEPWELL (The heart of the mystery!) */}
            <g transform="translate(240, 340)">
              {/* Stepped well pyramid cutaway */}
              <polygon points="0,0 180,0 150,150 30,150" fill="url(#ancientStoneGrad)" stroke="#f59e0b" strokeWidth="2" />
              {/* Concentric carved steps */}
              <polygon points="12,12 168,12 142,138 38,138" fill="#5c2605" stroke="#d97706" strokeWidth="1.2" />
              <polygon points="24,24 156,24 134,126 46,126" fill="#451a03" stroke="#b45309" strokeWidth="1.2" />
              <polygon points="36,36 144,36 126,114 54,114" fill="#2d1202" stroke="#d97706" strokeWidth="1" />
              {/* Deep water reservoir pool at bottom of stepwell */}
              <rect x="50" y="90" width="80" height="50" fill="#0284c7" opacity="0.85" />
              <text x="60" y="115" fill="#fef08a" fontSize="11" fontFamily="serif" fontWeight="bold">STEPWELL</text>
              {activeXRay && (
                <text x="45" y="132" fill="#38bdf8" fontSize="9" fontFamily="monospace">9-TIER VAPI MATRIX</text>
              )}
            </g>

            {/* UNDER-RIVERBED SIPHON PIPELINES */}
            <g>
              {/* Siphon tube running under the riverbed */}
              <path
                d="M400 480 C 400 560, 680 570, 720 440"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M400 480 C 400 560, 680 570, 720 440"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="6"
                className={showFlowSimulation ? 'animate-water-flow' : ''}
              />
              {/* Siphon junction pump / bronze ring collar */}
              <circle cx="560" cy="540" r="14" fill="#b45309" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="560" cy="540" r="6" fill="#06b6d4" />
            </g>

            {/* HYPORHEIC GRAVEL FILTER BED */}
            <g transform="translate(680, 420)">
              <polygon points="0,0 240,0 210,100 30,100" fill="url(#gravelPattern)" stroke="#64748b" strokeWidth="1.5" />
              <text x="45" y="55" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif" fontWeight="bold">
                HYPORHEIC GRAVEL BED
              </text>
            </g>

            {/* LOCK DEPTH STABILIZATION UNIT & DROP CHANNELS */}
            <g transform="translate(790, 210)">
              <rect x="0" y="0" width="45" height="110" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="3" />
              <rect x="8" y="15" width="29" height="35" fill="#0284c7" opacity="0.8" />
              <rect x="8" y="58" width="29" height="40" fill="#0369a1" opacity="0.9" />
              {/* Hydro drop pipe */}
              <line x1="22" y1="110" x2="22" y2="180" stroke="#06b6d4" strokeWidth="4" />
            </g>

            {/* KINETIC ENERGY CONVERSION SYSTEM / GHATIYANTRA (Immediate Bank Line on Far Left) */}
            <g transform="translate(60, 180)">
              {/* Outer bankline enclosure & transmission chamber */}
              <rect x="0" y="0" width="85" height="58" rx="5" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.8" />
              
              {/* Ghatiyantra rotating water wheel with 8 visible spokes and perimeter pots */}
              <circle cx="36" cy="28" r="22" fill="#1e293b" stroke="#d97706" strokeWidth="1.5" />
              <line x1="36" y1="6" x2="36" y2="50" stroke="#94a3b8" strokeWidth="1" />
              <line x1="14" y1="28" x2="58" y2="28" stroke="#94a3b8" strokeWidth="1" />
              <line x1="20" y1="12" x2="52" y2="44" stroke="#94a3b8" strokeWidth="1" />
              <line x1="20" y1="44" x2="52" y2="12" stroke="#94a3b8" strokeWidth="1" />
              {/* Catchment pots on wheel rim */}
              <circle cx="36" cy="7" r="3.5" fill="#f59e0b" />
              <circle cx="36" cy="49" r="3.5" fill="#f59e0b" />
              <circle cx="15" cy="28" r="3.5" fill="#f59e0b" />
              <circle cx="57" cy="28" r="3.5" fill="#f59e0b" />
              <circle cx="21" cy="13" r="3" fill="#f59e0b" />
              <circle cx="51" cy="43" r="3" fill="#f59e0b" />
              
              {/* Underground combined urban sewerage outfall transmission channel */}
              <path d="M 0 46 L 24 46 L 24 38 L 36 38" fill="none" stroke="#10b981" strokeWidth="2.5" strokeDasharray="3 2" />
              
              {/* Micro label */}
              <text x="5" y="54" fill="#fcd34d" fontSize="6.5" fontFamily="monospace" fontWeight="bold">GHATIYANTRA KINETIC</text>
            </g>

            {/* INTEGRATED PUMP STATION & ALTERNATOR (Bottom Right) */}
            <g transform="translate(840, 480)">
              <circle cx="30" cy="30" r="28" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              <circle cx="30" cy="30" r="14" fill="#0f172a" />
              {/* Rotor vanes */}
              <line x1="30" y1="16" x2="30" y2="44" stroke="#38bdf8" strokeWidth="3" />
              <line x1="16" y1="30" x2="44" y2="30" stroke="#38bdf8" strokeWidth="3" />
              <rect x="58" y="15" width="40" height="30" rx="3" fill="#6b21a8" stroke="#c084fc" strokeWidth="1.5" />
            </g>

            {/* WATER FLOW PARTICLES WHEN SIMULATION IS ON */}
            {showFlowSimulation && (
              <g opacity="0.8">
                <circle cx="430" cy="520" r="3" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '2s' }} />
                <circle cx="560" cy="540" r="3" fill="#67e8f9" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                <circle cx="700" cy="480" r="3" fill="#a5f3fc" className="animate-ping" style={{ animationDuration: '1.8s' }} />
                <circle cx="280" cy="540" r="4" fill="#38bdf8" className="animate-ping" style={{ animationDuration: '3s' }} />
              </g>
            )}

            {/* INTERACTIVE CLICKABLE HOTSPOTS */}
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              const hasClue = node.clueId && unlockedClues.includes(node.clueId);

              // Map node percentage to 1000x620 coordinate space
              const cx = (node.xPercent / 100) * 1000;
              const cy = (node.yPercent / 100) * 620;

              return (
                <g 
                  key={node.id} 
                  className="cursor-pointer transition-transform duration-200"
                  onClick={() => handleNodeClick(node)}
                >
                  {/* Outer pulsing beacon ring */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 18 : 12}
                    fill={node.category === 'ancient' ? '#f59e0b' : node.category === 'energy' ? '#eab308' : '#06b6d4'}
                    opacity={isSelected ? 0.35 : 0.2}
                    className="animate-pulse"
                  />
                  {/* Inner node marker */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 8 : 6}
                    fill={node.category === 'ancient' ? '#f59e0b' : '#38bdf8'}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                  {/* Node label box */}
                  <g transform={`translate(${cx + 12}, ${cy - 12})`}>
                    <rect
                      x="0"
                      y="0"
                      width={node.name.length * 6.2 + 16}
                      height="18"
                      rx="3"
                      fill={isSelected ? '#0f172a' : 'rgba(15, 23, 42, 0.85)'}
                      stroke={isSelected ? '#38bdf8' : 'rgba(100, 116, 139, 0.4)'}
                      strokeWidth={isSelected ? 1.5 : 0.8}
                    />
                    <text
                      x="6"
                      y="13"
                      fill={isSelected ? '#38bdf8' : '#f1f5f9'}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {node.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Live Legend bar on bottom of diagram */}
        <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Modern Surface
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" /> Ancient Stepwell
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-400" /> Siphon Conduits
            </span>
          </div>
          <span className="text-cyan-400 font-semibold">10 Hotspots Active</span>
        </div>
      </div>

      {/* Selected Node Detailed Inspector Modal / Card */}
      {selectedNode && (
        <div className="mx-3 mt-3 p-4 rounded-xl border border-slate-800 bg-slate-900/95 shadow-xl relative">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span className="uppercase">{selectedNode.category} Sector</span>
                <span>·</span>
                <span>ID: {selectedNode.id}</span>
              </div>
              <h3 className="text-base font-bold text-white font-heading tracking-wide">
                {selectedNode.name}
              </h3>
            </div>
            
            <button
              onClick={() => setSelectedNode(null)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close inspector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {selectedNode.shortDesc}
          </p>

          {/* Dual Duality: Surface Engineering vs Ancient Subterranean Secret */}
          <div className="space-y-2 mb-3">
            <div className="p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/20">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 font-semibold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Surface Engineering Reality</span>
              </div>
              <p className="text-xs text-slate-300">
                {selectedNode.surfaceTech}
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-400 font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Subterranean Ancient Mystery</span>
              </div>
              <p className="text-xs text-amber-200/90 italic">
                {selectedNode.ancientSecret}
              </p>
            </div>
          </div>

          {/* Lore quote */}
          <div className="p-2.5 rounded-lg bg-slate-950/50 border-l-2 border-cyan-400 text-xs text-cyan-200/80 italic font-ancient mb-3">
            {selectedNode.loreQuote}
          </div>

          {/* Technical Specs List */}
          <div className="grid grid-cols-3 gap-2 py-2 border-t border-slate-800/80 text-[11px] font-mono mb-3">
            {selectedNode.specifications.map((spec, i) => (
              <div key={i} className="p-1.5 rounded bg-slate-950/60 border border-slate-800">
                <div className="text-slate-500 text-[10px]">{spec.label}</div>
                <div className="text-slate-200 font-semibold truncate">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Action to Jump Directly into the Graphic Novel Panel */}
          {onSelectNodeInStory && (
            <button
              onClick={() => {
                sound.playPageClick();
                onSelectNodeInStory(selectedNode.id);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-slate-950 font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Scene in Graphic Novel</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
