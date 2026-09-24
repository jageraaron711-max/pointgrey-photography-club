import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowUp, ArrowDown, ArrowRight, Plus, X, 
  Camera, ChevronDown, Sparkles, Edit3, Upload, Check, RefreshCw
} from 'lucide-react';

interface HeroSectionProps {
  onExploreGallery: () => void;
  onExploreEvents?: () => void;
  onOpenCurator: () => void;
  onOpenBrandKit?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreGallery,
  onOpenCurator,
  onOpenBrandKit,
}) => {
  const { lang, photos, setSelectedPhoto } = useApp();

  // Point Grey Photography Club Curated Cover Stories
  const [featuredStories, setFeaturedStories] = useState([
    {
      id: 'pgss-hounds-sidelines',
      issueCode: 'PGPC—HOUNDS / 01',
      coverTag: 'PGSS ATHLETICS',
      locationTag: 'VANCOUVER · BC',
      deskEyebrow: 'POINT GREY SECONDARY SCHOOL · ATHLETICS & SPORTS',
      titleZh: 'Point Grey 灵犬疾速：绿茵场上的边线长焦决胜瞬间',
      titleEn: 'Point Grey Hounds Athletics: Sideline Telephoto Freeze & Match-Point Rush',
      subtitleZh: '长焦镜头下的肌肉力量与汗水飞溅，定格雨中绿茵绝杀破门与全场欢呼。',
      subtitleEn: 'Raw athletic determination frozen at 1/2500s across the Vancouver rain-soaked pitch.',
      imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1800&q=85',
      photographer: 'Amber Hao (Gr. 12)',
      gear: 'Sony α7R V · FE 100-400mm f/4.5-5.6 GM OSS',
      exif: '1/2500s · f/5.0 · ISO 800 · 340mm',
      storyAnchor: '#stories',
      matchScore: 'VANCOUVER SECONDARY LEAGUE · HOUNDS VARSITY',
    },
    {
      id: 'pacific-spirit-coastal',
      issueCode: 'PGPC—SPIRIT / 02',
      coverTag: 'PACIFIC COAST',
      locationTag: 'VANCOUVER · BC',
      deskEyebrow: 'PACIFIC SPIRIT & NATURAL DOCUMENTARY · WEST COAST',
      titleZh: '太平洋温带雨林与温哥华海岸线的诗意光影',
      titleEn: 'Pacific Spirit Temperate Rainforest & Coastal Fog Tyndall Rays',
      subtitleZh: '清晨穿透百年道格拉斯冷杉的丁达尔圣光，与英吉利湾潮汐共鸣。',
      subtitleEn: 'Morning coastal fog rays penetrating ancient Douglas firs along English Bay coastline.',
      imageUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1800&q=85',
      photographer: 'Evan Harrison (Gr. 10)',
      gear: 'Sony α7M IV · FE 24-70mm f/2.8 GM II',
      exif: '1/250s · f/4.0 · ISO 200 · 35mm',
      storyAnchor: '#gallery',
      matchScore: 'GEOGRAPHIC VISUAL ESSAY · EXPEDITION 08',
    },
    {
      id: 'darkroom-craft',
      issueCode: 'PGPC—DARKROOM / 03',
      coverTag: 'ANALOG DARKROOM',
      locationTag: "MS YELLAND'S ROOM",
      deskEyebrow: 'POINT GREY ANALOG PHOTOGRAPHY & SILVER GELATIN CRAFT',
      titleZh: '暗房显影实验：传统黑白银盐手工放制的温度',
      titleEn: 'Darkroom Craft: 35mm Silver Gelatin Manual Emulsion Process',
      subtitleZh: '在红光暗房的显影药水中，看着银盐颗粒在相纸上慢慢呼吸凝聚。',
      subtitleEn: 'Hand-processed 35mm film emulsion and silver gelatin enlarger printmaking under safe red light.',
      imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85',
      photographer: 'Darkroom Collective & Justin Zhang',
      gear: 'Canon EOS 1V · EF 50mm f/1.2 L USM',
      exif: 'Ilford HP5 Plus 400 · D-76 1:1 Manual Develop',
      storyAnchor: '#stories',
      matchScore: 'HANDMADE CRAFT · 35MM MONOCHROME',
    },
    {
      id: 'campus-youth-chronicles',
      issueCode: 'PGPC—CAMPUS / 04',
      coverTag: 'CAMPUS CHRONICLES',
      locationTag: 'POINT GREY HIGH',
      deskEyebrow: 'POINT GREY SECONDARY · CAMPUS HUMANITIES & PORTRAITURE',
      titleZh: '光影长廊与金色午后：Point Grey 校园人文纪实',
      titleEn: 'Golden Hour Corridors & Youth Portraiture: PGSS Campus Chronicles',
      subtitleZh: '图书馆与红砖拱门之间的金色斜阳，记录社员与同学专注创造的真实侧影。',
      subtitleEn: 'Capturing candid student life, natural light portraits, and classroom creativity.',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1800&q=85',
      photographer: 'Chloe Chen (Gr. 11)',
      gear: 'Fujifilm X-T5 · XF 33mm f/1.4 R LM WR',
      exif: '1/640s · f/1.6 · ISO 320 · 33mm',
      storyAnchor: '#stories',
      matchScore: 'STUDENT VOICE · CAMPUS COMMUNITY',
    },
    {
      id: 'community-arts-festival',
      issueCode: 'PGPC—ARTS / 05',
      coverTag: 'PERFORMING ARTS',
      locationTag: 'PG AUDITORIUM',
      deskEyebrow: 'THEATRE & PERFORMING ARTS PHOTOGRAPHY · VANCOUVER',
      titleZh: '校园戏剧节舞台灯光与青年艺术纪实',
      titleEn: 'Campus Arts Festival Stage Lighting & Youth Theatre Highlights',
      subtitleZh: '戏剧舞台帷幕升起与青年演员的真挚情感，以影像传递艺术创作的感染力。',
      subtitleEn: 'Vibrant stage drama, dramatic spotlighting, and genuine student dedication.',
      imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1800&q=85',
      photographer: 'Rachel Liu (Gr. 11)',
      gear: 'Sony α7M IV · FE 35mm f/1.4 GM',
      exif: '1/320s · f/2.0 · ISO 800 · 35mm',
      storyAnchor: '#stories',
      matchScore: 'PERFORMING ARTS & CREATIVE EXHIBITION',
    },
  ]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'up' | 'down'>('down');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditingSlide, setIsEditingSlide] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Editable fields for the active slide
  const [editFormData, setEditFormData] = useState({
    titleZh: '',
    titleEn: '',
    subtitleZh: '',
    photographer: '',
    gear: '',
    exif: '',
    imageUrl: '',
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const current = featuredStories[activeSlide];
  const totalSlides = featuredStories.length;

  // Sync editing form data when active slide changes
  useEffect(() => {
    if (current) {
      setEditFormData({
        titleZh: current.titleZh,
        titleEn: current.titleEn,
        subtitleZh: current.subtitleZh,
        photographer: current.photographer,
        gear: current.gear,
        exif: current.exif,
        imageUrl: current.imageUrl,
      });
    }
  }, [activeSlide, current]);

  // Slide navigation handlers
  const handleNextSlide = useCallback(() => {
    setSlideDirection('down');
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrevSlide = useCallback(() => {
    setSlideDirection('up');
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Touch swipe support (Up / Down & Left / Right on mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;

    // Detect significant swipe (vertical or horizontal)
    if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
      if (deltaY < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    } else if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        handleNextSlide();
      } else {
        handlePrevSlide();
      }
    }
    touchStartY.current = null;
    touchStartX.current = null;
  };

  // Keyboard navigation for slide jumping (ArrowUp / ArrowDown)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleNextSlide();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handlePrevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextSlide, handlePrevSlide]);

  // Auto-cycle every 8 seconds when not paused and not editing
  useEffect(() => {
    if (isPaused || isEditingSlide) return;
    const timer = setInterval(() => {
      handleNextSlide();
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, isEditingSlide, handleNextSlide]);

  // Save changes to current slide
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeaturedStories(prev => {
      const updated = [...prev];
      updated[activeSlide] = {
        ...updated[activeSlide],
        ...editFormData,
      };
      return updated;
    });
    setIsEditingSlide(false);
  };

  // Handle local photo file upload for cover
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setEditFormData(prev => ({ ...prev, imageUrl: result }));
          setFeaturedStories(prev => {
            const updated = [...prev];
            updated[activeSlide] = { ...updated[activeSlide], imageUrl: result };
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Smooth scroll jump to sections
  const handleJumpToSection = (anchor: string) => {
    const targetId = anchor.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero-section" 
      className="relative w-full bg-[#f8faff] text-slate-900 border-b border-blue-100 pt-16 sm:pt-18 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Hidden File Input for Custom Cover Image */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      {/* Main Container - Fully responsive & height balanced for single view fit on desktop & clean mobile stack */}
      <div className="w-full flex flex-col md:flex-row min-h-[580px] lg:min-h-[640px] xl:min-h-[700px] max-h-none lg:max-h-[820px]">
        
        {/* ======================================================== */}
        {/* LEFT VERTICAL SPINE (POINT GREY ROYAL BLUE CONTROLLER)  */}
        {/* ======================================================== */}
        <div className="w-full md:w-14 lg:w-16 bg-[#0047AB] text-white flex flex-row md:flex-col items-center justify-between py-2.5 md:py-6 px-3 sm:px-4 md:px-0 border-b md:border-b-0 md:border-r border-blue-900/40 shrink-0 z-30 shadow-md">
          
          {/* Top rotated issue tag */}
          <div className="hidden md:flex flex-col items-center space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-blue-200 rotate-180 [writing-mode:vertical-rl] uppercase font-bold">
              PGPC · VANCOUVER
            </span>
            <span className="text-[9px] font-mono tracking-wider text-blue-300/80 rotate-180 [writing-mode:vertical-rl] uppercase">
              EST. POINT GREY
            </span>
          </div>

          {/* Mobile indicator for small screens with swipe hint */}
          <div className="flex md:hidden items-center justify-between w-full text-xs font-mono text-blue-100">
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-white tracking-wider">PGPC</span>
              <span>•</span>
              <span className="text-blue-200">
                {String(activeSlide + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
            
            {/* Mobile quick next/prev buttons */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePrevSlide}
                className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer active:bg-white active:text-[#0047AB]"
                aria-label="Previous Slide"
              >
                <ArrowUp className="w-3.5 h-3.5 -rotate-90" />
              </button>
              <button 
                onClick={handleNextSlide}
                className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center cursor-pointer active:bg-white active:text-[#0047AB]"
                aria-label="Next Slide"
              >
                <ArrowDown className="w-3.5 h-3.5 -rotate-90" />
              </button>
            </div>
          </div>

          {/* Center: Slide Index & Jump Controls */}
          <div className="hidden md:flex flex-col items-center space-y-3 my-auto">
            
            {/* Current Slide Number (e.g. 01) */}
            <div className="font-mono text-sm font-black text-white tracking-widest">
              {String(activeSlide + 1).padStart(2, '0')}
            </div>

            {/* Vertical Progress Bar */}
            <div className="w-[3px] h-12 bg-blue-900/60 relative overflow-hidden rounded-full">
              <motion.div 
                className="w-full bg-white rounded-full shadow-xs"
                animate={{ 
                  height: `${((activeSlide + 1) / totalSlides) * 100}%` 
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Total Slides Number (e.g. 05) */}
            <div className="font-mono text-[10px] text-blue-200 tracking-widest">
              {String(totalSlides).padStart(2, '0')}
            </div>

            {/* UP & DOWN Circular Jump Buttons */}
            <div className="flex flex-col items-center space-y-2 pt-2">
              <button 
                id="spine-slide-prev-btn"
                onClick={handlePrevSlide}
                className="w-8 h-8 rounded-full border border-blue-300/40 hover:border-white bg-white/10 hover:bg-white text-white hover:text-[#0047AB] flex items-center justify-center transition-all cursor-pointer group shadow-xs"
                title={lang === 'zh' ? '上一组作品 (↑)' : 'Previous Story (↑)'}
                aria-label="Previous Slide"
              >
                <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button 
                id="spine-slide-next-btn"
                onClick={handleNextSlide}
                className="w-8 h-8 rounded-full border border-blue-300/40 hover:border-white bg-white/10 hover:bg-white text-white hover:text-[#0047AB] flex items-center justify-center transition-all cursor-pointer group shadow-xs"
                title={lang === 'zh' ? '下一组作品 (↓)' : 'Next Story (↓)'}
                aria-label="Next Slide"
              >
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Bottom rotated CLUB label */}
          <div className="hidden md:block text-[10px] font-mono font-bold tracking-widest text-blue-200 rotate-180 [writing-mode:vertical-rl] uppercase">
            GALLERY
          </div>

        </div>

        {/* ======================================================== */}
        {/* MAIN SPLIT STAGE: LEFT PHOTO STAGE & RIGHT EDITORIAL     */}
        {/* ======================================================== */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
          
          {/* ====================================================== */}
          {/* LEFT: FRAMED PHOTOGRAPHY WITH VIEWFINDER CORNERS       */}
          {/* ====================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 relative bg-slate-950 flex items-center justify-center p-2.5 sm:p-4 lg:p-6 overflow-hidden group">
            
            <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-full min-h-[300px] max-h-[760px] rounded-sm overflow-hidden bg-black shadow-2xl">
              
              {/* 4 Optical Viewfinder Crop Corner Brackets in Point Grey Blue/White */}
              <div className="absolute top-3 left-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-l-2 border-blue-400 z-20 pointer-events-none" />
              <div className="absolute top-3 right-3 w-4 h-4 sm:w-5 sm:h-5 border-t-2 border-r-2 border-blue-400 z-20 pointer-events-none" />
              <div className="absolute bottom-3 left-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-l-2 border-blue-400 z-20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 sm:w-5 sm:h-5 border-b-2 border-r-2 border-blue-400 z-20 pointer-events-none" />

              {/* Top-Left Inside Photo Badge */}
              <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 flex items-center space-x-1.5 sm:space-x-2">
                <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 bg-[#0047AB]/90 backdrop-blur-xs text-white font-mono text-[10px] sm:text-xs font-bold tracking-wider border border-blue-300/40 uppercase shadow-sm">
                  {current.issueCode}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 sm:py-1 bg-black/70 text-blue-100 font-mono text-[10px] uppercase border border-white/10">
                  {current.matchScore}
                </span>
              </div>

              {/* Bottom-Left Inside Photo Label */}
              <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 z-20">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/90 font-semibold uppercase drop-shadow-md">
                  {current.coverTag}
                </span>
              </div>

              {/* Bottom-Right Inside Photo Label */}
              <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 z-20">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white/90 font-semibold uppercase drop-shadow-md">
                  {current.locationTag}
                </span>
              </div>

              {/* Dynamic Slide Image with Motion Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ 
                    opacity: 0, 
                    y: slideDirection === 'down' ? 16 : -16 
                  }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ 
                    opacity: 0, 
                    y: slideDirection === 'down' ? -16 : 16 
                  }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setIsDetailModalOpen(true)}
                  title={lang === 'zh' ? '点击展开作品导读与器材参数' : 'Click to inspect photo details'}
                >
                  <img
                    src={current.imageUrl}
                    alt={lang === 'zh' ? current.titleZh : current.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out brightness-95"
                  />
                  {/* Cinematic Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Camera Metadata Telemetry (Hover Overlay) */}
              <div className="absolute bottom-10 sm:bottom-12 left-3 sm:left-5 right-3 sm:right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="bg-[#0047AB]/90 backdrop-blur-md border border-blue-300/30 p-2 sm:p-2.5 rounded text-white flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] sm:text-[11px] shadow-lg">
                  <span className="text-blue-100 truncate max-w-[70%]">{current.gear} · {current.exif}</span>
                  <span className="text-white font-bold">{current.photographer}</span>
                </div>
              </div>

              {/* Quick Actions at Top Right: Edit Cover & Briefing Button */}
              <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-20 flex items-center space-x-1.5">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingSlide(true);
                  }}
                  className="px-2 py-1 bg-white/20 hover:bg-[#0047AB] backdrop-blur-sm text-white font-mono text-[10px] rounded flex items-center space-x-1 cursor-pointer transition-colors border border-white/30"
                  title={lang === 'zh' ? '在线编辑此作品图文' : 'Edit this slide'}
                >
                  <Edit3 className="w-3 h-3 text-blue-200" />
                  <span className="hidden sm:inline">{lang === 'zh' ? '编辑封面' : 'EDIT'}</span>
                </button>

                <button 
                  onClick={() => setIsDetailModalOpen(true)}
                  className="px-2 py-1 bg-white/15 hover:bg-[#0047AB] backdrop-blur-sm text-white font-mono text-[10px] rounded flex items-center space-x-1 cursor-pointer transition-colors border border-white/20"
                >
                  <Camera className="w-3 h-3 text-blue-200" />
                  <span>{lang === 'zh' ? '简报' : 'BRIEF'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* ====================================================== */}
          {/* RIGHT: POINT GREY EDITORIAL TYPOGRAPHY (BLUE & WHITE)  */}
          {/* ====================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 bg-white text-slate-900 p-4 sm:p-6 lg:p-8 xl:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-blue-100 shadow-xs relative">
            
            {/* Top Bar: Point Grey School Eyebrow & Actions */}
            <div className="flex items-start justify-between gap-3 border-b border-blue-100 pb-3">
              <div className="font-mono text-[10px] sm:text-xs text-[#0047AB] tracking-wider uppercase font-bold leading-tight">
                {current.deskEyebrow}
              </div>

              <div className="flex items-center space-x-1 shrink-0">
                {/* One-click Edit Slide button */}
                <button
                  onClick={() => setIsEditingSlide(true)}
                  className="text-slate-500 hover:text-[#0047AB] hover:bg-blue-50 p-1.5 rounded transition-colors cursor-pointer"
                  title={lang === 'zh' ? '自定义修改文字与封面' : 'Edit Headline & Slide'}
                  aria-label="Edit Slide"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {/* '+' button to inspect briefing */}
                <button
                  id="hero-expand-plus-btn"
                  onClick={() => setIsDetailModalOpen(true)}
                  className="text-[#0047AB] hover:text-blue-800 hover:rotate-90 transition-all duration-300 p-1 cursor-pointer"
                  title={lang === 'zh' ? '展开本期作品导读与摄影师' : 'Open story briefing'}
                  aria-label="Story Detail Modal"
                >
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                </button>
              </div>
            </div>

            {/* Club Authentic Headline & Narrative */}
            <div className="py-4 sm:py-6 lg:py-6 space-y-3 sm:space-y-4">
              
              {/* Point Grey Signature Typography */}
              <div className="space-y-1.5">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded bg-blue-50 text-[#0047AB] text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase border border-blue-200">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>POINT GREY SECONDARY SCHOOL · EST. VANCOUVER</span>
                </div>

                <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#0047AB] leading-[1.12] tracking-tight">
                  {lang === 'zh' ? '以光影记录生活温度' : 'Framing Moments'}
                  <span className="block text-slate-900 font-sans font-black tracking-tighter text-2xl sm:text-3xl lg:text-4xl xl:text-[2.6rem] pt-0.5">
                    {lang === 'zh' ? '每一帧都追求极致。' : 'With Pure Purpose.'}
                  </span>
                </h1>
              </div>

              {/* Current slide specific title & subtitle */}
              <div className="p-3 rounded-lg bg-blue-50/60 border border-blue-100/80 space-y-1">
                <div className="text-xs font-mono font-bold text-[#0047AB] flex items-center justify-between">
                  <span>{current.issueCode}</span>
                  <span className="text-slate-500 font-normal">{current.photographer}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-900 font-serif leading-snug">
                  {lang === 'zh' ? current.titleZh : current.titleEn}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {lang === 'zh' ? current.subtitleZh : current.subtitleEn}
                </p>
              </div>

              {/* Club Narrative & Mission */}
              <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed hidden sm:block">
                {lang === 'zh' 
                  ? '汇聚 Point Grey 中学热爱影像的青年创作者。立足公益服务与多元摄影实践，从赛场边线上的长焦决胜瞬间，到暗房中银盐颗粒的呼吸，我们用镜头记录温哥华与校园有温度的真实故事。'
                  : 'A student-led creative collective at Point Grey Secondary School. Dedicated to non-profit campus coverage, athletic telephoto action, analog darkroom craft, and authentic youth storytelling across Vancouver.'}
              </p>
            </div>

            {/* Bottom Row: Divider, Tagline & Transition / Jump Triggers */}
            <div className="space-y-3 pt-3 border-t border-blue-100">
              
              {/* Tagline & Slide Dots Indicator (Clickable & Draggable) */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#0047AB]">
                <span className="font-bold tracking-wider uppercase">
                  POINT GREY PHOTO · INFINITE PROGRESS
                </span>

                {/* Clickable Slide Dots for Mobile & Desktop Navigation */}
                <div className="flex items-center space-x-1.5">
                  {featuredStories.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSlideDirection(idx > activeSlide ? 'down' : 'up');
                        setActiveSlide(idx);
                      }}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeSlide === idx 
                          ? 'w-5 bg-[#0047AB]' 
                          : 'w-2 bg-blue-200 hover:bg-blue-300'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* "转跳式" Navigation & Story Jump Bar */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                
                {/* Jump to #stories (Dispatches & Stories) */}
                <button
                  id="hero-jump-stories-btn"
                  onClick={() => handleJumpToSection('stories')}
                  className="inline-flex items-center space-x-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#0047AB] hover:bg-[#003d94] text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer group shadow-sm rounded"
                >
                  <span>{lang === 'zh' ? '↓ 浏览纪实故事' : '↓ View Stories'}</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </button>

                {/* Jump to #gallery (Showcase) */}
                <button
                  id="hero-jump-gallery-btn"
                  onClick={() => handleJumpToSection('gallery')}
                  className="inline-flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 bg-blue-50 hover:bg-blue-100 text-[#0047AB] font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border border-blue-200 rounded"
                >
                  <Camera className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>{lang === 'zh' ? '作品影展' : 'Gallery'}</span>
                </button>

                {/* Next Slide Transition Trigger */}
                <button
                  id="hero-next-slide-btn"
                  onClick={handleNextSlide}
                  className="inline-flex items-center space-x-1 px-2.5 sm:px-3 py-2 sm:py-2.5 text-slate-600 hover:text-[#0047AB] font-mono text-xs font-semibold transition-colors cursor-pointer ml-auto"
                  title="Next Story Cover"
                >
                  <span>{lang === 'zh' ? '下一组作品' : 'Next'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* IN-PLACE SLIDE EDIT MODAL (解决根本编辑不了、不能拖动的问题) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isEditingSlide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-xl bg-white text-slate-900 rounded-xl shadow-2xl border border-blue-200 overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-blue-100 bg-blue-50/80">
                <div className="flex items-center space-x-2">
                  <Edit3 className="w-4 h-4 text-[#0047AB]" />
                  <span className="font-mono text-xs font-bold text-[#0047AB] uppercase">
                    {lang === 'zh' ? `编辑本组作品信息 (${current.issueCode})` : `Edit Slide Info (${current.issueCode})`}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditingSlide(false)}
                  className="p-1 rounded text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSaveEdit} className="p-5 space-y-4 text-xs">
                
                {/* Photo Upload & Preview */}
                <div className="space-y-1.5">
                  <label className="font-mono font-bold text-slate-700 block">
                    {lang === 'zh' ? '更换封面图片' : 'Cover Image'}
                  </label>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={editFormData.imageUrl} 
                      alt="preview" 
                      className="w-20 h-14 object-cover rounded border border-blue-200 bg-black"
                    />
                    <div className="flex-1 space-y-1.5">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded bg-blue-50 hover:bg-blue-100 text-[#0047AB] font-mono text-xs font-semibold border border-blue-200 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{lang === 'zh' ? '本地上传新图片' : 'Upload Image'}</span>
                      </button>
                      <input
                        type="url"
                        value={editFormData.imageUrl}
                        onChange={(e) => setEditFormData({ ...editFormData, imageUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-2.5 py-1.5 rounded border border-slate-200 font-mono text-[11px] focus:outline-hidden focus:border-[#0047AB]"
                      />
                    </div>
                  </div>
                </div>

                {/* Title Zh */}
                <div className="space-y-1">
                  <label className="font-mono font-bold text-slate-700 block">
                    {lang === 'zh' ? '中文标题' : 'Chinese Title'}
                  </label>
                  <input
                    type="text"
                    value={editFormData.titleZh}
                    onChange={(e) => setEditFormData({ ...editFormData, titleZh: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-200 text-slate-900 focus:outline-hidden focus:border-[#0047AB]"
                    required
                  />
                </div>

                {/* Title En */}
                <div className="space-y-1">
                  <label className="font-mono font-bold text-slate-700 block">
                    {lang === 'zh' ? '英文标题' : 'English Title'}
                  </label>
                  <input
                    type="text"
                    value={editFormData.titleEn}
                    onChange={(e) => setEditFormData({ ...editFormData, titleEn: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-200 text-slate-900 focus:outline-hidden focus:border-[#0047AB]"
                    required
                  />
                </div>

                {/* Subtitle Zh */}
                <div className="space-y-1">
                  <label className="font-mono font-bold text-slate-700 block">
                    {lang === 'zh' ? '故事简述' : 'Story Subtitle'}
                  </label>
                  <textarea
                    rows={2}
                    value={editFormData.subtitleZh}
                    onChange={(e) => setEditFormData({ ...editFormData, subtitleZh: e.target.value })}
                    className="w-full px-3 py-1.5 rounded border border-slate-200 text-slate-900 focus:outline-hidden focus:border-[#0047AB]"
                  />
                </div>

                {/* Photographer & Gear Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-mono font-bold text-slate-700 block">
                      {lang === 'zh' ? '拍摄者 / 年级' : 'Photographer'}
                    </label>
                    <input
                      type="text"
                      value={editFormData.photographer}
                      onChange={(e) => setEditFormData({ ...editFormData, photographer: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-slate-200 text-slate-900 focus:outline-hidden focus:border-[#0047AB]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono font-bold text-slate-700 block">
                      {lang === 'zh' ? '相机设备' : 'Camera Gear'}
                    </label>
                    <input
                      type="text"
                      value={editFormData.gear}
                      onChange={(e) => setEditFormData({ ...editFormData, gear: e.target.value })}
                      className="w-full px-3 py-1.5 rounded border border-slate-200 text-slate-900 focus:outline-hidden focus:border-[#0047AB]"
                    />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsEditingSlide(false)}
                    className="px-3.5 py-1.5 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-mono cursor-pointer"
                  >
                    {lang === 'zh' ? '取消' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-[#0047AB] hover:bg-[#003d94] text-white font-mono font-bold flex items-center space-x-1.5 cursor-pointer shadow-sm"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{lang === 'zh' ? '保存更改' : 'Save Changes'}</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ======================================================== */}
      {/* STORY BRIEFING MODAL (Triggered by '+' or Photo)          */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white text-slate-900 rounded-lg shadow-2xl border border-blue-200 overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-blue-100 bg-blue-50/60">
                <div className="flex items-center space-x-2 font-mono text-xs font-bold text-[#0047AB] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#0047AB]" />
                  <span>{current.issueCode} · {current.locationTag}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      setIsEditingSlide(true);
                    }}
                    className="p-1 rounded text-slate-500 hover:text-[#0047AB] hover:bg-blue-100 transition-colors cursor-pointer"
                    title={lang === 'zh' ? '编辑此篇内容' : 'Edit content'}
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsDetailModalOpen(false)}
                    className="p-1 rounded text-slate-500 hover:text-slate-950 hover:bg-blue-100 transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="relative aspect-[16/9] w-full rounded overflow-hidden bg-black">
                  <img
                    src={current.imageUrl}
                    alt={current.titleZh}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-[#0047AB]/90 text-white font-mono text-[10px]">
                    {current.coverTag}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#0047AB] leading-snug">
                    {lang === 'zh' ? current.titleZh : current.titleEn}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {lang === 'zh' ? current.subtitleZh : current.subtitleEn}
                  </p>
                </div>

                {/* Telemetry metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 p-3 rounded bg-blue-50/70 border border-blue-100 font-mono text-xs text-slate-700">
                  <div>
                    <span className="text-blue-600 block text-[10px] font-bold">PHOTOGRAPHER / 摄影</span>
                    <span className="font-bold text-slate-900">{current.photographer}</span>
                  </div>
                  <div>
                    <span className="text-blue-600 block text-[10px] font-bold">CAMERA & LENS / 设备</span>
                    <span className="font-bold text-slate-900">{current.gear}</span>
                  </div>
                  <div>
                    <span className="text-blue-600 block text-[10px] font-bold">EXIF EXPOSURE / 曝光</span>
                    <span className="text-slate-800">{current.exif}</span>
                  </div>
                  <div>
                    <span className="text-blue-600 block text-[10px] font-bold">SECTION / 专栏</span>
                    <span className="text-slate-800">{current.matchScore}</span>
                  </div>
                </div>
              </div>

              {/* Actions: Direct Jump to Article */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-slate-50 border-t border-blue-100">
                <span className="text-xs font-mono text-slate-500">
                  {lang === 'zh' ? '支持手势滑动与上下方向键' : 'Swipe or use ↑ / ↓ to cycle'}
                </span>

                <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
                  <button
                    onClick={() => {
                      const matched = photos.find(p => p.imageUrl === current.imageUrl) || photos[0];
                      setSelectedPhoto(matched);
                      setIsDetailModalOpen(false);
                    }}
                    className="px-3 py-1.5 rounded bg-blue-100 hover:bg-blue-200 text-[#0047AB] font-mono text-xs font-semibold cursor-pointer"
                  >
                    {lang === 'zh' ? '全屏大图' : 'Lightbox'}
                  </button>

                  <button
                    onClick={() => {
                      setIsDetailModalOpen(false);
                      handleJumpToSection(current.storyAnchor);
                    }}
                    className="px-3.5 py-1.5 rounded bg-[#0047AB] hover:bg-[#003d94] text-white font-mono text-xs font-semibold cursor-pointer flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>{lang === 'zh' ? '转跳至纪实专栏' : 'Jump to Stories'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
