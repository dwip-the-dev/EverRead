import fs from "fs";

// 1. Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2a231d" />
      <stop offset="100%" stop-color="#191512" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f6d365" />
      <stop offset="100%" stop-color="#fda085" />
    </linearGradient>
    <linearGradient id="page" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf7" />
      <stop offset="100%" stop-color="#ede4d4" />
    </linearGradient>
  </defs>
  
  <!-- Rounded Background -->
  <rect width="512" height="512" rx="128" fill="url(#bg)" />
  
  <!-- Subtle Glow Behind Book -->
  <circle cx="256" cy="240" r="140" fill="url(#gold)" opacity="0.15" />
  
  <!-- Open Sacred Book Wings -->
  <!-- Left Page -->
  <path d="M 256 360 C 210 330 130 330 90 340 L 90 180 C 130 170 210 170 256 200 Z" fill="url(#page)" stroke="#d4af37" stroke-width="4" stroke-linejoin="round" />
  <!-- Left Page Lines -->
  <line x1="125" y1="215" x2="225" y2="225" stroke="#7a6e60" stroke-width="5" stroke-linecap="round" opacity="0.6" />
  <line x1="125" y1="245" x2="225" y2="255" stroke="#7a6e60" stroke-width="5" stroke-linecap="round" opacity="0.6" />
  <line x1="125" y1="275" x2="210" y2="283" stroke="#7a6e60" stroke-width="5" stroke-linecap="round" opacity="0.6" />
  
  <!-- Right Page -->
  <path d="M 256 360 C 302 330 382 330 422 340 L 422 180 C 382 170 302 170 256 200 Z" fill="url(#page)" stroke="#d4af37" stroke-width="4" stroke-linejoin="round" />
  <!-- Right Page Lines -->
  <line x1="287" y1="225" x2="387" y2="215" stroke="#7a6e60" stroke-width="5" stroke-linecap="round" opacity="0.6" />
  <line x1="287" y1="255" x2="387" y2="245" stroke="#7a6e60" stroke-width="5" stroke-linecap="round" opacity="0.6" />
  <line x1="287" y1="283" x2="372" y2="275" stroke="#7a6e60" stroke-width="5" stroke-linecap="round" opacity="0.6" />

  <!-- Book Spine Center -->
  <path d="M 256 200 L 256 365" stroke="#9e8346" stroke-width="6" stroke-linecap="round" />

  <!-- Golden Sun / Flame Rising Above Book -->
  <circle cx="256" cy="140" r="28" fill="url(#gold)" />
  <path d="M 256 92 L 256 102 M 256 178 L 256 188 M 208 140 L 218 140 M 294 140 L 304 140 M 222 106 L 229 113 M 283 167 L 290 174 M 222 174 L 229 167 M 283 113 L 290 106" stroke="url(#gold)" stroke-width="4" stroke-linecap="round" />
