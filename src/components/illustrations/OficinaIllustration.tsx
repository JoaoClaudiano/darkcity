const OficinaIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#080c10" />
    <circle cx="18" cy="14" r="1" fill="#fff" opacity="0.6" />
    <circle cx="138" cy="20" r="1" fill="#fff" opacity="0.4" />
    <circle cx="75" cy="9" r="1.2" fill="#fff" opacity="0.7" />
    <circle cx="112" cy="18" r="0.8" fill="#fff" opacity="0.5" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#080c10" />
    <rect x="0" y="160" width="160" height="4" fill="#10161c" />

    {/* Industrial chimney */}
    <rect x="120" y="38" width="18" height="90" fill="#141c20" stroke="#000" strokeWidth="2" />
    <rect x="116" y="34" width="26" height="8" rx="1" fill="#1c2428" stroke="#000" strokeWidth="2" />
    {/* Smoke */}
    <circle cx="129" cy="28" r="6" fill="#222" opacity="0.6" />
    <circle cx="132" cy="20" r="5" fill="#222" opacity="0.4" />
    <circle cx="128" cy="12" r="4" fill="#222" opacity="0.2" />

    {/* Main building */}
    <rect x="8" y="60" width="108" height="102" fill="#101820" stroke="#000" strokeWidth="2.5" />

    {/* Sawtooth industrial roof */}
    {[8, 26, 44, 62, 80, 98].map((x) => (
      <polygon key={x} points={`${x},60 ${x + 12},44 ${x + 18},60`} fill="#141c24" stroke="#000" strokeWidth="2" />
    ))}

    {/* Skylight windows in roof */}
    {[14, 50, 86].map((x) => (
      <rect key={x} x={x} y={52} width="10" height="8" rx="1" fill="#4af0ff" stroke="#000" strokeWidth="1.5" opacity="0.7" />
    ))}

    {/* OFICINA sign */}
    <rect x="16" y="68" width="92" height="22" rx="3" fill="#0088cc" stroke="#000" strokeWidth="2.5" />
    <text x="62" y="85" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="12" fill="#fff">
      OFICINA
    </text>
    <rect x="16" y="68" width="92" height="22" rx="3" fill="none" stroke="#4af0ff" strokeWidth="1" opacity="0.6" />

    {/* Large garage door */}
    <rect x="16" y="115" width="92" height="47" rx="2" fill="#0a1418" stroke="#000" strokeWidth="2.5" />
    {/* Door horizontal bars */}
    {[122, 130, 138, 146, 154, 160].map((y) => (
      <line key={y} x1="16" y1={y} x2="108" y2={y} stroke="#1a2830" strokeWidth="1.5" />
    ))}
    {/* Door vertical center */}
    <line x1="62" y1="115" x2="62" y2="162" stroke="#1a2830" strokeWidth="2" />
    {/* Door handles */}
    <rect x="50" y="136" width="10" height="5" rx="2" fill="#444" stroke="#000" strokeWidth="1.5" />
    <rect x="64" y="136" width="10" height="5" rx="2" fill="#444" stroke="#000" strokeWidth="1.5" />

    {/* Side windows */}
    <rect x="16" y="97" width="22" height="15" rx="2" fill="#ffe066" stroke="#000" strokeWidth="2" />
    <line x1="27" y1="97" x2="27" y2="112" stroke="#000" strokeWidth="1.5" />
    <rect x="84" y="97" width="22" height="15" rx="2" fill="#2a1a0a" stroke="#000" strokeWidth="2" />
    <line x1="95" y1="97" x2="95" y2="112" stroke="#000" strokeWidth="1.5" />

    {/* Gear decoration */}
    <circle cx="136" cy="115" r="18" fill="#0e1820" stroke="#0088cc" strokeWidth="3" />
    <circle cx="136" cy="115" r="9" fill="#0e1820" stroke="#0088cc" strokeWidth="2" />
    {/* Gear teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
      const rad = (angle * Math.PI) / 180;
      const x1 = 136 + Math.cos(rad) * 16;
      const y1 = 115 + Math.sin(rad) * 16;
      const x2 = 136 + Math.cos(rad) * 22;
      const y2 = 115 + Math.sin(rad) * 22;
      return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0088cc" strokeWidth="5" strokeLinecap="round" />;
    })}

    {/* Spark / lightning bolt */}
    <polygon points="145,96 140,108 144,108 139,122 148,106 143,106" fill="#ffcc00" stroke="#000" strokeWidth="1" />
  </svg>
);

export default OficinaIllustration;
