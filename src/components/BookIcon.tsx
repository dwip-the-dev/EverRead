import type { BookId } from "@/lib/library";

interface BookIconProps {
  bookId: BookId;
  size?: number;
  className?: string;
}

/**
 * Renders a crisp inline SVG icon for each of the 14 sacred traditions.
 * Uses `currentColor` so it inherits the parent text color and adapts
 * automatically to light / dark / sepia themes.
 */
export function BookIcon({ bookId, size = 24, className = "" }: BookIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    "aria-hidden": true as const,
  };

  switch (bookId) {
    // ✝ Christianity — Latin Cross
    case "bible":
      return (
        <svg {...props}>
          <path
            d="M12 2v20M7 7h10"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    // ☾ Islam — Crescent & Star
    case "quran":
      return (
        <svg {...props}>
          <path
            d="M17.5 12a7.5 7.5 0 1 1-5.1-7.1A5.5 5.5 0 0 0 17.5 12Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 5l.3 1 1 .3-1 .3-.3 1-.3-1-1-.3 1-.3z"
            fill="currentColor"
          />
        </svg>
      );

    // ॐ Hinduism — Om / Aum (Bhagavad Gita)
    case "gita":
      return (
        <svg {...props}>
          <path
            d="M6 16c0-3 2.5-5 5-5s3.5 1 3.5 3-1.5 3-3 3c-1.2 0-2-.6-2-1.5S10.5 14 12 14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14.5 14c1.5 0 3.5-1 3.5-4 0-2.5-2-4-4.5-4C11 6 9 7.5 8 9"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="17" cy="5" r="1" fill="currentColor" />
          <path
            d="M15 4c1.5-1.5 3-1 3.5 0"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    // 🕉 Hinduism — Om with dot (Upanishads) — variant
    case "upanishads":
      return (
        <svg {...props}>
          <path
            d="M7 15c0-3 2-5 4.5-5s3 1 3 2.5S13 15 11.5 15 10 14.2 10 13.5 10.8 12 12 12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M14.5 12.5c1.5 0 3-1 3-3.5 0-2-1.5-3.5-4-3.5S9 7 8 8.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="16" cy="4.5" r="0.9" fill="currentColor" />
          <path
            d="M14.5 3.5c1.2-1.2 2.5-.8 3 .2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M6 18h12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>
      );

    // 🔥 Hinduism — Sacred Fire / Agni (Vedas)
    case "vedas":
      return (
        <svg {...props}>
          <path
            d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-5-5-11-5-11Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 22v-4M12 18a2.5 2.5 0 0 1-2.5-2.5C9.5 13.5 12 11 12 11s2.5 2.5 2.5 4.5A2.5 2.5 0 0 1 12 18Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );

    // ☸ Buddhism — Dharma Wheel (8-spoke)
    case "dhammapada":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 12 + 2.5 * Math.cos(rad);
            const y1 = 12 + 2.5 * Math.sin(rad);
            const x2 = 12 + 9 * Math.cos(rad);
            const y2 = 12 + 9 * Math.sin(rad);
            return (
              <line
                key={angle}
                x1={x1.toFixed(2)}
                y1={y1.toFixed(2)}
                x2={x2.toFixed(2)}
                y2={y2.toFixed(2)}
                stroke="currentColor"
                strokeWidth="1.3"
              />
            );
          })}
        </svg>
      );

    // ✡ Judaism — Star of David
    case "tanakh":
      return (
        <svg {...props}>
          <polygon
            points="12,3 20,18 4,18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
          />
          <polygon
            points="12,21 4,6 20,6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );

    // ☯ Taoism — Yin-Yang
    case "taoteching":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path
            d="M12 2.5A9.5 9.5 0 0 1 12 21.5 4.75 4.75 0 0 1 12 12 4.75 4.75 0 0 0 12 2.5Z"
            fill="currentColor"
          />
          <circle cx="12" cy="7.25" r="1.4" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
          <circle cx="12" cy="16.75" r="1.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );

    // 📜 Confucianism — Scroll
    case "analects":
      return (
        <svg {...props}>
          <path
            d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M7 4a2 2 0 0 0 0 4h12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          <line x1="10" y1="11" x2="16" y2="11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      );

    // ☬ Sikhism — Khanda
    case "granth":
      return (
        <svg {...props}>
          {/* Central double-edged sword */}
          <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* Chakra (circle) */}
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" fill="none" />
          {/* Two kirpans (curved swords) */}
          <path
            d="M6 4c0 0 1 5 1 8s-1 8-1 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M18 4c0 0-1 5-1 8s1 8 1 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    // 🪷 Jainism — Lotus Flower
    case "jain-agamas":
      return (
        <svg {...props}>
          <path
            d="M12 20c0-4 0-6 0-8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Petals */}
          <path
            d="M12 12C12 12 9 9 9 6.5S12 2 12 2s3 1.5 3 4.5S12 12 12 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 14C12 14 7.5 12 5.5 10S5 5 5 5s2.5 1 4.5 3S12 14 12 14Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 14C12 14 16.5 12 18.5 10S19 5 19 5s-2.5 1-4.5 3S12 14 12 14Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );

    // ⛩ Shintoism — Torii Gate
    case "kojiki":
      return (
        <svg {...props}>
          {/* Top beam */}
          <path
            d="M3 6h18"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Second beam */}
          <path
            d="M5 9h14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Left pillar */}
          <path
            d="M7 9v12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Right pillar */}
          <path
            d="M17 9v12"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    // 🪔 Zoroastrianism — Sacred Flame / Fire Altar
    case "avesta":
      return (
        <svg {...props}>
          {/* Altar base */}
          <path
            d="M6 20h12M8 20v-4h8v4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Fire bowl */}
          <path
            d="M8 16h8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Flame */}
          <path
            d="M12 4c0 0-3 3-3 6 0 2 1.3 3.5 3 3.5s3-1.5 3-3.5c0-3-3-6-3-6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 7c0 0-1.2 1.5-1.2 3 0 .8.5 1.5 1.2 1.5s1.2-.7 1.2-1.5c0-1.5-1.2-3-1.2-3Z"
            fill="currentColor"
            opacity="0.5"
          />
        </svg>
      );

    // ☀️ Baháʼí Faith — Nine-Pointed Star
    case "bahai":
      return (
        <svg {...props}>
          {(() => {
            const cx = 12;
            const cy = 12;
            const outerR = 9.5;
            const innerR = 4.5;
            const points: string[] = [];
            for (let i = 0; i < 9; i++) {
              const outerAngle = ((i * 40 - 90) * Math.PI) / 180;
              const innerAngle = (((i * 40 + 20) - 90) * Math.PI) / 180;
              points.push(`${(cx + outerR * Math.cos(outerAngle)).toFixed(2)},${(cy + outerR * Math.sin(outerAngle)).toFixed(2)}`);
              points.push(`${(cx + innerR * Math.cos(innerAngle)).toFixed(2)},${(cy + innerR * Math.sin(innerAngle)).toFixed(2)}`);
            }
            return (
              <polygon
                points={points.join(" ")}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                fill="none"
              />
            );
          })()}
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
}
