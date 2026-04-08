import React, { useState } from "react";

// ─── layout constants ──────────────────────────────────────────────────────────
const B = 108;         // block size (px)
const R = 18;          // road width (px)
const S = 3 * B + 2 * R; // total map side = 360
const LABEL_H = 20;    // label bar height
const IH = B - LABEL_H; // illustration area height = 88

const bx = (col: number) => col * (B + R);
const by = (row: number) => row * (B + R);

// ─── precomputed window-light patterns for Imóveis ────────────────────────────
const WINDOW_LIT: boolean[][] = [
  [true,  false, true,  true ],
  [false, true,  false, true ],
  [true,  true,  false, false],
  [false, true,  true,  false],
];

// ─── building block wrapper ───────────────────────────────────────────────────
interface BlockProps {
  x: number;
  y: number;
  color: string;
  label: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const BuildingBlock: React.FC<BlockProps> = ({ x, y, color, label, onClick, children }) => {
  const [active, setActive] = useState(false);
  const hasClick = !!onClick;

  return (
    <g
      transform={`translate(${x},${y})`}
      onClick={onClick}
      onPointerDown={() => hasClick && setActive(true)}
      onPointerUp={() => setActive(false)}
      onPointerLeave={() => setActive(false)}
      style={{ cursor: hasClick ? "pointer" : "default" }}
    >
      {/* block background */}
      <rect width={B} height={B} fill="#0c0c18" />
      {/* illustration content */}
      {children}
      {/* tap/click flash */}
      {active && <rect width={B} height={IH} fill={color} opacity={0.18} />}
      {/* label bar */}
      <rect x={0} y={IH} width={B} height={LABEL_H} fill="#080810" />
      <rect x={0} y={IH} width={B} height={1} fill="#1e1e36" />
      <text
        x={B / 2}
        y={IH + 14}
        textAnchor="middle"
        fontFamily="'Courier New', monospace"
        fontWeight="bold"
        fontSize={9}
        fill={color}
        style={{ userSelect: "none", letterSpacing: "0.1em" }}
      >
        {label.toUpperCase()}
      </text>
      {/* tile border */}
      <rect width={B} height={B} fill="none" stroke="#1a1a2e" strokeWidth={1.5} />
    </g>
  );
};

// ─── individual building illustrations ────────────────────────────────────────

const Academia: React.FC<{ x: number; y: number; onClick: () => void }> = ({ x, y, onClick }) => (
  <BuildingBlock x={x} y={y} color="#ff6800" label="Academia" onClick={onClick}>
    <rect width={B} height={IH} fill="#150e06" />
    {/* building footprint */}
    <rect x={8} y={6} width={92} height={64} rx={2} fill="#2a1808" stroke="#000" strokeWidth={2} />
    {/* barbell — handle */}
    <rect x={27} y={36} width={54} height={7} rx={3} fill="#ff6800" stroke="#3a1a00" strokeWidth={1} />
    {/* left weight */}
    <rect x={13} y={22} width={16} height={34} rx={5} fill="#cc4400" stroke="#000" strokeWidth={1.5} />
    <rect x={15} y={24} width={12} height={30} rx={4} fill="#ff6800" />
    {/* right weight */}
    <rect x={79} y={22} width={16} height={34} rx={5} fill="#cc4400" stroke="#000" strokeWidth={1.5} />
    <rect x={81} y={24} width={12} height={30} rx={4} fill="#ff6800" />
    {/* door */}
    <rect x={42} y={58} width={24} height={12} rx={2} fill="#0a0a12" stroke="#111" strokeWidth={1.5} />
  </BuildingBlock>
);

const Hospital: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <BuildingBlock x={x} y={y} color="#00cc66" label="Hospital">
    <rect width={B} height={IH} fill="#08140a" />
    <rect x={8} y={6} width={92} height={64} rx={2} fill="#0f2016" stroke="#000" strokeWidth={2} />
    {/* red cross — background */}
    <rect x={46} y={12} width={16} height={44} rx={2} fill="#990000" />
    <rect x={28} y={28} width={52} height={14} rx={2} fill="#990000" />
    {/* red cross — highlight */}
    <rect x={48} y={14} width={12} height={40} rx={1} fill="#cc0000" />
    <rect x={30} y={30} width={48} height={10} rx={1} fill="#cc0000" />
    {/* door */}
    <rect x={42} y={58} width={24} height={12} rx={2} fill="#0a0a12" stroke="#111" strokeWidth={1.5} />
  </BuildingBlock>
);

