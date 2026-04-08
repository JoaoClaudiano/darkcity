const CassinoIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#0a0010" />
    <circle cx="20" cy="15" r="1.2" fill="#fff" opacity="0.8" />
    <circle cx="135" cy="22" r="1" fill="#fff" opacity="0.5" />
    <circle cx="75" cy="10" r="1" fill="#fff" opacity="0.7" />
    <circle cx="110" cy="18" r="0.8" fill="#fff" opacity="0.6" />
    <circle cx="48" cy="28" r="1" fill="#fff" opacity="0.4" />
    {/* Small stars / sparkles */}
    <circle cx="12" cy="40" r="0.8" fill="#ff00cc" opacity="0.8" />
    <circle cx="148" cy="35" r="0.8" fill="#ffcc00" opacity="0.8" />
    <circle cx="30" cy="50" r="0.8" fill="#00ccff" opacity="0.7" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#0a0010" />
    <rect x="0" y="160" width="160" height="4" fill="#160020" />

    {/* Building base */}
    <rect x="16" y="55" width="128" height="107" fill="#1a0030" stroke="#000" strokeWidth="2.5" />

    {/* Ornate roof */}
    <rect x="10" y="46" width="140" height="12" rx="2" fill="#2a004a" stroke="#000" strokeWidth="2.5" />
    {/* Roof spires */}
    <polygon points="28,46 35,30 42,46" fill="#ff00cc" stroke="#000" strokeWidth="2" />
    <polygon points="56,46 63,22 70,46" fill="#ff00cc" stroke="#000" strokeWidth="2" />
    <polygon points="90,46 97,18 104,46" fill="#ffcc00" stroke="#000" strokeWidth="2" />
    <polygon points="118,46 125,30 132,46" fill="#ff00cc" stroke="#000" strokeWidth="2" />
    {/* Star on tallest spire */}
    <circle cx="97" cy="18" r="5" fill="#ffcc00" stroke="#000" strokeWidth="1.5" />
    <text x="97" y="23" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="8" fill="#000">★</text>

    {/* CASINO neon sign */}
    <rect x="24" y="62" width="112" height="26" rx="4" fill="#8800cc" stroke="#000" strokeWidth="2.5" />
    <text x="80" y="80" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="#ffcc00">
      CASINO
    </text>
    <rect x="24" y="62" width="112" height="26" rx="4" fill="none" stroke="#ff00cc" strokeWidth="1.5" opacity="0.8" />

    {/* Decorative marquee dots */}
    {[32, 48, 64, 80, 96, 112, 128].map((x) => (
      <circle key={x} cx={x} cy="60" r="2.5" fill="#ffcc00" stroke="#000" strokeWidth="1" />
    ))}

    {/* Dice on facade */}
    <rect x="26" y="98" width="34" height="34" rx="4" fill="#f0e0ff" stroke="#000" strokeWidth="2.5" />
    <circle cx="35" cy="107" r="3.5" fill="#000" />
    <circle cx="51" cy="107" r="3.5" fill="#000" />
    <circle cx="43" cy="115" r="3.5" fill="#000" />
    <circle cx="35" cy="123" r="3.5" fill="#000" />
    <circle cx="51" cy="123" r="3.5" fill="#000" />

    {/* Playing card on facade */}
    <rect x="100" y="98" width="34" height="46" rx="4" fill="#fff5e0" stroke="#000" strokeWidth="2.5" />
    <text x="108" y="114" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="#cc0020">♥</text>
    <text x="117" y="126" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="#cc0020">A</text>
    <text x="125" y="138" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="#cc0020">♥</text>

    {/* Neon lights along building edges */}
    <rect x="16" y="55" width="4" height="107" fill="#ff00cc" opacity="0.25" />
    <rect x="140" y="55" width="4" height="107" fill="#ff00cc" opacity="0.25" />

    {/* Door */}
    <rect x="60" y="148" width="40" height="18" rx="2" fill="#0a0010" stroke="#000" strokeWidth="2" />
    <text x="80" y="161" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="10" fill="#ffcc00">
      ★ ★
    </text>
  </svg>
);

export default CassinoIllustration;
