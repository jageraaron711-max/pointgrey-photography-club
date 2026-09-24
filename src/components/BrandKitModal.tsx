import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClubLogo, LogoColorScheme } from './ClubLogo';
import { 
  Sparkles, Download, Copy, Check, Shield, Layers, 
  Aperture, Wind, Award, Camera, Eye, Zap, Palette,
  X, ExternalLink, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Master rendered logo assets from generate_image
import clubLogoLight from '../assets/images/club_hound_logo_1788332250249.jpg';
import clubLogoDark from '../assets/images/club_hound_dark_1788332276128.jpg';

interface BrandKitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandKitModal: React.FC<BrandKitModalProps> = ({ isOpen, onClose }) => {
  const { lang } = useApp();
  const [activeColorScheme, setActiveColorScheme] = useState<LogoColorScheme>('heritage');
  const [activeTab, setActiveTab] = useState<'overview' | 'concept' | 'mockups' | 'assets'>('overview');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [copiedSvg, setCopiedSvg] = useState(false);

  if (!isOpen) return null;

  const brandColors = [
    { nameZh: 'Point Grey 经典蓝', nameEn: 'Point Grey Navy', hex: '#0047AB', rgb: '0, 71, 171', roleZh: '品牌主色 · 沉稳专业' },
    { nameZh: '飓风极光青', nameEn: 'Media Storm Cyan', hex: '#06B6D4', rgb: '6, 182, 212', roleZh: '辅助先锋色 · 数码与高能' },
    { nameZh: '荣誉麦穗金', nameEn: 'Heritage Gold', hex: '#F59E0B', rgb: '245, 158, 11', roleZh: '灵犬点缀 · 摄影光学荣誉' },
    { nameZh: '暗房钛黑', nameEn: 'Darkroom Titanium', hex: '#0B132B', rgb: '11, 19, 43', roleZh: '暗夜基底 · OLED纯净画质' },
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setTimeout(() => setCopiedColor(null), 2000);
    });
  };

  const handleCopySvgCode = () => {
    const svgString = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="56" stroke="#0047AB" stroke-width="2.5" stroke-dasharray="4 2 1 2" fill="none"/>
  <circle cx="60" cy="60" r="46" fill="#0047AB" fill-opacity="0.08"/>
  <path d="M 60 16 C 75 16, 92 28, 98 42 L 76 54 C 72 45, 64 40, 60 40 Z" fill="#0047AB"/>
  <path d="M 104 60 C 104 75, 92 92, 78 98 L 66 76 C 75 72, 80 64, 80 60 Z" fill="#2563EB"/>
  <path d="M 60 104 C 45 104, 28 92, 22 78 L 44 66 C 48 75, 56 80, 60 80 Z" fill="#06B6D4"/>
  <path d="M 16 60 C 16 45, 28 28, 42 22 L 54 44 C 45 48, 40 56, 40 60 Z" fill="#0047AB"/>
  <g transform="translate(14, 28) scale(0.78)" fill="#F59E0B">
    <path d="M 112 18 C 107 14, 96 11, 88 15 C 84 10, 80 8, 77 12 C 75 16, 73 22, 66 26 C 58 30, 48 31, 38 31 C 26 31, 14 36, 4 48 C 8 50, 16 48, 22 42 C 30 36, 40 37, 48 37 C 54 37, 62 44, 70 45 C 76 46, 84 42, 92 34 C 98 28, 106 24, 114 20 Z"/>
    <path d="M 78 28 C 86 36, 96 46, 110 52 C 114 54, 116 53, 114 50 C 104 44, 92 34, 82 24 Z"/>
    <path d="M 36 33 C 24 38, 12 46, -2 46 C -5 46, -4 49, -1 50 C 14 52, 28 44, 42 36 Z"/>
  </g>
</svg>`;
    navigator.clipboard.writeText(svgString).then(() => {
      setCopiedSvg(true);
      setTimeout(() => setCopiedSvg(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Navigation Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-white to-slate-50 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0047AB] flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
              <ClubLogo size={32} colorScheme="dark" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-900">
                  {lang === 'zh' ? '社团 Logo' : 'Official Logo'}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#0047AB] text-white">
                  PGPC
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500">
                Point Grey Hounds · 官方视觉标识 (Point Grey Photo Club • Est. 1929)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Sub-navigation Bar */}
        <div className="px-6 py-2 bg-slate-100/70 border-b border-slate-200 flex space-x-2 overflow-x-auto shrink-0 font-mono text-xs">
          {[
            { id: 'overview', labelZh: 'Logo 概览与调色盘', labelEn: 'Logo Overview' },
            { id: 'concept', labelZh: '设计理念与拆解', labelEn: 'Design Concept' },
            { id: 'mockups', labelZh: '效果展示与周边', labelEn: 'Showcase' },
            { id: 'assets', labelZh: 'Logo 文件与下载', labelEn: 'Download' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#0047AB] text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              {lang === 'zh' ? tab.labelZh : tab.labelEn}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* TAB 1: OVERVIEW & COLORWAYS */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top Hero: Master Emblem Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left: Master Visual Artwork */}
                <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-8 rounded-3xl border border-slate-800 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[320px]">
                  <div className="absolute inset-0 bg-editorial-dots opacity-20 pointer-events-none" />
                  
                  {/* Master Logo Image with subtle reflection */}
                  <div className="relative z-10 space-y-4">
                    <img
                      src={activeColorScheme === 'dark' ? clubLogoDark : clubLogoLight}
                      alt="Point Grey Photo Collective Official Logo"
                      referrerPolicy="no-referrer"
                      className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-2xl shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="space-y-1">
                      <div className="text-white font-serif font-bold text-lg">
                        POINT GREY PHOTO COLLECTIVE
                      </div>
                      <div className="text-xs font-mono text-cyan-300 font-semibold tracking-wider">
                        {lang === 'zh' ? '无限进步' : 'INFINITE PROGRESS'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Real-time Vector Sandbox & Colorway Switcher */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-slate-900">
                      {lang === 'zh' ? '官方矢量标识系统' : 'Vector Brand System'}
                    </h4>
                    <p className="text-xs text-slate-600 font-light mt-1">
                      {lang === 'zh'
                        ? '支持任意尺寸无损放大，可应用于超大幅面海报、社团冲锋衣刺绣、镜头盖徽章及数码水印。'
                        : 'Pixel-perfect vector scaling for camera straps, varsity jackets, and 4K digital video watermarks.'}
                    </p>
                  </div>

                  {/* Colorway Toggle Buttons */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-slate-500 uppercase font-bold">
                      {lang === 'zh' ? '切换配色主题 (Color Schemes)' : 'Select Color Scheme'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'heritage', labelZh: 'Point Grey 经典蓝', labelEn: 'Heritage Navy', bg: 'bg-[#0047AB]' },
                        { id: 'dark', labelZh: '飓风暗夜黑', labelEn: 'Storm Dark', bg: 'bg-slate-900' },
                        { id: 'gold', labelZh: '琥珀麦穗金', labelEn: 'Amber Gold', bg: 'bg-amber-600' },
                        { id: 'monochrome', labelZh: '印刷极简黑', labelEn: 'Monochrome', bg: 'bg-slate-700' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setActiveColorScheme(c.id as LogoColorScheme)}
                          className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all cursor-pointer ${
                            activeColorScheme === c.id
                              ? 'border-[#0047AB] bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full ${c.bg} shrink-0`} />
                          <span className="text-xs font-mono font-medium truncate">
                            {lang === 'zh' ? c.labelZh : c.labelEn}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Realtime SVG Live Preview Card */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
                        <ClubLogo size={56} colorScheme={activeColorScheme} animated />
                      </div>
                      <div className="space-y-0.5">
                        <div className="font-serif font-bold text-sm text-slate-900">
                          Point Grey Hounds
                        </div>
                        <div className="text-xs font-mono text-[#0047AB] font-bold">
                          MEDIA STORM COLLECTIVE
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          SVG Vector · Infinite Scalability
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCopySvgCode}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-xs font-mono font-semibold flex items-center space-x-1.5 transition-colors cursor-pointer shadow-2xs"
                    >
                      {copiedSvg ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedSvg ? 'SVG 已复制' : '复制 SVG 代码'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Color Palette Grid */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <h4 className="font-serif font-bold text-base text-slate-900">
                  {lang === 'zh' ? '官方 VI 标准色板' : 'Official Brand Palette'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {brandColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 hover:shadow-md transition-shadow group"
                    >
                      <div 
                        className="h-16 rounded-xl flex items-end p-2 text-white font-mono text-xs font-bold shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      >
                        <span className="bg-black/30 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px]">
                          {color.hex}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">
                          {lang === 'zh' ? color.nameZh : color.nameEn}
                        </div>
                        <div className="text-[11px] text-slate-500 font-light mt-0.5">
                          {color.roleZh}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                        <span>RGB: {color.rgb}</span>
                        <button
                          onClick={() => handleCopyColor(color.hex)}
                          className="hover:text-slate-900 cursor-pointer flex items-center space-x-1"
                        >
                          {copiedColor === color.hex ? (
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESIGN CONCEPT BREAKDOWN */}
          {activeTab === 'concept' && (
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <h4 className="font-serif font-bold text-2xl text-slate-900">
                  {lang === 'zh' ? '设计理念：Point Grey 灵犬之速与「无限进步」探索精神' : 'Design Story: Hound Velocity & Infinite Progress'}
                </h4>
                <p className="text-sm text-slate-600 font-normal leading-relaxed">
                  {lang === 'zh'
                    ? '本会标紧扣两大精神图腾：一是 Point Grey 中学的百年灵犬（Hounds）吉祥物与经典相机光学镜头，二是秉持影视飓风“无限进步”的青年极客探索精神。'
                    : 'The official logo integrates the heritage Point Grey Greyhound and classic camera optics with the "Infinite Progress" filmmaking spirit.'}
                </p>
              </div>

              {/* 4 Core Pillars Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. The Greyhound */}
                <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0047AB] text-white flex items-center justify-center shadow-xs">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '01 // Point Grey 灵犬 · 极致速度 (The Greyhound)' : '01 // Greyhound Velocity'}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '流线型飞跃的猎犬剪影，象征摄影师在体育赛场、新闻突发现场中瞬息万变的敏锐直觉与 1/8000s 的果断定格。身姿轻盈有力，永远向前。'
                      : 'The aerodynamic leaping hound represents sharp photographic reflexes, freezing peak athletic moments in 1/8000s precision.'}
                  </p>
                </div>

                {/* 2. Optical Lens Iris */}
                <div className="p-6 rounded-2xl bg-cyan-50/60 border border-cyan-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '02 // 经典镜头 · 八叶光圈 (The Optical Iris)' : '02 // Classic Optical Iris'}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '对称排列的相机镜头光圈叶片与镀膜光学镜片，代表严谨的光学构图法则、景深控制与相机机械工艺的美学底蕴。'
                      : 'Symmetrical camera aperture blades and coated optical elements representing compositional rigor and classic camera engineering.'}
                  </p>
                </div>

                {/* 3. Infinite Progress */}
                <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '03 // 无限进步 · 极客信条 (Infinite Progress)' : '03 // Infinite Progress'}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '致敬影视飓风的核心信念：“每一帧画面、每一次调色、每一次剪辑，都比上一秒更进一步”。拒绝平庸，以工匠精神追求极致视听表达。'
                      : 'Dedicated to the core philosophy of Infinite Progress: continuously refining every single frame, color grade, and cut with passion and craftsmanship.'}
                  </p>
                </div>

                {/* 4. Optical Accuracy */}
                <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h5 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '04 // 光学刻度 · 科学精神 (Optical Rigor)' : '04 // Optical Rigor'}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '环绕周边的微米级刻度线与同心圆，代表暗房化学配比与现代数码感光元件的严谨结合。科技与人文在光影中达成统一。'
                      : 'Precision optical gauge marks reflecting the perfect harmony between darkroom chemistry and digital sensor science.'}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: MERCH & MOCKUPS */}
          {activeTab === 'mockups' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif font-bold text-xl text-slate-900">
                  {lang === 'zh' ? '社团装备与实物应用效果' : 'Brand Merchandise & Equipment Mockups'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Point Grey Photo Collective Official Gear & Credential Visualizations
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Mockup 1: Sideline Press Pass */}
                <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase">PRESS PASS // 2026</span>
                    <span className="text-[10px] font-mono text-amber-400">VSB SIDELINE</span>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <ClubLogo size={44} colorScheme="dark" />
                    <div className="space-y-0.5">
                      <div className="font-serif font-bold text-sm text-white">OFFICIAL MEDIA</div>
                      <div className="text-[10px] font-mono text-blue-300">Point Grey Photo Collective</div>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                      <span>DELEGATE:</span>
                      <span className="text-white font-bold">Aaron Peng (Gr. 11)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ACCESS:</span>
                      <span className="text-emerald-400 font-bold">ALL STADIUM PITCH</span>
                    </div>
                  </div>
                </div>

                {/* Mockup 2: Camera Lens Cap / Strap Badge */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 text-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                    {lang === 'zh' ? '镜头盖与金属徽章' : 'Lens Cap & Metal Emblem'}
                  </span>
                  
                  <div className="w-28 h-28 mx-auto rounded-full bg-slate-900 border-4 border-slate-800 flex items-center justify-center shadow-lg relative">
                    <ClubLogo size={70} colorScheme="dark" animated />
                  </div>

                  <p className="text-xs text-slate-600 font-mono">
                    CNC 阳极氧化铝合金激光雕刻 · 82mm 镜头盖
                  </p>
                </div>

                {/* Mockup 3: Club Varsity Jacket */}
                <div className="p-5 rounded-2xl bg-[#0047AB] text-white space-y-4">
                  <span className="text-[10px] font-mono text-cyan-200 uppercase font-bold block">
                    {lang === 'zh' ? '社团冲锋衣后背刺绣' : 'Varsity Jacket Embroidery'}
                  </span>

                  <div className="p-4 rounded-xl bg-blue-950/60 border border-blue-400/30 text-center space-y-2">
                    <ClubLogo size={50} colorScheme="gold" />
                    <div className="font-serif font-bold text-base tracking-wider text-white">
                      POINT GREY HOUNDS
                    </div>
                    <div className="text-[10px] font-mono text-amber-300">
                      无限进步 · INFINITE PROGRESS
                    </div>
                  </div>

                  <p className="text-xs text-blue-100 font-light text-center">
                    防风防水全天候赛场边线摄影专用冲锋衣
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: ASSETS & DOWNLOAD */}
          {activeTab === 'assets' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif font-bold text-xl text-slate-900">
                  {lang === 'zh' ? '矢量源文件与官方素材库' : 'Vector Assets & Brand Guidelines'}
                </h4>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Download high-resolution assets for school yearbooks, posters, and video overlays
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0047AB] flex items-center justify-center font-mono font-bold text-xs">
                      SVG
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Official Vector Emblem (SVG)</div>
                      <div className="text-[11px] text-slate-500 font-mono">Pure scalable vector code</div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopySvgCode}
                    className="px-3.5 py-2 rounded-xl bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-blue-700 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{copiedSvg ? 'Copied' : 'Copy SVG'}</span>
                  </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs">
                      PNG
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-900">Master Artworks (Ultra HD)</div>
                      <div className="text-[11px] text-slate-500 font-mono">Light & Dark 4K Renders</div>
                    </div>
                  </div>

                  <a
                    href={clubLogoLight}
                    download="PointGrey_Photo_Collective_Logo.jpg"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold hover:bg-slate-800 transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </a>
                </div>

              </div>

              {/* Usage Guidelines Card */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-900 text-xs font-mono space-y-2">
                <div className="flex items-center space-x-2 font-bold text-amber-950">
                  <Shield className="w-4 h-4" />
                  <span>{lang === 'zh' ? '使用规范与版权指引' : 'Brand Identity Usage Rules'}</span>
                </div>
                <p className="leading-relaxed">
                  {lang === 'zh'
                    ? '本会标版权归温哥华 Point Grey Secondary 摄影与视觉新闻社团所有。社员可在赛事新闻稿、影展画册、个人摄影作品水印及社团代表证上规范使用。请保持色彩对比度与最小保护边距（不小于 8px）。'
                    : 'Official identity asset for PGSS Photo Collective. Maintain minimum 8px clear space around badge when exporting overlays.'}
                </p>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Footer Action Bar */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-slate-500 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{lang === 'zh' ? '会标已正式部署至全站' : 'Official Logo Deployed Site-Wide'}</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {lang === 'zh' ? '完成浏览' : 'Close Brand Kit'}
          </button>
        </div>

      </motion.div>
    </div>
  );
};