const Cassino: React.FC<{ x: number; y: number; onClick: () => void }> = ({ x, y, onClick }) => (
  <BuildingBlock x={x} y={y} color="#cc00ff" label="Cassino" onClick={onClick}>
    <rect width={B} height={IH} fill="#10081a" />
    <rect x={8} y={6} width={92} height={64} rx={2} fill="#1e0e30" stroke="#000" strokeWidth={2} />
    {/* diamond */}
    <polygon points="54,13 82,40 54,67 26,40" fill="#3d0060" stroke="#cc00ff" strokeWidth={2} />
    <polygon points="54,18 77,40 54,62 31,40" fill="#66009a" />
    {/* center gem */}
    <circle cx={54} cy={40} r={9} fill="#cc00ff" opacity={0.75} />
    <circle cx={54} cy={40} r={5} fill="#fff" opacity={0.18} />
    {/* door */}
    <rect x={42} y={59} width={24} height={11} rx={2} fill="#0a0a12" stroke="#111" strokeWidth={1.5} />
  </BuildingBlock>
);

const Favela: React.FC<{ x: number; y: number; onClick: () => void }> = ({ x, y, onClick }) => (
  <BuildingBlock x={x} y={y} color="#cc2200" label="Favela" onClick={onClick}>
    <rect width={B} height={IH} fill="#160604" />
    {/* cluster of irregular shanties */}
    <rect x={6}  y={7}  width={28} height={20} rx={1} fill="#2a1008" stroke="#cc2200" strokeWidth={1.5} />
    <rect x={8}  y={27} width={22} height={26} rx={1} fill="#221008" stroke="#cc2200" strokeWidth={1} />
    <rect x={34} y={9}  width={24} height={30} rx={1} fill="#280c08" stroke="#cc2200" strokeWidth={1.5} />
    <rect x={60} y={7}  width={20} height={22} rx={1} fill="#1e0a06" stroke="#cc2200" strokeWidth={1} />
    <rect x={62} y={29} width={26} height={26} rx={1} fill="#240c0a" stroke="#cc2200" strokeWidth={1.5} />
    <rect x={36} y={43} width={18} height={18} rx={1} fill="#2a0e08" stroke="#cc2200" strokeWidth={1} />
    {/* lit windows */}
    <rect x={10} y={11} width={6} height={5} rx={1} fill="#ffe066" opacity={0.7} />
    <rect x={20} y={11} width={6} height={5} rx={1} fill="#ffe066" opacity={0.4} />
    <rect x={36} y={13} width={6} height={5} rx={1} fill="#ffe066" opacity={0.5} />
    <rect x={46} y={13} width={6} height={5} rx={1} fill="#ffe066" opacity={0.3} />
    <rect x={63} y={11} width={6} height={5} rx={1} fill="#ffe066" opacity={0.6} />
    <rect x={65} y={35} width={6} height={5} rx={1} fill="#ffe066" opacity={0.4} />
  </BuildingBlock>
);

const Loja: React.FC<{ x: number; y: number; onClick: () => void }> = ({ x, y, onClick }) => (
  <BuildingBlock x={x} y={y} color="#00aaff" label="Loja" onClick={onClick}>
    <rect width={B} height={IH} fill="#08101a" />
    <rect x={8} y={6} width={92} height={64} rx={2} fill="#0c1c2e" stroke="#000" strokeWidth={2} />
    {/* awning */}
    <rect x={8} y={6} width={92} height={13} rx={2} fill="#00aaff" opacity={0.55} />
    {/* stripes */}
    {[14, 28, 42, 56, 70, 84].map((sx) => (
      <rect key={sx} x={sx} y={6} width={6} height={13} fill="#0088cc" opacity={0.5} />
    ))}
    {/* shopping bag */}
    <rect x={36} y={28} width={36} height={32} rx={3} fill="#0e2640" stroke="#00aaff" strokeWidth={2} />
    <path d="M42 28 Q42 18 54 18 Q66 18 66 28" fill="none" stroke="#00aaff" strokeWidth={2.5} />
    {/* door */}
    <rect x={42} y={58} width={24} height={12} rx={2} fill="#0a0a12" stroke="#111" strokeWidth={1.5} />
  </BuildingBlock>
);

