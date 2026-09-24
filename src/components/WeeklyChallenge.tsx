import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, Clock, Gift, UploadCloud } from 'lucide-react';

interface WeeklyChallengeProps {
  onOpenSubmit: () => void;
}

export const WeeklyChallenge: React.FC<WeeklyChallengeProps> = ({ onOpenSubmit }) => {
  const { lang, challenge } = useApp();

  const getThemeTitle = () => {
    if (lang === 'zh') return challenge.themeTitleZh || challenge.themeTitle;
    if (lang === 'fr') return challenge.themeTitleFr || challenge.themeTitle;
    return challenge.themeTitle;
  };

  const getDescription = () => {
    if (lang === 'zh') return challenge.descriptionZh || challenge.description;
    if (lang === 'fr') return challenge.descriptionFr || challenge.description;
    return challenge.description;
  };

  const getPrize = () => {
    if (lang === 'zh') return challenge.prizeZh || challenge.prize;
    if (lang === 'fr') return challenge.prizeFr || challenge.prize;
    return challenge.prize;
  };

  return (
    <section id="challenge" className="py-16 sm:py-20 relative bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Challenge Box Frame */}
        <div className="relative rounded-3xl bg-gradient-to-br from-blue-50/70 via-white to-slate-50 border border-blue-200 p-6 sm:p-10 shadow-sm overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Info Column */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0047AB] text-xs font-mono font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>
                  {lang === 'fr' 
                    ? 'ANNÉE 2026 // DÉFI THÉMATIQUE BIMENSUEL' 
                    : lang === 'zh' 
                    ? '2026学年 // 双周主题挑战赛' 
                    : 'TERM 2026 // BI-WEEKLY THEME CHALLENGE'}
                </span>
              </div>

              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                {getThemeTitle()}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
                {getDescription()}
              </p>

              {/* Prize & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-xs flex items-start space-x-3">
                  <Gift className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="text-slate-400 font-mono text-[10px]">
                      {lang === 'zh' ? '优胜者奖品' : lang === 'fr' ? 'PRIX DU LAURÉAT' : 'WINNER PRIZE'}
                    </div>
                    <strong className="text-slate-900">{getPrize()}</strong>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-xs flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#0047AB] shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className="text-slate-400 font-mono text-[10px]">
                      {lang === 'zh' ? '截稿时间' : lang === 'fr' ? 'DATE LIMITE' : 'SUBMISSION DEADLINE'}
                    </div>
                    <strong className="text-[#0047AB] font-mono font-bold">{challenge.deadline}</strong>
                  </div>
                </div>
              </div>

              {/* Keywords & Submit Button */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5">
                  {challenge.keywords.map((kw) => (
                    <span key={kw} className="px-2.5 py-1 rounded bg-blue-50 text-[#0047AB] font-mono text-xs border border-blue-200 font-medium">
                      #{kw}
                    </span>
                  ))}
                </div>

                <button
                  id="challenge-submit-work-btn"
                  onClick={onOpenSubmit}
                  className="px-6 py-3 rounded-xl bg-[#0047AB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold font-mono shadow-md shadow-blue-900/15 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>
                    {lang === 'zh' 
                      ? '提交挑战赛参赛作品' 
                      : lang === 'fr' 
                      ? 'Soumettre au défi' 
                      : 'Submit Entry to Challenge'}
                  </span>
                </button>
              </div>

            </div>

            {/* Right Samples Column */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {challenge.sampleImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group ${
                    idx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={img}
                    alt="Inspiration reference"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 text-white font-mono text-[10px] backdrop-blur-xs">
                    REF #{idx + 1}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
