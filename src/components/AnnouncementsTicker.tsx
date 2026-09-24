import React from 'react';
import { useApp } from '../context/AppContext';
import { Megaphone, ArrowRight, Sparkles } from 'lucide-react';

export const AnnouncementsTicker: React.FC = () => {
  const { lang, announcements } = useApp();

  if (!announcements || announcements.length === 0) return null;

  // Duplicate items to make the horizontal scroll loop seamlessly
  const tickerItems = [...announcements, ...announcements];

  const getTitle = (item: typeof announcements[0]) => {
    if (lang === 'zh') return item.titleZh || item.title;
    return item.title;
  };

  const getContent = (item: typeof announcements[0]) => {
    if (lang === 'zh') return item.contentZh || item.content;
    return item.content;
  };

  const getBadgeLabel = () => {
    if (lang === 'zh') return '社团快讯';
    return 'BULLETIN';
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'equipment':
        return lang === 'zh' ? '器材借用' : 'Gear Locker';
      case 'contest':
        return lang === 'zh' ? '征稿大赛' : 'Contest';
      case 'meeting':
        return lang === 'zh' ? '社团例会' : 'Meeting';
      case 'general':
      default:
        return lang === 'zh' ? '校园特稿' : 'Notice';
    }
  };

  return (
    <a 
      id="announcements-ticker"
      href="#news"
      className="block bg-gradient-to-r from-blue-50/95 via-sky-50/80 to-blue-50/95 hover:bg-blue-100/90 border-y border-blue-200/80 py-2.5 px-3 sm:px-4 transition-colors cursor-pointer group relative overflow-hidden select-none"
      title={lang === 'zh' ? '点击查看特稿与完整公告 (悬停暂停滚动)' : 'Click to view reports & notices (hover to pause scroll)'}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs">
        
        {/* Pinned Left Badge */}
        <div className="flex items-center space-x-2 shrink-0 z-10 bg-blue-50/90 sm:pr-3">
          <span className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-[#0047AB] text-white text-[10.5px] font-bold shadow-xs group-hover:bg-blue-700 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <Megaphone className="w-3 h-3" />
            <span>{getBadgeLabel()}</span>
          </span>
          <span className="hidden md:inline-block text-[10px] text-blue-600/80 font-semibold uppercase tracking-wider">
            {lang === 'zh' ? '实时滚动播报' : 'LIVE TICKER'}
          </span>
        </div>

        {/* Scrolling Track with Edge Gradient Masks */}
        <div className="relative flex-1 overflow-hidden mx-2 sm:mx-4">
          {/* Left subtle fade */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-50 via-blue-50/80 to-transparent pointer-events-none z-10" />
          
          {/* Continuous scrolling marquee track */}
          <div className="animate-ticker flex items-center space-x-8 py-0.5 whitespace-nowrap">
            {tickerItems.map((item, idx) => {
              const title = getTitle(item);
              const content = getContent(item);
              return (
                <div 
                  key={`${item.id}-${idx}`}
                  className="inline-flex items-center space-x-2.5 text-slate-700 text-xs shrink-0"
                >
                  <span className="px-1.5 py-0.2 rounded bg-white/90 border border-blue-200 text-[#0047AB] text-[10px] font-semibold">
                    {getCategoryLabel(item.category)}
                  </span>
                  
                  <span className="text-[#0047AB] font-bold group-hover:underline">
                    {title}
                  </span>

                  <span className="text-slate-400 hidden sm:inline">—</span>

                  <span className="text-slate-600 text-[11px] max-w-md truncate hidden sm:inline">
                    {content}
                  </span>

                  <span className="text-[10px] text-slate-400 font-normal">
                    ({item.date})
                  </span>

                  <span className="text-blue-300 font-mono px-2">✦</span>
                </div>
              );
            })}
          </div>

          {/* Right subtle fade */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-50 via-blue-50/80 to-transparent pointer-events-none z-10" />
        </div>

        {/* Pinned Right Hint & Action */}
        <div className="hidden sm:flex items-center space-x-1 text-slate-500 hover:text-[#0047AB] shrink-0 text-[11px] font-medium z-10 bg-blue-50/90 pl-3">
          <span className="hidden lg:inline text-slate-400 text-[10px]">{lang === 'zh' ? '悬停暂停' : 'Pause on hover'}</span>
          <span className="text-[#0047AB] font-semibold flex items-center space-x-1">
            <span>{lang === 'zh' ? '查看全部' : 'View All'}</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

      </div>
    </a>
  );
};

