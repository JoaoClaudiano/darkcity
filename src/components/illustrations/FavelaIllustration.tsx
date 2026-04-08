const FavelaIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#0e0a0a" />
    <circle cx="25" cy="15" r="1" fill="#fff" opacity="0.6" />
    <circle cx="130" cy="22" r="1" fill="#fff" opacity="0.4" />
    <circle cx="65" cy="10" r="1" fill="#fff" opacity="0.7" />
    <circle cx="105" cy="18" r="0.8" fill="#fff" opacity="0.5" />

    {/* Moon */}
    <circle cx="140" cy="25" r="10" fill="#ffe0a0" stroke="#000" strokeWidth="1.5" />
    <circle cx="144" cy="22" r="7" fill="#0e0a0a" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#0e0a0a" />
    <rect x="0" y="160" width="160" height="4" fill="#1a1010" />

    {/* Back buildings (silhouette) */}
    <rect x="0" y="70" width="35" height="92" fill="#1a1010" stroke="#000" strokeWidth="2" />
    <rect x="125" y="80" width="35" height="82" fill="#1a1010" stroke="#000" strokeWidth="2" />

    {/* Main building left */}
    <rect x="10" y="88" width="60" height="74" fill="#2a1010" stroke="#000" strokeWidth="2.5" />
    {/* Corrugated roof left */}
    {[10, 18, 26, 34, 42, 50, 58].map((x) => (
      <path key={x} d={`M${x},88 Q${x + 4},82 ${x + 8},88`} stroke="#000" strokeWidth="2" fill="#3a1a0a" />
    ))}

    {/* Main building right */}
    <rect x="90" y="78" width="60" height="84" fill="#1e1414" stroke="#000" strokeWidth="2.5" />
    {/* Corrugated roof right */}
    {[90, 98, 106, 114, 122, 130, 138].map((x) => (
      <path key={x} d={`M${x},78 Q${x + 4},72 ${x + 8},78`} stroke="#000" strokeWidth="2" fill="#2e1a0e" />
    ))}

    {/* Left building windows */}
    <rect x="18" y="98" width="18" height="14" rx="1" fill="#cc4400" stroke="#000" strokeWidth="1.5" />
    <line x1="27" y1="98" x2="27" y2="112" stroke="#000" strokeWidth="1" />
    <rect x="42" y="98" width="18" height="14" rx="1" fill="#ffe066" stroke="#000" strokeWidth="1.5" />
    <line x1="51" y1="98" x2="51" y2="112" stroke="#000" strokeWidth="1" />

    <rect x="18" y="120" width="18" height="14" rx="1" fill="#1a1010" stroke="#000" strokeWidth="1.5" />
    <line x1="27" y1="120" x2="27" y2="134" stroke="#000" strokeWidth="1" />
    <rect x="42" y="120" width="18" height="14" rx="1" fill="#cc4400" stroke="#000" strokeWidth="1.5" />
    <line x1="51" y1="120" x2="51" y2="134" stroke="#000" strokeWidth="1" />

    {/* Right building windows */}
    <rect x="98" y="88" width="18" height="14" rx="1" fill="#ffe066" stroke="#000" strokeWidth="1.5" />
    <line x1="107" y1="88" x2="107" y2="102" stroke="#000" strokeWidth="1" />
    <rect x="122" y="88" width="18" height="14" rx="1" fill="#1a1010" stroke="#000" strokeWidth="1.5" />
    <line x1="131" y1="88" x2="131" y2="102" stroke="#000" strokeWidth="1" />

    <rect x="98" y="110" width="18" height="14" rx="1" fill="#cc4400" stroke="#000" strokeWidth="1.5" />
    <line x1="107" y1="110" x2="107" y2="124" stroke="#000" strokeWidth="1" />
    <rect x="122" y="110" width="18" height="14" rx="1" fill="#ffe066" stroke="#000" strokeWidth="1.5" />
    <line x1="131" y1="110" x2="131" y2="124" stroke="#000" strokeWidth="1" />

    {/* Graffiti skull on wall */}
    <ellipse cx="80" cy="120" rx="16" ry="18" fill="#1e1414" stroke="#cc0020" strokeWidth="2" />
    <circle cx="74" cy="116" r="4" fill="#cc0020" />
    <circle cx="86" cy="116" r="4" fill="#cc0020" />
    <rect x="72" y="128" width="4" height="6" rx="1" fill="#cc0020" />
    <rect x="78" y="128" width="4" height="6" rx="1" fill="#cc0020" />
    <rect x="84" y="128" width="4" height="6" rx="1" fill="#cc0020" />
    <path d="M64,130 Q80,140 96,130" stroke="#cc0020" strokeWidth="1.5" fill="none" />

    {/* Warning tape */}
    <line x1="0" y1="155" x2="160" y2="155" stroke="#ffcc00" strokeWidth="4" strokeDasharray="12,8" />

    {/* Left door */}
    <rect x="22" y="143" width="22" height="19" rx="1" fill="#0e0a0a" stroke="#000" strokeWidth="2" />
    {/* Right door */}
    <rect x="110" y="143" width="22" height="19" rx="1" fill="#0e0a0a" stroke="#000" strokeWidth="2" />
  </svg>
);

export default FavelaIllustration;
