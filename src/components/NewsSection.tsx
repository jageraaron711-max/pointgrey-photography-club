import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  Newspaper, 
  Calendar, 
  ArrowUpRight, 
  Trophy, 
  Camera, 
  Sparkles, 
  Flame, 
  Heart, 
  Share2, 
  X, 
  Upload, 
  PlusCircle, 
  Trash2, 
  Check, 
  Plus, 
  ImageIcon, 
  MapPin, 
  Search,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Edit3,
  AlertCircle,
  Globe,
  ImagePlus,
  Maximize2,
  Tv,
  Clock,
  Users,
  ShieldAlert,
  Link as LinkIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NewsArticle, NewsCategory, GalleryImageItem } from '../types';

export const NewsSection: React.FC = () => {
  const { lang, newsArticles, likeNewsArticle, addNewsArticle, updateNewsArticle, deleteNewsArticle, currentUser, isAdmin } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [modalLang, setModalLang] = useState<'zh' | 'en' | 'fr'>(lang);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<'zh' | 'en' | 'photos'>('zh');

  // URL Hash listener to auto-open shared articles like #news-{id}
  useEffect(() => {
    const handleHash = () => {
      const rawHash = window.location.hash.replace('#', '').trim();
      if (rawHash.startsWith('news-')) {
        const id = rawHash.replace('news-', '');
        const matched = newsArticles.find(a => a.id === id || a.id === `news-${id}` || a.id.toLowerCase().includes(id.toLowerCase()));
        if (matched) {
          setActiveArticle(matched);
        }
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [newsArticles]);
  
  // Folding / Pagination state: show 9 articles initially (3x3 grid)
  const [displayLimit, setDisplayLimit] = useState<number>(9);

  // File and element refs
  const coverFileInputRef = useRef<HTMLInputElement | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement | null>(null);
  const quickDirectCoverInputRef = useRef<HTMLInputElement | null>(null);
  const inlineImageInputRef = useRef<HTMLInputElement | null>(null);
  const readerInlineImageInputRef = useRef<HTMLInputElement | null>(null);
  const contentZhTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const contentEnTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Zoom lightbox state for photos in text
  const [zoomImage, setZoomImage] = useState<{ url: string; caption?: string } | null>(null);

  // New/Edit report form state
  const [newReport, setNewReport] = useState({
    title: '',
    titleZh: '',
    titleFr: '',
    author: 'Aaron Peng',
    authorGrade: 'Grade 11',
    authorRole: 'Sports Lead Photographer',
    category: 'sports' as NewsCategory,
    summary: '',
    summaryZh: '',
    summaryFr: '',
    content: '',
    contentZh: '',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    tags: 'Match1, VancouverFC, AtleticoOttawa, CPL, AaronPeng',
    stadium: 'Willoughby Community Park Stadium (Langley, BC)',
    fixture: 'Vancouver FC vs Atlético Ottawa',
    score: '3 - 1',
    competition: 'Canadian Premier League (CPL)',
    keyMoment: 'Damiano Pecile 7th-minute pinpoint through-ball assist & 3-goal first-half blitz',
    keyMomentZh: '第7分钟达米亚诺·佩西莱手术刀直塞闪电助攻，半场连下三城奠定3-1胜局',
    galleryImages: [] as GalleryImageItem[]
  });

  const categories: { id: string; labelEn: string; labelZh: string; labelFr: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', labelEn: 'All Dispatches', labelZh: '全部报道', labelFr: 'Tous les Articles', icon: Newspaper },
    { id: 'campus', labelEn: 'Campus & Arts', labelZh: '校园与艺术周', labelFr: 'Campus & Arts', icon: Sparkles },
    { id: 'gear', labelEn: 'Optics & Lab', labelZh: '器材与暗房速递', labelFr: 'Matériel & Labo', icon: Camera },
    { id: 'sports', labelEn: 'Sports & Matches', labelZh: '体育与赛事纪实', labelFr: 'Sports & Terrains', icon: Trophy },
    { id: 'editorial', labelEn: 'Interviews & Opinion', labelZh: '专访与特稿', labelFr: 'Interviews & Édito', icon: Flame },
  ];

  const filteredArticles = useMemo(() => {
    return newsArticles.filter((art) => {
      const matchCat = selectedCategory === 'all' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchCat;
      const matchTitle = (art.title + art.titleZh + (art.titleFr || '')).toLowerCase().includes(q);
      const matchSummary = (art.summary + art.summaryZh + (art.summaryFr || '')).toLowerCase().includes(q);
      const matchTags = art.tags.some(t => t.toLowerCase().includes(q));
      const matchAuthor = art.author.toLowerCase().includes(q);
      const matchStadium = art.matchStats?.stadium.toLowerCase().includes(q) || false;
      const matchFixture = art.matchStats?.fixture.toLowerCase().includes(q) || false;
      return matchCat && (matchTitle || matchSummary || matchTags || matchAuthor || matchStadium || matchFixture);
    });
  }, [newsArticles, selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return newsArticles.find(a => a.featured) || newsArticles[0];
  }, [newsArticles]);

  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, displayLimit);
  }, [filteredArticles, displayLimit]);

  const handleOpenArticle = (article: NewsArticle) => {
    setActiveArticle(article);
    setModalLang(lang);
  };

  const handleCopyShareLink = (artId: string) => {
    const url = `${window.location.origin}${window.location.pathname}#news-${artId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleOpenEditModal = (article: NewsArticle) => {
    if (!isAdmin) return;
    setEditingArticleId(article.id);
    setEditorTab(lang === 'en' ? 'en' : 'zh');
    setNewReport({
      title: article.title || '',
      titleZh: article.titleZh || '',
      titleFr: article.titleFr || '',
      author: article.author || 'Aaron Peng',
      authorGrade: article.authorGrade || 'Grade 11',
      authorRole: article.authorRole || 'Sports Lead Photographer',
      category: article.category,
      summary: article.summary || '',
      summaryZh: article.summaryZh || '',
      summaryFr: article.summaryFr || '',
      content: article.content || '',
      contentZh: article.contentZh || article.content,
      coverImage: article.coverImage,
      tags: article.tags.join(', '),
      stadium: article.matchStats?.stadium || '',
      fixture: article.matchStats?.fixture || '',
      score: article.matchStats?.score || '',
      competition: article.matchStats?.competition || 'Canadian Premier League (CPL)',
      keyMoment: article.matchStats?.keyMoment || '',
      keyMomentZh: article.matchStats?.keyMomentZh || '',
      galleryImages: article.galleryImages ? [...article.galleryImages] : []
    });
    setIsSubmitModalOpen(true);
  };

  // Direct Cover Photo upload handler from within reader or edit modal
  const handleDirectCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          if (activeArticle) {
            const updated = { ...activeArticle, coverImage: dataUrl };
            setActiveArticle(updated);
            updateNewsArticle(activeArticle.id, { coverImage: dataUrl });
          }
          setNewReport(prev => ({ ...prev, coverImage: dataUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return;
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setNewReport(prev => ({ ...prev, coverImage: dataUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          setNewReport((prev) => ({
            ...prev,
            galleryImages: [
              ...prev.galleryImages,
              {
                url: dataUrl,
                caption: `Pitchside action snapshot · ${file.name.replace(/\.[^/.]+$/, '')}`,
                captionZh: `边线精彩瞬间抓拍 · ${file.name.replace(/\.[^/.]+$/, '')}`,
                exif: 'Sony α7R V · FE 100-400mm GM @ 300mm · f/5.0 · 1/3200s · ISO 800'
              }
            ]
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddBlankGalleryImage = () => {
    setNewReport((prev) => ({
      ...prev,
      galleryImages: [
        ...prev.galleryImages,
        {
          url: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
          caption: 'Sideline camera position capturing high-speed counterattack.',
          captionZh: '边线机位记录高速攻防转换瞬间。',
          exif: 'Sony α7R V · FE 100-400mm GM · 1/3200s · ISO 800'
        }
      ]
    }));
  };

  const handleUpdateGalleryImage = (index: number, patch: Partial<GalleryImageItem>) => {
    setNewReport((prev) => {
      const updated = [...prev.galleryImages];
      updated[index] = { ...updated[index], ...patch };
      return { ...prev, galleryImages: updated };
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    setNewReport((prev) => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, idx) => idx !== index)
    }));
  };

  // Insert image markdown snippet into active editor textarea (Chinese or English)
  const handleInsertImageToEditor = (imageUrl: string, defaultCaption?: string) => {
    const isZh = editorTab === 'zh';
    const textarea = isZh ? contentZhTextareaRef.current : contentEnTextareaRef.current;
    const currentText = isZh ? newReport.contentZh : newReport.content;
    const caption = defaultCaption || (isZh ? '现场抓拍瞬间' : 'Pitchside match action');
    const markdownSnippet = `\n\n![${caption}](${imageUrl})\n\n`;

    if (textarea) {
      const start = textarea.selectionStart ?? currentText.length;
      const end = textarea.selectionEnd ?? currentText.length;
      const updated = currentText.substring(0, start) + markdownSnippet + currentText.substring(end);
      if (isZh) {
        setNewReport(prev => ({ ...prev, contentZh: updated }));
      } else {
        setNewReport(prev => ({ ...prev, content: updated }));
      }
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + markdownSnippet.length, start + markdownSnippet.length);
      }, 60);
    } else {
      if (isZh) {
        setNewReport(prev => ({ ...prev, contentZh: currentText + markdownSnippet }));
      } else {
        setNewReport(prev => ({ ...prev, content: currentText + markdownSnippet }));
      }
    }
  };

  // Upload local image and insert directly into editor at cursor position
  const handleInlineImageFilePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      const isZh = editorTab === 'zh';
      const caption = prompt(
        isZh ? '请输入图片说明或拍摄机位（可选）：' : 'Enter caption or camera angle (optional):',
        isZh ? '现场比赛实拍瞬间' : 'Match action capture'
      ) || (isZh ? '现场比赛实拍瞬间' : 'Match action capture');
      handleInsertImageToEditor(base64, caption);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Prompt user for image URL and insert into editor
  const handleInsertImageUrl = () => {
    const isZh = editorTab === 'zh';
    const url = prompt(
      isZh ? '请输入图片网络链接 (Image URL):' : 'Enter Image URL:',
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
    );
    if (!url) return;
    const caption = prompt(
      isZh ? '请输入图片说明 (Caption):' : 'Enter Caption:',
      isZh ? '现场赛况实拍' : 'Pitchside photo'
    ) || (isZh ? '现场实拍' : 'Match photo');
    handleInsertImageToEditor(url, caption);
  };

  // Directly insert inline image from Reader Modal
  const handleReaderInlineImagePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin || !activeArticle) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      const caption = prompt(
        modalLang === 'zh' ? '请输入插入到正文段落间的图片说明（可选）：' : 'Enter caption for inline image (optional):',
        modalLang === 'zh' ? '现场赛事实拍瞬间' : 'Pitchside match photo'
      ) || (modalLang === 'zh' ? '现场赛事实拍瞬间' : 'Pitchside match photo');
      const markdownSnippet = `\n\n![${caption}](${base64})\n\n`;

      if (modalLang === 'zh') {
        const updated = (activeArticle.contentZh || '') + markdownSnippet;
        updateNewsArticle(activeArticle.id, { contentZh: updated });
        setActiveArticle({ ...activeArticle, contentZh: updated });
      } else {
        const updated = (activeArticle.content || '') + markdownSnippet;
        updateNewsArticle(activeArticle.id, { content: updated });
        setActiveArticle({ ...activeArticle, content: updated });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleDeleteArticle = (articleId: string) => {
    if (!isAdmin) return;
    if (window.confirm(lang === 'zh' ? '确定要删除这篇新闻报道吗？' : 'Are you sure you want to delete this dispatch?')) {
      deleteNewsArticle(articleId);
      if (activeArticle?.id === articleId) {
        setActiveArticle(null);
      }
    }
  };

  const handleSaveReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    const tagList = newReport.tags
      .split(/[,，]/)
      .map((t) => t.trim())
      .filter(Boolean);

    const payload: Partial<NewsArticle> = {
      title: newReport.title || newReport.titleZh,
      titleZh: newReport.titleZh || newReport.title,
      titleFr: newReport.titleFr || newReport.title,
      author: newReport.author,
      authorGrade: newReport.authorGrade,
      authorRole: newReport.authorRole,
      category: newReport.category,
      summary: newReport.summary || newReport.summaryZh,
      summaryZh: newReport.summaryZh || newReport.summary,
      summaryFr: newReport.summaryFr || newReport.summary,
      content: newReport.content || newReport.contentZh,
      contentZh: newReport.contentZh || newReport.content,
      coverImage: newReport.coverImage,
      tags: tagList.length > 0 ? tagList : ['Sports', 'VancouverFC', 'MatchReport'],
      galleryImages: newReport.galleryImages,
    };

    if (newReport.category === 'sports') {
      payload.matchStats = {
        fixture: newReport.fixture || 'Vancouver FC vs Opponent',
        stadium: newReport.stadium || 'Willoughby Community Park Stadium (Langley, BC)',
        score: newReport.score || '3 - 1',
        competition: newReport.competition || 'Canadian Premier League (CPL)',
        keyMoment: newReport.keyMoment || newReport.keyMomentZh,
        keyMomentZh: newReport.keyMomentZh || newReport.keyMoment
      };
    }

    if (editingArticleId) {
      updateNewsArticle(editingArticleId, payload);
      if (activeArticle && activeArticle.id === editingArticleId) {
        setActiveArticle({
          ...activeArticle,
          ...payload
        } as NewsArticle);
      }
    } else {
      const newArticle: NewsArticle = {
        id: `news-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        readTime: '4 min read',
        likes: 12,
        featured: false,
        title: payload.title!,
        titleZh: payload.titleZh!,
        author: payload.author!,
        authorGrade: payload.authorGrade,
        authorRole: payload.authorRole!,
        category: payload.category!,
        summary: payload.summary!,
        summaryZh: payload.summaryZh!,
        content: payload.content!,
        contentZh: payload.contentZh!,
        coverImage: payload.coverImage!,
        tags: payload.tags!,
        galleryImages: payload.galleryImages,
        matchStats: payload.matchStats
      };
      addNewsArticle(newArticle);
      setActiveArticle(newArticle);
    }

    setIsSubmitModalOpen(false);
    setEditingArticleId(null);
  };

  return (
    <section id="stories" className="py-14 sm:py-18 bg-[#FBFDFE] border-t border-slate-200 scroll-mt-20">
      <div id="news" className="scroll-mt-20" />
      {/* Hidden file input for one-click cover image replacement */}
      <input
        type="file"
        ref={quickDirectCoverInputRef}
        accept="image/*"
        onChange={handleDirectCoverUpload}
        className="hidden"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header: Inspired by CTD Images Visual Newsroom */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-900 font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-slate-950"></span>
              <span>CAMPUS DISPATCHES & VISUAL STORIES</span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-950 tracking-tight">
              {lang === 'zh' 
                ? '校园纪实与特稿报道' 
                : 'Campus Stories & Visual Press'}
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl font-normal leading-relaxed">
              {lang === 'zh'
                ? '以镜头记录 Point Grey 中学的校园风貌、学生艺术展、暗房工坊与校际体育精彩瞬间，用影像特稿传递社团青年创作者的真实叙事。'
                : 'Documenting Point Grey school life, student exhibitions, darkroom craftsmanship, and high school athletics with student-led visual essays.'}
            </p>
          </div>

          {/* Action buttons: Only visible to Admin */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setEditingArticleId(null);
                  setEditorTab(lang === 'en' ? 'en' : 'zh');
                  setNewReport({
                    title: '',
                    titleZh: '',
                    titleFr: '',
                    author: currentUser ? currentUser.name : 'Aaron Peng',
                    authorGrade: currentUser?.grade || 'Grade 11',
                    authorRole: 'Sports Lead Photographer',
                    category: 'sports',
                    summary: '',
                    summaryZh: '',
                    summaryFr: '',
                    content: '',
                    contentZh: '',
                    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
                    tags: 'Sports, VancouverFC, CPL, AaronPeng',
                    stadium: 'Willoughby Community Park Stadium (Langley, BC)',
                    fixture: 'Vancouver FC vs Opponent',
                    score: '3 - 1',
                    competition: 'Canadian Premier League (CPL)',
                    keyMoment: 'First-half high-pressure counterattack and surgical through-ball assist',
                    keyMomentZh: '上半场高位逼抢反击与手术刀直塞助攻破门',
                    galleryImages: []
                  });
                  setIsSubmitModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs font-mono flex items-center space-x-2 transition-colors cursor-pointer border border-amber-400 shadow-xs"
              >
                <PlusCircle className="w-4 h-4 text-slate-950" />
                <span>
                  {lang === 'zh' ? '发布新特稿 (管理员)' : 'Publish Dispatch (Admin)'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Categories & Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setDisplayLimit(9);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-mono flex items-center space-x-2 transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-slate-950 text-white font-medium'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? cat.labelZh : cat.labelEn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setDisplayLimit(9);
              }}
              placeholder={lang === 'zh' ? '搜索赛事、球场、摄影师或关键词...' : 'Search dispatches, stadiums, tags...'}
              className="w-full pl-8 pr-4 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-950 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Featured Lead Story: Clean Editorial Format (CTD Style) */}
        {featuredArticle && selectedCategory === 'all' && !searchQuery && (
          <div 
            onClick={() => handleOpenArticle(featuredArticle)}
            className="group rounded-2xl bg-white text-slate-900 overflow-hidden border border-slate-200 transition-all hover:border-slate-400 cursor-pointer grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className="lg:col-span-7 relative h-72 sm:h-84 lg:h-auto overflow-hidden bg-slate-100">
              <img
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              
              {/* Subtle Match Score / Category Tag */}
              <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 text-white font-mono text-[10px] font-medium tracking-wider uppercase">
                  {lang === 'zh' ? '特稿头条' : 'LEAD STORY'}
                </span>
                {featuredArticle.matchStats && (
                  <span className="px-2 py-1 rounded-md bg-white/95 text-slate-950 font-mono text-[10px] font-bold border border-slate-200 shadow-2xs">
                    FT {featuredArticle.matchStats.score}
                  </span>
                )}
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 uppercase tracking-wide">
                  <span>{featuredArticle.date}</span>
                  <span>•</span>
                  <span>{featuredArticle.matchStats?.competition || 'EDITORIAL'}</span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-950 leading-snug group-hover:text-[#0047AB] transition-colors">
                  {lang === 'zh' ? featuredArticle.titleZh : featuredArticle.title}
                </h3>

                <p className="text-slate-600 text-sm font-normal line-clamp-3 leading-relaxed">
                  {lang === 'zh' ? featuredArticle.summaryZh : featuredArticle.summary}
                </p>

                {/* Match Stats Clean Editorial Strip */}
                {featuredArticle.matchStats && (
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono space-y-1 text-slate-700">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-slate-900">
                      <span className="flex items-center space-x-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{featuredArticle.matchStats.stadium}</span>
                      </span>
                      <span className="font-bold text-slate-950 ml-2 shrink-0">
                        {featuredArticle.matchStats.score}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-sans">
                      {lang === 'zh' ? featuredArticle.matchStats.keyMomentZh : featuredArticle.matchStats.keyMoment}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                    {featuredArticle.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-900">{featuredArticle.author}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{featuredArticle.authorRole}</div>
                  </div>
                </div>

                <span className="text-xs font-mono text-slate-900 font-medium flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                  <span>{lang === 'zh' ? '阅读特稿全文' : 'Read Full Story'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid: Clean Photojournalism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleArticles.map((article, idx) => {
            return (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onClick={() => handleOpenArticle(article)}
                className="group rounded-xl bg-white border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between overflow-hidden cursor-pointer shadow-2xs"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-400"
                    />
                    
                    {/* Category pill & Match Score */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-950/90 text-white font-mono text-[9.5px] font-medium uppercase tracking-wider">
                        {article.category}
                      </span>
                      {article.matchStats && (
                        <span className="px-1.5 py-0.5 rounded bg-white/95 text-slate-950 font-mono text-[9.5px] font-bold border border-slate-200 shadow-2xs">
                          {article.matchStats.score}
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-white text-[9.5px] font-mono">
                      {article.readTime}
                    </div>
                  </div>

                  {/* Body text */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-500">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{article.date}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-slate-950 group-hover:text-[#0047AB] transition-colors leading-snug line-clamp-2">
                      {lang === 'zh' ? article.titleZh : article.title}
                    </h3>

                    <p className="text-xs text-slate-600 font-normal line-clamp-2 leading-relaxed">
                      {lang === 'zh' ? article.summaryZh : article.summary}
                    </p>

                    {/* Match stats snippet */}
                    {article.matchStats && (
                      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-100">
                        <span className="truncate flex items-center space-x-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate">{article.matchStats.stadium.split('(')[0]}</span>
                        </span>
                        <span className="font-bold text-slate-900">{article.matchStats.fixture}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-5 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[9px]">
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-xs text-slate-800 font-medium truncate max-w-[120px]">
                      {article.author}
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono text-slate-400">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        likeNewsArticle(article.id);
                      }}
                      className="flex items-center space-x-1 hover:text-slate-900 transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>{article.likes}</span>
                    </button>
                    <span className="text-slate-900 flex items-center group-hover:translate-x-0.5 transition-transform">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Folding / Expand Button */}
        {filteredArticles.length > 9 && (
          <div className="flex justify-center pt-4">
            {displayLimit < filteredArticles.length ? (
              <button
                onClick={() => setDisplayLimit((prev) => prev + 6)}
                className="px-5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-slate-900 font-mono text-xs font-medium border border-slate-300 transition-colors flex items-center space-x-2 shadow-xs cursor-pointer group"
              >
                <span>
                  {lang === 'zh'
                    ? `展开更多报道 (已显示 ${visibleArticles.length} / ${filteredArticles.length} 篇)`
                    : `Load More Dispatches (Showing ${visibleArticles.length} of ${filteredArticles.length})`}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => setDisplayLimit(9)}
                className="px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-medium transition-colors flex items-center space-x-2 cursor-pointer group"
              >
                <span>
                  {lang === 'zh' 
                    ? `收起列表 (折叠回前 9 篇)` 
                    : 'Show Less (Collapse to 9 Articles)'}
                </span>
                <ChevronUp className="w-3.5 h-3.5 text-slate-500 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
            <h4 className="font-serif font-bold text-base text-slate-800">
              {lang === 'zh' ? '暂未找到相关新闻报道' : 'No dispatches found'}
            </h4>
            <p className="text-xs text-slate-500 font-mono">
              {lang === 'zh' ? '尝试更换搜索关键词或重置筛选分类。' : 'Try adjusting your search query or category filter.'}
            </p>
          </div>
        )}
      </div>

      {/* FULL ARTICLE READER MODAL WITH LANGUAGE TOGGLE & DIRECT PHOTO UPLOAD (CTD Style Visual Essay) */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl overflow-hidden shadow-xl border border-slate-200 flex flex-col my-auto"
            >
              {/* Modal Header Bar: Restrained, Clean Editorial Masthead */}
              <div className="px-5 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-2.5">
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-white font-mono text-[10px] font-semibold uppercase tracking-wider">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{activeArticle.date}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-mono text-slate-500">{activeArticle.readTime}</span>
                </div>

                {/* Reader Language Switcher: Chinese | English */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-md border border-slate-200">
                  <Globe className="w-3.5 h-3.5 text-slate-500 ml-1" />
                  <button
                    onClick={() => setModalLang('zh')}
                    className={`px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                      modalLang === 'zh' ? 'bg-white text-slate-950 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    中文版
                  </button>
                  <button
                    onClick={() => setModalLang('en')}
                    className={`px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                      modalLang === 'en' ? 'bg-white text-slate-950 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setModalLang('fr')}
                    className={`px-2 py-0.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                      modalLang === 'fr' ? 'bg-white text-slate-950 font-bold shadow-2xs' : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    FR
                  </button>
                </div>

                <div className="flex items-center space-x-1.5">
                  {/* Admin Exclusive Editing Actions */}
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => quickDirectCoverInputRef.current?.click()}
                        className="px-2.5 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                        title="Upload and replace real cover photo from your computer (Admin)"
                      >
                        <Upload className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline">{lang === 'zh' ? '替换封面' : 'Replace Cover'}</span>
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(activeArticle)}
                        className="px-2.5 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                        title="Edit article text and photos (Admin)"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                        <span className="hidden sm:inline">{lang === 'zh' ? '编辑' : 'Edit'}</span>
                      </button>

                      <button
                        onClick={() => handleDeleteArticle(activeArticle.id)}
                        className="p-1.5 rounded-md bg-white hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 text-xs font-mono transition-colors cursor-pointer"
                        title="Delete article (Admin)"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleCopyShareLink(activeArticle.id)}
                    className="p-1.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-mono transition-colors cursor-pointer"
                    title="Copy share link"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1.5 rounded-md bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 transition-colors cursor-pointer ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Body */}
              <div className="p-6 sm:p-9 overflow-y-auto space-y-7">
                
                {/* Title and Byline */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h1 className="font-serif font-bold text-2xl sm:text-3.5xl text-slate-950 leading-tight">
                      {modalLang === 'zh' 
                        ? activeArticle.titleZh 
                        : modalLang === 'fr' && activeArticle.titleFr 
                        ? activeArticle.titleFr 
                        : activeArticle.title}
                    </h1>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed border-l-2 border-slate-950 pl-4">
                    {modalLang === 'zh' 
                      ? activeArticle.summaryZh 
                      : modalLang === 'fr' && activeArticle.summaryFr 
                      ? activeArticle.summaryFr 
                      : activeArticle.summary}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-b border-slate-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                        {activeArticle.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">
                          {activeArticle.author} {activeArticle.authorGrade ? `(${activeArticle.authorGrade})` : ''}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">{activeArticle.authorRole}</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isAdmin && (
                        <button
                          onClick={() => quickDirectCoverInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-mono font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5 text-amber-700" />
                          <span>{lang === 'zh' ? '上传实拍照片' : 'Upload Match Photo'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => likeNewsArticle(activeArticle.id)}
                        className="px-3 py-1.5 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-mono font-medium flex items-center space-x-1.5 border border-slate-200 transition-colors cursor-pointer"
                      >
                        <Heart className="w-3.5 h-3.5 text-slate-400 hover:text-red-600" />
                        <span>{activeArticle.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Match Details Panel (True North Foot Match Hub) */}
                {activeArticle.matchStats && (
                  <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4 text-slate-800 shadow-2xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div className="flex items-center space-x-2 text-slate-900 font-mono text-xs font-bold uppercase tracking-wider">
                        <Trophy className="w-4 h-4 text-[#0047AB]" />
                        <span>{activeArticle.matchStats.competition}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] font-semibold uppercase tracking-wider">
                        {activeArticle.matchStats.articleType === 'preview'
                          ? (modalLang === 'zh' ? '赛前深度全瞻 & 首发预测' : 'MATCH PREVIEW & PROJECTED XIS')
                          : (modalLang === 'zh' ? '现场战报特稿' : 'MATCH REPORT')}
                      </span>
                    </div>

                    {/* Fixture, Score/Status & Venue Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{modalLang === 'zh' ? '交战对阵' : 'FIXTURE'}</div>
                        <div className="text-sm font-bold text-slate-900 mt-0.5">{activeArticle.matchStats.fixture}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                          {activeArticle.matchStats.articleType === 'preview'
                            ? (modalLang === 'zh' ? '首回合 / 晋级形势' : 'AGGREGATE / STATUS')
                            : (modalLang === 'zh' ? '完场比分' : 'FINAL SCORE')}
                        </div>
                        <div className="text-base sm:text-lg font-mono font-black text-[#0047AB] mt-0.5">
                          {activeArticle.matchStats.score}
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                        <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">{modalLang === 'zh' ? '决战场馆' : 'VENUE'}</div>
                        <div className="text-xs font-semibold text-slate-800 mt-0.5 flex items-center space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{activeArticle.matchStats.stadium}</span>
                        </div>
                      </div>
                    </div>

                    {/* Broadcast & Kickoff Strip */}
                    {(activeArticle.matchStats.broadcast || activeArticle.matchStats.kickoffTime) && (
                      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-lg bg-blue-50/70 border border-blue-100 text-xs font-mono text-slate-800">
                        {activeArticle.matchStats.kickoffTime && (
                          <div className="flex items-center space-x-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#0047AB]" />
                            <span className="font-semibold text-slate-900">{modalLang === 'zh' ? '开球时间：' : 'Kickoff: '}</span>
                            <span>{activeArticle.matchStats.kickoffTime}</span>
                          </div>
                        )}
                        {activeArticle.matchStats.broadcast && (
                          <div className="flex items-center space-x-1.5">
                            <Tv className="w-3.5 h-3.5 text-[#0047AB]" />
                            <span className="font-semibold text-slate-900">{modalLang === 'zh' ? '观赛转播：' : 'How to Watch: '}</span>
                            <span>{activeArticle.matchStats.broadcast}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Projected Starting XIs (True North Foot Style) */}
                    {(activeArticle.matchStats.projectedHomeXI || activeArticle.matchStats.projectedAwayXI) && (
                      <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-3">
                        <div className="flex items-center space-x-2 text-xs font-mono font-bold text-slate-900 uppercase">
                          <Users className="w-4 h-4 text-slate-700" />
                          <span>{modalLang === 'zh' ? '预计首发十一人与战术对位 (PROJECTED XIS)' : 'PROJECTED STARTING XIS & FORMATIONS'}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                          {/* Home Team */}
                          {activeArticle.matchStats.projectedHomeXI && (
                            <div className="p-3 rounded-lg bg-slate-50/80 border border-slate-200">
                              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-200">
                                <span className="font-bold text-xs text-slate-900">
                                  {activeArticle.matchStats.homeTeam || 'Home Team'}
                                </span>
                                {activeArticle.matchStats.homeFormation && (
                                  <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-mono text-[10px] font-bold">
                                    {activeArticle.matchStats.homeFormation}
                                  </span>
                                )}
                              </div>
                              <ul className="divide-y divide-slate-200/60 text-xs font-mono">
                                {activeArticle.matchStats.projectedHomeXI.map((player, pIdx) => (
                                  <li key={pIdx} className="py-1 flex items-center justify-between text-slate-700">
                                    <span>{player}</span>
                                    <span className="text-[10px] text-slate-400">#{pIdx + 1}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Away Team */}
                          {activeArticle.matchStats.projectedAwayXI && (
                            <div className="p-3 rounded-lg bg-blue-50/40 border border-blue-100">
                              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-blue-100">
                                <span className="font-bold text-xs text-[#0047AB]">
                                  {activeArticle.matchStats.awayTeam || 'Away Team'}
                                </span>
                                {activeArticle.matchStats.awayFormation && (
                                  <span className="px-2 py-0.5 rounded bg-[#0047AB] text-white font-mono text-[10px] font-bold">
                                    {activeArticle.matchStats.awayFormation}
                                  </span>
                                )}
                              </div>
                              <ul className="divide-y divide-blue-100 text-xs font-mono">
                                {activeArticle.matchStats.projectedAwayXI.map((player, pIdx) => (
                                  <li key={pIdx} className="py-1 flex items-center justify-between text-slate-700">
                                    <span>{player}</span>
                                    <span className="text-[10px] text-blue-400">#{pIdx + 1}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Doubts & Absences */}
                    {activeArticle.matchStats.doubts && (
                      <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/70 text-xs font-sans space-y-2">
                        <div className="flex items-center space-x-1.5 font-mono font-bold text-amber-950 uppercase text-[11px]">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                          <span>{modalLang === 'zh' ? '伤停与出战成疑名单 (SQUAD DOUBTS)' : 'TEAM NEWS & SQUAD DOUBTS'}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 font-mono text-[11px]">
                          <div>
                            <span className="font-semibold text-slate-900">{activeArticle.matchStats.homeTeam || 'Home'}: </span>
                            <span className="text-amber-900">{activeArticle.matchStats.doubts.home.join(' · ')}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900">{activeArticle.matchStats.awayTeam || 'Away'}: </span>
                            <span className="text-amber-900">{activeArticle.matchStats.doubts.away.join(' · ')}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Prediction bar */}
                    {activeArticle.matchStats.prediction && (
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-mono flex items-center justify-between">
                        <span className="font-bold text-slate-900">{modalLang === 'zh' ? '🎯 专家比分预测：' : '🎯 Expert Prediction: '}</span>
                        <span className="font-semibold text-[#0047AB]">{activeArticle.matchStats.prediction}</span>
                      </div>
                    )}

                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 font-sans">
                      <span className="font-mono font-semibold text-slate-900">{modalLang === 'zh' ? '关键瞬间 / 战术焦点：' : 'Key Moment / Tactical Focus: '}</span>
                      {modalLang === 'zh' ? activeArticle.matchStats.keyMomentZh : activeArticle.matchStats.keyMoment}
                    </div>
                  </div>
                )}

                {/* Cover Image with one-click direct upload button */}
                {activeArticle.coverImage && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 relative group bg-slate-100">
                    <img
                      src={activeArticle.coverImage}
                      alt={activeArticle.title || 'Article Cover'}
                      className="w-full max-h-[460px] object-cover"
                    />
                    <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[11px] font-mono text-slate-500 flex flex-wrap items-center justify-between gap-2">
                      <span>
                        {modalLang === 'zh' 
                          ? `摄影：${activeArticle.author} · Point Grey 摄影俱乐部` 
                          : `Photo by ${activeArticle.author} · Point Grey Photo Collective`}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={() => quickDirectCoverInputRef.current?.click()}
                          className="text-xs text-amber-800 hover:text-amber-900 font-mono font-medium flex items-center space-x-1 cursor-pointer bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                        >
                          <Camera className="w-3 h-3 text-amber-700" />
                          <span>{lang === 'zh' ? '更换实拍封面 (Admin)' : 'Change Cover Photo'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Article Detailed Content with Inline Images between Text (CSS Selector Targeted) */}
                <div id="news-article-reader-content" className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-200/80">
                    <div className="text-xs font-mono text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                      <Newspaper className="w-3.5 h-3.5 text-slate-700" />
                      <span>{modalLang === 'zh' ? '特稿深度报道 // REPORT BODY' : 'REPORT BODY // DISPATCH'}</span>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="file"
                          ref={readerInlineImageInputRef}
                          accept="image/*"
                          onChange={handleReaderInlineImagePicked}
                          className="hidden"
                        />
                        <button
                          onClick={() => readerInlineImageInputRef.current?.click()}
                          className="px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0047AB] text-xs font-mono font-medium flex items-center space-x-1.5 border border-blue-200 transition-colors cursor-pointer"
                          title={modalLang === 'zh' ? '从电脑选择本地照片直接插入到正文段落之间' : 'Insert photo between text paragraphs'}
                        >
                          <ImagePlus className="w-3.5 h-3.5 text-[#0047AB]" />
                          <span>{modalLang === 'zh' ? '+ 在正文间插入图片' : '+ Insert Photo in Text'}</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditModal(activeArticle)}
                          className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-mono flex items-center space-x-1 transition-colors cursor-pointer"
                          title="打开完整编辑器编辑段落与插图"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-slate-500" />
                          <span>{modalLang === 'zh' ? '排版编辑' : 'Edit Text'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Render Markdown with custom inline image and typography styling */}
                  <div className="text-slate-800 text-sm sm:text-base leading-relaxed font-normal max-w-none">
                    <div className="markdown-body space-y-3">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          img: ({ src, alt }: { src?: string; alt?: string }) => {
                            if (!src || typeof src !== 'string' || src.trim() === '') {
                              return null;
                            }
                            return (
                              <figure className="my-6 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-xs group">
                                <div
                                  className="relative overflow-hidden cursor-zoom-in bg-slate-900/5"
                                  onClick={() => setZoomImage({ url: src, caption: alt || undefined })}
                                >
                                  <img
                                    src={src}
                                    alt={alt || 'Article Photo'}
                                    className="w-full max-h-[520px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                                    loading="lazy"
                                  />
                                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 pointer-events-none">
                                    <Maximize2 className="w-3 h-3" />
                                    <span>{modalLang === 'zh' ? '点击全屏查看' : 'Click to Zoom'}</span>
                                  </div>
                                </div>
                                {alt && (
                                  <figcaption className="px-3.5 py-2.5 text-xs text-slate-600 font-mono bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                                    <span className="flex items-center space-x-1.5 min-w-0">
                                      <Camera className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                                      <span className="truncate">{alt}</span>
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider shrink-0">
                                      {modalLang === 'zh' ? '特稿插图' : 'INLINE PHOTO'}
                                    </span>
                                  </figcaption>
                                )}
                              </figure>
                            );
                          },
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                              <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm font-sans">
                                {children}
                              </table>
                            </div>
                          ),
                          thead: ({ children }) => (
                            <thead className="bg-slate-50 text-slate-800 font-mono text-[11px] font-semibold uppercase tracking-wider">
                              {children}
                            </thead>
                          ),
                          tbody: ({ children }) => (
                            <tbody className="divide-y divide-slate-200 bg-white text-slate-700">
                              {children}
                            </tbody>
                          ),
                          tr: ({ children }) => (
                            <tr className="hover:bg-slate-50/60 transition-colors">
                              {children}
                            </tr>
                          ),
                          th: ({ children }) => (
                            <th className="px-4 py-2.5 text-left font-bold text-slate-900 border-b border-slate-200">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="px-4 py-2.5 text-slate-700 font-normal">
                              {children}
                            </td>
                          ),
                          h3: ({ children }) => (
                            <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-950 mt-8 mb-3 border-b border-slate-200/70 pb-1.5 flex items-center space-x-2">
                              <span>{children}</span>
                            </h3>
                          ),
                          h2: ({ children }) => (
                            <h2 className="font-serif font-bold text-xl sm:text-2xl text-slate-950 mt-9 mb-4 border-b border-slate-300 pb-2">
                              <span>{children}</span>
                            </h2>
                          ),
                          p: ({ children, node }: any) => {
                            // If paragraph AST node contains an img or block, render a <div> instead of <p> to prevent invalid HTML nesting (<figure> inside <p>)
                            const hasBlockOrImage = node?.children?.some(
                              (child: any) =>
                                child?.type === 'element' &&
                                (child?.tagName === 'img' || child?.tagName === 'figure' || child?.tagName === 'div')
                            );
                            if (hasBlockOrImage) {
                              return <div className="my-3.5">{children}</div>;
                            }
                            return (
                              <p className="leading-relaxed text-slate-700 text-sm sm:text-base my-3.5 font-normal">
                                {children}
                              </p>
                            );
                          },
                          ul: ({ children }) => (
                            <ul className="list-disc list-outside ml-5 space-y-1.5 my-3.5 text-slate-700 text-sm sm:text-base">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-outside ml-5 space-y-1.5 my-3.5 text-slate-700 text-sm sm:text-base">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="leading-relaxed">{children}</li>
                          ),
                          hr: () => <hr className="my-7 border-slate-200" />,
                          strong: ({ children }) => <strong className="font-semibold text-slate-950">{children}</strong>,
                          blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-slate-900 pl-4 py-2 my-4 italic text-slate-700 bg-slate-50 rounded-r-lg">
                              {children}
                            </blockquote>
                          ),
                        }}
                      >
                        {modalLang === 'zh' 
                          ? activeArticle.contentZh 
                          : (activeArticle.content || activeArticle.contentZh)}
                      </Markdown>
                    </div>
                  </div>
                </div>

                {/* Pitchside Visual Essay Gallery (CTD Style) */}
                {((activeArticle.galleryImages && activeArticle.galleryImages.length > 0) || isAdmin) && (
                  <div className="space-y-4 pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-xs font-mono text-slate-900 font-bold uppercase tracking-wider">
                        <Camera className="w-4 h-4 text-slate-700" />
                        <span>{modalLang === 'zh' ? 'PITCHSIDE VISUAL ESSAY // 现场边线摄影组照' : 'PITCHSIDE VISUAL ESSAY // MATCH GALLERY'}</span>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => handleOpenEditModal(activeArticle)}
                          className="text-xs font-mono text-amber-800 hover:text-amber-900 flex items-center space-x-1 cursor-pointer font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{modalLang === 'zh' ? '添加机位照片 (Admin)' : 'Add Photos'}</span>
                        </button>
                      )}
                    </div>

                    {activeArticle.galleryImages && activeArticle.galleryImages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeArticle.galleryImages.map((img, gIdx) => (
                          img.url ? (
                            <div key={gIdx} className="rounded-xl overflow-hidden bg-white border border-slate-200 space-y-2 group">
                              <img
                                src={img.url}
                                alt={img.caption || 'Gallery photo'}
                                className="w-full h-56 object-cover"
                              />
                              <div className="p-3 space-y-1">
                                <p className="text-xs text-slate-800 font-medium">
                                  {modalLang === 'zh' ? img.captionZh : img.caption}
                                </p>
                                {img.exif && (
                                  <div className="text-[10px] font-mono text-slate-600 bg-slate-50 p-1.5 rounded border border-slate-200">
                                    EXIF: {img.exif}
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : null
                        ))}
                      </div>
                    ) : isAdmin ? (
                      <div className="p-6 text-center border border-dashed border-amber-300 rounded-xl bg-amber-50/50 space-y-2 font-mono">
                        <ImageIcon className="w-5 h-5 text-amber-600 mx-auto" />
                        <p className="text-xs text-amber-900">
                          {modalLang === 'zh' ? '【管理员提示】暂未添加现场机位组照，点击右上角按钮添加。' : 'Admin: No pitchside gallery photos added yet.'}
                        </p>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Bottom Edit CTA: Exclusively for Admin */}
                {isAdmin && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
                    <div className="space-y-0.5 text-center sm:text-left">
                      <div className="text-xs font-bold text-amber-950">
                        {modalLang === 'zh' ? '👑 管理员：更新照片与报道文字' : '👑 Admin: Update dispatch & photographs'}
                      </div>
                      <div className="text-xs text-amber-800 font-sans">
                        {modalLang === 'zh' ? '支持直接上传本地实拍原图、修改比分与中英文战报内容。' : 'Upload local photos directly and update scores & bilingual reports.'}
                      </div>
                    </div>
                    <button
                      onClick={() => handleOpenEditModal(activeArticle)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-mono text-xs font-bold transition-colors shrink-0 cursor-pointer flex items-center space-x-1.5 border border-amber-400"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-slate-950" />
                      <span>{modalLang === 'zh' ? '编辑报道' : 'Edit Report'}</span>
                    </button>
                  </div>
                )}

                {/* Tags */}
                <div className="pt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-100">
                  <span className="text-xs font-mono text-slate-400 mr-1">{modalLang === 'zh' ? '标签：' : 'Tags:'}</span>
                  {activeArticle.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SUBMIT / EDIT REPORT MODAL WITH TABS FOR CHINESE, ENGLISH & REAL PHOTO UPLOADING (Admin Only) */}
      <AnimatePresence>
        {isAdmin && isSubmitModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl border border-slate-200 flex flex-col my-auto"
            >
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-2.5 text-slate-900 font-serif font-bold text-lg">
                  <Newspaper className="w-5 h-5 text-slate-900" />
                  <span>
                    {editingArticleId 
                      ? (lang === 'zh' ? '编辑赛事特稿与实拍照片' : 'Edit Dispatch & Photographs')
                      : (lang === 'zh' ? '发稿中心 · 发布新赛事与纪实特稿' : 'Visual Newsroom · New Dispatch')}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitModalOpen(false);
                    setEditingArticleId(null);
                  }}
                  className="p-1 rounded-md hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Editor Language & Section Tabs */}
              <div className="flex items-center border-b border-slate-200 bg-slate-50 px-5 sm:px-6 pt-2.5 gap-2">
                <button
                  type="button"
                  onClick={() => setEditorTab('zh')}
                  className={`pb-2 px-3 text-xs font-mono font-medium border-b-2 transition-colors cursor-pointer ${
                    editorTab === 'zh' 
                      ? 'border-slate-950 text-slate-950 font-bold' 
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  🇨🇳 中文版本 (Chinese)
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('en')}
                  className={`pb-2 px-3 text-xs font-mono font-medium border-b-2 transition-colors cursor-pointer ${
                    editorTab === 'en' 
                      ? 'border-slate-950 text-slate-950 font-bold' 
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  🇨🇦 English Version (英文版)
                </button>
                <button
                  type="button"
                  onClick={() => setEditorTab('photos')}
                  className={`pb-2 px-3 text-xs font-mono font-medium border-b-2 transition-colors cursor-pointer ${
                    editorTab === 'photos' 
                      ? 'border-slate-950 text-slate-950 font-bold' 
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  📸 实拍照片与比赛数据 (Photos & Stats)
                </button>
              </div>

              <form onSubmit={handleSaveReport} className="p-5 sm:p-7 space-y-6 overflow-y-auto max-h-[72vh]">
                
                {/* Notice tip */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 flex items-start space-x-2.5 text-blue-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-[#0047AB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{lang === 'zh' ? '两场比赛独立分开与本地图片上传：' : 'Separation & Photo Uploads: '}</span>
                    {lang === 'zh'
                      ? '您可以直接在「照片」标签中从本地电脑选择实拍照片替换封面，中文和英文内容独立编辑存储。'
                      : 'You can upload photos directly from your computer, with English and Chinese content managed independently.'}
                  </div>
                </div>

                {/* Common Basic Meta */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      {lang === 'zh' ? '新闻类别' : 'Category'}
                    </label>
                    <select
                      value={newReport.category}
                      onChange={(e) => setNewReport({ ...newReport, category: e.target.value as NewsCategory })}
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800"
                    >
                      <option value="sports">{lang === 'zh' ? '体育赛事 (Sports & Sidelines)' : 'Sports & Sidelines'}</option>
                      <option value="campus">{lang === 'zh' ? '校园活动 (Campus & Arts)' : 'Campus & Arts'}</option>
                      <option value="gear">{lang === 'zh' ? '器材与暗房 (Optics & Lab)' : 'Optics & Lab'}</option>
                      <option value="editorial">{lang === 'zh' ? '专访特稿 (Interviews & Editorial)' : 'Interviews & Editorial'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      {lang === 'zh' ? '作者 / 摄影师姓名' : 'Author / Photographer'}
                    </label>
                    <input
                      type="text"
                      value={newReport.author}
                      onChange={(e) => setNewReport({ ...newReport, author: e.target.value })}
                      placeholder="Aaron Peng"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                      {lang === 'zh' ? '作者职务 / 身份' : 'Author Role'}
                    </label>
                    <input
                      type="text"
                      value={newReport.authorRole}
                      onChange={(e) => setNewReport({ ...newReport, authorRole: e.target.value })}
                      placeholder="Sports Lead Photographer"
                      className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                    />
                  </div>
                </div>

                {/* TAB 1: CHINESE VERSION */}
                {editorTab === 'zh' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        🇨🇳 中文主标题 (Chinese Headline)
                      </label>
                      <input
                        type="text"
                        value={newReport.titleZh}
                        onChange={(e) => setNewReport({ ...newReport, titleZh: e.target.value })}
                        placeholder="例：【第1场】温哥华FC 3-1 胜渥太华竞技：半场连轰3球进攻教学"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        🇨🇳 中文摘要导语 (Chinese Summary)
                      </label>
                      <textarea
                        rows={2}
                        value={newReport.summaryZh}
                        onChange={(e) => setNewReport({ ...newReport, summaryZh: e.target.value })}
                        placeholder="简述比赛亮点、核心比分与现场看点..."
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        🇨🇳 中文关键瞬间描述 (Key Moment)
                      </label>
                      <input
                        type="text"
                        value={newReport.keyMomentZh}
                        onChange={(e) => setNewReport({ ...newReport, keyMomentZh: e.target.value })}
                        placeholder="例：第7分钟达米亚诺·佩西莱手术刀直塞闪电助攻..."
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                        <label className="block text-xs font-mono text-slate-700 font-semibold">
                          🇨🇳 中文正文报道内容 (Detailed Report Body - Chinese)
                        </label>
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => inlineImageInputRef.current?.click()}
                            className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0047AB] text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer border border-blue-200"
                            title="从电脑选择实拍照片插入到正文光标处"
                          >
                            <ImagePlus className="w-3 h-3 text-[#0047AB]" />
                            <span>插入本地图片</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleInsertImageUrl}
                            className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer border border-slate-200"
                            title="输入图片网络URL插入到正文"
                          >
                            <LinkIcon className="w-3 h-3 text-slate-600" />
                            <span>插入URL图片</span>
                          </button>
                        </div>
                      </div>
                      <textarea
                        ref={contentZhTextareaRef}
                        rows={9}
                        value={newReport.contentZh}
                        onChange={(e) => setNewReport({ ...newReport, contentZh: e.target.value })}
                        placeholder="详细记录比赛进程。可在段落之间任意插入图片（格式为：![说明](图片链接)），报道中会自动优雅呈现并支持点击放大..."
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono"
                        required
                      />
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        💡 提示：点击右上角「插入本地图片」即可在段落之间直接加入高分辨率实拍照，支持自动图文混排与排版。
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 2: ENGLISH VERSION */}
                {editorTab === 'en' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        🇨🇦 English Headline (英文标题)
                      </label>
                      <input
                        type="text"
                        value={newReport.title}
                        onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                        placeholder="e.g. Match 1 · Vancouver FC 3-1 Atlético Ottawa: First-Half Dominance"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        🇨🇦 English Summary (英文摘要导语)
                      </label>
                      <textarea
                        rows={2}
                        value={newReport.summary}
                        onChange={(e) => setNewReport({ ...newReport, summary: e.target.value })}
                        placeholder="e.g. Pitchside dispatch from Willoughby Community Park. Vancouver FC delivered a 3-1 victory..."
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                        🇨🇦 English Key Moment (英文瞬间抓拍描述)
                      </label>
                      <input
                        type="text"
                        value={newReport.keyMoment}
                        onChange={(e) => setNewReport({ ...newReport, keyMoment: e.target.value })}
                        placeholder="e.g. Damiano Pecile 7th-minute pinpoint through-ball assist & 3-goal blitz"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                      />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                        <label className="block text-xs font-mono text-slate-700 font-semibold">
                          🇨🇦 English Detailed Report Body (英文正文报道)
                        </label>
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={() => inlineImageInputRef.current?.click()}
                            className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0047AB] text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer border border-blue-200"
                            title="Insert photo from computer into text"
                          >
                            <ImagePlus className="w-3 h-3 text-[#0047AB]" />
                            <span>Insert Local Photo</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleInsertImageUrl}
                            className="px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer border border-slate-200"
                            title="Insert image from web URL"
                          >
                            <LinkIcon className="w-3 h-3 text-slate-600" />
                            <span>Insert URL Photo</span>
                          </button>
                        </div>
                      </div>
                      <textarea
                        ref={contentEnTextareaRef}
                        rows={9}
                        value={newReport.content}
                        onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                        placeholder="Full English match report and pitchside photography notes. Use ![Caption](URL) to embed photos between paragraphs..."
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-mono"
                        required
                      />
                      <p className="text-[11px] text-slate-400 font-mono mt-1">
                        💡 Tip: Click "Insert Local Photo" to embed your pitchside photographs anywhere between paragraphs.
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: MATCH STATS & LOCAL PHOTOS UPLOAD */}
                {editorTab === 'photos' && (
                  <div className="space-y-5">
                    {/* Match Specific Panel */}
                    {newReport.category === 'sports' && (
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
                        <div className="text-xs font-mono font-bold text-[#0047AB] flex items-center space-x-1.5">
                          <Trophy className="w-4 h-4" />
                          <span>{lang === 'zh' ? '比赛技术参数' : 'Match Metadata'}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                          <div>
                            <label className="block text-[10px] font-mono text-slate-600 mb-1">{lang === 'zh' ? '比赛对阵双方' : 'Fixture'}</label>
                            <input
                              type="text"
                              value={newReport.fixture}
                              onChange={(e) => setNewReport({ ...newReport, fixture: e.target.value })}
                              placeholder="Vancouver FC vs Atlético Ottawa"
                              className="w-full p-2 rounded-lg bg-white border border-blue-200 text-xs text-slate-800 font-medium"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-600 mb-1">{lang === 'zh' ? '最终比分' : 'Final Score'}</label>
                            <input
                              type="text"
                              value={newReport.score}
                              onChange={(e) => setNewReport({ ...newReport, score: e.target.value })}
                              placeholder="3 - 1"
                              className="w-full p-2 rounded-lg bg-white border border-blue-200 text-xs text-slate-800 font-bold text-blue-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono text-slate-600 mb-1">{lang === 'zh' ? '比赛球场' : 'Stadium'}</label>
                            <input
                              type="text"
                              value={newReport.stadium}
                              onChange={(e) => setNewReport({ ...newReport, stadium: e.target.value })}
                              placeholder="Willoughby Community Park Stadium (Langley, BC)"
                              className="w-full p-2 rounded-lg bg-white border border-blue-200 text-xs text-slate-800"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cover Image Upload & URL */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-mono text-slate-900 font-bold flex items-center space-x-1.5">
                          <Camera className="w-4 h-4 text-[#0047AB]" />
                          <span>{lang === 'zh' ? '封面主视觉照片（支持电脑本地上传）' : 'Cover Image (Supports Local Upload)'}</span>
                        </label>
                        <span className="text-[11px] font-mono text-slate-500">JPG/PNG/WEBP</span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        {/* Thumbnail Preview */}
                        <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 relative shadow-xs flex items-center justify-center">
                          {newReport.coverImage ? (
                            <img
                              src={newReport.coverImage}
                              alt="Cover Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                          ) : (
                            <div className="text-[11px] font-mono text-slate-400">
                              {lang === 'zh' ? '暂无预览' : 'No Preview'}
                            </div>
                          )}
                        </div>

                        <div className="w-full space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <input
                              type="file"
                              ref={coverFileInputRef}
                              accept="image/*"
                              onChange={handleCoverFileUpload}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => coverFileInputRef.current?.click()}
                              className="px-4 py-2 rounded-xl bg-[#0047AB] hover:bg-blue-800 text-white font-mono text-xs font-semibold flex items-center space-x-1.5 shadow-sm cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>{lang === 'zh' ? '从电脑选择本地拍摄照片' : 'Upload Image from Computer'}</span>
                            </button>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-[11px] font-mono text-slate-400 shrink-0">{lang === 'zh' ? '或图片网址：' : 'Or URL:'}</span>
                            <input
                              type="url"
                              value={newReport.coverImage}
                              onChange={(e) => setNewReport({ ...newReport, coverImage: e.target.value })}
                              placeholder="https://..."
                              className="w-full p-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pitchside Gallery Photos Manager */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <label className="block text-xs font-mono text-slate-900 font-bold flex items-center space-x-1.5">
                            <ImageIcon className="w-4 h-4 text-[#0047AB]" />
                            <span>{lang === 'zh' ? '现场机位抓拍组照与 EXIF 参数 (支持批量上传)' : 'Pitchside Gallery Photos & EXIF'}</span>
                          </label>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {lang === 'zh' ? '上传多张单反/无反实拍照片，并记录镜头焦段与曝光参数' : 'Upload multiple photos and add lens & camera EXIF.'}
                          </p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            ref={galleryFileInputRef}
                            accept="image/*"
                            multiple
                            onChange={handleGalleryFilesUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => galleryFileInputRef.current?.click()}
                            className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{lang === 'zh' ? '批量上传本地抓拍照' : 'Upload Photos'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleAddBlankGalleryImage}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-mono text-xs flex items-center space-x-1 cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{lang === 'zh' ? '添加网址图片' : 'Add via URL'}</span>
                          </button>
                        </div>
                      </div>

                      {newReport.galleryImages.length > 0 ? (
                        <div className="space-y-3 pt-2">
                          {newReport.galleryImages.map((img, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start gap-3">
                              <div className="w-full sm:w-28 h-20 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                                <img src={img.url} alt="Gallery item" className="w-full h-full object-cover" />
                              </div>

                              <div className="w-full space-y-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={img.captionZh}
                                    onChange={(e) => handleUpdateGalleryImage(idx, { captionZh: e.target.value })}
                                    placeholder={lang === 'zh' ? '中文照片说明' : 'Chinese Caption'}
                                    className="p-1.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-800"
                                  />
                                  <input
                                    type="text"
                                    value={img.caption}
                                    onChange={(e) => handleUpdateGalleryImage(idx, { caption: e.target.value })}
                                    placeholder="English Caption"
                                    className="p-1.5 rounded bg-slate-50 border border-slate-200 text-xs text-slate-800"
                                  />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <input
                                    type="text"
                                    value={img.exif || ''}
                                    onChange={(e) => handleUpdateGalleryImage(idx, { exif: e.target.value })}
                                    placeholder="EXIF: Sony α7R V · FE 100-400mm GM @ 300mm · 1/3200s · ISO 800"
                                    className="p-1.5 rounded bg-slate-50 border border-slate-200 text-xs font-mono text-blue-700"
                                  />
                                  <input
                                    type="text"
                                    value={img.url}
                                    onChange={(e) => handleUpdateGalleryImage(idx, { url: e.target.value })}
                                    placeholder="Image URL or Base64"
                                    className="p-1.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-500"
                                  />
                                </div>

                                <div className="flex items-center space-x-2 pt-0.5">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const caption = (lang === 'zh' ? img.captionZh : img.caption) || img.captionZh || img.caption || '现场机位实拍瞬间';
                                      handleInsertImageToEditor(img.url, caption);
                                      alert(lang === 'zh' ? '已将该图片以 Markdown 格式插入到正文光标处！' : 'Photo embedded into report text body at cursor!');
                                    }}
                                    className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-[#0047AB] text-[11px] font-mono flex items-center space-x-1 transition-colors cursor-pointer border border-blue-200"
                                  >
                                    <ImagePlus className="w-3 h-3 text-[#0047AB]" />
                                    <span>{lang === 'zh' ? '插入此图到正文段落' : 'Insert into Text Body'}</span>
                                  </button>
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer self-center sm:self-start"
                                title="Remove photo"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center border border-dashed border-slate-200 rounded-xl bg-white text-xs font-mono text-slate-400">
                          {lang === 'zh' ? '暂未添加边线机位组照，点击右上角上传按钮添加。' : 'No gallery photos added yet.'}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tags Field */}
                <div>
                  <label className="block text-xs font-mono text-slate-700 font-semibold mb-1">
                    {lang === 'zh' ? '标签（英文逗号隔开）' : 'Tags (comma separated)'}
                  </label>
                  <input
                    type="text"
                    value={newReport.tags}
                    onChange={(e) => setNewReport({ ...newReport, tags: e.target.value })}
                    placeholder="VancouverFC, AtleticoOttawa, CPL, SonyAlpha, AaronPeng"
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800"
                  />
                </div>

                {/* Hidden File Picker for Inline Article Images */}
                <input
                  type="file"
                  ref={inlineImageInputRef}
                  accept="image/*"
                  onChange={handleInlineImageFilePicked}
                  className="hidden"
                />

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3 sticky bottom-0 bg-white py-2">
                  <button
                    type="button"
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-mono text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    {lang === 'zh' ? '取消' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-[#0047AB] hover:bg-blue-800 text-white text-xs font-mono font-bold shadow-md cursor-pointer flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>
                      {editingArticleId
                        ? (lang === 'zh' ? '保存并更新报道与照片' : 'Save Dispatch & Photos')
                        : (lang === 'zh' ? '立即发布报道' : 'Publish Report')}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Zoom Modal for Inline Images in Article */}
      <AnimatePresence>
        {zoomImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setZoomImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="max-w-5xl max-h-[92vh] flex flex-col items-center relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setZoomImage(null)}
                className="absolute -top-10 right-0 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
              {zoomImage.url ? (
                <img
                  src={zoomImage.url}
                  alt={zoomImage.caption || 'Expanded view'}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
                />
              ) : null}
              {zoomImage.caption && (
                <div className="mt-3 text-center px-4 py-1.5 rounded-full bg-black/70 border border-white/10 text-white text-xs font-mono">
                  {zoomImage.caption}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
