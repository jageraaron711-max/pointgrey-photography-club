import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PhotoItem } from '../types';
import { STUDENT_PROFILES } from '../data/mockData';
import { 
  Camera, ExternalLink, Sparkles, Heart, Eye, MapPin, 
  User, X, ChevronDown, ChevronUp, Link as LinkIcon, 
  Check, Info, Award, Layers, ArrowUpRight, Globe, Copy, HelpCircle,
  Upload, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GALLERY_URL_PRESETS, 
  copyUrlToClipboard, 
  openExternalLinkSafely 
} from '../utils/externalLinks';

interface GalleryShowcaseProps {
  onOpenStudentPortal?: (tab?: 'profile' | 'submit' | 'my-submissions' | 'admin-review') => void;
}

export const GalleryShowcase: React.FC<GalleryShowcaseProps> = ({ onOpenStudentPortal }) => {
  const { 
    lang, 
    photos, 
    setSelectedPhoto, 
    likedPhotoIds, 
    toggleLikePhoto,
    externalGalleryUrl,
    setExternalGalleryUrl
  } = useApp();

  const [showInPagePreview, setShowInPagePreview] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(externalGalleryUrl || 'https://unsplash.com/t/film');
  const [urlSavedNotification, setUrlSavedNotification] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [showIframeHint, setShowIframeHint] = useState(false);
  const [selectedBioStudent, setSelectedBioStudent] = useState<typeof STUDENT_PROFILES[0] | null>(null);

  // Top 6 representative showcase photos for cover collage & optional quick preview
  const showcasePhotos = useMemo(() => {
    const awarded = photos.filter(p => p.award);
    const rest = photos.filter(p => !p.award);
    return [...awarded, ...rest].slice(0, 6);
  }, [photos]);

  const coverPrimaryPhoto = showcasePhotos[0] || photos[0];
  const coverSecondaryPhoto = showcasePhotos[1] || photos[1];
  const coverTertiaryPhoto = showcasePhotos[2] || photos[2];

  // Dynamic Real-time Calculation for Officially Exhibited Salon Works:
  // Starts at 0 (per user request: currently awaiting works, starts at 0), and updates in real time
  // as student submissions are approved or exhibited works are added.
  const exhibitedWorks = useMemo(() => {
    return photos.filter(p => 
      p.isExhibited === true || 
      (p.id.startsWith('pgss-') && !p.id.includes('template')) ||
      (p.id.startsWith('photo-') && p.id.length > 18)
    );
  }, [photos]);

  const exhibitedPhotosCount = exhibitedWorks.length;
  const studentArtistsCount = useMemo(() => {
    return new Set(exhibitedWorks.map(p => p.author.trim()).filter(Boolean)).size;
  }, [exhibitedWorks]);
  const salonAwardsCount = useMemo(() => {
    return exhibitedWorks.filter(p => Boolean(p.award && p.award.trim())).length;
  }, [exhibitedWorks]);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    let finalUrl = tempUrl.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }
    setExternalGalleryUrl(finalUrl);
    setTempUrl(finalUrl);
    setIsEditingUrl(false);
    setUrlSavedNotification(true);
    setTimeout(() => setUrlSavedNotification(false), 2500);
  };

  const handleCopyLink = async () => {
    const ok = await copyUrlToClipboard(externalGalleryUrl);
    if (ok) {
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  const handleOpenLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Show helper hint in case the iframe sandbox blocked popups
    setShowIframeHint(true);
    // Also try direct window.open as reinforcement
    openExternalLinkSafely(externalGalleryUrl);
  };

  const getHostname = (urlStr: string) => {
    try {
      const parsed = new URL(urlStr);
      return parsed.hostname.replace('www.', '');
    } catch {
      return 'unsplash.com';
    }
  };

  const photoTitle = (photo: PhotoItem) => {
    if (lang === 'zh') return photo.titleZh || photo.title;
    return photo.title;
  };

  return (
    <section id="gallery" className="py-10 sm:py-14 relative bg-gradient-to-b from-slate-50/90 via-sky-50/30 to-slate-50/90 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Section Eyebrow & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-3 border-b border-slate-200/80 gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-[#0047AB] mb-1 font-semibold tracking-wider">
              <Camera className="w-3.5 h-3.5 text-[#0047AB]" />
              <span>POINT GREY SECONDARY // {lang === 'zh' ? '学生摄影展厅 · 封面' : 'STUDENT GALLERY · COVER'}</span>
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              {lang === 'zh' ? '学生摄影作品展厅' : 'Student Photography Gallery'}
            </h2>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-white border border-blue-100 text-slate-700 shadow-xs flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{lang === 'zh' ? '精选作品库' : 'CURATED WORKS'}:</span>
              <strong className="text-[#0047AB] font-bold">{photos.length}+</strong>
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN EXHIBITION COVER CARD (COMPACT, EDITORIAL, MAGAZINE-STYLE PRESENTATION) */}
        {/* ========================================================================= */}
        <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
          {/* Subtle decorative background watermark */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-7 lg:p-9 items-center">
            
            {/* ---------------- LEFT: VISUAL COVER ART COLLAGE (5 COLS) ---------------- */}
            <div className="lg:col-span-5 relative">
              <div 
                className="relative mx-auto max-w-sm lg:max-w-none aspect-[4/3] sm:aspect-[16/11] rounded-xl overflow-hidden bg-slate-900 shadow-lg border-2 border-white/80 group cursor-pointer"
                onClick={() => setSelectedPhoto(coverPrimaryPhoto)}
                title={lang === 'zh' ? '点击全屏鉴赏封面精选作品' : 'Click to inspect cover photograph'}
              >
                {/* Background Hero Image */}
                <img 
                  src={coverPrimaryPhoto?.imageUrl} 
                  alt={photoTitle(coverPrimaryPhoto)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

                {/* Viewfinder Corner Overlays */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-white/70" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-white/70" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-white/70" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-white/70" />

                {/* Top Cover Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/20 font-semibold tracking-wider">
                    PGPC EXHIBITION COVER
                  </span>
                  <span className="text-[10px] bg-[#0047AB] text-white px-2 py-0.5 rounded font-bold">
                    VOL. 2026-2027
                  </span>
                </div>

                {/* Secondary Inset Mini-Photo Polaroids (Visual Layering) */}
                <div className="absolute right-4 bottom-16 hidden sm:flex items-center -space-x-4">
                  {coverSecondaryPhoto && (
                    <div className="w-16 h-20 rounded-md border-2 border-white shadow-md overflow-hidden transform -rotate-6 group-hover:-rotate-12 transition-transform bg-slate-800">
                      <img src={coverSecondaryPhoto.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  {coverTertiaryPhoto && (
                    <div className="w-16 h-20 rounded-md border-2 border-white shadow-md overflow-hidden transform rotate-6 group-hover:rotate-12 transition-transform bg-slate-800">
                      <img src={coverTertiaryPhoto.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Bottom Photo Info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-[10px] font-mono text-blue-300 font-medium">
                    COVER SELECTION · {coverPrimaryPhoto?.author}
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-white drop-shadow-sm truncate">
                    {photoTitle(coverPrimaryPhoto)}
                  </h4>
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-300 mt-0.5">
                    <span>{coverPrimaryPhoto?.exif.camera}</span>
                    <span>•</span>
                    <span>{coverPrimaryPhoto?.exif.lens}</span>
                  </div>
                </div>

                {/* Click to expand hover hint */}
                <div className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-3 py-1.5 rounded-full bg-white/95 text-[#0047AB] text-xs font-mono font-bold shadow-md flex items-center space-x-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'zh' ? '全屏鉴赏封面原片' : 'Inspect Cover Photo'}</span>
                  </span>
                </div>
              </div>

              {/* Sub-label under collage */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
                <span className="flex items-center space-x-1 text-slate-600">
                  <Layers className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>{lang === 'zh' ? '35mm 银盐暗房与数字档案' : 'Analog 35mm & Digital 4K'}</span>
                </span>
                <span className="text-slate-400">VANCOUVER, BC</span>
              </div>
            </div>

            {/* ---------------- RIGHT: EDITORIAL INTRODUCTION & JUMP ACTION (7 COLS) ---------------- */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              
              <div>
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0047AB] text-xs font-mono font-semibold mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>POINT GREY SECONDARY SCHOOL</span>
                </div>

                <h3 className="font-serif font-bold text-xl sm:text-2xl lg:text-3xl text-slate-900 tracking-tight leading-tight">
                  {lang === 'zh' 
                    ? 'Point Grey 青年学生摄影年度特展' 
                    : 'Point Grey Student Photography Showcase & Salon'}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {lang === 'zh'
                    ? '汇聚 Point Grey 中学摄影俱乐部青年创作者的镜头视界，涵盖西区海岸风光、温哥华街头纪实、热血校园赛事与 214 教室手工黑白暗房银盐放制。完整 4K 高分辨率原片档案与社员独立个人专栏已整体收录展出于外部官方画廊。'
                    : 'A curated anthology of student lenswork spanning coastal sunsets, campus athletics, street documentary, and 35mm darkroom silver gelatin prints. The complete collection is officially hosted on our external dedicated gallery.'}
                </p>
              </div>

              {/* Stat Highlights Pills */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 py-2 border-y border-slate-100 font-mono">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base sm:text-lg font-bold text-[#0047AB]">
                    {exhibitedPhotosCount}
                  </div>
                  <div className="text-[10px] text-slate-500">{lang === 'zh' ? '参展作品原片' : 'Exhibited Photos'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base sm:text-lg font-bold text-amber-600">
                    {studentArtistsCount}
                  </div>
                  <div className="text-[10px] text-slate-500">{lang === 'zh' ? '参展社员摄影师' : 'Student Artists'}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base sm:text-lg font-bold text-emerald-600">
                    {salonAwardsCount}
                  </div>
                  <div className="text-[10px] text-slate-500">{lang === 'zh' ? '学区与市级奖项' : 'Salon Awards'}</div>
                </div>
              </div>

              {/* Participating Student Artists Roster */}
              <div>
                <div className="text-[11px] font-mono text-slate-500 mb-1.5 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">{lang === 'zh' ? '参展青年摄影师' : 'Featured Exhibiting Photographers'}:</span>
                  <span className="text-[10px] text-slate-400">{lang === 'zh' ? '点击查看作者简介' : 'Click to view bio'}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {STUDENT_PROFILES.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedBioStudent(student)}
                      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 hover:border-[#0047AB] hover:bg-blue-50/60 transition-all text-xs text-slate-700 cursor-pointer group shadow-2xs"
                    >
                      <img 
                        src={student.avatarUrl} 
                        alt={student.name} 
                        className="w-4 h-4 rounded-full object-cover border border-slate-200 group-hover:border-[#0047AB]"
                      />
                      <span className="font-medium">{student.name}</span>
                      {lang === 'zh' && (
                        <span className="text-slate-400 text-[10px]">({student.nameZh.split(' ')[0]})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ================================================================= */}
              {/* PRIMARY CALL-TO-ACTION BUTTON: "查看 gallery" & JUMP TO EXTERNAL SITE */}
              {/* ================================================================= */}
              <div className="pt-2 space-y-2.5">
                <div className="flex flex-col sm:flex-row items-stretch gap-2">
                  <a
                    id="view-external-gallery-btn"
                    href={externalGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOpenLink}
                    className="flex-1 inline-flex items-center justify-between py-3.5 px-5 sm:px-6 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2.5">
                      <Globe className="w-5 h-5 text-blue-200 group-hover:scale-110 transition-transform shrink-0" />
                      <div className="text-left">
                        <div className="text-sm sm:text-base font-bold tracking-wide">
                          {lang === 'zh' ? '查看 Gallery' : 'View Gallery'}
                        </div>
                        <div className="text-[10px] text-blue-200 font-normal">
                          {lang === 'zh' ? '新标签页转跳至完整线上影展' : 'Open full exhibition gallery in new tab'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold group-hover:bg-white/25 transition-colors shrink-0 ml-2">
                      <span className="hidden xs:inline truncate max-w-[120px]">{getHostname(externalGalleryUrl)}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </a>

                  {/* Apply for Exhibition Button */}
                  {onOpenStudentPortal && (
                    <button
                      type="button"
                      onClick={() => onOpenStudentPortal('submit')}
                      className="px-4 py-3 sm:py-0 rounded-xl font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 shadow-xs"
                      title={lang === 'zh' ? '社员在线提交照片，经社长管理员审核后入选展厅' : 'Submit photo application for curator review'}
                    >
                      <Upload className="w-4 h-4 text-amber-600" />
                      <span>{lang === 'zh' ? '申请参展' : 'Apply'}</span>
                    </button>
                  )}

                  {/* Copy Link Button */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-4 py-3 sm:py-0 rounded-xl font-mono text-xs flex items-center justify-center space-x-1.5 transition-all cursor-pointer border ${
                      copiedNotification 
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' 
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                    title={lang === 'zh' ? '复制展厅网址，可直接粘贴至浏览器打开' : 'Copy URL to clipboard'}
                  >
                    {copiedNotification ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="font-bold">{lang === 'zh' ? '已复制！' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
                        <span className="font-medium">{lang === 'zh' ? '复制网址' : 'Copy URL'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Iframe sandbox diagnostic advice notice */}
                {showIframeHint && (
                  <div className="flex items-start justify-between p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-slate-700 text-xs font-mono">
                    <div className="flex items-start space-x-2">
                      <Info className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        {lang === 'zh' ? (
                          <>
                            <strong>打开提示：</strong> 已尝试为您启动新标签页。如果在内嵌预览（iframe）中由于浏览器安全沙箱未弹出窗口，请直接点击上方的<strong>「复制网址」</strong>，在浏览器新标签页的地址栏中直接粘贴（Ctrl+V / ⌘+V）即可直达！
                          </>
                        ) : (
                          <>
                            <strong>Browser note:</strong> If the embedded iframe restricts opening popups, click <strong>"Copy URL"</strong> above and paste it directly into your browser address bar!
                          </>
                        )}
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowIframeHint(false)}
                      className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer shrink-0 ml-2"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Secondary Actions & Configurable URL Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500 pt-1">
                  
                  {/* Toggle In-Page Preview */}
                  <button
                    onClick={() => setShowInPagePreview(!showInPagePreview)}
                    className="inline-flex items-center space-x-1.5 text-[#0047AB] hover:text-blue-800 hover:underline cursor-pointer py-1"
                  >
                    <span>
                      {showInPagePreview 
                        ? (lang === 'zh' ? '收起本页缩略图预览' : 'Collapse in-page preview') 
                        : (lang === 'zh' ? '在当前页快速预览 (精选6幅)' : 'Quick in-page preview (6 works)')}
                    </span>
                    {showInPagePreview ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {/* Edit external gallery URL */}
                  <div className="flex items-center space-x-2">
                    {urlSavedNotification && (
                      <span className="text-emerald-600 font-medium flex items-center space-x-1 text-[11px]">
                        <Check className="w-3 h-3" />
                        <span>{lang === 'zh' ? '链接已更新' : 'Link updated'}</span>
                      </span>
                    )}
                    <button
                      onClick={() => setIsEditingUrl(!isEditingUrl)}
                      className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-800 hover:underline cursor-pointer py-1 text-[11px]"
                      title="Customise where 'View Gallery' links to"
                    >
                      <LinkIcon className="w-3 h-3 text-slate-400" />
                      <span>{lang === 'zh' ? '修改转跳网址' : 'Edit link'}</span>
                    </button>
                  </div>
                </div>

                {/* Inline URL Editor Dropdown with 1-Click Presets */}
                <AnimatePresence>
                  {isEditingUrl && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onSubmit={handleSaveUrl}
                      className="overflow-hidden bg-slate-50 border border-blue-200 rounded-xl p-3.5 space-y-2.5 mt-2"
                    >
                      <div className="text-[11px] font-mono text-slate-600 font-medium">
                        {lang === 'zh' ? '设置【查看 Gallery】转跳的目标网址 (如社团外部画廊、Behance、Flickr 或网盘):' : 'Set external gallery target URL:'}
                      </div>

                      {/* Presets */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-mono text-slate-400">{lang === 'zh' ? '常用推荐预设（点击快速填入）:' : 'Quick Presets:'}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {GALLERY_URL_PRESETS.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => setTempUrl(preset.url)}
                              className="px-2 py-1 rounded-md bg-white border border-slate-200 hover:border-[#0047AB] hover:bg-blue-50/50 text-[10.5px] font-mono text-slate-700 cursor-pointer transition-colors"
                            >
                              <span>{lang === 'zh' ? preset.labelZh.split(' ')[0] : preset.label.split(' ')[0]}</span>
                              <span className="text-slate-400 text-[9.5px] ml-1">({preset.badge})</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={tempUrl}
                          onChange={(e) => setTempUrl(e.target.value)}
                          placeholder="https://unsplash.com/t/film"
                          className="flex-1 px-3 py-1.5 text-xs font-mono bg-white border border-slate-300 rounded-lg focus:border-[#0047AB] outline-none"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 bg-[#0047AB] text-white text-xs font-mono font-medium rounded-lg hover:bg-blue-700 cursor-pointer"
                        >
                          {lang === 'zh' ? '保存' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingUrl(false)}
                          className="px-2 py-1.5 text-slate-500 text-xs font-mono hover:text-slate-700 cursor-pointer"
                        >
                          {lang === 'zh' ? '取消' : 'Cancel'}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

              </div>

            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* OPTIONAL EXPANDABLE IN-PAGE PREVIEW (ONLY REVEALED WHEN USER CLICKS PREVIEW) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {showInPagePreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-white rounded-2xl border border-blue-100 p-4 sm:p-6 shadow-sm">
                
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 text-xs font-mono text-slate-500">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#0047AB]" />
                    <span className="font-semibold text-slate-800">
                      {lang === 'zh' ? '展厅精选代表作微缩画廊' : 'Curated Works Highlight Grid'}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {lang === 'zh' ? '点击照片可全屏查看 EXIF 拍摄参数' : 'Click photo for full EXIF inspection'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  {showcasePhotos.map((photo) => {
                    const isLiked = likedPhotoIds.includes(photo.id);
                    return (
                      <div
                        key={photo.id}
                        onClick={() => setSelectedPhoto(photo)}
                        className="group relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[3/4] cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <img
                          src={photo.imageUrl}
                          alt={photoTitle(photo)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                        {photo.award && (
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-amber-500 text-white text-[9px] font-mono font-bold flex items-center space-x-1 shadow-xs">
                            <Award className="w-2.5 h-2.5" />
                            <span>{lang === 'zh' ? '获奖' : 'AWARD'}</span>
                          </div>
                        )}

                        <div className="absolute bottom-2 left-2 right-2 text-white font-mono text-[10px]">
                          <div className="font-bold truncate text-[11px]">{photoTitle(photo)}</div>
                          <div className="text-slate-300 truncate text-[9px]">{photo.author}</div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLikePhoto(photo.id);
                          }}
                          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                            isLiked ? 'bg-rose-500 text-white' : 'bg-black/40 text-white/80 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 text-[11px]">
                    {lang === 'zh' ? '更多作品请点击【查看 Gallery】访问完整展厅' : 'To browse all photos, click View Gallery'}
                  </span>
                  <a
                    href={externalGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0047AB] hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <span>{lang === 'zh' ? '前往完整展厅 →' : 'Go to full gallery →'}</span>
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* STUDENT BIO MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {selectedBioStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative overflow-hidden"
              >
                <button
                  onClick={() => setSelectedBioStudent(null)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedBioStudent.avatarUrl}
                    alt={selectedBioStudent.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#0047AB]"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-xl text-slate-900">{selectedBioStudent.name}</h3>
                    <p className="text-xs text-[#0047AB] font-medium">{selectedBioStudent.nameZh}</p>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-[#0047AB] font-mono text-[10px] border border-blue-100">
                        {selectedBioStudent.grade}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                        {lang === 'zh' ? selectedBioStudent.roleZh : selectedBioStudent.roleEn}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-3 font-mono">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">{lang === 'zh' ? '器材配置' : 'Gear'}:</div>
                    <div className="font-medium text-slate-800 mt-0.5">{selectedBioStudent.gear}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">{lang === 'zh' ? '艺术方向' : 'Focus'}:</div>
                    <div className="font-medium text-slate-800 mt-0.5">{lang === 'zh' ? selectedBioStudent.specialtyZh : selectedBioStudent.specialtyEn}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">{lang === 'zh' ? '摄影自述' : 'Artist Statement'}:</div>
                    <p className="text-slate-600 font-sans mt-1 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {lang === 'zh' ? selectedBioStudent.bioZh : selectedBioStudent.bioEn}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={externalGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-[#0047AB] hover:underline flex items-center space-x-1 font-semibold"
                  >
                    <span>{lang === 'zh' ? `在外部展厅查看 ${selectedBioStudent.name} 的影集 →` : `View ${selectedBioStudent.name}'s portfolio →`}</span>
                  </a>
                  <button
                    onClick={() => setSelectedBioStudent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-medium cursor-pointer"
                  >
                    {lang === 'zh' ? '关闭' : 'Close'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
