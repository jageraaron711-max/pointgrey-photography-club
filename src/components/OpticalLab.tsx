import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Aperture, Sliders, Sun, Zap, 
  RotateCcw, Compass
} from 'lucide-react';

export const OpticalLab: React.FC = () => {
  const { lang } = useApp();

  // Exposure Triangle Controls
  const [apertureIndex, setApertureIndex] = useState(2); // f/2.8
  const [shutterIndex, setShutterIndex] = useState(3); // 1/250s
  const [isoIndex, setIsoIndex] = useState(1); // 200
  const [activePreset, setActivePreset] = useState<'normal' | 'teal-orange' | 'bw-contrast' | 'cyberpunk'>('teal-orange');
  const [activeGrid, setActiveGrid] = useState<'thirds' | 'golden' | 'none'>('thirds');

  const apertures = ['f/1.4', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6', 'f/8.0', 'f/11', 'f/16'];
  const shutters = ['1/4000s', '1/1000s', '1/500s', '1/250s', '1/125s', '1/60s', '1/15s', '1/2s'];
  const isos = ['100', '200', '400', '800', '1600', '3200', '6400'];

  // Calculate Exposure Value (EV relative balance)
  const exposureDelta = (shutterIndex * 0.8 + isoIndex * 0.7) - (apertureIndex * 0.9) - 1.2;
  const clampedEV = Math.max(-3, Math.min(3, exposureDelta));

  // Compute CSS filter styling based on parameters
  const getBrightnessFilter = () => {
    const base = 1 + clampedEV * 0.18;
    return Math.max(0.3, Math.min(1.8, base));
  };

  // Blur/Bokeh: smaller aperture index (f/1.4) = higher bokeh on background
  const getBokehRadius = () => {
    const bokehMap = [8, 6, 4.5, 2.5, 1.2, 0.4, 0, 0];
    return bokehMap[apertureIndex] || 0;
  };

  // Noise grain filter
  const getNoiseGrainOpacity = () => {
    const noiseMap = [0, 0.05, 0.1, 0.2, 0.35, 0.55, 0.75];
    return noiseMap[isoIndex] || 0;
  };

  const getPresetFilter = () => {
    switch (activePreset) {
      case 'teal-orange':
        return 'contrast(1.15) saturate(1.2) hue-rotate(-5deg)';
      case 'bw-contrast':
        return 'grayscale(1) contrast(1.4) brightness(0.95)';
      case 'cyberpunk':
        return 'contrast(1.25) saturate(1.4) hue-rotate(15deg)';
      default:
        return 'none';
    }
  };

  const getExposureStatus = () => {
    if (clampedEV < -1) {
      return { 
        textEn: 'Under-Exposed (Too Dark)', 
        textZh: '曝光不足（画面过暗）', 
        textFr: 'Sous-exposé (Trop sombre)',
        color: 'text-amber-500' 
      };
    }
    if (clampedEV > 1) {
      return { 
        textEn: 'Over-Exposed (Highlights Blown)', 
        textZh: '曝光过度（高光溢出）', 
        textFr: 'Surexposé (Hautes lumières brûlées)',
        color: 'text-rose-500' 
      };
    }
    return { 
      textEn: 'Balanced Exposure (Optimal)', 
      textZh: '曝光均衡（理想直方图）', 
      textFr: 'Exposition équilibrée (Optimale)',
      color: 'text-emerald-600' 
    };
  };

  const getExposureStatusText = () => {
    const status = getExposureStatus();
    if (lang === 'zh') return status.textZh;
    if (lang === 'fr') return status.textFr;
    return status.textEn;
  };

  return (
    <section id="lab" className="py-16 sm:py-24 relative bg-slate-50/60 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white border border-blue-100 text-[#0047AB] text-xs font-mono mb-2 shadow-xs font-semibold">
            <Aperture className="w-3.5 h-3.5" />
            <span>PGSS OPTICAL LAB // {lang === 'fr' ? 'SIMULATEUR' : lang === 'zh' ? '光学校验室' : 'SIMULATOR'}</span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {lang === 'zh' 
              ? '交互式曝光三要素与光学校验室' 
              : lang === 'fr' 
              ? 'Studio Optique & Simulateur d’Exposition' 
              : 'Interactive Optical & Exposure Studio'}
          </h2>
          <p className="text-slate-600 text-sm mt-2 font-light">
            {lang === 'zh'
              ? 'Point Grey 摄影社教学专用曝光模拟器。实时调节光圈、快门速度与感光度，直观感受景深虚化与色彩风格。'
              : lang === 'fr'
              ? 'Simulateur d’exposition en temps réel pour la formation photo à Point Grey. Ajustez l’ouverture, la vitesse, les ISO et les grilles de composition.'
              : 'Real-time camera exposure simulator used in Point Grey photography training. Adjust aperture, shutter speed, ISO and composition guides.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Optical Controls */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-blue-100 shadow-sm space-y-6">
            
            {/* Header Telemetry */}
            <div className="flex items-center justify-between font-mono text-xs text-[#0047AB] border-b border-slate-100 pb-3 font-semibold">
              <span className="flex items-center space-x-1.5">
                <Sliders className="w-4 h-4" />
                <span>{lang === 'fr' ? 'CALIBRATION DU TRIANGLE D’EXPOSITION' : 'EXPOSURE TRIANGLE CALIBRATION'}</span>
              </span>
              <button
                onClick={() => {
                  setApertureIndex(2);
                  setShutterIndex(3);
                  setIsoIndex(1);
                  setActivePreset('teal-orange');
                }}
                className="text-slate-400 hover:text-slate-700 flex items-center space-x-1 cursor-pointer"
                title="Reset"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{lang === 'fr' ? 'RÉINIT' : 'RESET'}</span>
              </button>
            </div>

            {/* Aperture Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium flex items-center space-x-1">
                  <Aperture className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>
                    {lang === 'zh' 
                      ? '光圈值 (景深与虚化)' 
                      : lang === 'fr' 
                      ? 'OUVERTURE (Profondeur de champ / Bokeh)' 
                      : 'APERTURE (Depth of Field / Bokeh)'}
                  </span>
                </span>
                <strong className="text-[#0047AB] text-sm font-bold">{apertures[apertureIndex]}</strong>
              </div>
              <input
                type="range"
                min="0"
                max={apertures.length - 1}
                value={apertureIndex}
                onChange={(e) => setApertureIndex(Number(e.target.value))}
                className="w-full accent-[#0047AB] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>f/1.4 ({lang === 'fr' ? 'Flou artistique' : lang === 'zh' ? '柔美大虚化' : 'Creamy Bokeh'})</span>
                <span>f/16 ({lang === 'fr' ? 'Netteté profonde' : lang === 'zh' ? '全景深锐利' : 'Deep Sharpness'})</span>
              </div>
            </div>

            {/* Shutter Speed Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {lang === 'zh' 
                      ? '快门速度 (动态捕捉)' 
                      : lang === 'fr' 
                      ? 'VITESSE D’OBTURATION (Mouvement)' 
                      : 'SHUTTER SPEED (Motion)'}
                  </span>
                </span>
                <strong className="text-[#0047AB] text-sm font-bold">{shutters[shutterIndex]}</strong>
              </div>
              <input
                type="range"
                min="0"
                max={shutters.length - 1}
                value={shutterIndex}
                onChange={(e) => setShutterIndex(Number(e.target.value))}
                className="w-full accent-[#0047AB] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>1/4000s ({lang === 'fr' ? 'Figer le mouvement' : lang === 'zh' ? '定格高速运动' : 'Freeze Action'})</span>
                <span>1/2s ({lang === 'fr' ? 'Fils de lumière' : lang === 'zh' ? '流光慢门' : 'Light Trails'})</span>
              </div>
            </div>

            {/* ISO Sensitivity Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 font-medium flex items-center space-x-1">
                  <Sun className="w-3.5 h-3.5 text-blue-500" />
                  <span>
                    {lang === 'zh' 
                      ? '感光度 (ISO噪点)' 
                      : lang === 'fr' 
                      ? 'SENSIBILITÉ ISO (Signal & Bruit)' 
                      : 'ISO SENSITIVITY (Signal & Grain)'}
                  </span>
                </span>
                <strong className="text-[#0047AB] text-sm font-bold">ISO {isos[isoIndex]}</strong>
              </div>
              <input
                type="range"
                min="0"
                max={isos.length - 1}
                value={isoIndex}
                onChange={(e) => setIsoIndex(Number(e.target.value))}
                className="w-full accent-[#0047AB] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400">
                <span>ISO 100 ({lang === 'fr' ? 'Image pure' : lang === 'zh' ? '纯净画质' : 'Clean Base'})</span>
                <span>ISO 6400 ({lang === 'fr' ? 'Grain élevé' : lang === 'zh' ? '高感噪点' : 'High Grain'})</span>
              </div>
            </div>

            {/* Live Meter Bar */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">
                  {lang === 'zh' ? '测光表指针' : lang === 'fr' ? 'COMPENSATION D’EXPOSITION' : 'EXPOSURE COMPENSATION'}
                </span>
                <span className={`font-bold ${getExposureStatus().color}`}>
                  {getExposureStatusText()}
                </span>
              </div>
              {/* Scale meter */}
              <div className="relative py-2 font-mono text-[10px] text-slate-400 flex justify-between select-none">
                <span>-2</span>
                <span>-1</span>
                <span className="text-slate-900 font-bold">0</span>
                <span>+1</span>
                <span>+2</span>
                {/* Pointer indicator */}
                <div
                  className="absolute top-1 w-2 h-4 bg-[#0047AB] rounded-sm shadow-md shadow-blue-900/30 transition-all duration-200"
                  style={{
                    left: `${Math.max(5, Math.min(95, 50 + (clampedEV / 3) * 45))}%`,
                  }}
                />
              </div>
            </div>

            {/* Presets & Color Science Filter */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-mono text-slate-700 font-medium">
                {lang === 'zh' ? '色彩科学预设' : lang === 'fr' ? 'PRÉRÉGLAGES COLORIMÉTRIQUES' : 'COLOR SCIENCE PRESET'}
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => setActivePreset('teal-orange')}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    activePreset === 'teal-orange'
                      ? 'bg-[#0047AB] border-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Pacific Teal 100
                </button>
                <button
                  onClick={() => setActivePreset('bw-contrast')}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    activePreset === 'bw-contrast'
                      ? 'bg-[#0047AB] border-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  PGSS Noir 400
                </button>
                <button
                  onClick={() => setActivePreset('cyberpunk')}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    activePreset === 'cyberpunk'
                      ? 'bg-[#0047AB] border-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Vancouver Neon 2077
                </button>
                <button
                  onClick={() => setActivePreset('normal')}
                  className={`p-2 rounded-lg border transition-all cursor-pointer ${
                    activePreset === 'normal'
                      ? 'bg-[#0047AB] border-blue-600 text-white font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  Standard Flat RAW
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Live Viewfinder Screen Output */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="relative rounded-2xl bg-white p-3 border border-blue-100 shadow-sm overflow-hidden">
              
              {/* Viewfinder Display Box */}
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950">
                
                {/* Background Layer with Depth Bokeh simulation */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80')`,
                    filter: `blur(${getBokehRadius()}px) brightness(${getBrightnessFilter()}) ${getPresetFilter()}`,
                  }}
                />

                {/* Simulated Foreground Subject in sharp focus */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300"
                  style={{
                    filter: `brightness(${getBrightnessFilter()}) ${getPresetFilter()}`,
                  }}
                >
                  <div className="w-48 sm:w-56 text-center bg-slate-950/80 p-4 rounded-xl border border-cyan-400/40 backdrop-blur-md shadow-2xl">
                    <div className="w-8 h-8 rounded-full bg-blue-600/40 border border-cyan-300 flex items-center justify-center mx-auto mb-2">
                      <Aperture className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="text-xs font-mono font-bold text-white tracking-wider">
                      POINT GREY OPTICS
                    </div>
                    <div className="text-[10px] font-mono text-cyan-300 mt-0.5">
                      FOCAL PLANE: 1.5M (IN FOCUS)
                    </div>
                  </div>
                </div>

                {/* ISO Digital Noise Grain Overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 bg-repeat"
                  style={{
                    opacity: getNoiseGrainOpacity(),
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)" opacity="0.8"/></svg>')`,
                  }}
                />

                {/* Composition Grid Guides */}
                {activeGrid === 'thirds' && (
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-cyan-400/40">
                    <div className="border-r border-b border-cyan-400/40" />
                    <div className="border-r border-b border-cyan-400/40" />
                    <div className="border-b border-cyan-400/40" />
                    <div className="border-r border-b border-cyan-400/40" />
                    <div className="border-r border-b border-cyan-400/40" />
                    <div className="border-b border-cyan-400/40" />
                    <div className="border-r border-cyan-400/40" />
                    <div className="border-r border-cyan-400/40" />
                    <div />
                  </div>
                )}

                {activeGrid === 'golden' && (
                  <div className="absolute inset-0 pointer-events-none border border-amber-400/40 flex items-center justify-center">
                    <div className="w-[61.8%] h-[61.8%] border border-dashed border-amber-300/60 rounded-full" />
                  </div>
                )}

                {/* Top Viewfinder HUD */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 font-mono text-[11px] text-white">
                  <div className="bg-slate-950/80 px-2.5 py-1 rounded backdrop-blur-md border border-cyan-500/40 text-cyan-300">
                    OPTICAL SIMULATOR // {lang === 'fr' ? 'APERÇU DIRECT' : 'LIVE PREVIEW'}
                  </div>
                  <div className="bg-slate-950/80 px-2 py-1 rounded backdrop-blur-md border border-slate-700 text-slate-300">
                    {apertures[apertureIndex]} • {shutters[shutterIndex]} • ISO {isos[isoIndex]}
                  </div>
                </div>

              </div>

              {/* Composition Grid Selector Bar */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs font-mono">
                <span className="text-slate-600 flex items-center space-x-1">
                  <Compass className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>{lang === 'zh' ? '构图辅助线:' : lang === 'fr' ? 'Guide de cadrage :' : 'Composition Guide:'}</span>
                </span>
                
                <div className="flex space-x-1 bg-slate-50 p-1 rounded-lg border border-slate-200">
                  <button
                    onClick={() => setActiveGrid('thirds')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                      activeGrid === 'thirds' ? 'bg-[#0047AB] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'zh' ? '三分法' : lang === 'fr' ? 'Tiers' : 'Rule of Thirds'}
                  </button>
                  <button
                    onClick={() => setActiveGrid('golden')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                      activeGrid === 'golden' ? 'bg-[#0047AB] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'zh' ? '黄金比例' : lang === 'fr' ? 'Nombre d’or' : 'Golden Ratio'}
                  </button>
                  <button
                    onClick={() => setActiveGrid('none')}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium transition-all cursor-pointer ${
                      activeGrid === 'none' ? 'bg-[#0047AB] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'zh' ? '关闭' : lang === 'fr' ? 'Désactivé' : 'Off'}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