const Prisao: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <BuildingBlock x={x} y={y} color="#888888" label="Prisão">
    <rect width={B} height={IH} fill="#0d0d0d" />
    {/* perimeter wall */}
    <rect x={4} y={4} width={100} height={80} rx={2} fill="none" stroke="#555" strokeWidth={3} />
    {/* guard towers */}
    {[[4,4],[90,4],[4,70],[90,70]].map(([tx,ty], i) => (
      <React.Fragment key={i}>
        <rect x={tx} y={ty} width={14} height={14} rx={1} fill="#222" stroke="#666" strokeWidth={2} />
        <circle cx={tx + 7} cy={ty + 7} r={3} fill="#555" />
      </React.Fragment>
    ))}
    {/* main building */}
    <rect x={22} y={22} width={64} height={44} rx={1} fill="#1a1a1a" stroke="#444" strokeWidth={2} />
    {/* bars */}
    {[30, 40, 50, 60, 70].map((bx2) => (
      <rect key={bx2} x={bx2} y={25} width={4} height={38} rx={1} fill="#666" />
    ))}
    {/* horizontal bar */}
    <rect x={30} y={43} width={44} height={3} rx={1} fill="#555" />
  </BuildingBlock>
);

const Oficina: React.FC<{ x: number; y: number; onClick: () => void }> = ({ x, y, onClick }) => (
  <BuildingBlock x={x} y={y} color="#0088cc" label="Oficina" onClick={onClick}>
    <rect width={B} height={IH} fill="#08101a" />
    <rect x={8} y={6} width={92} height={64} rx={2} fill="#0c1c28" stroke="#000" strokeWidth={2} />
    {/* gear — outer ring */}
    <circle cx={54} cy={40} r={28} fill="#0e2030" stroke="#0088cc" strokeWidth={2.5} />
    {/* gear teeth */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const tx = 54 + 26 * Math.cos(rad);
      const ty = 40 + 26 * Math.sin(rad);
      return (
        <rect
          key={deg}
          x={tx - 4}
          y={ty - 4}
          width={8}
          height={8}
          rx={1}
          fill="#0088cc"
          transform={`rotate(${deg},${tx},${ty})`}
        />
      );
    })}
    {/* inner ring */}
    <circle cx={54} cy={40} r={16} fill="#142030" stroke="#0066aa" strokeWidth={2} />
    <circle cx={54} cy={40} r={8}  fill="#0088cc" opacity={0.6} />
    {/* door */}
    <rect x={42} y={58} width={24} height={12} rx={2} fill="#0a0a12" stroke="#111" strokeWidth={1.5} />
  </BuildingBlock>
);

const Imoveis: React.FC<{ x: number; y: number; onClick: () => void }> = ({ x, y, onClick }) => (
  <BuildingBlock x={x} y={y} color="#d4a800" label="Imóveis" onClick={onClick}>
    <rect width={B} height={IH} fill="#141008" />
    <rect x={15} y={4} width={78} height={68} rx={2} fill="#241c08" stroke="#000" strokeWidth={2} />
    {/* window grid: 4 rows × 4 cols */}
    {WINDOW_LIT.map((row, ri) =>
      row.map((lit, ci) => (
        <rect
          key={`w-${ri}-${ci}`}
          x={21 + ci * 18}
          y={10 + ri * 14}
          width={10}
          height={9}
          rx={1}
          fill={lit ? "#ffe066" : "#1a1408"}
          opacity={lit ? 0.85 : 0.5}
          stroke="#000"
          strokeWidth={0.5}
        />
      ))
    )}
    {/* door */}
    <rect x={42} y={60} width={24} height={12} rx={2} fill="#0a0a12" stroke="#111" strokeWidth={1.5} />
  </BuildingBlock>
);

