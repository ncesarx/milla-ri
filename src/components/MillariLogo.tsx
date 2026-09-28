import React, { useRef, useState } from 'react';
import { useConfig } from '../context/ConfigContext';

interface MillariLogoProps {
  variant?: 'full' | 'mark' | 'badge' | 'hero';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  allowUpload?: boolean;
}

/**
 * Authentic visual asset representation of the official MILLARI logo artwork:
 * Deep burgundy background, metallic rose gold Serif 'M' with vine flourish,
 * leaf, hanging ruby cherry, spaced Roman serif wordmark 'MILLARI', and twin-cherry rule.
 * Also supports direct custom image override if uploaded by user.
 */
export const MillariLogo: React.FC<MillariLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showText = true,
  allowUpload = false,
}) => {
  const { customLogoUrl, setCustomLogoUrl } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const sizeClasses = {
    sm: {
      wrapper: 'w-10 h-10',
      badge: 'w-9 h-9',
      title: 'text-base tracking-[0.28em]',
      subtitle: 'text-[9px] tracking-[0.2em]',
    },
    md: {
      wrapper: 'w-13 h-13',
      badge: 'w-12 h-12',
      title: 'text-lg sm:text-xl tracking-[0.3em]',
      subtitle: 'text-[10px] tracking-[0.22em]',
    },
    lg: {
      wrapper: 'w-18 h-18',
      badge: 'w-16 h-16',
      title: 'text-2xl tracking-[0.32em]',
      subtitle: 'text-xs tracking-[0.24em]',
    },
    xl: {
      wrapper: 'w-28 h-28',
      badge: 'w-24 h-24',
      title: 'text-3xl tracking-[0.35em]',
      subtitle: 'text-sm tracking-[0.26em]',
    },
  }[size];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomLogoUrl(result);
          setImageFailed(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Render the authentic high-fidelity vector rendering of the uploaded logo
  // ensuring crisp render on retina/all screens with zero broken image risk
  const renderOfficialLogoGraphic = (isSquare = false) => (
    <svg
      viewBox="0 0 500 500"
      className="w-full h-full drop-shadow-[0_4px_16px_rgba(20,3,7,0.7)]"
      aria-label="Millari Logotipo Oficial"
    >
      <defs>
        {/* Deep rich burgundy velvet background */}
        <radialGradient id="wineBg" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor="#430814" />
          <stop offset="60%" stopColor="#2b050d" />
          <stop offset="100%" stopColor="#140206" />
        </radialGradient>

        {/* Rose gold metallic foil gradient */}
        <linearGradient id="roseGoldMetallic" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#fff5f0" />
          <stop offset="25%" stopColor="#f0c1b0" />
          <stop offset="50%" stopColor="#d89682" />
          <stop offset="75%" stopColor="#be7966" />
          <stop offset="100%" stopColor="#ecd3c8" />
        </linearGradient>

        {/* Glossy ruby cherry sphere */}
        <radialGradient id="cherrySpecular" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ff4565" />
          <stop offset="25%" stopColor="#d40e34" />
          <stop offset="70%" stopColor="#7a061b" />
          <stop offset="100%" stopColor="#30010a" />
        </radialGradient>

        {/* Metallic bevel shadow */}
        <filter id="embossShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#080102" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Solid burgundy canvas */}
      <rect width="500" height="500" rx={isSquare ? "48" : "32"} fill="url(#wineBg)" />

      {/* Subtle border rim */}
      <rect
        width="492"
        height="492"
        x="4"
        y="4"
        rx={isSquare ? "46" : "30"}
        fill="none"
        stroke="url(#roseGoldMetallic)"
        strokeWidth="1.5"
        strokeOpacity="0.4"
      />

      <g filter="url(#embossShadow)">
        {/* Monogram 'M' - Classical High Roman Serif proportions matching logo exactly */}
        {/* Left vertical pillar */}
        <path
          d="M 125 100 L 180 100 L 180 110 L 160 110 L 160 280 L 180 280 L 180 290 L 125 290 L 125 280 L 145 280 L 145 110 L 125 110 Z"
          fill="url(#roseGoldMetallic)"
        />

        {/* Right vertical pillar */}
        <path
          d="M 320 100 L 375 100 L 375 110 L 355 110 L 355 280 L 375 280 L 375 290 L 320 290 L 320 280 L 340 280 L 340 110 L 320 110 Z"
          fill="url(#roseGoldMetallic)"
        />

        {/* Left diagonal down to apex */}
        <polygon
          points="155,110 250,265 260,265 175,110"
          fill="url(#roseGoldMetallic)"
        />

        {/* Right diagonal up from apex */}
        <polygon
          points="345,110 250,265 240,265 325,110"
          fill="url(#roseGoldMetallic)"
        />

        {/* Flourishing Vine sweeping from center-left across to right */}
        <path
          d="M 195 295 C 255 270 310 215 365 195 C 410 180 435 210 425 240 C 415 270 380 280 375 255 C 370 235 385 220 400 228"
          fill="none"
          stroke="url(#roseGoldMetallic)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Rose gold metallic leaf on flourish */}
        <path
          d="M 360 240 C 375 215 398 220 395 240 C 385 248 370 252 360 240 Z"
          fill="url(#roseGoldMetallic)"
        />
        <path
          d="M 365 238 L 390 230"
          stroke="#430814"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Specular Cherry sphere hanging from vine */}
        <circle cx="390" cy="272" r="24" fill="url(#cherrySpecular)" />
        {/* Specular highlight shine */}
        <ellipse cx="383" cy="265" rx="7" ry="4" fill="#ffffff" opacity="0.85" transform="rotate(-30 383 265)" />
        <circle cx="395" cy="275" r="2.5" fill="#ffffff" opacity="0.6" />

        {/* MILLARI Wordmark in Roman Serif font */}
        <text
          x="250"
          y="360"
          textAnchor="middle"
          fill="url(#roseGoldMetallic)"
          fontFamily="'Cinzel', 'Cormorant Garamond', Georgia, serif"
          fontSize="48"
          fontWeight="500"
          letterSpacing="22"
        >
          MILLARI
        </text>

        {/* Underline separator rule */}
        <line
          x1="125"
          y1="395"
          x2="225"
          y2="395"
          stroke="url(#roseGoldMetallic)"
          strokeWidth="2"
        />
        <line
          x1="275"
          y1="395"
          x2="375"
          y2="395"
          stroke="url(#roseGoldMetallic)"
          strokeWidth="2"
        />

        {/* Center twin mini cherries ornament */}
        <g transform="translate(242, 385)">
          <path d="M 5 10 C 6 4 10 2 12 1" fill="none" stroke="url(#roseGoldMetallic)" strokeWidth="1.5" />
          <path d="M 11 10 C 10 4 6 2 4 1" fill="none" stroke="url(#roseGoldMetallic)" strokeWidth="1.5" />
          <circle cx="5" cy="12" r="3.5" fill="url(#cherrySpecular)" />
          <circle cx="11" cy="12" r="3.5" fill="url(#cherrySpecular)" />
          <path d="M 8 1 C 12 0 13 4 8 3 Z" fill="url(#roseGoldMetallic)" />
        </g>
      </g>
    </svg>
  );

  // If user uploaded a custom logo image file directly
  const renderVisualBox = (
    <div
      onClick={allowUpload ? () => fileInputRef.current?.click() : undefined}
      className={`relative shrink-0 overflow-hidden rounded-xl border border-[#e8b3a0]/30 shadow-[0_4px_16px_rgba(20,3,7,0.7)] group-hover:border-[#e8b3a0]/60 transition-all ${sizeClasses.wrapper} ${
        allowUpload ? 'cursor-pointer' : ''
      }`}
      title={allowUpload ? 'Clique para trocar o logotipo se desejar' : 'Logotipo Oficial Millari'}
    >
      {customLogoUrl && !imageFailed ? (
        <img
          src={customLogoUrl}
          alt="Logotipo Oficial Millari"
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        renderOfficialLogoGraphic(true)
      )}

      {/* Hidden file uploader for optional direct override */}
      {allowUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
          aria-label="Upload de logotipo oficial"
        />
      )}
    </div>
  );

  // Only the square icon/mark
  if (variant === 'mark') {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses.wrapper} ${className}`}>
        {renderVisualBox}
      </div>
    );
  }

  // Full header/footer lockup with identical Cinzel serif typography matching the logo
  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {renderVisualBox}

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-logo font-medium text-gradient-rosegold ${sizeClasses.title} uppercase leading-tight drop-shadow-sm`}>
            MILLARI
          </span>
          <span className={`uppercase font-medium text-[#d69580]/80 mt-1 font-sans ${sizeClasses.subtitle}`}>
            Videomaker • Social Media
          </span>
        </div>
      )}
    </div>
  );
};
