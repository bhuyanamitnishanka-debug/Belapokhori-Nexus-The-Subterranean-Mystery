import React, { useState } from 'react';
import { CLUE_ITEMS } from '../data/novelData';
import { ClueItem } from '../types';
import { sound } from '../utils/audio';
import { haptics } from '../utils/haptics';
import { 
  FolderLock, 
  Unlock, 
  Lock, 
  Sparkles, 
  Activity, 
  Disc, 
  FileText, 
  FlaskConical, 
  Key, 
  ShieldAlert,
  HelpCircle,
  CheckCircle,
  Network
} from 'lucide-react';

interface Props {
  unlockedClues: string[];
  onUnlockClue: (clueId: string) => void;
  onOpenNovelAtChapter?: (chapterId: string) => void;
}

export const ClueVault: React.FC<Props> = ({ unlockedClues, onUnlockClue }) => {
  const [selectedClue, setSelectedClue] = useState<ClueItem>(CLUE_ITEMS[0]);
  const [cipherInput, setCipherInput] = useState('');
  const [cipherError, setCipherError] = useState(false);
  const [showNexusWeb, setShowNexusWeb] = useState(false);

  const getIcon = (name: string, size = 18) => {
    switch (name) {
      case 'Activity': return <Activity size={size} />;
      case 'Disc': return <Disc size={size} />;
      case 'FileText': return <FileText size={size} />;
      case 'FlaskConical': return <FlaskConical size={size} />;
      case 'Key': return <Key size={size} />;
      case 'ShieldAlert': return <ShieldAlert size={size} />;
      default: return <Sparkles size={size} />;
    }
  };

  const handleCipherSubmit = (clue: ClueItem) => {
    if (!clue.cipherCode) return;
    if (cipherInput.trim().toUpperCase() === clue.cipherCode.toUpperCase()) {
      sound.playAncientGong();
      sound.playClueChime();
      haptics.clueUnlock();
      onUnlockClue(clue.id);
      setCipherError(false);
      setCipherInput('');
    } else {
      sound.playLockHiss();
      haptics.heavy();
      setCipherError(true);
      setTimeout(() => setCipherError(false), 2000);
    }
  };

  const unlockedCount = CLUE_ITEMS.filter(c => unlockedClues.includes(c.id)).length;
  const progressPercent = Math.round((unlockedCount / CLUE_ITEMS.length) * 100);

  return (
    <div className="flex flex-col h-full bg-[#03060f] text-slate-100 overflow-y-auto pb-28">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase flex items-center gap-1.5">
            <FolderLock className="w-3.5 h-3.5 text-cyan-400" />
            Archaeological & Sensor Dossier
          </span>
          <h2 className="text-base font-heading tracking-wide text-white leading-tight">
            The Belapokhori Evidence Vault
          </h2>
        </div>

        <button
          onClick={() => {
            sound.playPageClick();
            setShowNexusWeb(!showNexusWeb);
          }}
          className={`px-2.5 py-1 rounded text-xs font-mono border transition-colors flex items-center gap-1 ${
            showNexusWeb
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>{showNexusWeb ? 'Grid View' : 'Nexus Web'}</span>
        </button>
      </div>

      {/* Progress & Discovery Meter */}
      <div className="mx-3 mt-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
          <span className="text-slate-300">Dossier Decryption Progress</span>
          <span className="text-cyan-400 font-bold">{unlockedCount} / {CLUE_ITEMS.length} ({progressPercent}%)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-amber-500 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          Explore interactive comic panels in the Graphic Novel or decrypt ancient Kalinga ciphers to unlock full technical forensic notes.
        </p>
      </div>

      {/* Nexus Web Mode vs Clue Grid Mode */}
      {showNexusWeb ? (
        <div className="mx-3 mt-3 p-4 rounded-xl border border-cyan-500/30 bg-slate-950 shadow-xl relative overflow-hidden">
          <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Network className="w-4 h-4 text-cyan-400" />
            The Subterranean Synthesis Hypothesis
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            The Belapokhori-Nexus is not an accident of geography. Connecting the six artifacts proves that the 9th-century hydraulic masters anticipated the exact energy and tidal challenges of the 21st century:
          </p>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 flex items-center justify-center text-[10px] shrink-0 font-bold">1</span>
              <div>
                <span className="text-cyan-300 font-semibold">Freight Vibration Capture: </span>
                <span className="text-slate-300">Heavy trains vibrate rails at 24.8 Hz → transmitted through piles into the subterranean stepwell.</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-amber-950 text-amber-400 flex items-center justify-center text-[10px] shrink-0 font-bold">2</span>
              <div>
                <span className="text-amber-300 font-semibold">Acoustic Siphon Resonance: </span>
                <span className="text-slate-300">Stone step risers compress the vibration into 174 Hz fluid cavitation, drawing water uphill through the under-riverbed siphon.</span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-400 flex items-center justify-center text-[10px] shrink-0 font-bold">3</span>
              <div>
                <span className="text-emerald-300 font-semibold">Deep Aquifer Shield: </span>
                <span className="text-slate-300">Purified hyporheic water pressurizes the coastal freshwater bubble to 6.2 Bar, preventing saline seawater intrusion forever.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Clue Grid */
        <div className="p-3 grid grid-cols-2 gap-2.5">
          {CLUE_ITEMS.map(clue => {
            const isUnlocked = unlockedClues.includes(clue.id);
            const isSelected = selectedClue?.id === clue.id;

            return (
              <button
                key={clue.id}
                onClick={() => {
                  sound.playPageClick();
                  haptics.light();
                  setSelectedClue(clue);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[110px] ${
                  isSelected
                    ? 'border-cyan-400 bg-slate-900 shadow-lg shadow-cyan-950/40'
                    : 'border-slate-800 bg-slate-950/60 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isUnlocked ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-900 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? getIcon(clue.iconName, 16) : <Lock className="w-3.5 h-3.5" />}
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {clue.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-white leading-snug line-clamp-2">
                    {clue.title}
                  </h4>
                  <div className="text-[10px] font-mono text-cyan-400/80 mt-1">
                    {isUnlocked ? clue.era : 'Encrypted Archive'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Clue Inspection Detail */}
      {selectedClue && (
        <div className="mx-3 mt-2 p-4 rounded-xl border border-slate-800 bg-slate-900/95 shadow-2xl">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-1">
                <span>{selectedClue.category}</span>
                <span>·</span>
                <span>{selectedClue.era}</span>
              </div>
              <h3 className="text-base font-bold text-white font-heading tracking-wide">
                {selectedClue.title}
              </h3>
            </div>

            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400">
              {getIcon(selectedClue.iconName, 22)}
            </div>
          </div>

          {unlockedClues.includes(selectedClue.id) ? (
            <div>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                {selectedClue.description}
              </p>

              <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200">
                <div className="text-[10px] font-mono text-cyan-400 font-semibold mb-1 uppercase tracking-wider">
                  Investigative Forensic Deduction
                </div>
                <p className="leading-relaxed">{selectedClue.deductionNote}</p>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-slate-950 border border-amber-500/30 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-mono text-amber-400 font-semibold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>Encrypted Subterranean Record</span>
              </div>
              <p className="text-slate-400 mb-3">
                This artifact is currently sealed. You can locate it during Chapter exploration in the Graphic Novel, or enter the hydraulic cipher code:
              </p>

              {selectedClue.cipherCode && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={cipherInput}
                      onChange={e => setCipherInput(e.target.value)}
                      placeholder={`Enter cipher (Hint: ${selectedClue.cipherCode.slice(0, 4)}...)`}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono uppercase"
                    />
                    <button
                      onClick={() => handleCipherSubmit(selectedClue)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded transition-colors"
                    >
                      Decrypt
                    </button>
                  </div>
                  {cipherError && (
                    <div className="text-[10px] font-mono text-rose-400">
                      Cipher invalid. Check chapter dialogue or hydraulic blueprint seals.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