const CenterPlaza: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x},${y})`}>
    <rect width={B} height={B} fill="#0a1408" />
    {/* park background */}
    <rect x={4} y={4} width={100} height={80} rx={8} fill="#0c1c0a" stroke="#1a2e14" strokeWidth={1.5} />
    {/* paths */}
    <rect x={46} y={4}  width={16} height={76} fill="#111e0e" />
    <rect x={4}  y={36} width={100} height={16} fill="#111e0e" />
    {/* fountain */}
    <circle cx={54} cy={44} r={16} fill="#0a1a28" stroke="#0066aa" strokeWidth={2} />
    <circle cx={54} cy={44} r={8}  fill="#0d2030" stroke="#00aaff" strokeWidth={1.5} />
    <circle cx={54} cy={44} r={3}  fill="#00ccff" opacity={0.7} />
    {/* trees */}
    {[[22,20],[86,20],[22,68],[86,68]].map(([tx,ty],i) => (
      <circle key={i} cx={tx} cy={ty} r={9} fill="#0a3014" stroke="#1a4a1e" strokeWidth={1.5} />
    ))}
    {/* label bar */}
    <rect x={0} y={IH} width={B} height={LABEL_H} fill="#080810" />
    <rect x={0} y={IH} width={B} height={1} fill="#1e1e36" />
    <text
      x={B / 2} y={IH + 14}
      textAnchor="middle"
      fontFamily="'Courier New', monospace"
      fontWeight="bold"
      fontSize={9}
      fill="#2a4a2a"
      style={{ userSelect: "none", letterSpacing: "0.1em" }}
    >
      PRAÇA
    </text>
    <rect width={B} height={B} fill="none" stroke="#1a1a2e" strokeWidth={1.5} />
  </g>
);

// ─── main map component ────────────────────────────────────────────────────────

interface CityMapProps {
  onLocationClick: (id: string) => void;
}

const CityMap: React.FC<CityMapProps> = ({ onLocationClick }) => {
  // road dash pattern helpers
  const hDashes = Array.from({ length: 13 }, (_, i) => i * 30);
  const vDashes = Array.from({ length: 13 }, (_, i) => i * 30);
  const roadCY1 = B + R / 2;         // 117
  const roadCY2 = 2 * B + R + R / 2; // 243
  const roadCX1 = B + R / 2;         // 117
  const roadCX2 = 2 * B + R + R / 2; // 243

  return (
    <svg
      viewBox={`0 0 ${S} ${S}`}
      width="100%"
      style={{ display: "block", borderRadius: "12px" }}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Mapa da cidade"
    >
      {/* street base */}
      <rect width={S} height={S} fill="#0a0a14" />

      {/* horizontal road bands */}
      <rect x={0} y={B}         width={S} height={R} fill="#131326" />
      <rect x={0} y={2*B+R}     width={S} height={R} fill="#131326" />
      {/* vertical road bands */}
      <rect x={B}     y={0} width={R} height={S} fill="#131326" />
      <rect x={2*B+R} y={0} width={R} height={S} fill="#131326" />

      {/* road centre-line dashes — horizontal */}
      {hDashes.map((ox) => (
        <React.Fragment key={`h1-${ox}`}>
          <rect x={ox + 2} y={roadCY1 - 1.5} width={20} height={3} rx={1.5} fill="#2a2a44" />
          <rect x={ox + 2} y={roadCY2 - 1.5} width={20} height={3} rx={1.5} fill="#2a2a44" />
        </React.Fragment>
      ))}
      {/* road centre-line dashes — vertical */}
      {vDashes.map((oy) => (
        <React.Fragment key={`v1-${oy}`}>
          <rect x={roadCX1 - 1.5} y={oy + 2} width={3} height={20} rx={1.5} fill="#2a2a44" />
          <rect x={roadCX2 - 1.5} y={oy + 2} width={3} height={20} rx={1.5} fill="#2a2a44" />
        </React.Fragment>
      ))}

      {/* intersection squares */}
      {[[B,B],[B,2*B+R],[2*B+R,B],[2*B+R,2*B+R]].map(([ix,iy],i) => (
        <rect key={i} x={ix} y={iy} width={R} height={R} fill="#1a1a30" />
      ))}

      {/* ── row 0 ── */}
      <Academia x={bx(0)} y={by(0)} onClick={() => onLocationClick("academia")} />
      <Hospital x={bx(1)} y={by(0)} />
      <Cassino  x={bx(2)} y={by(0)} onClick={() => onLocationClick("cassino")} />

      {/* ── row 1 ── */}
      <Favela      x={bx(0)} y={by(1)} onClick={() => onLocationClick("favela")} />
      <CenterPlaza x={bx(1)} y={by(1)} />
      <Loja        x={bx(2)} y={by(1)} onClick={() => onLocationClick("loja")} />

      {/* ── row 2 ── */}
      <Prisao  x={bx(0)} y={by(2)} />
      <Oficina x={bx(1)} y={by(2)} onClick={() => onLocationClick("oficina")} />
      <Imoveis x={bx(2)} y={by(2)} onClick={() => onLocationClick("imoveis")} />
    </svg>
  );
};

export default CityMap;
