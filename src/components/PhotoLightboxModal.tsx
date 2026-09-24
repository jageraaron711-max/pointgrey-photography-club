import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Heart, Share2, Download, Camera, Sliders, MapPin, 
  MessageSquare, Star, Sparkles, Send, ZoomIn, Split
} from 'lucide-react';

export const PhotoLightboxModal: React.FC = () => {
  const { 
    selectedPhoto, 
    setSelectedPhoto, 
    lang, 
    likedPhotoIds, 
    toggleLikePhoto, 
    addCritique 
  } = useApp();

  const [commentName, setCommentName] = useState('');
  const [commentRole, setCommentRole] = useState('Club Member');
  const [commentText, setCommentText] = useState('');
  const [commentRating, setCommentRating] = useState(5);
  const [showRawCompare, setShowRawCompare] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [showGridOverlay, setShowGridOverlay] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!selectedPhoto) return null;

  const isLiked = likedPhotoIds.includes(selectedPhoto.id);

  const handleSubmitCritique = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const defaultAuthor = lang === 'zh' 
      ? 'PGSS社员' 
      : lang === 'fr' 
      ? 'Élève Point Grey' 
      : 'Point Grey Student';

    addCritique(
      selectedPhoto.id,
      commentName || defaultAuthor,
      commentRole,
      commentText,
      commentRating
    );
    setCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getPhotoTitle = () => {
    if (lang === 'zh') return selectedPhoto.titleZh || selectedPhoto.title;
    if (lang === 'fr') return selectedPhoto.titleFr || selectedPhoto.title;
    return selectedPhoto.title;
  };

  const getPhotoDesc = () => {
    if (lang === 'zh') return selectedPhoto.descriptionZh || selectedPhoto.description;
    if (lang === 'fr') return selectedPhoto.descriptionFr || selectedPhoto.description;
    return selectedPhoto.description;
  };

  const getPhotoAward = () => {
    if (lang === 'zh') return selectedPhoto.awardZh || selectedPhoto.award;
    if (lang === 'fr') return selectedPhoto.awardFr || selectedPhoto.award;
    return selectedPhoto.award;
  };

  return (
    <AnimatePresence>
      <div 
        id="photo-lightbox-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl overflow-y-auto"
        onClick={() => setSelectedPhoto(null)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl max-h-[92vh] bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col my-auto"
        >
          {/* Top Modal Navigation Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900 border-b border-slate-800 font-mono text-xs text-slate-300">
            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1.5 text-cyan-400 font-bold">
                <Camera className="w-4 h-4" />
                <span>EXIF_VIEWFINDER // {selectedPhoto.id.toUpperCase()}</span>
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-400">
                {selectedPhoto.category.toUpperCase()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Compare RAW vs Graded toggle (if rawUrl exists) */}
              {selectedPhoto.rawUrl && (
                <button
                  id="lightbox-toggle-raw-btn"
                  onClick={() => setShowRawCompare(!showRawCompare)}
                  className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                    showRawCompare ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Split className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'zh' ? 'RAW原片对比' : lang === 'fr' ? 'Comparaison RAW' : 'RAW Comparison'}
                  </span>
                </button>
              )}

              {/* Composition Grid Toggle */}
              <button
                id="lightbox-grid-overlay-btn"
                onClick={() => setShowGridOverlay(!showGridOverlay)}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  showGridOverlay ? 'bg-[#0047AB] text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
                title="Toggle Viewfinder Grid"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                id="lightbox-close-btn"
                onClick={() => setSelectedPhoto(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
            
            {/* Left Column: High-Res Photo Display */}
            <div className="lg:col-span-7 bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 relative min-h-[350px] sm:min-h-[480px]">
              
              {/* Photo Box */}
              <div className="relative max-h-[60vh] max-w-full rounded-lg overflow-hidden shadow-2xl border border-slate-800 group">
                
                {showRawCompare && selectedPhoto.rawUrl ? (
                  <div className="relative select-none overflow-hidden max-h-[60vh]">
                    <img 
                      src={selectedPhoto.imageUrl} 
                      alt="Graded" 
                      className="max-h-[60vh] object-contain block"
                    />
                    <div 
                      className="absolute inset-0 overflow-hidden" 
                      style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                    >
                      <img 
                        src={selectedPhoto.rawUrl} 
                        alt="RAW unedited" 
                        className="max-h-[60vh] object-contain block"
                      />
                      <span className="absolute top-2 left-2 bg-slate-950/80 px-2 py-1 rounded text-[10px] font-mono text-cyan-300">
                        RAW (Flat)
                      </span>
                    </div>
                    <span className="absolute top-2 right-2 bg-blue-600/80 px-2 py-1 rounded text-[10px] font-mono text-white">
                      Color Graded
                    </span>

                    {/* Interactive Slider Bar */}
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={sliderPos} 
                      onChange={(e) => setSliderPos(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                    />
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 pointer-events-none" 
                      style={{ left: `${sliderPos}%` }}
                    >
                      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center text-[10px] font-bold shadow-lg">
                        ↔
                      </div>
                    </div>
                  </div>
                ) : (
                  <img
                    src={selectedPhoto.imageUrl}
                    alt={selectedPhoto.title}
                    className="max-h-[60vh] max-w-full object-contain rounded-md"
                  />
                )}

                {/* Viewfinder Overlay */}
                {showGridOverlay && (
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-cyan-400/50">
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
              </div>

              {/* Bottom Quick Tools */}
              <div className="w-full mt-4 flex items-center justify-between font-mono text-xs text-slate-400 px-2">
                <div className="flex items-center space-x-2">
                  <button
                    id="lightbox-like-btn"
                    onClick={() => toggleLikePhoto(selectedPhoto.id)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isLiked
                        ? 'bg-rose-950/80 text-rose-300 border-rose-600/50'
                        : 'bg-slate-900 text-slate-300 hover:text-rose-400 border-slate-800'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-rose-500' : ''}`} />
                    <span>
                      {selectedPhoto.likes} {lang === 'zh' ? '赞' : lang === 'fr' ? 'J’aime' : 'Applaud'}
                    </span>
                  </button>

                  <button
                    id="lightbox-share-btn"
                    onClick={handleShare}
                    className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>
                      {copied 
                        ? (lang === 'zh' ? '已复制链接!' : lang === 'fr' ? 'Lien copié !' : 'Link Copied!') 
                        : (lang === 'zh' ? '分享' : lang === 'fr' ? 'Partager' : 'Share')}
                    </span>
                  </button>
                </div>

                <a
                  href={selectedPhoto.imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#0047AB] hover:bg-blue-700 text-white font-sans text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? '高清原图' : lang === 'fr' ? 'Image HD' : 'Full Image'}</span>
                </a>
              </div>
            </div>

            {/* Right Column: EXIF Specs, Author Bio & Peer Critiques */}
            <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 bg-[#FBFDFE] border-t lg:border-t-0 lg:border-l border-slate-100 overflow-y-auto">
              
              {/* Photo Title & Author */}
              <div>
                {selectedPhoto.award && (
                  <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-[#0047AB] font-mono text-[11px] mb-2 border border-blue-200">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span className="font-semibold">{getPhotoAward()}</span>
                  </div>
                )}
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 leading-snug">
                  {getPhotoTitle()}
                </h2>
                <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                  <span>{lang === 'zh' ? '创作者' : lang === 'fr' ? 'Capturé par' : 'Captured by'}:</span>
                  <strong className="text-[#0047AB] font-semibold">{selectedPhoto.author}</strong>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] font-medium">
                    {selectedPhoto.authorGrade}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
                {getPhotoDesc()}
              </p>

              {/* EXIF Telemetry Panel */}
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-xs text-[#0047AB] font-semibold">
                  <span className="flex items-center space-x-1.5">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>OPTICAL TELEMETRY // EXIF</span>
                  </span>
                  <span className="text-slate-400 font-normal">ISO • APERTURE • SHUTTER</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500">
                      {lang === 'zh' ? '相机机身' : lang === 'fr' ? 'BOÎTIER' : 'CAMERA BODY'}
                    </div>
                    <div className="text-slate-900 font-medium truncate">{selectedPhoto.exif.camera}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500">
                      {lang === 'zh' ? '镜头型号' : lang === 'fr' ? 'OBJECTIF' : 'OPTICAL LENS'}
                    </div>
                    <div className="text-slate-900 font-medium truncate">{selectedPhoto.exif.lens}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500">
                      {lang === 'zh' ? '光圈与快门' : lang === 'fr' ? 'OUVERTURE & VITESSE' : 'APERTURE & SHUTTER'}
                    </div>
                    <div className="text-[#0047AB] font-semibold">{selectedPhoto.exif.aperture} @ {selectedPhoto.exif.shutterSpeed}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-slate-500">
                      {lang === 'zh' ? 'ISO与焦距' : lang === 'fr' ? 'ISO & FOCALE' : 'ISO & FOCAL LENGTH'}
                    </div>
                    <div className="text-[#0047AB] font-semibold">ISO {selectedPhoto.exif.iso} • {selectedPhoto.exif.focalLength}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0047AB] shrink-0" />
                  <span className="truncate">{selectedPhoto.exif.location}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedPhoto.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0047AB] border border-blue-100 text-[10px] font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Critique & Peer Review Section */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono text-[#0047AB] font-bold flex items-center space-x-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'zh' 
                        ? '社员互评与教师点评' 
                        : lang === 'fr' 
                        ? 'CRITIQUES & COMMENTAIRES' 
                        : 'PEER CRITIQUES & FACULTY REVIEWS'} ({selectedPhoto.critiques.length})
                    </span>
                  </h4>
                </div>

                {/* Critiques List */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedPhoto.critiques.length === 0 ? (
                    <p className="text-xs text-slate-500 italic py-2">
                      {lang === 'zh' 
                        ? '暂无点评。欢迎留下第一条宝贵的摄影交流建议！' 
                        : lang === 'fr' 
                        ? 'Aucune critique pour le moment. Soyez le premier à commenter !' 
                        : 'No critiques yet. Be the first to leave constructive feedback!'}
                    </p>
                  ) : (
                    selectedPhoto.critiques.map((c) => (
                      <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between text-slate-600">
                          <div className="flex items-center space-x-1.5">
                            <strong className="text-slate-900 font-semibold">{c.author}</strong>
                            <span className="text-[10px] text-slate-500">({c.role})</span>
                          </div>
                          <div className="flex text-amber-400">
                            {[...Array(c.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-slate-700 text-xs">{c.comment}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Critique Form */}
                <form onSubmit={handleSubmitCritique} className="space-y-2 pt-2">
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder={lang === 'zh' ? '您的姓名/昵称' : lang === 'fr' ? 'Votre nom' : 'Your Name'}
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#0047AB] focus:bg-white"
                    />
                    <select
                      value={commentRating}
                      onChange={(e) => setCommentRating(Number(e.target.value))}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 outline-none focus:border-[#0047AB] focus:bg-white"
                    >
                      <option value={5}>★★★★★ (5 Stars)</option>
                      <option value={4}>★★★★☆ (4 Stars)</option>
                      <option value={3}>★★★☆☆ (3 Stars)</option>
                    </select>
                  </div>
                  
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder={lang === 'zh' ? '写下对光影、构图与色彩的点评建议...' : lang === 'fr' ? 'Rédiger une critique constructive (lumière, cadrage...)' : 'Write constructive critique (lighting, framing...)'}
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#0047AB] focus:bg-white"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white text-xs font-mono flex items-center space-x-1 cursor-pointer transition-colors shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>{lang === 'zh' ? '提交' : lang === 'fr' ? 'Publier' : 'Post'}</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
