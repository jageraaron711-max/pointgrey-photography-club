import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Mail, Clock, ShieldCheck, Sparkles, ExternalLink, Check, Copy } from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { CtdImagesAvatar } from './CtdImagesAvatar';

interface FooterProps {
  onOpenBrandKit?: () => void;
}

interface SocialLinkItem {
  id: string;
  nameZh: string;
  nameEn: string;
  handle: string;
  url: string;
  color: string;
  iconSvg: React.ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBrandKit }) => {
  const { lang } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copiedCtd, setCopiedCtd] = useState(false);

  // Point Grey Photography Club Official Channels
  const clubSocialLinks: SocialLinkItem[] = [
    {
      id: 'xiaohongshu',
      nameZh: 'RedNotes',
      nameEn: 'RedNotes',
      handle: 'RedNotes',
      url: 'https://xhslink.cn/m/4ia1W21QXOb',
      color: '#FF2442',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 rounded-[5px] overflow-hidden shrink-0 shadow-xs">
          {/* Authentic Xiaohongshu Red Squircle Background */}
          <rect width="24" height="24" rx="5.2" fill="#FF2442" />
          {/* Authentic White '小红书' Logotype */}
          <text
            x="12"
            y="15.8"
            fill="#FFFFFF"
            fontSize="7.8"
            fontWeight="900"
            textAnchor="middle"
            fontFamily="'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', system-ui, sans-serif"
            letterSpacing="-0.6px"
          >
            小红书
          </text>
        </svg>
      ),
    },
    {
      id: 'instagram',
      nameZh: 'Instagram',
      nameEn: 'Instagram',
      handle: '@pg_photogrpahy_club',
      url: 'https://www.instagram.com/pg_photogrpahy_club?stkn=djA5ejYzOXV3NGJ1&utm_source=qr',
      color: '#E1306C',
      iconSvg: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
  ];

  const handleCopyHandle = (item: SocialLinkItem) => {
    navigator.clipboard?.writeText(item.handle);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 font-sans text-xs">
      
      {/* ======================================================== */}
      {/* CONTACT US / SOCIAL MATRIX SECTION */}
      {/* ======================================================== */}
      <div id="contact-us" className="py-16 px-4 sm:px-6 lg:px-8 border-b border-zinc-800/80 bg-gradient-to-b from-black via-zinc-950 to-zinc-950 relative overflow-hidden">
        {/* Alias anchor for social-channels */}
        <span id="social-channels" className="absolute -top-20 left-0" />

        {/* Subtle radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          
          {/* Header & Infinite Progress Slogan */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-blue-400 text-xs font-mono shadow-md backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-semibold tracking-wide">
                {lang === 'zh' ? '影视飓风青年探索精神 · 无限进步 (INFINITE PROGRESS)' : 'PGPC CREATOR NETWORK · INFINITE PROGRESS'}
              </span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {lang === 'zh' ? 'CONTACT US (联络我们)' : 'CONTACT US'}
            </h3>
            
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              {lang === 'zh'
                ? '与你分享前沿、有趣的摄影与影视创作！践行“无限进步”精神，每一帧都比上一秒更进一步。欢迎交流、合作与约拍。'
                : 'Sharing cutting-edge, inspiring photography and filmmaking. Upholding the "Infinite Progress" spirit—every frame one step further.'}
            </p>
          </div>

          {/* ======================================================== */}
          {/* TOP ROW: CLUB OFFICIAL CONTACT CHANNELS (属于我们的联系方式) */}
          {/* ======================================================== */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-blue-400 font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>{lang === 'zh' ? 'Point Grey 摄影社官方联络渠道' : 'POINT GREY PHOTO CLUB OFFICIAL CHANNELS'}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              
              {/* Card 1: RedNotes */}
              <div className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-red-500/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 flex items-center justify-center text-red-500 shadow-sm">
                      {clubSocialLinks[0].iconSvg}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 text-[10px] font-mono font-semibold border border-red-500/20">
                      RedNotes
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                      RedNotes
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {lang === 'zh'
                        ? 'RedNotes 专栏：校园风光、人像打光与构图实战、摄影技巧与器材体验'
                        : 'RedNotes column: campus scenery, portrait lighting, gear insights & visual guides'}
                    </p>
                  </div>

                  {/* Handle Copy Chip */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                    <span className="truncate">{clubSocialLinks[0].handle}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyHandle(clubSocialLinks[0])}
                      className="ml-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title={lang === 'zh' ? '复制账号名称' : 'Copy handle'}
                    >
                      {copiedId === clubSocialLinks[0].id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-zinc-800/80">
                  <a
                    href={clubSocialLinks[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shadow-md shadow-red-600/30 group-hover:shadow-red-600/50 cursor-pointer"
                  >
                    <span>{lang === 'zh' ? '前往 RedNotes 主页' : 'Open RedNotes'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 2: Club Official Instagram */}
              <div className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-pink-500/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-sm">
                      {clubSocialLinks[1].iconSvg}
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-400 text-[10px] font-mono font-semibold border border-pink-500/20">
                      Club Instagram
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                      Instagram
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {lang === 'zh'
                        ? '分享校园高光快门、赛事精彩瞬间、幕后创作与视觉日常。'
                        : 'Capturing campus highlights, game-day action, behind-the-scenes & visual stories.'}
                    </p>
                  </div>

                  {/* Handle Copy Chip */}
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                    <span className="truncate font-semibold">{clubSocialLinks[1].handle}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyHandle(clubSocialLinks[1])}
                      className="ml-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                      title={lang === 'zh' ? '复制账号名称' : 'Copy handle'}
                    >
                      {copiedId === clubSocialLinks[1].id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-zinc-800/80">
                  <a
                    href={clubSocialLinks[1].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold text-xs transition-all shadow-md shadow-pink-600/30 group-hover:shadow-pink-600/50 cursor-pointer"
                  >
                    <span>{lang === 'zh' ? '前往 Instagram 主页' : 'Open Instagram'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Card 3: Official Email & Direct Contact */}
              <div className="group relative rounded-2xl bg-zinc-900/90 border border-zinc-800 hover:border-emerald-500/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <span className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{lang === 'zh' ? '24h极速回复' : 'Direct Email'}</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {lang === 'zh' ? '官方邮箱 / 约拍合作' : 'Official Direct Inquiries'}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                      {lang === 'zh'
                        ? '校园活动纪实约拍、社团外联商业合作、器材交流借用'
                        : 'Campus photo shoots, club collaborations, media coverage & equipment inquiries'}
                    </p>
                  </div>

                  {/* Email Copy Chips */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                      <span className="truncate">jageraaron711@gmail.com</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText('jageraaron711@gmail.com');
                          setCopiedEmail('jageraaron711@gmail.com');
                          setTimeout(() => setCopiedEmail(null), 2000);
                        }}
                        className="ml-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                        title={lang === 'zh' ? '复制邮箱' : 'Copy email'}
                      >
                        {copiedEmail === 'jageraaron711@gmail.com' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-950/80 border border-zinc-800 text-[11px] font-mono text-zinc-300">
                      <span className="truncate">justin930408@gmail.com</span>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard?.writeText('justin930408@gmail.com');
                          setCopiedEmail('justin930408@gmail.com');
                          setTimeout(() => setCopiedEmail(null), 2000);
                        }}
                        className="ml-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                        title={lang === 'zh' ? '复制邮箱' : 'Copy email'}
                      >
                        {copiedEmail === 'justin930408@gmail.com' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-zinc-800/80 flex flex-col gap-2">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=jageraaron711@gmail.com,justin930408@gmail.com&su=Point%20Grey%20Photo%20Club%20Inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-md shadow-emerald-600/30 group-hover:shadow-emerald-600/50 cursor-pointer"
                  >
                    <span>{lang === 'zh' ? '直接在 Gmail 中撰写' : 'Open in Gmail Direct'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================================== */}
          {/* DEDICATED CTD IMAGES INSTAGRAM SECTION */}
          {/* ======================================================== */}
          <div className="pt-3">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border border-zinc-800 hover:border-pink-500/40 p-6 sm:p-8 transition-all duration-300 shadow-2xl group">
              
              {/* Subtle ambient decorative lighting */}
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-pink-500/20 transition-all" />
              <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
                
                {/* Left Side: New Avatar & Information */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
                  
                  {/* The User-Provided New Avatar */}
                  <div className="relative shrink-0">
                    <CtdImagesAvatar 
                      size={84} 
                      roundedClassName="rounded-2xl" 
                      className="shadow-xl ring-2 ring-zinc-700/80 group-hover:ring-pink-500/70 transition-all duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Descriptions & Identity */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-400 text-[10px] font-mono font-bold tracking-wider uppercase border border-pink-500/30">
                        Instagram
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-pink-300 transition-colors tracking-tight">
                      {lang === 'zh' ? '请关注 CTD Images on Instagram' : 'Please follow CTD Images on Instagram'}
                    </h4>

                    <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
                      {lang === 'zh'
                        ? '欢迎同学们关注 CTD Images Instagram，交流赛事抓拍与先锋镜头视觉创作！'
                        : 'Follow CTD Images on Instagram for high-speed sports captures, visual stories & creative photography!'}
                    </p>

                    {/* Copy Handle Chip */}
                    <div className="inline-flex items-center space-x-2 pt-1">
                      <div className="flex items-center space-x-2 px-3 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 shadow-inner">
                        <span className="text-pink-400 font-bold">@ctd_images_sh</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard?.writeText('@ctd_images_sh');
                            setCopiedCtd(true);
                            setTimeout(() => setCopiedCtd(false), 2000);
                          }}
                          className="ml-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title={lang === 'zh' ? '复制账号名称' : 'Copy handle'}
                        >
                          {copiedCtd ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                      {copiedCtd && (
                        <span className="text-[11px] font-mono text-emerald-400">
                          {lang === 'zh' ? '✓ 账号已复制' : '✓ Handle copied'}
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Right Side: High-Impact Follow Button */}
                <div className="shrink-0 pt-2 lg:pt-0">
                  <a
                    href="https://www.instagram.com/ctd_images_sh?stkn=MXBlaWg2MDUwNTNlZQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs sm:text-sm tracking-wide shadow-xl shadow-pink-600/30 hover:shadow-pink-600/50 hover:scale-102 transition-all cursor-pointer"
                  >
                    <span>{lang === 'zh' ? '请关注 CTD Images on Instagram' : 'Follow CTD Images on Instagram'}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ======================================================== */}
      {/* STANDARD SCHOOL & CLUB INFORMATION GRID */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-zinc-800">
          
          {/* Col 1: Club Identity */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shadow-md shadow-blue-900/40 shrink-0">
                <ClubLogo size={32} colorScheme="dark" />
              </div>
              <div>
                <span className="font-serif font-bold text-base text-white tracking-tight">
                  POINT GREY SECONDARY
                </span>
                <div className="text-[10px] font-mono text-blue-400 font-medium">
                  {lang === 'zh' ? 'Point Grey 摄影社 × 影视飓风 · 无限进步' : 'PGSS HOUNDS × INFINITE PROGRESS'}
                </div>
              </div>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs font-light">
              {lang === 'zh'
                ? '以 Point Grey 灵犬的敏锐与速度，践行影视飓风“无限进步”的青年探索精神。致力于积极向上的公益拍摄、体育赛事、人像肖像、温哥华风光与校园活动纪实，用镜头记录生活温度，每一帧都追求极致。'
                : 'Combining the velocity of the Point Grey Hound with the "Infinite Progress" filmmaking spirit. Dedicated to community creative, dynamic sports, portraiture, BC landscapes, and vibrant campus events.'}
            </p>

            <div className="flex items-center space-x-3 text-zinc-400 text-xs font-mono pt-1">
              <span className="flex items-center space-x-1 text-blue-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>VSB DISTRICT 39</span>
              </span>
              <span>•</span>
              <span className="text-zinc-400">HOME OF THE HOUNDS</span>
            </div>
          </div>

          {/* Col 2: Meeting Location & Times */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-mono text-xs text-white font-bold tracking-wider">
              {lang === 'zh' ? '常规活动时间与地点' : 'CLUB SESSIONS'}
            </h4>
            <ul className="space-y-2 text-zinc-400 font-light">
              <li className="flex items-start space-x-2">
                <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'zh' 
                    ? '每周三午餐时间 11:35-12:15pm' 
                    : 'Wednesdays Lunchtime 11:35-12:15pm'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  {lang === 'zh' 
                    ? "Ms Yelland's room" 
                    : "Ms Yelland's room"}
                </span>
              </li>
              <li className="text-[11px] text-zinc-400 pt-1">
                5350 East Boulevard, Vancouver, BC V6M 3V2 Canada
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="font-mono text-xs text-white font-bold tracking-wider">
              {lang === 'zh' ? '快速导航' : 'NAVIGATION'}
            </h4>
            <ul className="space-y-1.5 font-mono text-xs">
              <li>
                <a href="#gallery" className="text-zinc-400 hover:text-white transition-colors">
                  {lang === 'zh' ? '→ 优秀作品展厅' : '→ Showcase Gallery'}
                </a>
              </li>
              <li>
                <a href="#materials" className="text-zinc-400 hover:text-white transition-colors flex items-center justify-between">
                  <span>→ Material Vault</span>
                  <span className="text-[9px] px-1 rounded bg-amber-500/20 text-amber-300 font-mono">
                    Coming Soon
                  </span>
                </a>
              </li>
              <li>
                <a href="#news" className="text-zinc-400 hover:text-white transition-colors">
                  {lang === 'zh' ? '→ 校园新闻与特稿' : '→ News & Club Stories'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-mono text-xs text-white font-bold tracking-wider">
              {lang === 'zh' ? '联系与社团联络' : 'CONNECT & SOCIAL'}
            </h4>
            <div className="space-y-2 text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=jageraaron711@gmail.com&su=Point%20Grey%20Photo%20Club%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-zinc-200 hover:text-blue-400 transition-colors underline decoration-zinc-700 hover:decoration-blue-400 underline-offset-4"
                  title={lang === 'zh' ? '直接在 Gmail 中打开撰写' : 'Open in Gmail Direct'}
                >
                  jageraaron711@gmail.com
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('jageraaron711@gmail.com');
                    setCopiedEmail('jageraaron711@gmail.com');
                    setTimeout(() => setCopiedEmail(null), 2000);
                  }}
                  className="p-1 text-zinc-400 hover:text-white rounded transition-colors cursor-pointer"
                  title={lang === 'zh' ? '复制邮箱' : 'Copy email'}
                >
                  {copiedEmail === 'jageraaron711@gmail.com' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=justin930408@gmail.com&su=Point%20Grey%20Photo%20Club%20Inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-zinc-200 hover:text-blue-400 transition-colors underline decoration-zinc-700 hover:decoration-blue-400 underline-offset-4"
                  title={lang === 'zh' ? '直接在 Gmail 中打开撰写' : 'Open in Gmail Direct'}
                >
                  justin930408@gmail.com
                </a>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('justin930408@gmail.com');
                    setCopiedEmail('justin930408@gmail.com');
                    setTimeout(() => setCopiedEmail(null), 2000);
                  }}
                  className="p-1 text-zinc-400 hover:text-white rounded transition-colors cursor-pointer"
                  title={lang === 'zh' ? '复制邮箱' : 'Copy email'}
                >
                  {copiedEmail === 'justin930408@gmail.com' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>

              {copiedEmail && (
                <div className="text-[10.5px] font-mono text-emerald-400">
                  {lang === 'zh' ? `✓ 邮箱 ${copiedEmail} 已复制至剪贴板` : `✓ Email ${copiedEmail} copied to clipboard`}
                </div>
              )}
            </div>
            <p className="text-[11px] text-zinc-400 pt-2 font-light">
              {lang === 'zh'
                ? '欢迎所有年级同学加入，无须自带专业相机，社团提供公用器材与导师辅导。'
                : 'Open to all Point Grey students regardless of experience or camera gear.'}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-400 font-mono gap-3">
          <div className="flex items-center space-x-3">
            <span>© {new Date().getFullYear()} Point Grey Secondary School Photography Club.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {onOpenBrandKit && (
              <button
                id="footer-logo-btn"
                onClick={onOpenBrandKit}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-700 font-mono text-xs transition-colors cursor-pointer shadow-xs"
                title={lang === 'zh' ? '查看社团 Logo 与设计理念' : 'View Club Logo'}
              >
                <ClubLogo size={14} colorScheme="dark" />
                <span className="font-semibold">{lang === 'zh' ? 'Logo' : 'Logo'}</span>
              </button>
            )}
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span className="text-zinc-400">Vancouver, BC, Canada</span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span className="text-blue-400 font-semibold">PGSS Infinite Progress Edition</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
