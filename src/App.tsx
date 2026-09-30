import React, { useState, useEffect } from 'react';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import { GraphicNovelReader } from './components/GraphicNovelReader';
import { InteractiveSchematic } from './components/InteractiveSchematic';
import { DigitalTwinEngine } from './components/DigitalTwinEngine';
import { PhysicsValidationConsole } from './components/PhysicsValidationConsole';
import { TelemetryCharts } from './components/TelemetryCharts';
import { HardwareCadVault } from './components/HardwareCadVault';
import { ClueVault } from './components/ClueVault';
import { HydraulicSimulation } from './components/HydraulicSimulation';
import { NOVEL_CHAPTERS } from './data/novelData';
import { sound } from './utils/audio';
import { haptics } from './utils/haptics';
import { Language, TRANSLATIONS } from './utils/i18n';
import { 
  BookOpen, 
  Compass, 
  Cpu, 
  Calculator, 
  Wrench, 
  FolderLock, 
  Languages, 
  Sparkles, 
  ChevronRight, 
  Sliders, 
  Vibrate, 
  VibrateOff,
  LineChart
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'story' | 'schematic' | 'twin' | 'charts' | 'physics' | 'cad' | 'dossier' | 'simulation'>('twin');
  const [currentChapterId, setCurrentChapterId] = useState<string>('prologue');
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [hapticsOn, setHapticsOn] = useState<boolean>(true);

  const t = TRANSLATIONS[currentLang];

  const [unlockedClues, setUnlockedClues] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('belapokhori_clues');
      return saved ? JSON.parse(saved) : ['clue-resonance', 'clue-bronze-ring'];
    } catch {
      return ['clue-resonance', 'clue-bronze-ring'];
    }
  });

  const [showPatentBriefing, setShowPatentBriefing] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('belapokhori_clues', JSON.stringify(unlockedClues));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [unlockedClues]);

  const handleUnlockClue = (clueId: string) => {
    if (!unlockedClues.includes(clueId)) {
      setUnlockedClues(prev => [...prev, clueId]);
    }
  };

  const handleSelectNodeInStory = (nodeId: string) => {
    for (const chap of NOVEL_CHAPTERS) {
      const match = chap.panels.find(p => p.schematicNodeId === nodeId);
      if (match) {
        setCurrentChapterId(chap.id);
        setActiveTab('story');
        return;
      }
    }
    setActiveTab('story');
  };

  const toggleHapticsMode = () => {
    const next = !hapticsOn;
    haptics.enabled = next;
    setHapticsOn(next);
    sound.playPageClick();
    if (next) haptics.light();
  };

  return (
    <MobileFrameWrapper>
      <div className="relative w-full h-full flex flex-col bg-[#02050e] overflow-hidden select-none">
        
        {/* Top Localization, Haptic Status & Patent Header Bar */}
        <div className="px-3.5 py-1.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center justify-between z-30 shrink-0 text-xs">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold truncate max-w-[130px]">SALIPUR, ODISHA</span>
            
            {/* Quick 3D Twin vs Charts toggle */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab(activeTab === 'charts' ? 'twin' : 'charts');
              }}
              className={`px-1.5 py-0.5 rounded text-[10px] border flex items-center gap-1 ${
                activeTab === 'charts' 
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' 
                  : 'bg-slate-900 text-cyan-300 border-cyan-500/40 hover:bg-slate-800'
              }`}
              title="Toggle Live Telemetry Charts (metrics_panel.js)"
            >
              <LineChart className="w-3 h-3" />
              <span>{activeTab === 'charts' ? '3D' : 'Charts'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Haptic Feedback Toggle (Vibration API Indicator) */}
            <button
              onClick={toggleHapticsMode}
              className={`p-1 rounded text-xs transition-colors flex items-center gap-1 ${
                hapticsOn 
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40' 
                  : 'bg-slate-900 text-slate-500 border border-slate-800'
              }`}
              title={hapticsOn ? 'Haptic Vibration Feedback: Enabled' : 'Haptic Vibration Feedback: Disabled'}
            >
              {hapticsOn ? <Vibrate className="w-3.5 h-3.5" /> : <VibrateOff className="w-3.5 h-3.5" />}
              <span className="text-[10px] font-mono hidden sm:inline">{hapticsOn ? 'HAPTIC' : 'OFF'}</span>
            </button>

            {/* Multilingual Switcher: EN / OR (ଓଡ଼ିଆ) / HI (हिन्दी) */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-slate-900 border border-slate-800">
              {(['en', 'or', 'hi'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    sound.playPageClick();
                    haptics.light();
                    setCurrentLang(lang);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors uppercase ${
                    currentLang === lang
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'en' ? 'EN' : lang === 'or' ? 'ଓଡ଼ିଆ' : 'हिन्दी'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Viewport Content Area */}
        <div className="flex-1 w-full h-full overflow-hidden">
          {activeTab === 'twin' && (
            <DigitalTwinEngine currentLang={currentLang} />
          )}

          {activeTab === 'charts' && (
            <TelemetryCharts currentLang={currentLang} />
          )}

          {activeTab === 'physics' && (
            <PhysicsValidationConsole currentLang={currentLang} />
          )}

          {activeTab === 'cad' && (
            <HardwareCadVault currentLang={currentLang} />
          )}

          {activeTab === 'story' && (
            <GraphicNovelReader
              chapters={NOVEL_CHAPTERS}
              currentChapterId={currentChapterId}
              onChapterChange={id => setCurrentChapterId(id)}
              unlockedClues={unlockedClues}
              onUnlockClue={handleUnlockClue}
              onOpenSchematic={() => setActiveTab('schematic')}
            />
          )}

          {activeTab === 'schematic' && (
            <InteractiveSchematic
              onSelectNodeInStory={handleSelectNodeInStory}
              unlockedClues={unlockedClues}
            />
          )}

          {activeTab === 'dossier' && (
            <ClueVault
              unlockedClues={unlockedClues}
              onUnlockClue={handleUnlockClue}
            />
          )}

          {activeTab === 'simulation' && (
            <HydraulicSimulation
              onUnlockClue={handleUnlockClue}
              unlockedClues={unlockedClues}
            />
          )}
        </div>

        {/* Bottom Mobile Tab Bar (Ergonomic Touch Pattern with Vibration Feedback) */}
        <nav
          aria-label="Mobile Navigation"
          className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800/80 px-1 py-1 shadow-2xl"
          style={{ height: '62px' }}
        >
          <div className="grid grid-cols-6 items-center h-full max-w-[430px] mx-auto">
            {/* Tab 1: 3D Digital Twin */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab('twin');
              }}
              className={`min-h-[46px] min-w-[38px] flex flex-col items-center justify-center transition-colors ${
                activeTab === 'twin' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Cpu className={`w-4 h-4 ${activeTab === 'twin' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-medium tracking-tight mt-1">{t.tabTwin}</span>
            </button>

            {/* Tab 2: Physics Validator */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab('physics');
              }}
              className={`min-h-[46px] min-w-[38px] flex flex-col items-center justify-center transition-colors ${
                activeTab === 'physics' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Calculator className={`w-4 h-4 ${activeTab === 'physics' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-medium tracking-tight mt-1">{t.tabPhysics}</span>
            </button>

            {/* Tab 3: Graphic Novel */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab('story');
              }}
              className={`min-h-[46px] min-w-[38px] flex flex-col items-center justify-center transition-colors ${
                activeTab === 'story' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'story' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-medium tracking-tight mt-1">{t.tabNovel}</span>
            </button>

            {/* Tab 4: Isometric Cutaway */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab('schematic');
              }}
              className={`min-h-[46px] min-w-[38px] flex flex-col items-center justify-center transition-colors ${
                activeTab === 'schematic' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Compass className={`w-4 h-4 ${activeTab === 'schematic' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-medium tracking-tight mt-1">{t.tabCutaway}</span>
            </button>

            {/* Tab 5: CAD & SQL */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab('cad');
              }}
              className={`min-h-[46px] min-w-[38px] flex flex-col items-center justify-center transition-colors ${
                activeTab === 'cad' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Wrench className={`w-4 h-4 ${activeTab === 'cad' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-medium tracking-tight mt-1">{t.tabCad}</span>
            </button>

            {/* Tab 6: Dossier */}
            <button
              onClick={() => {
                sound.playPageClick();
                haptics.light();
                setActiveTab('dossier');
              }}
              className={`min-h-[46px] min-w-[38px] flex flex-col items-center justify-center transition-colors ${
                activeTab === 'dossier' ? 'text-cyan-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <FolderLock className={`w-4 h-4 ${activeTab === 'dossier' ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] font-medium tracking-tight mt-1">{t.tabDossier}</span>
            </button>
          </div>
        </nav>
      </div>
    </MobileFrameWrapper>
  );
}
