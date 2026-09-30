import React, { useState } from 'react';
import { Smartphone, Monitor, Wifi, Battery, Volume2 } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  children: React.ReactNode;
}

export const MobileFrameWrapper: React.FC<Props> = ({ children }) => {
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  return (
    <div className="min-h-screen w-full bg-[#020409] flex flex-col items-center justify-center relative selection:bg-cyan-500 selection:text-slate-950 font-sans">
      {/* Desktop Helper Bar (visible on md screens and up) */}
      <header className="w-full hidden md:flex items-center justify-between px-6 py-2.5 bg-slate-950/90 border-b border-slate-800/80 z-50 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-heading text-base tracking-wider text-cyan-400">
            BELAPOKHORI-NEXUS
          </span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Mobile Graphic Novel & Hydraulic Mystery Explorer</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playPageClick();
              setDeviceFrameMode(!deviceFrameMode);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors"
          >
            {deviceFrameMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Switch to Expanded View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Simulate Smartphone Frame</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex items-center justify-center p-0 md:p-6 overflow-hidden">
        {deviceFrameMode ? (
          /* Realistic Smartphone Enclosure for Desktop, Edge-to-Edge on Mobile */
          <div className="relative w-full max-w-[430px] h-[100dvh] md:h-[860px] md:max-h-[92vh] bg-slate-950 md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden ring-1 ring-white/10">
            {/* Top Phone Speaker / Dynamic Island Notch (Desktop preview) */}
            <div className="hidden md:flex items-center justify-between px-7 pt-3 pb-1 bg-slate-950 text-slate-400 text-[11px] font-mono select-none shrink-0 z-40 border-b border-slate-900/50">
              <span className="font-bold text-slate-200">12:44</span>
              <div className="w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-cyan-500/80 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Wifi className="w-3 h-3" />
                <Battery className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Inner Mobile Screen viewport */}
            <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col bg-slate-950">
              {children}
            </div>
          </div>
        ) : (
          /* Expanded Full-Canvas Mode for High-Resolution Explorers */
          <div className="w-full max-w-4xl h-[100dvh] md:h-[860px] md:max-h-[92vh] bg-slate-950 md:rounded-2xl md:border border-slate-800 shadow-2xl flex flex-col overflow-hidden">
            {children}
          </div>
        )}
      </main>
    </div>
  );
};
