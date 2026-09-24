import React from 'react';

interface CtdImagesAvatarProps {
  size?: number | string;
  className?: string;
  roundedClassName?: string;
}

export const CtdImagesAvatar: React.FC<CtdImagesAvatarProps> = ({
  size = 64,
  className = '',
  roundedClassName = 'rounded-2xl',
}) => {
  return (
    <div 
      className={`relative overflow-hidden bg-black flex items-center justify-center shrink-0 border border-zinc-800 shadow-md ${roundedClassName} ${className}`}
      style={{ width: size, height: size }}
      title="CTD Images"
    >
      <svg 
        viewBox="0 0 500 500" 
        className="w-full h-full block select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="500" height="500" fill="#000000" />

        {/* White CTD Base Glyphs */}
        <g fill="#FFFFFF">
          {/* C: Left outer curve, top/bottom rails */}
          <path d="
            M 145 190
            L 205 190
            L 205 222
            L 145 222
            A 33 33 0 0 0 112 255
            A 33 33 0 0 0 145 288
            L 192 288
            L 192 255
            L 192 320
            L 145 320
            A 65 65 0 0 1 80 255
            A 65 65 0 0 1 145 190
            Z
          " />

          {/* T: Central stem and top rail */}
          <path d="
            M 205 190
            L 305 190
            L 305 222
            L 272 222
            L 272 320
            L 238 320
            L 238 222
            L 205 222
            Z
          " />

          {/* D: Left stem and right rounded loop */}
          <path d="
            M 305 190
            L 355 190
            A 65 65 0 0 1 420 255
            A 65 65 0 0 1 355 320
            L 305 320
            Z
            M 338 222
            L 355 222
            A 33 33 0 0 1 388 255
            A 33 33 0 0 1 355 288
            L 338 288
            Z
          " fillRule="evenodd" />
        </g>

        {/* Text 'images' Top Half (White on Black Background) */}
        <g fill="#FFFFFF">
          <clipPath id="ctd-text-above">
            <rect x="0" y="0" width="500" height="190" />
          </clipPath>
          <text 
            x="250" 
            y="212" 
            textAnchor="middle" 
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
            fontWeight="900" 
            fontSize="62" 
            letterSpacing="-1.5px"
            clipPath="url(#ctd-text-above)"
          >
            images
          </text>
        </g>

        {/* Text 'images' Lower Half (Black on White CTD Graphic) */}
        <g fill="#000000">
          <clipPath id="ctd-text-below">
            <rect x="0" y="190" width="500" height="310" />
          </clipPath>
          <text 
            x="250" 
            y="212" 
            textAnchor="middle" 
            fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" 
            fontWeight="900" 
            fontSize="62" 
            letterSpacing="-1.5px"
            clipPath="url(#ctd-text-below)"
          >
            images
          </text>
        </g>
      </svg>
    </div>
  );
};
