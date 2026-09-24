import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Shield, Menu, X, Sparkles, LogOut
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenCurator: () => void;
  onOpenStudentPortal: (tab?: 'profile' | 'submit' | 'my-submissions' | 'admin-review') => void;
  onOpenBrandKit?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCurator, onOpenStudentPortal, onOpenBrandKit }) => {
  const { lang, setLang, currentUser, exitAdminMode } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTimeYVR, setCurrentTimeYVR] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update live Vancouver (YVR) time every second
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      try {
        const yvr = now.toLocaleTimeString('en-GB', {
          timeZone: 'America/Vancouver',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        });
        setCurrentTimeYVR(yvr);
      } catch {
        setCurrentTimeYVR('10:28');
      }
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Point Grey Photography Club Navigation Links
  const navItems = [
    {
      id: 'stories',
      labelEn: 'STORIES',
      labelZh: '纪实特稿',
      href: '#stories',
    },
    {
      id: 'gallery',
      labelEn: 'GALLERY',
      labelZh: '作品影展',
      href: '#gallery',
    },
    {
      id: 'materials',
      labelEn: 'VAULT',
      labelZh: 'VAULT',
      href: '#materials',
      badgeZh: 'Vault',
      badgeEn: 'Vault',
    },
    {
      id: 'contact',
      labelEn: 'CONTACT',
      labelZh: '联络我们',
      href: '#contact-us',
    },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-blue-100 text-slate-800 shadow-sm py-2.5'
          : 'bg-white text-slate-900 border-b border-blue-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Point Grey Photography Club Brand Logo */}
        <div className="flex items-center space-x-3">
          <button
            id="navbar-brand-logo"
            onClick={onOpenBrandKit}
            className="flex items-center space-x-2.5 group text-left cursor-pointer"
            title="Point Grey Photography Club"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center group-hover:border-[#0047AB] transition-all shadow-xs">
              <ClubLogo size={22} colorScheme="heritage" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline space-x-1.5">
                <span className="font-serif font-bold text-sm sm:text-base text-[#0047AB] tracking-tight group-hover:text-blue-800 transition-colors">
                  Point Grey
                </span>
                <span className="text-[10px] font-mono text-blue-600 font-bold tracking-wider">
                  PHOTO
                </span>
              </div>
              <span className="text-[9px] font-mono text-slate-500 tracking-tight">
                {lang === 'zh' ? 'Point Grey 摄影俱乐部 · 温哥华' : 'POINT GREY PHOTOGRAPHY CLUB · YVR'}
              </span>
            </div>
          </button>
        </div>

        {/* Clean, Concise Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono text-xs font-semibold tracking-wider">
          {navItems.map((item) => {
            const label = lang === 'zh' ? item.labelZh : item.labelEn;
            const badge = lang === 'zh' ? item.badgeZh : item.badgeEn;
            return (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                className="inline-flex items-center space-x-1.5 text-slate-600 hover:text-[#0047AB] transition-colors uppercase py-1"
              >
                <span>{label}</span>
                {badge && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-blue-50 text-[#0047AB] border border-blue-200">
                    {badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Right-Side Controls & Live Clocks */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Live Vancouver (YVR) Local Clock Only */}
          <div 
            className="hidden sm:flex items-center space-x-1.5 text-[11px] font-mono text-[#0047AB] px-2.5 py-1 rounded bg-blue-50 border border-blue-200"
            title="Local Vancouver (YVR) Time"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse inline-block" />
            <span className="text-blue-500 text-[10px] font-bold">YVR</span>
            <span className="font-bold tracking-wider">{currentTimeYVR || '10:28'}</span>
          </div>

          {/* Language Switcher Pill */}
          <div 
            id="language-switcher-group"
            className="flex items-center bg-slate-100 rounded-lg p-0.5 text-[10px] font-mono border border-slate-200"
          >
            {(['en', 'zh'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                  lang === l
                    ? 'bg-white text-[#0047AB] font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Member / Creator Portal CTA Button or Admin badge */}
          {currentUser.role === 'curator_admin' ? (
            <div className="flex items-center space-x-1.5">
              <button
                onClick={onOpenCurator}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer border border-amber-400"
                title={lang === 'zh' ? '管理后台 · 审批社员作品申请' : 'Admin Curator Studio'}
              >
                <span>👑</span>
                <span>{lang === 'zh' ? '管理后台 (Admin)' : 'ADMIN DESK'}</span>
              </button>
              <button
                onClick={() => {
                  exitAdminMode();
                }}
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-500 text-xs font-mono transition-colors cursor-pointer border border-slate-200 flex items-center space-x-1"
                title={lang === 'zh' ? '退出管理员模式（切回学生视图）' : 'Exit Admin Mode (Switch to Student View)'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden xl:inline text-[11px]">{lang === 'zh' ? '退出管理' : 'Exit'}</span>
              </button>
            </div>
          ) : (
            <>
              <button
                id="open-delegate-portal-btn"
                onClick={() => onOpenStudentPortal('profile')}
                className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#0047AB] hover:bg-[#003d94] text-white text-xs font-mono font-bold transition-colors cursor-pointer shadow-xs"
              >
                <User className="w-3.5 h-3.5 text-blue-100" />
                <span>
                  {lang === 'zh' ? `社员中心 (${currentUser.name.split(' ')[0]})` : 'STUDENT DESK'}
                </span>
              </button>

              {/* Curator Control Icon */}
              <button
                onClick={onOpenCurator}
                title={lang === 'zh' ? '管理后台入口 (仅限管理者，密码: 825098)' : 'Admin Curator Portal (Passcode: 825098)'}
                className="p-1.5 rounded text-slate-500 hover:text-[#0047AB] hover:bg-blue-50 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-mono"
              >
                <Shield className="w-4 h-4 text-slate-500" />
                <span className="hidden lg:inline text-slate-500 text-[11px]">{lang === 'zh' ? '管理入口' : 'Admin'}</span>
              </button>
            </>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-blue-100 px-4 py-3 space-y-2 shadow-xl text-slate-900"
          >
            {navItems.map((item) => {
              const label = lang === 'zh' ? item.labelZh : item.labelEn;
              const badge = lang === 'zh' ? item.badgeZh : item.badgeEn;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-[#0047AB] text-xs font-mono font-medium"
                >
                  <span>{label}</span>
                  {badge && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-blue-100 text-[#0047AB] border border-blue-200">
                      {badge}
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentPortal('profile');
                }}
                className="w-full py-2.5 rounded bg-[#0047AB] text-white text-xs font-mono font-bold hover:bg-[#003d94] transition-colors"
              >
                {lang === 'zh' ? '社员中心 / 个人主页' : 'STUDENT DESK'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
