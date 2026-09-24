import React from 'react';

export type LogoColorScheme = 'heritage' | 'dark' | 'monochrome' | 'gold' | 'cyan';
export type LogoVariant = 'icon' | 'badge' | 'full' | 'horizontal';

interface ClubLogoProps {
  size?: number | string;
  variant?: LogoVariant;
  colorScheme?: LogoColorScheme;
  animated?: boolean;
  className?: string;
  showMotto?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  size = 40,
  variant = 'icon',
  colorScheme = 'heritage',
  animated = false,
  className = '',
  showMotto = false,
}) => {
  // Color palette definitions matching Point Grey Secondary School Heritage & Camera Optics
  const colors = {
    heritage: {
      primary: '#0047AB',       // Point Grey Heritage Navy
      accent: '#1D4ED8',        // Rich Royal Blue
      highlight: '#F59E0B',     // Heritage Gold
      secondary: '#0284C7',     // Sky Blue optical coating
      bg: '#0F172A',
      text: '#0F172A',
      border: '#CBD5E1',
      fill: '#FFFFFF',
    },
    dark: {
      primary: '#38BDF8',       // Glowing Sky Blue
      accent: '#0047AB',        // Deep Navy
      highlight: '#FBBF24',     // Bright Gold
      secondary: '#60A5FA',     // Clear Blue
      bg: '#030712',
      text: '#F8FAFC',
      border: '#1E293B',
      fill: '#0F172A',
    },
    monochrome: {
      primary: '#0F172A',
      accent: '#334155',
      highlight: '#475569',
      secondary: '#64748B',
      bg: '#000000',
      text: '#0F172A',
      border: '#E2E8F0',
      fill: '#FFFFFF',
    },
    gold: {
      primary: '#D97706',
      accent: '#B45309',
      highlight: '#F59E0B',
      secondary: '#FBBF24',
      bg: '#18181B',
      text: '#78350F',
      border: '#FDE68A',
      fill: '#FFFBEB',
    },
    cyan: {
      primary: '#0369A1',
      accent: '#0284C7',
      highlight: '#38BDF8',
      secondary: '#7DD3FC',
      bg: '#082F49',
      text: '#0E7490',
      border: '#BAE6FD',
      fill: '#F0FDFA',
    },
  }[colorScheme];

  // Authentic Point Grey Secondary Camera Lens & Greyhound Emblem
  const renderVectorIcon = (customSize: number | string = size) => (
    <svg
      width={customSize}
      height={customSize}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${animated ? 'transition-transform duration-500 hover:scale-105' : ''}`}
    >
      <defs>
        {/* Heritage Blue Gradient */}
        <linearGradient id={`pgGrad-${colorScheme}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.accent} />
        </linearGradient>

        {/* Gold Hound Gradient */}
        <linearGradient id={`goldGrad-${colorScheme}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.highlight} />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        {/* Optical Glass Lens Flare */}
        <radialGradient id={`lensGlass-${colorScheme}`} cx="42%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="65%" stopColor={colors.primary} stopOpacity="0.08" />
          <stop offset="100%" stopColor={colors.accent} stopOpacity="0.2" />
        </radialGradient>
      </defs>

      {/* 1. Camera Viewfinder Rangefinder Corner Crop Marks */}
      <path d="M 12 24 L 12 12 L 24 12" stroke={colors.highlight} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <path d="M 108 24 L 108 12 L 96 12" stroke={colors.highlight} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <path d="M 12 96 L 12 108 L 24 108" stroke={colors.highlight} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
      <path d="M 108 96 L 108 108 L 96 108" stroke={colors.highlight} strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />

      {/* 2. Outer Knurled Metal Focus Ring with Precision Calibration Ticks */}
      <circle
        cx="60"
        cy="60"
        r="49"
        stroke={`url(#pgGrad-${colorScheme})`}
        strokeWidth="2.5"
      />
      <circle
        cx="60"
        cy="60"
        r="45"
        stroke={colors.border}
        strokeWidth="1"
        strokeDasharray="2 3"
        opacity="0.75"
      />

      {/* 3. Optical Coated Lens Glass Body */}
      <circle cx="60" cy="60" r="41" fill={`url(#lensGlass-${colorScheme})`} />
      <circle cx="60" cy="60" r="41" stroke={colors.primary} strokeWidth="1" strokeOpacity="0.3" />

      {/* 4. Classic 8-Blade Camera Aperture Iris (Standard Photographic Lens) */}
      <g opacity="0.85">
        {/* Regular symmetrical camera aperture blades forming an octagonal aperture */}
        <polygon points="60,25 78,32 72,42 56,36" fill={colors.primary} opacity="0.9" />
        <polygon points="85,38 95,55 84,60 74,48" fill={colors.accent} opacity="0.85" />
        <polygon points="95,65 88,82 78,76 84,60" fill={colors.primary} opacity="0.9" />
        <polygon points="78,88 60,95 56,84 72,78" fill={colors.accent} opacity="0.85" />
        <polygon points="42,88 25,78 36,72 48,78" fill={colors.primary} opacity="0.9" />
        <polygon points="25,55 35,38 46,48 36,60" fill={colors.accent} opacity="0.85" />
        <polygon points="35,32 52,25 56,36 42,42" fill={colors.primary} opacity="0.9" />
      </g>

      {/* Central Aperture Opening */}
      <circle cx="60" cy="60" r="22" stroke={colors.primary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

      {/* 5. Rangefinder Center Reticle Crosshairs */}
      <line x1="60" y1="34" x2="60" y2="40" stroke={colors.highlight} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="60" y1="80" x2="60" y2="86" stroke={colors.highlight} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="34" y1="60" x2="40" y2="60" stroke={colors.highlight} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="80" y1="60" x2="86" y2="60" stroke={colors.highlight} strokeWidth="1.5" strokeLinecap="round" />

      {/* 6. Dynamic Leaping Greyhound Silhouette (Point Grey Hounds Mascot) */}
      <g id="hound-silhouette" transform="translate(18, 36) scale(0.70)">
        {/* Leaping Hound Body - Classic collegiate athletic silhouette */}
        <path
          d="
            M 112 18 
            C 107 14, 96 11, 88 15 
            C 84 10, 80 8, 77 12 
            C 75 16, 73 22, 66 26 
            C 58 30, 48 31, 38 31
            C 26 31, 14 36, 4 48
            C 8 50, 16 48, 22 42
            C 30 36, 40 37, 48 37
            C 54 37, 62 44, 70 45
            C 76 46, 84 42, 92 34
            C 98 28, 106 24, 114 20
            Z
          "
          fill={`url(#goldGrad-${colorScheme})`}
        />
        
        {/* Front Leg */}
        <path
          d="
            M 78 28 
            C 86 36, 96 46, 110 52 
            C 114 54, 116 53, 114 50
            C 104 44, 92 34, 82 24
            Z
          "
          fill={`url(#goldGrad-${colorScheme})`}
        />

        {/* Hind Leg */}
        <path
          d="
            M 36 33 
            C 24 38, 12 46, -2 46 
            C -5 46, -4 49, -1 50
            C 14 52, 28 44, 42 36
            Z
          "
          fill={`url(#goldGrad-${colorScheme})`}
        />

        {/* Tail */}
        <path
          d="
            M 18 36 
            C 8 36, -4 32, -10 24 
            C -11 23, -11 25, -9 27
            C -3 34, 8 40, 20 38
            Z
          "
          fill={`url(#goldGrad-${colorScheme})`}
        />

        {/* Hound Focus Eye */}
        <circle cx="98" cy="18" r="2.2" fill="#FFFFFF" />
        <circle cx="98" cy="18" r="1.1" fill={colors.primary} />
      </g>

      {/* Optical Center Sensor Indicator */}
      <circle cx="60" cy="60" r="3" fill="#FFFFFF" stroke={colors.primary} strokeWidth="1.5" />
      <circle cx="60" cy="60" r="1.2" fill={colors.highlight} />
    </svg>
  );

  // Icon only
  if (variant === 'icon') {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`}>
        {renderVectorIcon()}
      </div>
    );
  }

  // Circular Crest Badge Variant
  if (variant === 'badge') {
    return (
      <div
        className={`relative inline-flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200 shadow-md ${className}`}
        style={{
          background: colorScheme === 'dark' ? '#0B132B' : '#FFFFFF',
          borderColor: colors.border,
        }}
      >
        {renderVectorIcon(typeof size === 'number' ? size : 64)}
        
        {showMotto && (
          <div className="mt-2 text-center font-mono">
            <span
              className="text-[9.5px] font-extrabold tracking-widest uppercase block"
              style={{ color: colors.primary }}
            >
              PGSS PHOTO CLUB
            </span>
            <span
              className="text-[8px] font-semibold tracking-wider block text-slate-500"
            >
              POINT GREY HOUNDS • INFINITE PROGRESS (无限进步)
            </span>
          </div>
        )}
      </div>
    );
  }

  // Full Horizontal Lockup
  if (variant === 'horizontal' || variant === 'full') {
    return (
      <div className={`inline-flex items-center space-x-3 text-left ${className}`}>
        {renderVectorIcon(typeof size === 'number' ? size : 44)}
        
        <div className="flex flex-col">
          <div className="flex items-center space-x-1.5">
            <span
              className="font-serif font-bold text-base sm:text-lg tracking-tight"
              style={{ color: colorScheme === 'dark' ? '#FFFFFF' : '#0F172A' }}
            >
              Point Grey
            </span>
            <span
              className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider text-white"
              style={{ background: colors.primary }}
            >
              Photo
            </span>
          </div>

          <div className="flex items-center space-x-1.5 text-[10px] font-mono">
            <span className="font-semibold" style={{ color: colors.highlight }}>
              PGSS HOUNDS
            </span>
            <span className="text-slate-300">•</span>
            <span
              className="font-medium tracking-tight"
              style={{ color: colorScheme === 'dark' ? '#94A3B8' : '#64748B' }}
            >
              EST. 1929 · VANCOUVER
            </span>
          </div>
        </div>
      </div>
    );
  }

  return renderVectorIcon();
};

export default ClubLogo;
