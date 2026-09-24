import React, { useState } from 'react';
import { 
  Sparkles, HardDrive, Film, Camera, Sliders, Volume2, 
  Lock, Clock, Check, Info, X, 
  ChevronDown, ChevronUp, FileText, ShieldCheck, FolderGit2, Disc
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const MaterialVault: React.FC = () => {
  const [showInPagePreview, setShowInPagePreview] = useState(false);
  const [selectedAssetDetail, setSelectedAssetDetail] = useState<number | null>(null);

  const plannedCategories = [
    {
      icon: Film,
      title: '4K Log Master Footage',
      format: 'ProRes 422HQ / S-Log3',
      size: '48 GB',
      status: 'In QC Verification',
      desc: 'Sony S-Log3 / 10-bit 4:2:2 high dynamic range matchday slow-motion masters with embedded timecodes & lens metadata.',
      sampleFiles: ['PGSS_Football_Final_4K_120fps.mov', 'Track_Relay_SlowMo_SLog3.mov'],
    },
    {
      icon: Camera,
      title: '61MP Uncompressed RAW',
      format: 'Sony .ARW / Adobe .DNG',
      size: '52 GB',
      status: 'Rights Cataloging',
      desc: 'Full-frame flagship raw captures retaining 15 stops of dynamic range and shadow recovery latitude for color grading drills.',
      sampleFiles: ['PG_WestCoast_Sunset_61MP.ARW', 'Darkroom_ChemicalBath_Master.ARW'],
    },
    {
      icon: Sliders,
      title: 'DaVinci Cinema LUTs',
      format: '33-Point 3D .cube LUT',
      size: '450 MB',
      status: 'Calibration Pass',
      desc: 'Custom 3D .cube LUTs color-science engineered for Pacific Northwest skies, floodlit arenas, and Kodak Portra film looks.',
      sampleFiles: ['PGPC_Portra400_Warmth.cube', 'PGPC_Overcast_Green_Recovery.cube'],
    },
    {
      icon: Volume2,
      title: 'Field Audio & SFX',
      format: '24-bit 96kHz .WAV',
      size: '18 GB',
      status: 'Mastering Stage',
      desc: 'Binaural field recordings: goalpost impacts, crowd cheers, whistle transients, and darkroom mechanical timers.',
      sampleFiles: ['Goal_Cheer_MainBleachers_96k.wav', 'Darkroom_Timer_Mechanical_Click.wav'],
    },
  ];

  return (
    <section id="materials" className="py-12 sm:py-16 relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100 border-t border-slate-800 overflow-hidden">
      
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[220px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Compact Section Eyebrow & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-slate-800 gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-amber-400 mb-1 font-semibold tracking-wider">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>POINT GREY SECONDARY // DIGITAL ASSET VAULT · COMING SOON</span>
            </div>
            <div className="flex items-center space-x-3">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white tracking-tight">
                PGPC Material Vault
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Quick Status Pill */}
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 shadow-xs flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>STATUS:</span>
              <strong className="text-amber-400 font-bold">ARCHIVE VERIFICATION · COMING SOON</strong>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN VAULT PORTAL COVER CARD (STUDIO DARKROOM AESTHETIC - COMING SOON STATE) */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-7 lg:p-9 items-center">
            
            {/* ---------------- LEFT: VISUAL STUDIO CASSETTE / DRIVE COVER (5 COLS) ---------------- */}
            <div className="lg:col-span-5 relative">
              <div 
                className="relative mx-auto max-w-sm lg:max-w-none aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl border-2 border-slate-700/80 group p-5 flex flex-col justify-between"
              >
                {/* Viewfinder reticles */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60" />

                {/* Subtle cassette tape reel watermark pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:14px_14px] opacity-40 pointer-events-none" />

                {/* Top header on cassette */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center space-x-1.5 text-amber-400 font-semibold">
                    <Disc className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
                    <span>MASTER ARCHIVE // PREPARING</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 font-bold text-[10px]">
                    COMING SOON
                  </span>
                </div>

                {/* Middle: 4 Spec Chips with Icons & Status */}
                <div className="relative z-10 grid grid-cols-2 gap-2 my-auto py-2">
                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center space-x-2">
                    <Film className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <div className="text-[10px] font-mono leading-tight">
                      <div className="font-bold text-slate-200">4K Log S-Log3</div>
                      <div className="text-amber-400/90 text-[9px] font-medium">Pending Release</div>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center space-x-2">
                    <Camera className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <div className="text-[10px] font-mono leading-tight">
                      <div className="font-bold text-slate-200">61MP RAW</div>
                      <div className="text-amber-400/90 text-[9px] font-medium">Pending Release</div>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center space-x-2">
                    <Sliders className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <div className="text-[10px] font-mono leading-tight">
                      <div className="font-bold text-slate-200">DaVinci LUTs</div>
                      <div className="text-amber-400/90 text-[9px] font-medium">Pending Release</div>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center space-x-2">
                    <Volume2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <div className="text-[10px] font-mono leading-tight">
                      <div className="font-bold text-slate-200">24-bit 96kHz</div>
                      <div className="text-amber-400/90 text-[9px] font-medium">Pending Release</div>
                    </div>
                  </div>
                </div>

                {/* Bottom drive cassette label */}
                <div className="relative z-10 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center space-x-1">
                    <FolderGit2 className="w-3 h-3 text-amber-400" />
                    <span>VANCOUVER CAMPUS VAULT</span>
                  </span>
                  <span className="text-amber-400 font-bold">120+ GB IN QUEUE</span>
                </div>
              </div>

              {/* Sub-label under collage */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-2 px-1">
                <span className="flex items-center space-x-1 text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free Student License · Creative Commons</span>
                </span>
                <span className="text-slate-500">ROOM 214 DARKROOM</span>
              </div>
            </div>

            {/* ---------------- RIGHT: EDITORIAL INTRODUCTION & COMING SOON NOTICE (7 COLS) ---------------- */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-semibold mb-2">
                  <Lock className="w-3 h-3" />
                  <span>POINT GREY PHOTO CLUB // PRODUCTION ASSETS</span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-tight leading-tight">
                  Point Grey Digital Darkroom & Cinema Asset Vault · Coming Soon
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  To provide club members, student filmmakers, and visual storytellers with industry-grade master media, the PGPC Digital Darkroom team is actively cataloging and verifying 4K 120fps Log masters, 61MP uncompressed RAW captures, precision DaVinci color LUTs, and 24-bit 96kHz binaural field audio. The public download vault will open soon!
                </p>
              </div>

              {/* Status Banner */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 flex items-center space-x-3 text-xs font-mono text-amber-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <div className="leading-relaxed">
                  <strong className="text-white">Current Status: </strong>
                  <span>Asset cataloging and metadata indexing in progress. One-click free licensing and high-speed downloads will open to all students soon.</span>
                </div>
              </div>

              {/* Stat Highlights Pills */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-2 border-y border-slate-800 font-mono">
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-base sm:text-lg font-bold text-amber-400">120+ GB</div>
                  <div className="text-[10px] text-slate-400">Planned Archive</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-base sm:text-lg font-bold text-slate-200">4 Categories</div>
                  <div className="text-[10px] text-slate-400">Master Formats</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
                  <div className="text-base sm:text-lg font-bold text-emerald-400">100% Free</div>
                  <div className="text-[10px] text-slate-400">Open Student Access</div>
                </div>
              </div>

              {/* Available Media Category Badges */}
              <div>
                <div className="text-[11px] font-mono text-slate-400 mb-1.5 flex items-center justify-between">
                  <span className="font-semibold text-slate-300">Upcoming Asset Packages:</span>
                  <span className="text-[10px] text-amber-400">Coming Soon</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {plannedCategories.map((cat, idx) => {
                    const Icon = cat.icon;
                    return (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-950/70 border border-slate-800 text-left"
                      >
                        <div className="flex items-center space-x-1.5 text-amber-400 text-xs mb-0.5">
                          <Icon className="w-3.5 h-3.5 shrink-0" />
                          <span className="font-bold truncate text-[11px] text-slate-200">
                            {cat.title}
                          </span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 truncate">
                          {cat.format.split('/')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ================================================================= */}
              {/* PRIMARY CALL-TO-ACTION BUTTON: "Material Vault · Coming Soon" */}
              {/* ================================================================= */}
              <div className="pt-2 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  
                  {/* Disabled / Coming Soon Card Button */}
                  <div
                    id="open-material-vault-btn"
                    className="flex-1 inline-flex items-center justify-between py-3.5 px-5 sm:px-6 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 font-mono shadow-md select-none"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm sm:text-base font-bold text-white tracking-wide">
                          Material Vault · Coming Soon
                        </div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          System under final review, opening soon for student downloads
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 shrink-0 ml-2">
                      <span>COMING SOON</span>
                    </div>
                  </div>

                </div>

                {/* Toggle In-Page Preview */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <button
                    onClick={() => setShowInPagePreview(!showInPagePreview)}
                    className="inline-flex items-center space-x-1.5 text-amber-400 hover:text-amber-300 hover:underline cursor-pointer py-1"
                  >
                    <span>
                      {showInPagePreview 
                        ? 'Collapse preview specs' 
                        : 'Inspect upcoming package specifications'}
                    </span>
                    {showInPagePreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <span className="text-[11px] text-slate-500 font-mono">
                    Point Grey Digital Darkroom Team
                  </span>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* OPTIONAL EXPANDABLE IN-PAGE PREVIEW */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showInPagePreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-slate-900/95 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-xl">
                
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-semibold text-slate-200">
                      Upcoming Asset Specifications & Manifest
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-bold">
                    Pending official release
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {plannedCategories.map((cat, idx) => {
                    const Icon = cat.icon;
                    const isSelected = selectedAssetDetail === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => setSelectedAssetDetail(isSelected ? null : idx)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-slate-800/90 border-amber-400 shadow-md ring-1 ring-amber-400/50' 
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300 font-bold">
                            {cat.size}
                          </span>
                        </div>

                        <h4 className="text-sm font-bold text-slate-200">
                          {cat.title}
                        </h4>

                        <div className="text-[11px] font-mono text-slate-400 my-1">
                          {cat.format}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mt-1">
                          {cat.desc}
                        </p>

                        <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono text-amber-400">
                          <span>{isSelected ? 'Hide samples' : 'View samples'}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-180' : ''}`} />
                        </div>

                        {isSelected && (
                          <div className="mt-2.5 pt-2 border-t border-slate-800/80 space-y-1 text-[10.5px] font-mono text-slate-300">
                            <div className="text-[9.5px] text-amber-400 uppercase">Sample files (Queue):</div>
                            {cat.sampleFiles.map((sf, sIdx) => (
                              <div key={sIdx} className="flex items-center space-x-1.5 truncate text-slate-300">
                                <FileText className="w-3 h-3 text-amber-400 shrink-0" />
                                <span className="truncate">{sf}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