</svg>`;

fs.writeFileSync("./public/favicon.svg", faviconSvg);

// 2. OpenGraph Card SVG (1200x630)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="ogbg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1d1916" />
      <stop offset="50%" stop-color="#241e1a" />
      <stop offset="100%" stop-color="#14110f" />
    </linearGradient>
    <linearGradient id="ogGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f6d365" />
      <stop offset="100%" stop-color="#fda085" />
    </linearGradient>
    <linearGradient id="ogParchment" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf6ee" />
      <stop offset="100%" stop-color="#ebdcc7" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#ogbg)" />

  <!-- Ambient Glow -->
  <circle cx="950" cy="315" r="280" fill="url(#ogGold)" opacity="0.12" />
  <circle cx="200" cy="150" r="200" fill="#7a6e60" opacity="0.08" />

  <!-- Left Side Content -->
  <!-- Badge -->
  <g transform="translate(100, 110)">
    <rect width="210" height="38" rx="19" fill="#362d26" stroke="#52443a" stroke-width="1.5" />
    <circle cx="22" cy="19" r="6" fill="#e5ad42" />
    <text x="38" y="24" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#ebdcc7" letter-spacing="1.5">DAILY SCRIPTURE</text>
  </g>

  <!-- Main Title -->
  <text x="100" y="235" font-family="'Fraunces', Georgia, serif" font-size="64" font-weight="700" fill="#faf6ee" letter-spacing="-1">EverRead</text>
  <text x="100" y="295" font-family="'Fraunces', Georgia, serif" font-size="28" font-style="italic" fill="url(#ogGold)">A quiet daily reading companion.</text>

  <!-- Description -->
  <text x="100" y="365" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="20" fill="#b3a594" width="550">
    <tspan x="100" dy="0">Read the Holy Bible, Holy Quran, and Bhagavad Gita</tspan>
    <tspan x="100" dy="30">with structured daily reading plans, streak tracking,</tspan>
    <tspan x="100" dy="30">and zero account requirements. 100% offline &amp; private.</tspan>
  </text>

  <!-- Feature Pills -->
  <g transform="translate(100, 485)">
    <!-- Pill 1: Bible -->
    <rect x="0" y="0" width="130" height="42" rx="12" fill="#2d241d" stroke="#4a3c30" stroke-width="1.5" />
    <text x="18" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="600" fill="#faf6ee">✝ Bible</text>

    <!-- Pill 2: Quran -->
    <rect x="145" y="0" width="140" height="42" rx="12" fill="#2d241d" stroke="#4a3c30" stroke-width="1.5" />
    <text x="163" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="600" fill="#faf6ee">☾ Quran</text>

    <!-- Pill 3: Gita -->
    <rect x="300" y="0" width="180" height="42" rx="12" fill="#2d241d" stroke="#4a3c30" stroke-width="1.5" />
    <text x="318" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="600" fill="#faf6ee">ॐ Bhagavad Gita</text>

    <!-- Pill 4: Offline -->
    <rect x="495" y="0" width="170" height="42" rx="12" fill="#1f2c22" stroke="#314e38" stroke-width="1.5" />
    <text x="515" y="27" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-weight="600" fill="#78be8b">✓ 100% Offline</text>
  </g>

  <!-- Right Side Graphic: Book Card Illustration -->
  <g transform="translate(800, 140)">
    <!-- Card Frame -->
    <rect width="300" height="360" rx="24" fill="#26201b" stroke="#4d3f33" stroke-width="2" />
    
    <!-- Header Inside Card -->
    <text x="30" y="45" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="#e5ad42" letter-spacing="1.5">DAY 17 OF 90</text>
    <text x="30" y="80" font-family="'Fraunces', Georgia, serif" font-size="24" font-weight="600" fill="#faf6ee">Genesis 17</text>
    <text x="30" y="105" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" fill="#9e8f7e">Passage 17:1–14 · ~4 min read</text>

    <!-- Progress Ring -->
    <circle cx="150" cy="200" r="55" fill="none" stroke="#382e26" stroke-width="10" />
    <circle cx="150" cy="200" r="55" fill="none" stroke="#e5ad42" stroke-width="10" stroke-dasharray="345" stroke-dashoffset="85" stroke-linecap="round" transform="rotate(-90 150 200)" />
    <text x="150" y="206" font-family="'Fraunces', Georgia, serif" font-size="24" font-weight="700" fill="#faf6ee" text-anchor="middle">75%</text>

    <!-- Button -->
    <rect x="30" y="285" width="240" height="46" rx="14" fill="#e5ad42" />
    <text x="150" y="314" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="700" fill="#1d1916" text-anchor="middle">Start Reading →</text>
  </g>
</svg>`;

fs.writeFileSync("./public/og-image.svg", ogSvg);

// 3. Web Manifest
const manifest = {
  name: "EverRead — A Quiet Daily Scripture Reading Companion",
  short_name: "EverRead",
  description: "A quiet daily reading companion for the Holy Bible, Holy Quran, and Bhagavad Gita. Track your progress, maintain daily reading habits, and study sacred texts offline without accounts.",
  start_url: "/",
  display: "standalone",
  background_color: "#f8f6f0",
  theme_color: "#f8f6f0",
  icons: [
    {
      src: "/favicon.svg",
      sizes: "512x512",
      type: "image/svg+xml",
      purpose: "any maskable"
    },
    {
      src: "/icon-192.png",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/icon-512.png",
      sizes: "512x512",
      type: "image/png"
    }
  ]
};

fs.writeFileSync("./public/site.webmanifest", JSON.stringify(manifest, null, 2));

// 4. Sitemap.xml
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://everread.app/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://everread.app/book</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://everread.app/quotes</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://everread.app/profile</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://everread.app/read</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

fs.writeFileSync("./public/sitemap.xml", sitemap);

// 5. Robots.txt
const robotsTxt = `# EverRead Robots.txt
User-agent: *
Allow: /

Sitemap: https://everread.app/sitemap.xml
`;

fs.writeFileSync("./public/robots.txt", robotsTxt);

console.log("Assets generated successfully!");
