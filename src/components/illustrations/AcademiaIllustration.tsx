const AcademiaIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#0e0e1c" />
    <circle cx="18" cy="14" r="1" fill="#fff" opacity="0.7" />
    <circle cx="138" cy="22" r="1" fill="#fff" opacity="0.5" />
    <circle cx="78" cy="9" r="1.2" fill="#fff" opacity="0.8" />
    <circle cx="115" cy="18" r="0.8" fill="#fff" opacity="0.6" />
    <circle cx="45" cy="25" r="1" fill="#fff" opacity="0.5" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#111120" />
    <rect x="0" y="160" width="160" height="4" fill="#1c1c2e" />

    {/* Roof details */}
    <rect x="12" y="42" width="136" height="7" rx="1" fill="#3e2208" stroke="#000" strokeWidth="2" />
    <rect x="18" y="49" width="124" height="6" fill="#4a2a0a" stroke="#000" strokeWidth="2" />

    {/* Main building body */}
    <rect x="18" y="55" width="124" height="107" fill="#281a0c" stroke="#000" strokeWidth="2.5" />

    {/* Horizontal band */}
    <rect x="18" y="95" width="124" height="5" fill="#3d250f" stroke="#000" strokeWidth="1" />

    {/* GYM neon sign */}
    <rect x="34" y="62" width="92" height="28" rx="4" fill="#ff6800" stroke="#000" strokeWidth="2.5" />
    <text
      x="80"
      y="83"
      textAnchor="middle"
      fontFamily="monospace"
      fontWeight="bold"
      fontSize="18"
      fill="#000"
    >
      GYM
    </text>
    {/* sign glow */}
    <rect x="34" y="62" width="92" height="28" rx="4" fill="none" stroke="#ff6800" strokeWidth="1.5" opacity="0.6" />

    {/* Windows row 1 */}
    <rect x="26" y="103" width="32" height="22" rx="2" fill="#ffe066" stroke="#000" strokeWidth="2" />
    <line x1="42" y1="103" x2="42" y2="125" stroke="#000" strokeWidth="1.5" />
    <rect x="64" y="103" width="32" height="22" rx="2" fill="#2a1f14" stroke="#000" strokeWidth="2" />
    <line x1="80" y1="103" x2="80" y2="125" stroke="#000" strokeWidth="1.5" />
    <rect x="102" y="103" width="32" height="22" rx="2" fill="#ffe066" stroke="#000" strokeWidth="2" />
    <line x1="118" y1="103" x2="118" y2="125" stroke="#000" strokeWidth="1.5" />

    {/* Dumbbell decoration */}
    <rect x="60" y="135" width="40" height="8" rx="3" fill="#ff6800" stroke="#000" strokeWidth="2" />
    <rect x="50" y="130" width="14" height="18" rx="3" fill="#ff6800" stroke="#000" strokeWidth="2" />
    <rect x="96" y="130" width="14" height="18" rx="3" fill="#ff6800" stroke="#000" strokeWidth="2" />

    {/* Door */}
    <rect x="57" y="148" width="46" height="19" rx="2" fill="#0d0d1a" stroke="#000" strokeWidth="2" />
    <circle cx="77" cy="158" r="2.5" fill="#ff6800" />
    <circle cx="83" cy="158" r="2.5" fill="#ff6800" />
  </svg>
);

export default AcademiaIllustration;
