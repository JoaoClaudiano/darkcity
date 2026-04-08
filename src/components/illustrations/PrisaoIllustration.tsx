const PrisaoIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#0a0a0a" />
    <circle cx="25" cy="14" r="1" fill="#fff" opacity="0.5" />
    <circle cx="130" cy="22" r="1" fill="#fff" opacity="0.4" />
    <circle cx="70" cy="10" r="1" fill="#fff" opacity="0.6" />

    {/* Searchlight beam */}
    <polygon points="80,40 30,0 130,0" fill="#ffffaa" opacity="0.08" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#0a0a0a" />
    <rect x="0" y="160" width="160" height="4" fill="#141414" />

    {/* Guard tower left */}
    <rect x="4" y="55" width="28" height="107" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
    <rect x="0" y="48" width="36" height="10" fill="#222" stroke="#000" strokeWidth="2" />
    <rect x="2" y="30" width="32" height="22" rx="1" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
    {/* Tower window */}
    <rect x="8" y="35" width="20" height="12" rx="1" fill="#ffd700" stroke="#000" strokeWidth="1.5" />
    <line x1="18" y1="35" x2="18" y2="47" stroke="#000" strokeWidth="1.5" />
    {/* Searchlight */}
    <circle cx="18" cy="30" r="5" fill="#ffd700" stroke="#000" strokeWidth="1.5" />

    {/* Guard tower right */}
    <rect x="128" y="55" width="28" height="107" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
    <rect x="124" y="48" width="36" height="10" fill="#222" stroke="#000" strokeWidth="2" />
    <rect x="126" y="30" width="32" height="22" rx="1" fill="#1a1a1a" stroke="#000" strokeWidth="2.5" />
    <rect x="132" y="35" width="20" height="12" rx="1" fill="#1a1a1a" stroke="#000" strokeWidth="1.5" />
    <line x1="142" y1="35" x2="142" y2="47" stroke="#000" strokeWidth="1.5" />
    <circle cx="142" cy="30" r="5" fill="#ffd700" stroke="#000" strokeWidth="1.5" />

    {/* Main prison building */}
    <rect x="32" y="58" width="96" height="104" fill="#181818" stroke="#000" strokeWidth="2.5" />

    {/* PRISÃO sign */}
    <rect x="38" y="65" width="84" height="22" rx="3" fill="#888" stroke="#000" strokeWidth="2.5" />
    <text x="80" y="82" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="13" fill="#000">
      PRISÃO
    </text>

    {/* Barred windows row 1 */}
    <rect x="40" y="97" width="30" height="22" rx="2" fill="#1a2a1a" stroke="#000" strokeWidth="2" />
    {[45, 51, 57, 63].map((x) => (
      <line key={x} x1={x} y1="97" x2={x} y2="119" stroke="#444" strokeWidth="2.5" />
    ))}

    <rect x="90" y="97" width="30" height="22" rx="2" fill="#ffd700" opacity="0.2" stroke="#000" strokeWidth="2" />
    {[95, 101, 107, 113].map((x) => (
      <line key={x} x1={x} y1="97" x2={x} y2="119" stroke="#444" strokeWidth="2.5" />
    ))}

    {/* Barred windows row 2 */}
    <rect x="40" y="128" width="30" height="22" rx="2" fill="#1a1a2a" stroke="#000" strokeWidth="2" />
    {[45, 51, 57, 63].map((x) => (
      <line key={x} x1={x} y1="128" x2={x} y2="150" stroke="#444" strokeWidth="2.5" />
    ))}

    <rect x="90" y="128" width="30" height="22" rx="2" fill="#1a1a1a" stroke="#000" strokeWidth="2" />
    {[95, 101, 107, 113].map((x) => (
      <line key={x} x1={x} y1="128" x2={x} y2="150" stroke="#444" strokeWidth="2.5" />
    ))}

    {/* Barbed wire top */}
    <line x1="32" y1="58" x2="128" y2="58" stroke="#888" strokeWidth="2.5" />
    {[38, 50, 62, 74, 86, 98, 110, 122].map((x) => (
      <g key={x}>
        <line x1={x} y1="55" x2={x + 4} y2="58" stroke="#888" strokeWidth="1.5" />
        <line x1={x + 4} y1="58" x2={x + 2} y2="52" stroke="#888" strokeWidth="1.5" />
      </g>
    ))}

    {/* Heavy door */}
    <rect x="58" y="148" width="44" height="18" rx="2" fill="#0a0a0a" stroke="#888" strokeWidth="3" />
    {/* Horizontal bars on door */}
    {[152, 157, 162].map((y) => (
      <line key={y} x1="58" y1={y} x2="102" y2={y} stroke="#444" strokeWidth="1.5" />
    ))}
    {/* Door handle / lock */}
    <rect x="93" y="154" width="6" height="8" rx="1" fill="#888" stroke="#000" strokeWidth="1.5" />
  </svg>
);

export default PrisaoIllustration;
