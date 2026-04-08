const HospitalIllustration = () => (
  <svg viewBox="0 0 160 175" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky */}
    <rect width="160" height="175" fill="#0e0e1c" />
    <circle cx="22" cy="12" r="1" fill="#fff" opacity="0.7" />
    <circle cx="130" cy="20" r="1" fill="#fff" opacity="0.5" />
    <circle cx="60" cy="8" r="1.2" fill="#fff" opacity="0.8" />
    <circle cx="100" cy="16" r="0.8" fill="#fff" opacity="0.6" />
    <circle cx="145" cy="10" r="1" fill="#fff" opacity="0.4" />

    {/* Ground */}
    <rect x="0" y="162" width="160" height="13" fill="#111120" />
    <rect x="0" y="160" width="160" height="4" fill="#1c1c2e" />

    {/* Roof / top cap */}
    <rect x="28" y="40" width="104" height="8" rx="1" fill="#1a2e2e" stroke="#000" strokeWidth="2" />
    {/* Flag / signal light */}
    <rect x="76" y="28" width="8" height="14" fill="#c0c0d0" stroke="#000" strokeWidth="1.5" />
    <rect x="84" y="28" width="16" height="10" rx="1" fill="#e00020" stroke="#000" strokeWidth="1.5" />

    {/* Main building */}
    <rect x="28" y="48" width="104" height="114" fill="#101e1e" stroke="#000" strokeWidth="2.5" />

    {/* HOSPITAL sign */}
    <rect x="22" y="56" width="116" height="22" rx="3" fill="#00c060" stroke="#000" strokeWidth="2.5" />
    <text x="80" y="73" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="12" fill="#000">
      HOSPITAL
    </text>
    <rect x="22" y="56" width="116" height="22" rx="3" fill="none" stroke="#00c060" strokeWidth="1" opacity="0.7" />

    {/* Large cross on facade */}
    <rect x="68" y="84" width="24" height="52" rx="3" fill="#e00020" stroke="#000" strokeWidth="2" />
    <rect x="52" y="100" width="56" height="22" rx="3" fill="#e00020" stroke="#000" strokeWidth="2" />
    {/* cross center highlight */}
    <rect x="74" y="90" width="12" height="12" fill="#ff4060" opacity="0.5" />

    {/* Windows left */}
    <rect x="33" y="87" width="26" height="18" rx="2" fill="#00c060" stroke="#000" strokeWidth="1.5" opacity="0.8" />
    <line x1="46" y1="87" x2="46" y2="105" stroke="#000" strokeWidth="1" />
    {/* Windows right */}
    <rect x="101" y="87" width="26" height="18" rx="2" fill="#00c060" stroke="#000" strokeWidth="1.5" opacity="0.8" />
    <line x1="114" y1="87" x2="114" y2="105" stroke="#000" strokeWidth="1" />

    {/* Lower windows */}
    <rect x="33" y="112" width="26" height="18" rx="2" fill="#ffe066" stroke="#000" strokeWidth="1.5" />
    <line x1="46" y1="112" x2="46" y2="130" stroke="#000" strokeWidth="1" />
    <rect x="101" y="112" width="26" height="18" rx="2" fill="#2a1010" stroke="#000" strokeWidth="1.5" />
    <line x1="114" y1="112" x2="114" y2="130" stroke="#000" strokeWidth="1" />

    {/* Door with H symbol */}
    <rect x="60" y="148" width="40" height="18" rx="2" fill="#0d0d1a" stroke="#000" strokeWidth="2" />
    <line x1="72" y1="152" x2="72" y2="162" stroke="#00c060" strokeWidth="2.5" />
    <line x1="88" y1="152" x2="88" y2="162" stroke="#00c060" strokeWidth="2.5" />
    <line x1="72" y1="157" x2="88" y2="157" stroke="#00c060" strokeWidth="2.5" />

    {/* Ambulance light on top */}
    <circle cx="44" cy="46" r="4" fill="#ff4060" stroke="#000" strokeWidth="1.5" opacity="0.9" />
    <circle cx="116" cy="46" r="4" fill="#ff4060" stroke="#000" strokeWidth="1.5" opacity="0.9" />
  </svg>
);

export default HospitalIllustration;
