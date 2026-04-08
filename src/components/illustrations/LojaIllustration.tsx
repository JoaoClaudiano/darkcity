const LojaIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#0a0e14" />
    <circle cx="20" cy="14" r="1" fill="#fff" opacity="0.7" />
    <circle cx="135" cy="24" r="1" fill="#fff" opacity="0.5" />
    <circle cx="70" cy="10" r="1.2" fill="#fff" opacity="0.8" />
    <circle cx="110" cy="20" r="0.8" fill="#fff" opacity="0.6" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#0a0e14" />
    <rect x="0" y="160" width="160" height="4" fill="#151c24" />

    {/* Roof / overhang */}
    <rect x="8" y="52" width="144" height="12" rx="2" fill="#1a3040" stroke="#000" strokeWidth="2.5" />
    {/* Awning stripe pattern */}
    {[8, 24, 40, 56, 72, 88, 104, 120, 136].map((x) => (
      <polygon key={x} points={`${x},64 ${x + 8},64 ${x + 12},74 ${x + 4},74`} fill="#00aacc" stroke="none" />
    ))}
    <rect x="8" y="64" width="144" height="12" rx="1" fill="#0088aa" stroke="#000" strokeWidth="2" />

    {/* Main building */}
    <rect x="8" y="50" width="144" height="112" fill="#0e1e2a" stroke="#000" strokeWidth="2.5" />

    {/* LOJA sign */}
    <rect x="30" y="56" width="100" height="22" rx="3" fill="#00aaff" stroke="#000" strokeWidth="2.5" />
    <text x="80" y="73" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="15" fill="#000">
      LOJA
    </text>
    <rect x="30" y="56" width="100" height="22" rx="3" fill="none" stroke="#00aaff" strokeWidth="1.5" opacity="0.7" />

    {/* Shop window */}
    <rect x="16" y="84" width="128" height="52" rx="3" fill="#0a2030" stroke="#000" strokeWidth="2.5" />
    {/* Display shelf */}
    <line x1="16" y1="114" x2="144" y2="114" stroke="#1a3040" strokeWidth="2" />

    {/* Items in window: pistol silhouette */}
    <rect x="25" y="97" width="22" height="10" rx="2" fill="#888" stroke="#000" strokeWidth="1.5" />
    <rect x="35" y="93" width="8" height="8" rx="1" fill="#888" stroke="#000" strokeWidth="1.5" />
    <rect x="25" y="104" width="6" height="7" rx="1" fill="#666" stroke="#000" strokeWidth="1.5" />

    {/* Items in window: knife silhouette */}
    <rect x="70" y="90" width="4" height="24" rx="2" fill="#c0c0d0" stroke="#000" strokeWidth="1.5" />
    <polygon points="70,90 74,90 72,78" fill="#c0c0d0" stroke="#000" strokeWidth="1.5" />
    <rect x="68" y="112" width="8" height="4" rx="1" fill="#8a6020" stroke="#000" strokeWidth="1" />

    {/* Items in window: bag */}
    <ellipse cx="115" cy="103" rx="14" ry="12" fill="#cc6600" stroke="#000" strokeWidth="2" />
    <path d="M108,94 Q115,88 122,94" stroke="#000" strokeWidth="2" fill="none" />

    {/* Price tags */}
    <rect x="24" y="118" width="24" height="10" rx="1" fill="#ffcc00" stroke="#000" strokeWidth="1" />
    <text x="36" y="127" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#000">
      R$500
    </text>
    <rect x="65" y="118" width="24" height="10" rx="1" fill="#ffcc00" stroke="#000" strokeWidth="1" />
    <text x="77" y="127" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#000">
      R$200
    </text>
    <rect x="105" y="118" width="24" height="10" rx="1" fill="#ffcc00" stroke="#000" strokeWidth="1" />
    <text x="117" y="127" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="7" fill="#000">
      R$800
    </text>

    {/* Security metal shutter */}
    {[142, 148, 154, 160].map((y) => (
      <line key={y} x1="16" y1={y} x2="144" y2={y} stroke="#1a3040" strokeWidth="2" />
    ))}

    {/* Door */}
    <rect x="58" y="144" width="44" height="22" rx="2" fill="#040e18" stroke="#000" strokeWidth="2.5" />
    <rect x="58" y="144" width="20" height="22" rx="0" fill="none" stroke="#1a3040" strokeWidth="1" />
    <circle cx="78" cy="156" r="2.5" fill="#00aaff" />
    {/* Padlock */}
    <rect x="92" y="152" width="10" height="8" rx="1" fill="#888" stroke="#000" strokeWidth="1.5" />
    <path d="M94,152 Q97,147 100,152" stroke="#888" strokeWidth="2" fill="none" />
  </svg>
);

export default LojaIllustration;
