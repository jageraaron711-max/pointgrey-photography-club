import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TutorialLesson, TutorialCategory } from '../types';
import { 
  GraduationCap, Sliders, Zap, Award, BookOpen, Clock, 
  Sparkles, CheckCircle2, ChevronRight, Copy, Check, 
  HelpCircle, Eye, Activity, Camera, Layers, Info, RotateCcw,
  SlidersHorizontal, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractiveTutorials: React.FC = () => {
  const { lang, tutorials } = useApp();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(tutorials[0]?.id || 'tut-shutter-01');
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  // Interactive Simulator Controls
  const [simShutterIndex, setSimShutterIndex] = useState<number>(6); // 1/2000s default
  const [simIsoIndex, setSimIsoIndex] = useState<number>(3); // ISO 800 default
  const [simApertureIndex, setSimApertureIndex] = useState<number>(2); // f/2.8 default

  const shutterSpeeds = [
    { label: '1/8000s', value: 1/8000, descZh: '极限运动/强光全开光圈', desc: 'Extreme action / bright sun', blurLevel: 0 },
    { label: '1/4000s', value: 1/4000, descZh: '棒球击球/极速滑铲', desc: 'Fast baseball swing / slide', blurLevel: 0 },
    { label: '1/3200s', value: 1/3200, descZh: '温哥华FC赛场高速反击', desc: 'Vancouver FC pitchside baseline', blurLevel: 0 },
    { label: '1/2000s', value: 1/2000, descZh: 'UBC橄榄球冲阵飞身扑截', desc: 'UBC football tackle freezing', blurLevel: 0.5 },
    { label: '1/1000s', value: 1/1000, descZh: '常规跑步/跳跃运动', desc: 'Standard running athletes', blurLevel: 1 },
    { label: '1/500s', value: 1/500, descZh: '人物行走/手持安全下限', desc: 'Fast walking / telephoto handhold', blurLevel: 2 },
    { label: '1/250s', value: 1/250, descZh: '静态人像与校园活动', desc: 'Stationary portraits', blurLevel: 3 },
    { label: '1/125s', value: 1/125, descZh: '标准手持快门', desc: 'Standard handheld threshold', blurLevel: 4 },
    { label: '1/30s', value: 1/30, descZh: '摇摄追焦 (Panning 速度流线)', desc: 'Panning motion blur', blurLevel: 8 },
    { label: '1/15s', value: 1/15, descZh: '动态流动人流', desc: 'Crowd movement blur', blurLevel: 12 },
    { label: '1s', value: 1, descZh: '夜景慢门流光 (需三脚架)', desc: 'Night light trails (Tripod)', blurLevel: 20 },
    { label: '10s', value: 10, descZh: '丝绢海浪/瀑布雾化 (ND镜)', desc: 'Silky ocean waves (ND filter)', blurLevel: 30 },
  ];

  const isoValues = [
    { label: 'ISO 50', value: 50, gainDescZh: '极低噪点 · 极限动态范围', gainDesc: 'Ultra-low noise · Max Dynamic Range', isDualBase: false, noiseOpacity: 0 },
    { label: 'ISO 100', value: 100, gainDescZh: '第一原生基准 · 最纯净画质', gainDesc: 'Base Native ISO 1 · Pristine purity', isDualBase: true, noiseOpacity: 0.02 },
    { label: 'ISO 200', value: 200, gainDescZh: '自然光标准', gainDesc: 'Standard daylight benchmark', isDualBase: false, noiseOpacity: 0.05 },
    { label: 'ISO 400', value: 400, gainDescZh: '索尼部分机身第二原生增益', gainDesc: 'Extended dynamic range step', isDualBase: true, noiseOpacity: 0.06 },
    { label: 'ISO 800', value: 800, gainDescZh: '室内弱光/阴天高速', gainDesc: 'Overcast daylight & indoor gym', isDualBase: false, noiseOpacity: 0.12 },
    { label: 'ISO 1600', value: 1600, gainDescZh: '球馆/礼堂舞台照明', gainDesc: 'Auditorium & stadium floodlights', isDualBase: false, noiseOpacity: 0.18 },
    { label: 'ISO 3200', value: 3200, gainDescZh: '第二原生跳变 · 夜赛实战推荐', gainDesc: 'Dual-Base Step 2 · High-speed night sports', isDualBase: true, noiseOpacity: 0.22 },
    { label: 'ISO 6400', value: 6400, gainDescZh: '雨夜球场极速 1/2000s 保障', gainDesc: 'Rainy night pitchside guarantee', isDualBase: false, noiseOpacity: 0.35 },
    { label: 'ISO 12800', value: 12800, gainDescZh: '微光极限 · 需后期AI降噪', gainDesc: 'Extreme low light · AI de-noise recommended', isDualBase: false, noiseOpacity: 0.5 },
  ];

  const apertures = [
    { label: 'f/1.4', value: 1.4, bokehBlur: 20, descZh: '极致浅景深 · 人像特写背景奶油虚化', desc: 'Creamy bokeh · Ultra-shallow depth of field' },
    { label: 'f/2.0', value: 2.0, bokehBlur: 16, descZh: '大光圈定焦 · 弱光进光充沛', desc: 'Fast prime · High light gathering' },
    { label: 'f/2.8', value: 2.8, bokehBlur: 12, descZh: '70-200mm 标配 · 赛场剥离看台杂乱背景', desc: '70-200mm baseline · Background subject isolation' },
    { label: 'f/4.0', value: 4.0, bokehBlur: 8, descZh: '100-400mm 常用档 · 锐度与轻便平衡', desc: '100-400mm telephoto sweet spot' },
    { label: 'f/5.6', value: 5.6, bokehBlur: 4, descZh: '多人合影/镜头中心解析力甜区', desc: 'Group portraits & peak central sharpness' },
    { label: 'f/8.0', value: 8.0, bokehBlur: 2, descZh: '全场最佳光学锐度 · 建筑与大场景', desc: 'Optimum frame-wide optical sharpness' },
    { label: 'f/11', value: 11, bokehBlur: 0.5, descZh: '大景深风光 · 远近全清晰', desc: 'Landscape deep focus across frame' },
    { label: 'f/16', value: 16, bokehBlur: 0, descZh: '小光圈星芒 · 开始出现轻微光线衍射', desc: 'Sunstars · Diffraction threshold' },
  ];

  const currentLesson = useMemo(() => {
    return tutorials.find(t => t.id === selectedLessonId) || tutorials[0];
  }, [tutorials, selectedLessonId]);

  // Calculate Exposure Triangle Balance (Simulated EV)
  // EV = log2(N^2 / t) - log2(ISO / 100)
  const simulatedEV = useMemo(() => {
    const N = apertures[simApertureIndex].value;
    const t = shutterSpeeds[simShutterIndex].value;
    const iso = isoValues[simIsoIndex].value;

    const baseEV = Math.log2((N * N) / t) - Math.log2(iso / 100);
    // Reference standard scene is ~ EV 12 (bright daylight/floodlight)
    const targetEV = 12;
    const diff = baseEV - targetEV;
    return diff;
  }, [simShutterIndex, simIsoIndex, simApertureIndex]);

  const exposureStatus = useMemo(() => {
    if (simulatedEV > 2.5) return { status: 'over', labelZh: '严重过曝 (Blown Highlights)', label: 'Severely Overexposed', color: 'text-amber-500', bg: 'bg-amber-100' };
    if (simulatedEV > 0.8) return { status: 'slightly_over', labelZh: '高光充沛 (ETTR 向右曝光最佳区)', label: 'Bright / Ideal ETTR', color: 'text-emerald-600', bg: 'bg-emerald-100' };
    if (simulatedEV >= -0.8) return { status: 'balanced', labelZh: '曝光精准平衡 (Balanced Exposure)', label: 'Optimum Balance', color: 'text-emerald-700', bg: 'bg-emerald-100' };
    if (simulatedEV >= -2.5) return { status: 'slightly_under', labelZh: '稍欠曝 (Slightly Underexposed)', label: 'Slightly Dark', color: 'text-blue-600', bg: 'bg-blue-100' };
    return { status: 'under', labelZh: '严重欠曝死黑 (Severely Underexposed)', label: 'Severely Underexposed', color: 'text-indigo-900', bg: 'bg-indigo-100' };
  }, [simulatedEV]);

  const handleCopyFormula = (formula: string, key: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(key);
    setTimeout(() => setCopiedFormula(null), 2500);
  };

  const handleResetSimulator = () => {
    setSimShutterIndex(3); // 1/2000s
    setSimIsoIndex(6); // ISO 3200
    setSimApertureIndex(2); // f/2.8
  };

  return (
    <div id="tutorials" className="space-y-8 scroll-mt-24">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-lg border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
              <GraduationCap className="w-4 h-4" />
              <span>PGSS PHOTO ACADEMY // FOUNDATIONS & FIELD MANUALS</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              {lang === 'zh' ? '摄影进阶教程与实战说明书' : 'Photography Masterclass & Field Tutorials'}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              {lang === 'zh'
                ? '专为 Point Grey 中学社员打造的系统化摄影指南。从快门物理机制、ISO双原生增益、光圈景深公式，到温哥华FC赛场边线抓拍与暗房工艺全解析。'
                : 'Interactive foundational guides covering shutter dynamics, dual-base ISO amplification, depth of field geometry, and pitchside field protocols.'}
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs text-cyan-300 font-mono text-xs border border-white/20">
              5 Core Modules Available
            </span>
          </div>
        </div>
      </div>

      {/* Lesson Selector Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
        {tutorials.map((lesson) => {
          const isSelected = lesson.id === selectedLessonId;
          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#0047AB] text-white shadow-sm font-bold scale-[1.02]'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? lesson.titleZh.split('：')[0] : lesson.title.split(':')[0]}</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] ${isSelected ? 'bg-blue-900/60 text-blue-100' : 'bg-slate-200 text-slate-600'}`}>
                {lang === 'zh' ? lesson.levelZh : lesson.level}
              </span>
            </button>
          );
        })}
      </div>

      {/* INTERACTIVE SIMULATOR CARD */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-100 text-[#0047AB]">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-slate-900">
                {lang === 'zh' ? '交互式曝光三要素与动体实时模拟器' : 'Interactive Exposure Triangle & Motion Lab'}
              </h4>
              <p className="text-xs text-slate-500 font-mono">
                {lang === 'zh' ? '拖动滑块实时观察快门速度凝固、ISO噪点颗粒与光圈景深虚化的动态平衡' : 'Adjust parameters to simulate motion freeze, sensor noise, and depth of field.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleResetSimulator}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono border border-slate-300 flex items-center space-x-1.5 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'zh' ? '恢复赛场推荐预设' : 'Reset to Sports Preset'}</span>
          </button>
        </div>

        {/* Live Visual Canvas Preview & Parameter HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Visual Simulation Display Box */}
          <div className="lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-950 border border-slate-300 shadow-inner flex flex-col justify-between p-4">
            
            {/* Background Athlete image with dynamic blur and noise overlay */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80')`,
                filter: `blur(${shutterSpeeds[simShutterIndex].blurLevel}px) contrast(${1 + (isoValues[simIsoIndex].noiseOpacity * 0.2)})`,
              }}
            />

            {/* Bokeh Overlay Simulation (simulated blur on background) */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{
                backdropFilter: `blur(${apertures[simApertureIndex].bokehBlur * 0.4}px)`,
                maskImage: 'radial-gradient(circle at 45% 45%, transparent 20%, black 80%)',
                WebkitMaskImage: 'radial-gradient(circle at 45% 45%, transparent 20%, black 80%)'
              }}
            />

            {/* Dynamic Noise Grain Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
              style={{
                backgroundImage: `radial-gradient(circle, #fff 10%, transparent 11%), radial-gradient(circle, #000 10%, transparent 11%)`,
                backgroundSize: '4px 4px',
                opacity: isoValues[simIsoIndex].noiseOpacity,
              }}
            />

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

            {/* Top HUD Display */}
            <div className="relative z-10 flex items-center justify-between text-white font-mono text-xs">
              <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20">
                <Camera className="w-3.5 h-3.5 text-cyan-400" />
                <span>SONY α7R VI · FE 100-400mm GM</span>
              </div>
              
              <div className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border ${exposureStatus.bg} ${exposureStatus.color} border-current/30`}>
                {lang === 'zh' ? exposureStatus.labelZh : exposureStatus.label}
              </div>
            </div>

            {/* Bottom Real-time EXIF Readout */}
            <div className="relative z-10 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-white font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-blue-600/90 font-bold">
                  {shutterSpeeds[simShutterIndex].label}
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-600/90 font-bold">
                  {apertures[simApertureIndex].label}
                </span>
                <span className={`px-2.5 py-1 rounded font-bold ${isoValues[simIsoIndex].isDualBase ? 'bg-purple-600/90 ring-2 ring-purple-300' : 'bg-emerald-600/90'}`}>
                  {isoValues[simIsoIndex].label} {isoValues[simIsoIndex].isDualBase ? '★ (Dual Base)' : ''}
                </span>
              </div>

              <div className="text-[11px] text-slate-200 font-mono bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10">
                <span className="text-cyan-300 font-semibold">{lang === 'zh' ? '当前模拟画质：' : 'Simulated Visual Output: '}</span>
                {shutterSpeeds[simShutterIndex].blurLevel > 5 
                  ? (lang === 'zh' ? '⚠️ 快门过慢导致强烈动态模糊，适合拉丝不适合定格' : 'Motion blur detected.')
                  : (lang === 'zh' ? '✓ 运动瞬间彻底凝固！' : 'Crisp high-speed action freeze.')}
                {' '}{isoValues[simIsoIndex].noiseOpacity > 0.3 ? (lang === 'zh' ? '存在明显噪点颗粒。' : 'Noticeable sensor grain.') : (lang === 'zh' ? '画面纯净通透。' : 'Clean shadow detail.')}
              </div>
            </div>

          </div>

          {/* Interactive Controls Sliders */}
          <div className="lg:col-span-6 space-y-5 flex flex-col justify-between">
            
            {/* 1. Shutter Speed Slider */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{lang === 'zh' ? '1. 快门速度 (Shutter Speed)' : '1. Shutter Speed'}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-xs font-extrabold border border-blue-200">
                  {shutterSpeeds[simShutterIndex].label}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={shutterSpeeds.length - 1}
                value={simShutterIndex}
                onChange={(e) => setSimShutterIndex(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>1/8000s ({lang === 'zh' ? '极速定格' : 'Freeze'})</span>
                <span className="text-blue-700 font-medium">{lang === 'zh' ? shutterSpeeds[simShutterIndex].descZh : shutterSpeeds[simShutterIndex].desc}</span>
                <span>10s ({lang === 'zh' ? '慢门流光' : 'Silk Motion'})</span>
              </div>
            </div>

            {/* 2. Aperture Slider */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-amber-600" />
                  <span>{lang === 'zh' ? '2. 光圈大小 (Aperture / Depth of Field)' : '2. Aperture / DoF'}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-xs font-extrabold border border-amber-200">
                  {apertures[simApertureIndex].label}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={apertures.length - 1}
                value={simApertureIndex}
                onChange={(e) => setSimApertureIndex(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>f/1.4 ({lang === 'zh' ? '极致虚化' : 'Shallow Bokeh'})</span>
                <span className="text-amber-800 font-medium">{lang === 'zh' ? apertures[simApertureIndex].descZh : apertures[simApertureIndex].desc}</span>
                <span>f/16 ({lang === 'zh' ? '全景深' : 'Deep DoF'})</span>
              </div>
            </div>

            {/* 3. ISO Slider */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'zh' ? '3. 感光度 (ISO / Signal Gain)' : '3. ISO Sensitivity'}</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-xs font-extrabold border border-emerald-200">
                  {isoValues[simIsoIndex].label}
                </span>
              </div>

              <input
                type="range"
                min="0"
                max={isoValues.length - 1}
                value={simIsoIndex}
                onChange={(e) => setSimIsoIndex(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>ISO 50 ({lang === 'zh' ? '纯净' : 'Clean'})</span>
                <span className="text-emerald-800 font-medium">{lang === 'zh' ? isoValues[simIsoIndex].gainDescZh : isoValues[simIsoIndex].gainDesc}</span>
                <span>ISO 12800 ({lang === 'zh' ? '极限暗光' : 'Low Light'})</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* DETAILED LESSON CONTENT PANEL */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        
        {/* Lesson Header */}
        <div className="space-y-3 pb-6 border-b border-slate-200">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#0047AB] font-mono text-xs font-bold uppercase">
              {currentLesson.category}
            </span>
            <span className="px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-xs">
              {lang === 'zh' ? currentLesson.levelZh : currentLesson.level}
            </span>
            <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{currentLesson.readTime}</span>
            </span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 leading-tight">
            {lang === 'zh' ? currentLesson.titleZh : currentLesson.title}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base font-light">
            {lang === 'zh' ? currentLesson.subtitleZh : currentLesson.subtitle}
          </p>

          {currentLesson.recommendedGear && (
            <div className="pt-2 flex items-center space-x-2 text-xs font-mono text-slate-600">
              <Camera className="w-3.5 h-3.5 text-[#0047AB]" />
              <span className="text-slate-400">{lang === 'zh' ? '推荐实践器材：' : 'Recommended Gear: '}</span>
              <span className="font-semibold text-slate-800">{currentLesson.recommendedGear}</span>
            </div>
          )}
        </div>

        {/* Key Formulas Section */}
        {currentLesson.keyFormulas && currentLesson.keyFormulas.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#0047AB] font-semibold uppercase">
              <Activity className="w-4 h-4" />
              <span>{lang === 'zh' ? '核心计算公式与物理定律' : 'MATHEMATICAL FORMULAS & RECIPROCAL RULES'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.keyFormulas.map((form, fIdx) => (
                <div key={fIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 relative group">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-slate-900">
                      {lang === 'zh' ? form.labelZh : form.label}
                    </span>
                    <button
                      onClick={() => handleCopyFormula(form.formula, `f-${fIdx}`)}
                      className="p-1.5 rounded-lg bg-white hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs flex items-center space-x-1 cursor-pointer transition-colors"
                      title="Copy formula"
                    >
                      {copiedFormula === `f-${fIdx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs overflow-x-auto">
                    <code>{form.formula}</code>
                  </div>

                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {form.explanationZh}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Tips Box */}
        <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#0047AB]">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'zh' ? 'Point Grey 摄影社社员速记秘籍 (QUICK TIPS)' : 'POINT GREY CHEAT SHEET & QUICK TIPS'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {(lang === 'zh' ? currentLesson.quickTipsZh : currentLesson.quickTips).map((tip, tIdx) => (
              <div key={tIdx} className="p-3 rounded-xl bg-white border border-blue-100 text-xs text-slate-700 font-light leading-relaxed flex items-start space-x-2 shadow-2xs">
                <span className="text-[#0047AB] font-bold shrink-0">•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Comprehensive Markdown / Guide */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center space-x-2 text-xs font-mono text-[#0047AB] font-semibold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'zh' ? '系统化深度讲义与图解' : 'IN-DEPTH COMPREHENSIVE TEXTBOOK'}</span>
          </div>

          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 whitespace-pre-line font-light">
            {lang === 'zh' ? currentLesson.detailedGuideZh : currentLesson.detailedGuide}
          </div>
        </div>

        {/* Practical Field Scenarios Table */}
        {currentLesson.practicalScenariosZh && currentLesson.practicalScenariosZh.length > 0 && (
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#0047AB] font-semibold uppercase">
              <Camera className="w-4 h-4" />
              <span>{lang === 'zh' ? '大温赛场与校园实战场景参数对照' : 'REAL-WORLD SCENARIO RECIPES'}</span>
            </div>

            <div className="space-y-3">
              {currentLesson.practicalScenariosZh.map((sc, sIdx) => (
                <div key={sIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="font-serif font-bold text-sm text-slate-900">{sc.scenario}</div>
                    <div className="text-xs text-slate-500 font-light">{sc.why}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-white border border-slate-300 font-mono text-xs font-bold text-[#0047AB] shrink-0 shadow-2xs">
                    ⚙️ {sc.recommendedSettings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
