import React from 'react';

interface MillariLogoProps {
  variant?: 'full' | 'mark' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
}

export const MillariLogo: React.FC<MillariLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showText = true,
}) => {
  const sizeMap = {
    sm: { badge: 'w-8 h-8', text: 'text-sm tracking-[0.25em]' },
    md: { badge: 'w-11 h-11', text: 'text-base tracking-[0.3em]' },
    lg: { badge: 'w-16 h-16', text: 'text-xl tracking-[0.35em]' },
    xl: { badge: 'w-24 h-24', text: 'text-2xl tracking-[0.4em]' },
  };

  const currentSize = sizeMap[size];

  // Vector rendition matching the official MILLARI artwork:
  // Circular burgundy seal with metallic rose gold rim, serif 'M',
  // intertwining organic cherry vine with rose gold leaf and ruby red cherry.
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className={`relative ${currentSize.badge} shrink-0`}>
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full drop-shadow-[0_4px_12px_rgba(56,5,14,0.6)]"
          aria-label="Millari Logo Emblem"
        >
          <defs>
            {/* Wine background gradient */}
            <radialGradient id="millariWine" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#4e0c1b" />
              <stop offset="65%" stopColor="#32050e" />
              <stop offset="100%" stopColor="#1a0206" />
            </radialGradient>

            {/* Rose gold metallic gradient */}
            <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff1eb" />
              <stop offset="35%" stopColor="#e8b3a0" />
              <stop offset="70%" stopColor="#c88b78" />
              <stop offset="100%" stopColor="#f3ded5" />
            </linearGradient>

            {/* Cherry ruby specular gradient */}
            <radialGradient id="cherryRuby" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ff4b68" />
              <stop offset="25%" stopColor="#d81139" />
              <stop offset="70%" stopColor="#80061e" />
              <stop offset="100%" stopColor="#3d010c" />
            </radialGradient>

            {/* Subtle glow filter */}
            <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Outer circle with wine texture */}
          <circle
            cx="60"
            cy="60"
            r="56"
            fill="url(#millariWine)"
            stroke="url(#roseGoldGrad)"
            strokeWidth="2.5"
          />

          {/* Inner subtle rim */}
          <circle
            cx="60"
            cy="60"
            r="52.5"
            fill="none"
            stroke="url(#roseGoldGrad)"
            strokeWidth="0.75"
            strokeOpacity="0.35"
          />

          <g filter="url(#softGlow)">
            {/* Serif 'M' main anatomy */}
            <path
              d="M 33 80 L 33 40 L 40 40 L 40 44 L 37.5 44 L 37.5 76 L 40 76 L 40 80 Z"
              fill="url(#roseGoldGrad)"
            />
            {/* Left serif bracket & diagonal */}
            <path
              d="M 37.5 44 L 59 73 L 62.5 73 L 83 44 L 81 44 L 81 40 L 88 40 L 88 44 L 84 44 L 84 76 L 87 76 L 87 80 L 78 80 L 78 76 L 80.5 76 L 80.5 49 L 60.5 78 L 57.5 78 L 37.5 49 L 37.5 76 Z"
              fill="url(#roseGoldGrad)"
            />

            {/* Intertwining Cherry Stem vine looping from M leg across to right */}
            <path
              d="M 50 67 C 62 61 74 53 85 54 C 94 55 98 64 94 72 C 91 78 83 78 82 72 C 81 67 85 64 89 66"
              fill="none"
              stroke="url(#roseGoldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />

            {/* Rose gold delicate leaf */}
            <path
              d="M 85 56 C 89 51 92 53 93 57 C 90 58 87 60 85 56 Z"
              fill="url(#roseGoldGrad)"
            />
            <path
              d="M 86 56.5 L 91 55"
              stroke="#621023"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Hanging glossy ruby cherry */}
            <circle cx="86" cy="74" r="7.5" fill="url(#cherryRuby)" />
            {/* Cherry shine highlight */}
            <ellipse cx="84" cy="71.5" rx="2" ry="1.2" fill="#ffffff" opacity="0.8" transform="rotate(-30 84 71.5)" />
            <circle cx="87.5" cy="74.5" r="0.8" fill="#ffffff" opacity="0.6" />
          </g>

          {/* Underline separator */}
          <line
            x1="38"
            y1="89"
            x2="82"
            y2="89"
            stroke="url(#roseGoldGrad)"
            strokeWidth="0.8"
            strokeOpacity="0.7"
          />

          {/* Mini brand name in seal */}
          <text
            x="60"
            y="102"
            textAnchor="middle"
            fill="url(#roseGoldGrad)"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="10"
            letterSpacing="3.5"
            fontWeight="600"
          >
            MILLARI
          </text>
        </svg>
      </div>

      {showText && variant !== 'mark' && (
        <div className="flex flex-col">
          <span
            className={`font-editorial font-semibold text-gradient-rosegold ${currentSize.text} uppercase tracking-[0.28em] leading-tight`}
          >
            MILLARI
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#d69580]/70 font-medium">
            Videomaker & Social Media
          </span>
        </div>
      )}
    </div>
  );
};
