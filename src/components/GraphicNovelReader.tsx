import React, { useState, useRef, useEffect } from 'react';
import { Chapter, NovelPanel, InteractiveClueTrigger } from '../types';
import { CHARACTERS } from '../data/novelData';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Compass, 
  Layers,
  HandMetal,
  BookOpen
} from 'lucide-react';

interface Props {
  chapters: Chapter[];
  currentChapterId: string;
  onChapterChange: (chapterId: string) => void;
  unlockedClues: string[];
  onUnlockClue: (clueId: string) => void;
  onOpenSchematic: (nodeId?: string) => void;
}

export const GraphicNovelReader: React.FC<Props> = ({
  chapters,
  currentChapterId,
  onChapterChange,
  unlockedClues,
  onUnlockClue,
  onOpenSchematic
}) => {
  const currentChapter = chapters.find(c => c.id === currentChapterId) || chapters[0];
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [chronoLensActive, setChronoLensActive] = useState<Record<string, boolean>>({});
  const [wipeProgress, setWipeProgress] = useState<Record<string, number>>({});
  const [alignAngle, setAlignAngle] = useState<Record<string, number>>({});
  const [activeInteractivePrompt, setActiveInteractivePrompt] = useState<string | null>(null);

  // Play ambient audio when changing panel/chapter
  useEffect(() => {
    const panel = currentChapter.panels[activePanelIndex];
    if (panel?.ambientSound === 'maglev') {
      sound.playMaglevWhoosh();
    } else if (panel?.ambientSound === 'ancient') {
      sound.playAncientGong();
    } else if (panel?.ambientSound === 'water') {
      sound.playWaterDrip();
    } else if (panel?.ambientSound === 'alarm') {
      sound.playLockHiss();
    }
  }, [activePanelIndex, currentChapter]);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundEnabled(sound.enabled);
    if (sound.enabled) {
      sound.playClueChime();
    }
  };

  const handleClueInteraction = (clue: InteractiveClueTrigger) => {
    if (unlockedClues.includes(clue.clueId)) return;

    if (clue.type === 'tap') {
      sound.playClueChime();
      haptics.clueUnlock();
      onUnlockClue(clue.clueId);
      setActiveInteractivePrompt(clue.unlockedMessage);
      setTimeout(() => setActiveInteractivePrompt(null), 3500);
    }
  };

  const handleWipe = (clue: InteractiveClueTrigger) => {
    const current = wipeProgress[clue.id] || 0;
    const next = Math.min(100, current + 25);
    setWipeProgress(prev => ({ ...prev, [clue.id]: next }));
    sound.playWaterDrip();
    haptics.light();

    if (next >= 100 && !unlockedClues.includes(clue.clueId)) {
      sound.playClueChime();
      haptics.clueUnlock();
      onUnlockClue(clue.clueId);
      setActiveInteractivePrompt(clue.unlockedMessage);
      setTimeout(() => setActiveInteractivePrompt(null), 3500);
    }
  };

  const handleAlignStep = (clue: InteractiveClueTrigger) => {
    const current = alignAngle[clue.id] || 0;
    const next = (current + 90) % 360;
    setAlignAngle(prev => ({ ...prev, [clue.id]: next }));
    sound.playLockHiss();
    haptics.medium();

    // 180 degrees is the aligned solve point
    if (next === 180 && !unlockedClues.includes(clue.clueId)) {
      sound.playAncientGong();
      sound.playClueChime();
      haptics.clueUnlock();
      onUnlockClue(clue.clueId);
      setActiveInteractivePrompt(clue.unlockedMessage);
      setTimeout(() => setActiveInteractivePrompt(null), 3500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Chapter Header Banner */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400">
            <span>CHAPTER {currentChapter.number}</span>
            <span>·</span>
            <span className="truncate max-w-[180px]">{currentChapter.location}</span>
          </div>
          <h1 className="text-base font-heading tracking-wide text-white leading-tight truncate">
            {currentChapter.title}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-lg border transition-colors ${
              soundEnabled
                ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
            title={soundEnabled ? 'Mute ambient SFX' : 'Enable ambient SFX'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Chapter Selection Pills (unboxed clean segmented buttons) */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {chapters.map(chap => {
          const isActive = chap.id === currentChapterId;
          return (
            <button
              key={chap.id}
              onClick={() => {
                sound.playPageClick();
                onChapterChange(chap.id);
                setActivePanelIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/70 border border-slate-800'
              }`}
            >
              Ch. {chap.number}: {chap.title}
            </button>
          );
        })}
      </div>

      {/* Clue Discovery Notification Overlay Toast */}
      {activeInteractivePrompt && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-cyan-950/90 border border-cyan-400/80 text-cyan-200 shadow-2xl flex items-center gap-2 text-xs font-mono animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
          <span>{activeInteractivePrompt}</span>
        </div>
      )}

      {/* Graphic Novel Panel Strip */}
      <div className="px-3 pt-3 space-y-6">
        {currentChapter.panels.map((panel, pIdx) => {
          const isChronoActive = chronoLensActive[panel.id];
          const hasClue = panel.interactiveClue;
          const isClueUnlocked = hasClue ? unlockedClues.includes(hasClue.clueId) : false;

          return (
            <div
              key={panel.id}
              className="rounded-2xl border-2 border-slate-800 overflow-hidden bg-slate-950 shadow-2xl relative transition-all duration-300 hover:border-cyan-500/40"
            >
              {/* Comic Panel Header / Metadata kicker */}
              <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800/90 flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-400 font-semibold tracking-wider uppercase">
                  SCENE {currentChapter.number}.{pIdx + 1} // {panel.sceneTitle}
                </span>
                <span className="text-slate-500">{panel.timeCode}</span>
              </div>

              {/* Parallax Comic Art Scene Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden select-none bg-[#090e1a]">
                {/* Background Art Layer with Halftone */}
                <div className={`absolute inset-0 bg-gradient-to-br ${panel.layers.background} comic-halftone`} />

                {/* Vector Graphic Scene Visuals */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {/* Dynamic Graphic Scene per Chapter/Panel */}
                  {panel.id === 'panel-0-1' && (
                    <div className="relative w-full h-full">
                      {/* Mag-lev solar archway vector */}
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        <path d="M 40 220 Q 200 40 360 220" fill="none" stroke="#0284c7" strokeWidth="8" />
                        <path d="M 40 220 Q 200 40 360 220" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" />
                        {/* Speeding Mag-Lev Train */}
                        <g className="animate-pulse">
                          <rect x="120" y="90" width="160" height="24" rx="12" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
                          <circle cx="140" cy="102" r="4" fill="#0284c7" />
                          <line x1="160" y1="102" x2="260" y2="102" stroke="#38bdf8" strokeWidth="3" />
                        </g>
                        {/* Speed lines */}
                        <line x1="20" y1="80" x2="100" y2="80" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
                        <line x1="60" y1="120" x2="110" y2="120" stroke="#38bdf8" strokeWidth="1.5" opacity="0.6" />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-0-2' && (
                    <div className="relative w-full h-full">
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        {/* Waterway and Cargo Ship */}
                        <rect x="0" y="80" width="400" height="160" fill="#0369a1" opacity="0.8" />
                        {/* Hydraulic suction vortexes under the water */}
                        <circle cx="200" cy="180" r="45" fill="none" stroke="#67e8f9" strokeWidth="2" strokeDasharray="8 4" className="animate-spin" style={{ transformOrigin: '200px 180px', animationDuration: '6s' }} />
                        <circle cx="200" cy="180" r="25" fill="none" stroke="#a5f3fc" strokeWidth="2" />
                        {/* Cargo freighter hull */}
                        <polygon points="80,100 320,100 290,140 110,140" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                        <rect x="130" y="70" width="30" height="30" fill="#ef4444" />
                        <rect x="170" y="70" width="30" height="30" fill="#f59e0b" />
                        <rect x="210" y="70" width="30" height="30" fill="#10b981" />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-1-1' && (
                    <div className="relative w-full h-full">
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        {/* Subterranean Siphon Pipe Cutaway */}
                        <rect x="20" y="60" width="360" height="120" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="3" />
                        {/* Interior bronze conduit */}
                        <path d="M 40 120 L 360 120" stroke="#b45309" strokeWidth="24" />
                        <path d="M 40 120 L 360 120" stroke="#38bdf8" strokeWidth="8" className="animate-water-flow" />
                        {/* Collar rivet seal */}
                        <rect x="180" y="90" width="40" height="60" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="2" />
                        <circle cx="200" cy="120" r="8" fill="#fef08a" />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-1-2' && (
                    <div className="relative w-full h-full">
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        {/* Torricellian Uphill Siphon Tube */}
                        <path d="M 60 220 Q 120 40 200 40 T 340 220" fill="none" stroke="#082f49" strokeWidth="32" />
                        <path d="M 60 220 Q 120 40 200 40 T 340 220" fill="none" stroke="#06b6d4" strokeWidth="18" />
                        <path d="M 60 220 Q 120 40 200 40 T 340 220" fill="none" stroke="#a5f3fc" strokeWidth="6" className="animate-water-flow" />
                        {/* Inspection glass with glowing water */}
                        <circle cx="200" cy="40" r="22" fill="#0f172a" stroke="#38bdf8" strokeWidth="3" />
                        <circle cx="200" cy="40" r="14" fill="#38bdf8" opacity="0.8" className="animate-pulse" />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-2-1' && (
                    <div className="relative w-full h-full">
                      {/* Ancient Subterranean Stepwell Inverted Pyramid */}
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        <polygon points="30,20 370,20 310,220 90,220" fill="#451a03" stroke="#b45309" strokeWidth="3" />
                        <polygon points="50,40 350,40 295,200 105,200" fill="#78350f" stroke="#d97706" strokeWidth="2" />
                        <polygon points="70,60 330,60 280,180 120,180" fill="#92400e" stroke="#f59e0b" strokeWidth="1.5" />
                        <polygon points="90,80 310,80 265,160 135,160" fill="#b45309" stroke="#fef08a" strokeWidth="1.5" />
                        {/* Luminous deep pool */}
                        <rect x="150" y="160" width="100" height="50" rx="4" fill="#0284c7" opacity="0.9" />
                        <circle cx="200" cy="185" r="14" fill="#38bdf8" opacity="0.6" className="animate-ping" style={{ animationDuration: '3s' }} />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-2-2' && (
                    <div className="relative w-full h-full">
                      {/* Stone Frieze with Sanskrit/Odia Hydrological Inscription */}
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        <rect x="30" y="30" width="340" height="180" rx="8" fill="#292524" stroke="#78350f" strokeWidth="3" />
                        {/* Stepped glyph geometry */}
                        <path d="M 60 180 L 100 180 L 100 140 L 140 140 L 140 100 L 180 100 L 180 60 L 220 60" stroke="#f59e0b" strokeWidth="3" fill="none" />
                        <path d="M 340 180 L 300 180 L 300 140 L 260 140 L 260 100 L 220 100 L 220 60" stroke="#f59e0b" strokeWidth="3" fill="none" />
                        <circle cx="200" cy="140" r="30" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 2" />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-3-1' && (
                    <div className="relative w-full h-full">
                      {/* Rainstorm and Monsoon Mesh */}
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        <rect x="0" y="0" width="400" height="240" fill="#0c1322" />
                        {/* Torrential monsoon rain lines */}
                        <line x1="50" y1="0" x2="30" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 12" />
                        <line x1="150" y1="0" x2="130" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 12" />
                        <line x1="250" y1="0" x2="230" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 12" />
                        <line x1="350" y1="0" x2="330" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 12" />
                        {/* Red warning vortex */}
                        <circle cx="200" cy="160" r="50" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="6 4" className="animate-spin" />
                      </svg>
                    </div>
                  )}

                  {panel.id === 'panel-3-2' && (
                    <div className="relative w-full h-full">
                      {/* Harmonic Awakening Nexus Core */}
                      <svg viewBox="0 0 400 240" className="w-full h-full">
                        <circle cx="200" cy="120" r="80" fill="#042f2e" stroke="#10b981" strokeWidth="4" />
                        <circle cx="200" cy="120" r="50" fill="#065f46" stroke="#34d399" strokeWidth="2" />
                        <circle cx="200" cy="120" r="25" fill="#6ee7b7" className="animate-ping" style={{ animationDuration: '2s' }} />
                        {/* Radiant harmonic waves */}
                        <circle cx="200" cy="120" r="110" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="8 8" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Chrono-Lens / Subterranean X-Ray Overlay */}
                {isChronoActive && panel.hasChronoLens && (
                  <div className="absolute inset-0 bg-amber-950/80 backdrop-blur-[2px] p-4 flex flex-col justify-end text-amber-200 border-2 border-amber-400/80 transition-all">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold mb-1">
                      <Eye className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span>CHRONO-SCAN ACTIVE // -28.4m SUB-AQUIFER LEVEL</span>
                    </div>
                    <p className="text-xs font-ancient leading-relaxed bg-black/60 p-2.5 rounded-lg border border-amber-500/40">
                      {panel.ancientLayerDescription}
                    </p>
                  </div>
                )}

                {/* Sound Effect Text Burst (*WHOOSH*, etc.) */}
                {panel.sfx?.map((sfxItem, sIdx) => (
                  <div
                    key={sIdx}
                    className={`absolute ${sfxItem.x} font-heading tracking-wider select-none text-stroke drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${sfxItem.color} ${
                      sfxItem.size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
                    }`}
                  >
                    {sfxItem.text}
                  </div>
                ))}

                {/* Chrono-Lens Toggle Button on Panel */}
                {panel.hasChronoLens && (
                  <button
                    onClick={() => {
                      sound.playPageClick();
                      if (!isChronoActive) {
                        sound.playAncientGong();
                        haptics.ancientPulse();
                      } else {
                        haptics.light();
                      }
                      setChronoLensActive(prev => ({ ...prev, [panel.id]: !prev[panel.id] }));
                    }}
                    className={`absolute top-3 right-3 px-2 py-1 rounded text-[11px] font-mono border backdrop-blur-md flex items-center gap-1 transition-all ${
                      isChronoActive
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-300'
                        : 'bg-slate-900/80 text-amber-300 border-amber-500/40 hover:bg-slate-800'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isChronoActive ? 'Exit X-Ray' : 'Chrono-Lens'}</span>
                  </button>
                )}

                {/* Link to Schematic */}
                {panel.schematicNodeId && (
                  <button
                    onClick={() => onOpenSchematic(panel.schematicNodeId)}
                    className="absolute top-3 left-3 px-2 py-1 rounded text-[11px] font-mono bg-slate-900/80 hover:bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 backdrop-blur-md transition-colors"
                  >
                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View Cutaway</span>
                  </button>
                )}
              </div>

              {/* Comic Narration Box (Standard Graphic Novel Caption Box) */}
              {panel.narration && (
                <div className="mx-3.5 mt-3 p-3 bg-slate-900 border-l-4 border-cyan-500 rounded-r-lg text-xs text-slate-300 leading-relaxed font-sans shadow-md">
                  {panel.narration}
                </div>
              )}

              {/* Dialogue Balloons with Characters */}
              {panel.dialogue && (
                <div className="p-3.5 space-y-2.5">
                  {panel.dialogue.map(d => {
                    const char = CHARACTERS[d.characterId] || {
                      name: 'Unknown',
                      role: 'Investigator',
                      avatar: '??',
                      badgeColor: 'text-slate-400 border-slate-700 bg-slate-900'
                    };

                    const isLeft = d.position === 'left';
                    const isCenter = d.position === 'center';

                    return (
                      <div
                        key={d.id}
                        className={`flex gap-2.5 items-start ${
                          isCenter ? 'justify-center' : isLeft ? 'justify-start' : 'justify-end flex-row-reverse'
                        }`}
                      >
                        {/* Character Badge Avatar */}
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-md ${char.badgeColor}`}
                          title={`${char.name} (${char.role})`}
                        >
                          {char.avatar}
                        </div>

                        {/* Speech Bubble Box */}
                        <div
                          className={`max-w-[82%] p-3 rounded-2xl text-xs leading-relaxed shadow-lg ${
                            isCenter
                              ? 'bg-amber-950/80 border border-amber-500/60 text-amber-200 text-center font-ancient'
                              : isLeft
                              ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
                              : 'bg-cyan-950/70 border border-cyan-500/40 text-cyan-100 rounded-tr-sm'
                          }`}
                        >
                          <div className="text-[10px] font-mono text-slate-400 font-semibold mb-0.5">
                            {char.name}
                          </div>
                          <p>{d.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Interactive Clue Trigger Widget inside Panel */}
              {hasClue && (
                <div className="m-3 p-3.5 rounded-xl border border-dashed border-cyan-500/50 bg-cyan-950/30">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                      Interactive Investigation Clue
                    </span>
                    {isClueUnlocked && (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Discovered
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mb-3">
                    {hasClue.prompt}
                  </p>

                  {/* Interactive Control based on clue type */}
                  {hasClue.type === 'tap' && (
                    <button
                      onClick={() => handleClueInteraction(hasClue)}
                      disabled={isClueUnlocked}
                      className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        isClueUnlocked
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-cyan-500 hover:bg-cyan-400 active:scale-[0.98] text-slate-950 shadow-md shadow-cyan-500/20'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isClueUnlocked ? 'Clue Added to Dossier' : 'Tap to Capture Telemetry'}</span>
                    </button>
                  )}

                  {hasClue.type === 'wipe' && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                        <span>Wipe Progress</span>
                        <span>{wipeProgress[hasClue.id] || 0}% Cleaned</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-900 border border-slate-800 overflow-hidden mb-2.5">
                        <div
                          className="h-full bg-cyan-400 transition-all duration-300"
                          style={{ width: `${wipeProgress[hasClue.id] || 0}%` }}
                        />
                      </div>
                      <button
                        onClick={() => handleWipe(hasClue)}
                        disabled={isClueUnlocked}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          isClueUnlocked
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                            : 'bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 shadow-md'
                        }`}
                      >
                        <HandMetal className="w-3.5 h-3.5" />
                        <span>{isClueUnlocked ? 'Bronze Seal Deciphered' : 'Scrape Corrosion Crust (Tap Repeatedly)'}</span>
                      </button>
                    </div>
                  )}

                  {hasClue.type === 'align' && (
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                        <span>Current Rotation</span>
                        <span>{alignAngle[hasClue.id] || 0}° / 180° Optimal</span>
                      </div>
                      <div className="flex items-center justify-center py-2">
                        <div
                          className="w-16 h-16 rounded-xl border-2 border-amber-500/80 bg-amber-950/60 flex items-center justify-center transition-transform duration-300 shadow-lg"
                          style={{ transform: `rotate(${alignAngle[hasClue.id] || 0}deg)` }}
                        >
                          <Compass className="w-8 h-8 text-amber-300" />
                        </div>
                      </div>
                      <button
                        onClick={() => handleAlignStep(hasClue)}
                        disabled={isClueUnlocked}
                        className={`w-full mt-2 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                          isClueUnlocked
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40 cursor-default'
                            : 'bg-amber-500 hover:bg-amber-400 active:scale-[0.98] text-slate-950 shadow-md'
                        }`}
                      >
                        <span>{isClueUnlocked ? 'Geometry Aligned' : 'Rotate Stepped Matrix (+90°)'}</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Chapter Bottom Navigation Bar */}
      <div className="p-4 flex items-center justify-between gap-3 mt-4 border-t border-slate-900 bg-slate-950/80">
        {currentChapter.number > 0 ? (
          <button
            onClick={() => {
              sound.playPageClick();
              const prev = chapters.find(c => c.number === currentChapter.number - 1);
              if (prev) onChapterChange(prev.id);
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
        ) : <div />}

        {currentChapter.number < chapters.length - 1 && (
          <button
            onClick={() => {
              sound.playPageClick();
              const next = chapters.find(c => c.number === currentChapter.number + 1);
              if (next) onChapterChange(next.id);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-[0.98]"
          >
            <span>Next Chapter</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
