import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, MapPin, Users, Award, FileText, Sparkles, 
  ArrowRight, ExternalLink, Link2, Copy, Check, Clock, 
  ShieldCheck, HelpCircle, UserPlus, Compass, Camera, Upload, 
  ChevronRight, RefreshCw, Send, AlertCircle, BookOpen, Newspaper,
  GraduationCap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConferencePortalProps {
  onOpenStudentPortal: (tab?: 'profile' | 'submit' | 'my-submissions' | 'admin-review') => void;
}

export type ConferenceTab = 
  | 'overview' 
  | 'schedule' 
  | 'submissions' 
  | 'venue';

export const ConferencePortal: React.FC<ConferencePortalProps> = ({ onOpenStudentPortal }) => {
  const { lang, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<ConferenceTab>('overview');
  const [redirectToast, setRedirectToast] = useState<{ show: boolean; target: string; msg: string }>({
    show: false,
    target: '',
    msg: '',
  });
  const [copiedLink, setCopiedLink] = useState(false);
  const [autoRedirectTimer, setAutoRedirectTimer] = useState<number | null>(null);
  const [targetRedirectTab, setTargetRedirectTab] = useState<ConferenceTab | null>(null);

  // 1. Automatic URL Hash & Query Parameter Redirection Listener
  useEffect(() => {
    const handleUrlHashRedirect = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const params = new URLSearchParams(window.location.search);
      const redirectParam = params.get('redirect') || params.get('tab') || params.get('view');
      
      const target = (redirectParam || hash) as ConferenceTab;
      const validTabs: ConferenceTab[] = ['overview', 'schedule', 'submissions', 'venue'];
      
      if (target && validTabs.includes(target)) {
        setActiveTab(target);
        setRedirectToast({
          show: true,
          target,
          msg: lang === 'zh' 
            ? `已自动定位至：${getTabLabel(target, 'zh')}` 
            : lang === 'fr' 
            ? `Redirection automatique vers : ${getTabLabel(target, 'fr')}` 
            : `Auto-redirected to: ${getTabLabel(target, 'en')}`,
        });
        
        // Smooth scroll to conference portal
        const el = document.getElementById('conference-portal');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }

        setTimeout(() => {
          setRedirectToast((prev) => ({ ...prev, show: false }));
        }, 3500);
      }
    };

    // Initial check on mount
    handleUrlHashRedirect();

    // Listen for hash changes
    window.addEventListener('hashchange', handleUrlHashRedirect);
    return () => window.removeEventListener('hashchange', handleUrlHashRedirect);
  }, [lang]);

  // Sync tab change to URL hash without reload
  const handleTabChange = (tab: ConferenceTab) => {
    setActiveTab(tab);
    window.history.replaceState(null, '', `#${tab}`);
  };

  // Helper for tab names
  function getTabLabel(tab: ConferenceTab, l = lang): string {
    const labels: Record<ConferenceTab, { en: string; zh: string; fr: string }> = {
      overview: { en: 'Summit Overview', zh: '峰会概览', fr: 'Aperçu du Sommet' },
      schedule: { en: 'Schedule (TBA)', zh: '议程安排 (TBA)', fr: 'Programme (TBA)' },
      submissions: { en: 'Exhibition Submissions', zh: '影展作品投递', fr: 'Soumissions Expo' },
      venue: { en: 'Venue & Logistics', zh: '会场与交通指引', fr: 'Lieu & Logistique' },
    };
    return labels[tab][l];
  }

  // Copy shareable direct URL link
  const handleCopyDirectLink = (tab: ConferenceTab) => {
    const url = `${window.location.origin}${window.location.pathname}#${tab}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  // Trigger simulated automatic redirection
  const handleStartAutoRedirectSimulation = (tab: ConferenceTab) => {
    setTargetRedirectTab(tab);
    setAutoRedirectTimer(3);

    const interval = setInterval(() => {
      setAutoRedirectTimer((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          handleTabChange(tab);
          setTargetRedirectTab(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <section id="conference" className="py-14 sm:py-20 bg-[#FBFDFE] border-t border-slate-200 relative scroll-mt-20">
      
      {/* Background Decorative Tech Dots */}
      <div className="absolute inset-0 bg-editorial-dots opacity-30 pointer-events-none" />

      {/* Floating Auto-Redirect Banner / Toast */}
      <AnimatePresence>
        {redirectToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 flex items-center space-x-3 text-xs font-mono"
          >
            <div className="w-7 h-7 rounded-lg bg-[#0047AB] flex items-center justify-center text-white shrink-0">
              <Link2 className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-cyan-300">
                {lang === 'zh' ? 'URL 自动重定向生效' : lang === 'fr' ? 'Redirection active' : 'URL Redirection Active'}
              </p>
              <p className="text-slate-300 text-[11px] mt-0.5">{redirectToast.msg}</p>
            </div>
            <button
              onClick={() => setRedirectToast((prev) => ({ ...prev, show: false }))}
              className="text-slate-400 hover:text-white p-1 cursor-pointer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Conference Header Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/70 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#0047AB] text-white text-[11px] font-mono font-bold tracking-wider uppercase">
                  PGPC 2026
                </span>
                <span className="px-2.5 py-1 rounded-md bg-blue-50 text-[#0047AB] text-[11px] font-mono border border-blue-200 font-semibold">
                  {lang === 'zh' ? '年度青年摄影峰会 & 展评' : lang === 'fr' ? 'Conférence Annuelle & Salon Photo' : 'Annual Youth Photography Conference'}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-[11px] font-mono border border-amber-200 flex items-center space-x-1 font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>{lang === 'zh' ? '官方议程待发布 (TBA)' : lang === 'fr' ? 'Programme à venir (TBA)' : 'Official Data TBA'}</span>
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 tracking-tight font-bold">
                {lang === 'zh' 
                  ? 'Point Grey 中学年度摄影大会与峰会门户' 
                  : lang === 'fr' 
                  ? 'Portail de la Conférence Photographique Point Grey' 
                  : 'Point Grey Photography Conference & Summit Portal'}
              </h2>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                {lang === 'zh'
                  ? '欢迎来到温哥华 Point Grey 中学（Point Grey Secondary）摄影社官方大会门户。为参会代表、社员及指导教师提供集中化的议程指引、分会场选报、作品展评投递与代表证管理。所有具体数据发布在即。'
                  : lang === 'fr'
                  ? 'Bienvenue sur le portail officiel de la Conférence Photographique de Point Grey. Accédez aux informations pour délégués, ateliers thématiques, soumissions d’exposition et gestion des accréditations. Données détaillées à venir.'
                  : 'Welcome to the official Point Grey Secondary Photography Conference portal. Designed for student delegates, club members, and faculty to navigate conference tracks, submit exhibition portfolios, and access delegate credentials. All event data to be announced.'}
              </p>

              {/* Quick Conference Meta Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 pt-1">
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>5350 East Blvd, Vancouver, BC</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>{lang === 'zh' ? '举办日期：敬请期待 (TBA)' : lang === 'fr' ? 'Dates : À déterminer (TBA)' : 'Dates: TBA (Releasing Soon)'}</span>
                </div>
                <div className="flex items-center space-x-1.5 text-slate-700">
                  <Users className="w-3.5 h-3.5 text-[#0047AB]" />
                  <span>{lang === 'zh' ? '主办：Point Grey 摄影社' : lang === 'fr' ? 'Organisé par le Club Photo PGSS' : 'Host: PGSS Photo Collective'}</span>
                </div>
              </div>
            </div>

            {/* Quick Action / Direct Deep Link Copy */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
              <button
                onClick={() => onOpenStudentPortal('profile')}
                className="px-5 py-3 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white font-mono text-xs font-bold shadow-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>
                  {lang === 'zh' ? '社员/代表账户中心' : lang === 'fr' ? 'Espace Délégué / Profil' : 'Member Hub / Sign In'}
                </span>
              </button>

              <button
                onClick={() => handleCopyDirectLink(activeTab)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs flex items-center justify-center space-x-1.5 border border-slate-200 transition-colors cursor-pointer"
                title="Copy shareable link with automatic redirection"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>
                  {copiedLink 
                    ? (lang === 'zh' ? '已复制跳转直链！' : lang === 'fr' ? 'Lien direct copié !' : 'Direct Link Copied!') 
                    : (lang === 'zh' ? '复制本页重定向链接' : lang === 'fr' ? 'Copier le lien direct' : 'Copy Direct URL')}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Conference Navigation Tabs Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs overflow-x-auto">
          <nav className="flex space-x-1 min-w-max">
            {(['overview', 'schedule', 'submissions', 'venue'] as ConferenceTab[]).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-medium flex items-center space-x-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#0047AB] text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{getTabLabel(tab)}</span>
                  {tab === 'schedule' ? (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'}`}>
                      TBA
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content Panels */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs min-h-[380px]">
          
          {/* 1. OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              
              {/* Conference Highlights Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Theme Announcement Placeholder */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0047AB] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '大会年度主题' : lang === 'fr' ? 'Thème de la conférence' : 'Conference Theme'}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {lang === 'zh' ? '【待发布 / TBA】' : lang === 'fr' ? '【À venir / TBA】' : '【To Be Announced】'}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '围绕大温哥华海岸生态、光影建筑与青年视觉纪实的主题正在最终审定中。'
                      : lang === 'fr'
                      ? 'Le thème officiel explorera la lumière côtière, l’architecture et le documentaire jeunesse.'
                      : 'The official conference theme is being finalized by the student secretariat.'}
                  </p>
                </div>

                {/* Keynote & Guest Jurors */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '特邀主讲与评审阵容' : lang === 'fr' ? 'Invités & Jury d’honneur' : 'Keynotes & Guest Jurors'}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {lang === 'zh' ? '【阵容待揭晓 / TBA】' : lang === 'fr' ? '【Invités à venir / TBA】' : '【Speakers TBA】'}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '将邀请温哥华知名摄影师、VSB艺术督导及历届优秀校友进行现场主题分享与一对一作品评析。'
                      : lang === 'fr'
                      ? 'Des photographes professionnels et anciens élèves animeront des séances de retours personnalisés.'
                      : 'Featuring local Vancouver photographers, VSB arts faculty, and alumni guest reviewers.'}
                  </p>
                </div>

                {/* Delegate Registrations */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-slate-900">
                    {lang === 'zh' ? '代表报名资格' : lang === 'fr' ? 'Inscriptions & Accréditations' : 'Delegate Registration'}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {lang === 'zh' ? '【通道即将开放 / TBA】' : lang === 'fr' ? '【Ouverture prochaine / TBA】' : '【Opening Soon】'}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '面向 Point Grey Secondary 全体年级学生及大温受邀中学代表。免收参会注册费。'
                      : lang === 'fr'
                      ? 'Ouvert à tous les élèves de Point Grey et écoles secondaires partenaires du district.'
                      : 'Free registration for all Point Grey students and invited district delegates.'}
                  </p>
                </div>

              </div>

              {/* Automatic Redirection Fast Link Widget */}
              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <Link2 className="w-4 h-4 text-[#0047AB]" />
                    <span className="font-serif font-bold text-sm text-slate-900">
                      {lang === 'zh' ? '峰会各模块重定向快捷直达' : 'Summit Deep Link Jump Simulator'}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {lang === 'zh' ? '点击模拟 URL 直达并切换' : 'Simulate direct URL hashtag jumps'}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleStartAutoRedirectSimulation('schedule')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-mono border border-slate-300 flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>→ #{lang === 'zh' ? '议程安排' : 'schedule'}</span>
                  </button>
                  <button
                    onClick={() => handleStartAutoRedirectSimulation('submissions')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-mono border border-slate-300 flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>→ #{lang === 'zh' ? '作品投递' : 'submissions'}</span>
                  </button>
                  <button
                    onClick={() => handleStartAutoRedirectSimulation('venue')}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 text-xs font-mono border border-slate-300 flex items-center space-x-1.5 cursor-pointer shadow-2xs"
                  >
                    <span>→ #{lang === 'zh' ? '会场指引' : 'venue'}</span>
                  </button>
                </div>

                {autoRedirectTimer !== null && (
                  <div className="p-3 rounded-lg bg-slate-900 text-white text-xs font-mono flex items-center space-x-2 animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>
                      {lang === 'zh'
                        ? `正在自动重定向至【${getTabLabel(targetRedirectTab || 'overview')}】...（${autoRedirectTimer} 秒）`
                        : lang === 'fr'
                        ? `Redirection automatique vers【${getTabLabel(targetRedirectTab || 'overview')}】dans ${autoRedirectTimer}s...`
                        : `Auto-redirecting to【${getTabLabel(targetRedirectTab || 'overview')}】in ${autoRedirectTimer} seconds...`}
                    </span>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* 2. SCHEDULE TAB */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    {lang === 'zh' ? '大会完整议程安排' : lang === 'fr' ? 'Programme de la conférence' : 'Official Conference Schedule'}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {lang === 'zh' ? '所有时间段及场次暂未最终排定（待发布）' : lang === 'fr' ? 'Créneaux horaires en cours de finalisation (TBA)' : 'Session time slots and rooms to be announced (TBA)'}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-mono text-xs font-semibold self-start sm:self-auto">
                  {lang === 'zh' ? '议程筹备中 (TBA)' : lang === 'fr' ? 'En préparation (TBA)' : 'Schedule TBA'}
                </span>
              </div>

              {/* Clean TBA Timeline Slots */}
              <div className="space-y-3">
                {[
                  { time: '09:00 - 09:30', title: 'Delegate Check-in & Badge Issuance', zh: '代表报到与证件领取', fr: 'Accueil & Remise des badges' },
                  { time: '09:30 - 10:30', title: 'Opening Ceremony & Keynote Address', zh: '开幕式与特邀主旨演讲', fr: 'Cérémonie d’ouverture & Discours' },
                  { time: '10:45 - 12:15', title: 'Morning Workshop Sessions (Tracks A / B / C)', zh: '上午分会场实践工作坊 (A/B/C轨)', fr: 'Ateliers du matin (Volets A / B / C)' },
                  { time: '12:15 - 13:15', title: 'Curator Exhibition Walk & Lunch', zh: '策展影展观摩与午间交流', fr: 'Visite de l’exposition & Déjeuner' },
                  { time: '13:30 - 15:30', title: 'Afternoon Field Photowalk & Darkroom Lab', zh: '下午实地外拍采风与暗房显影', fr: 'Sortie terrain & Laboratoire argentique' },
                  { time: '15:45 - 16:45', title: 'Portfolio Critique Panel & Awards', zh: '作品评析研讨与表彰颁奖', fr: 'Table ronde critique & Remise des prix' },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-blue-50/40 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 rounded bg-white border border-slate-300 font-mono text-xs font-bold text-[#0047AB]">
                        {item.time}
                      </span>
                      <span className="font-medium text-sm text-slate-800">
                        {lang === 'zh' ? item.zh : lang === 'fr' ? item.fr : item.title}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {lang === 'zh' ? '具体讲师及教室待定' : lang === 'fr' ? 'Lieu et intervenant à confirmer' : 'Speaker & Room TBA'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-slate-100 text-center text-xs text-slate-600 font-mono">
                {lang === 'zh' 
                  ? '📢 最终官方日程表将在大会前两周向已注册代表公布。' 
                  : lang === 'fr' 
                  ? '📢 Le programme définitif sera communiqué aux participants 2 semaines avant l’événement.' 
                  : '📢 The final detailed itinerary will be published 2 weeks prior to the conference.'}
              </div>
            </div>
          )}

          {/* 3. SUBMISSIONS TAB */}
          {activeTab === 'submissions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900">
                    {lang === 'zh' ? '大会摄影展评作品征集' : lang === 'fr' ? 'Appel à projets & Exposition' : 'Conference Exhibition Call for Submissions'}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {lang === 'zh' ? '面向全体社员与代表征集原创摄影作品' : 'Submit original student works for peer review & awards'}
                  </p>
                </div>

                <button
                  onClick={() => onOpenStudentPortal('submit')}
                  className="px-5 py-2 rounded-xl bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-blue-700 transition-colors flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{lang === 'zh' ? '立即在线投递' : 'Submit Entry Online'}</span>
                </button>
              </div>

              {/* Submission Guidelines Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0047AB]">01 // RESOLUTION</span>
                  <h5 className="font-bold text-xs text-slate-900">
                    {lang === 'zh' ? '高分辨率原图' : 'High Resolution Image'}
                  </h5>
                  <p className="text-[11px] text-slate-600 font-light">
                    {lang === 'zh'
                      ? '建议提供清晰的数字格式（JPEG / PNG）或RAW对比样张。'
                      : 'Provide high-res files (JPEG/PNG). RAW files welcomed.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0047AB]">02 // OPTICAL EXIF</span>
                  <h5 className="font-bold text-xs text-slate-900">
                    {lang === 'zh' ? '完整光学拍摄参数' : 'Complete EXIF Data'}
                  </h5>
                  <p className="text-[11px] text-slate-600 font-light">
                    {lang === 'zh'
                      ? '包含相机型号、镜头、光圈、快门速度、ISO及拍摄地点。'
                      : 'Include camera, lens, aperture, shutter speed, ISO, and location.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-mono text-xs font-bold text-[#0047AB]">03 // STATEMENT</span>
                  <h5 className="font-bold text-xs text-slate-900">
                    {lang === 'zh' ? '创作陈述与构思' : 'Artist Statement'}
                  </h5>
                  <p className="text-[11px] text-slate-600 font-light">
                    {lang === 'zh'
                      ? '简述拍摄构思、光影背景或背后的纪实故事。'
                      : 'Briefly explain the composition, concept, or story.'}
                  </p>
                </div>
              </div>

              {/* Status Notice */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between text-xs font-mono text-[#0047AB]">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'zh' ? '投稿审核通道已上线，欢迎随时投递。' : 'Submission portal is live & ready for student entries.'}</span>
                </div>
                <button
                  onClick={() => onOpenStudentPortal('submit')}
                  className="font-bold hover:underline cursor-pointer"
                >
                  {lang === 'zh' ? '前往投递界面 →' : 'Go to Form →'}
                </button>
              </div>

            </div>
          )}

          {/* 4. VENUE & LOGISTICS TAB */}
          {activeTab === 'venue' && (
            <div className="space-y-6">
              <div className="pb-4 border-b border-slate-200">
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  {lang === 'zh' ? '会场地点与交通指引' : lang === 'fr' ? 'Lieu de l’événement & Transports' : 'Venue & Logistics Information'}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Point Grey Secondary School • 5350 East Boulevard, Vancouver, BC V6M 3V2
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="font-mono font-bold text-xs text-[#0047AB] uppercase">
                    {lang === 'zh' ? '主要会场区域分配 (待公布)' : 'Room Allocations (TBA)'}
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 font-mono">
                    <li className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                      <span>{lang === 'zh' ? '主会场与开幕式' : 'Main Hall & Keynotes'}</span>
                      <span className="text-slate-500">Auditorium (TBA)</span>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                      <span>{lang === 'zh' ? '胶片暗房实操' : 'Analog Darkroom Lab'}</span>
                      <span className="text-slate-500">Ms Yelland's room</span>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                      <span>{lang === 'zh' ? '数码摄影与后期' : 'Digital Post & Imaging'}</span>
                      <span className="text-slate-500">Ms Yelland's room</span>
                    </li>
                    <li className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                      <span>{lang === 'zh' ? '作品展廊' : 'Gallery & Exhibition Walk'}</span>
                      <span className="text-slate-500">Central Atrium (TBA)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                  <h4 className="font-mono font-bold text-xs text-[#0047AB] uppercase">
                    {lang === 'zh' ? '公共交通与乘车指南' : 'Transit & Accessibility'}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {lang === 'zh'
                      ? '学校位于 Kerrisdale 街区，邻近 Arbutus Greenway。乘坐 TransLink #16、#41 或 R4 快速公交线至 41st Ave & East Blvd 即可步行到达。'
                      : 'Located in Kerrisdale near Arbutus Greenway. Accessible via TransLink routes #16, #41, or RapidBus R4.'}
                  </p>
                  <div className="p-3 rounded-lg bg-blue-50 text-[11px] font-mono text-[#0047AB] border border-blue-200">
                    {lang === 'zh'
                      ? '📌 平面地图与签到台路线图将在开幕前发布。'
                      : '📌 Detailed campus floor plan will be released prior to conference day.'}
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
