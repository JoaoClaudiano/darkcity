const ImoveisIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#060814" />
    <circle cx="20" cy="14" r="1" fill="#fff" opacity="0.7" />
    <circle cx="135" cy="22" r="1" fill="#fff" opacity="0.5" />
    <circle cx="80" cy="8" r="1.2" fill="#fff" opacity="0.8" />
    <circle cx="110" cy="18" r="0.8" fill="#fff" opacity="0.6" />
    <circle cx="45" cy="25" r="1" fill="#fff" opacity="0.5" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#060814" />
    <rect x="0" y="160" width="160" height="4" fill="#0e1220" />

    {/* Side buildings (shorter) */}
    <rect x="4" y="110" width="35" height="52" fill="#0e1428" stroke="#000" strokeWidth="2" />
    <rect x="121" y="100" width="35" height="62" fill="#0e1428" stroke="#000" strokeWidth="2" />
    {/* Side building windows */}
    {[116, 126, 136, 146].map((y) => (
      <rect key={y} x="10" y={y} width="12" height="8" rx="1" fill="#1e4080" stroke="#000" strokeWidth="1" />
    ))}
    {[106, 116, 126, 136, 146].map((y) => (
      <rect key={y} x="129" y={y} width="12" height="8" rx="1" fill={y === 116 ? "#ffe066" : "#1e4080"} stroke="#000" strokeWidth="1" />
    ))}

    {/* Main skyscraper */}
    <rect x="44" y="28" width="72" height="134" fill="#0a1428" stroke="#000" strokeWidth="2.5" />

    {/* Antenna */}
    <line x1="80" y1="28" x2="80" y2="10" stroke="#888" strokeWidth="2.5" />
    <circle cx="80" cy="10" r="3.5" fill="#ff2244" stroke="#000" strokeWidth="1.5" />

    {/* Reflective glass panels */}
    {[36, 50, 64, 78, 92, 106, 120, 134, 148].map((y) => (
      <rect key={y} x="50" y={y} width="60" height="9" fill="#0d2040" stroke="#1a3060" strokeWidth="1" />
    ))}

    {/* Lit windows - grid pattern */}
    {[36, 50, 64, 78, 92, 106, 120].map((y) =>
      [54, 68, 82, 96].map((x) => {
        const lit = (x + y) % 28 !== 0;
        return (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y + 1}
            width="10"
            height="7"
            rx="1"
            fill={lit ? "#1e4080" : "#ffe066"}
            stroke="#000"
            strokeWidth="1"
          />
        );
      })
    )}

    {/* IMÓVEIS sign band */}
    <rect x="44" y="148" width="72" height="16" fill="#d4a800" stroke="#000" strokeWidth="2.5" />
    <text x="80" y="161" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="10" fill="#000">
      IMÓVEIS
    </text>

    {/* Dollar sign on facade */}
    <circle cx="80" cy="115" r="14" fill="#0a2040" stroke="#d4a800" strokeWidth="2.5" />
    <text x="80" y="121" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="18" fill="#d4a800">
      $
    </text>

    {/* Entrance door */}
    <rect x="62" y="152" width="36" height="12" rx="1" fill="#040e20" stroke="#000" strokeWidth="2" />
    <line x1="80" y1="152" x2="80" y2="164" stroke="#1a3060" strokeWidth="1.5" />
    <circle cx="80" cy="158" r="2" fill="#d4a800" />

    {/* Ground reflection */}
    <rect x="44" y="162" width="72" height="4" fill="#0d2040" opacity="0.4" />
  </svg>
);

export default ImoveisIllustration;
