import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";
import "./ExperimentDivergence.css";

/**
 * SYSMED — seção 05, Desenho do experimento.
 *
 * Os 89 problemas nascem dentro de uma lente de vidro no eixo da composição e se
 * dividem em duas análises independentes. Motivo da divergência do spec de motion,
 * segunda das três aparições (hero, 05, 09).
 *
 * Liquid Glass: a lente é a única superfície de vidro forte do quadro, conforme o
 * guia. Ela é montada em duas camadas, corpo atrás dos pontos e aro/especular na
 * frente, então o cluster nasce visivelmente DENTRO do material e sai por baixo do
 * aro. Os nós são contas de vidro: gradiente radial com foco de luz deslocado,
 * definido uma vez e referenciado pelos 178.
 *
 * Decisões de implementação, todas vindas do spec:
 *  - SVG inline, não canvas. Não há loop, então não há custo contínuo de GPU.
 *  - Só `opacity` e `transform`. O azul da IA é um crossfade de opacidade entre
 *    duas contas coincidentes, nunca uma transição de `fill`.
 *  - Blur só estático, nos realces da lente. Nada de blur animado.
 *  - Framer Motion dispara (`useInView`, once), o CSS executa.
 *  - Estado de repouso do DOM é o estado FINAL.
 *  - Duas composições: lado a lado no desktop, empilhada no mobile.
 *  - `prefers-reduced-motion` reduz tudo a um fade de 200 ms.
 *
 * `glassSprite`: caminho de um render (Magnific) para substituir a lente montada
 * em SVG. O PNG precisa estar sobre preto puro; o composite é `screen`, então o
 * preto some sozinho e o vidro soma sobre o piso. Sem a prop, vale a lente SVG.
 */

const N = 89;

type P = { x: number; y: number };

type Layout = {
  w: number;
  h: number;
  axis: P;
  lensR: number;
  hc: P;
  ac: P;
  hs: [number, number];
  as: [number, number];
  hJit: number;
  aJit: number;
  halo: [number, number];
  haloA: [number, number];
  labelH: P;
  labelA: P;
  rule: [number, number, number];
};

const WIDE: Layout = {
  w: 620,
  h: 230,
  axis: { x: 310, y: 104 },
  lensR: 46,
  hc: { x: 150, y: 104 },
  ac: { x: 470, y: 104 },
  hs: [16.5, 15.5],
  as: [18.6, 17.2],
  hJit: 1.8,
  aJit: 5.4,
  halo: [128, 92],
  haloA: [140, 100],
  labelH: { x: 150, y: 14 },
  labelA: { x: 470, y: 14 },
  rule: [30, 590, 218],
};

const NARROW: Layout = {
  w: 360,
  h: 480,
  axis: { x: 180, y: 240 },
  lensR: 40,
  hc: { x: 180, y: 108 },
  ac: { x: 180, y: 380 },
  hs: [27, 12.5],
  as: [28.5, 13],
  hJit: 1.5,
  aJit: 4.2,
  halo: [168, 78],
  haloA: [180, 84],
  labelH: { x: 180, y: 26 },
  labelA: { x: 180, y: 300 },
  rule: [24, 336, 466],
};

function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const byPos = (a: P, b: P) => a.y - b.y || a.x - b.x;

const onCircle = (c: P, R: number, deg: number): P => ({
  x: c.x + R * Math.cos((deg * Math.PI) / 180),
  y: c.y + R * Math.sin((deg * Math.PI) / 180),
});

/** Grade jitterada de 11 × 9 com 10 falhas. `spread` empurra os pontos para fora. */
function makeField(
  rng: () => number,
  c: P,
  [sx, sy]: [number, number],
  jit: number,
  spread: number
): P[] {
  const cols = 11;
  const rows = 9;
  const slots: [number, number][] = [];
  const x0 = c.x - ((cols - 1) * sx) / 2;
  const y0 = c.y - ((rows - 1) * sy) / 2;

  for (let r = 0; r < rows; r++) for (let k = 0; k < cols; k++) slots.push([k, r]);

  // embaralha com semente fixa e descarta 10 slots: a grade ganha falhas reais
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }

  return slots
    .slice(0, N)
    .map(([sc, sr]) => {
      let x = x0 + sc * sx + (rng() - 0.5) * jit * 2;
      let y = y0 + sr * sy + (rng() - 0.5) * jit * 2;
      if (spread) {
        x = c.x + (x - c.x) * (1 + rng() * spread);
        y = c.y + (y - c.y) * (1 + rng() * spread);
      }
      return { x, y };
    })
    .sort(byPos);
}

function buildGeometry(seed: number, L: Layout) {
  const rng = mulberry32(seed);

  // cluster de origem: ângulo áureo, compacto, contido pela lente
  const GA = Math.PI * (3 - Math.sqrt(5));
  const origin: P[] = [];
  const rMax = L.lensR * 0.62;
  for (let i = 0; i < N; i++) {
    const rad = rMax * Math.sqrt((i + 0.5) / N);
    const ang = i * GA;
    origin.push({
      x: L.axis.x + rad * Math.cos(ang) + (rng() - 0.5) * 3.2,
      y: L.axis.y + rad * Math.sin(ang) * 0.94 + (rng() - 0.5) * 3.2,
    });
  }

  // origem e destinos ordenados igual, para os fluxos saírem paralelos e não cruzados
  const O = [...origin].sort(byPos);
  const H = makeField(rng, L.hc, L.hs, L.hJit, 0); // especialistas: concentrado, ordenado
  const A = makeField(rng, L.ac, L.as, L.aJit, 0.1); // IA: mesmo material, mais disperso

  // entrada dos pontos: ordem aleatória com semente fixa, resultado reproduzível
  const order = Array.from({ length: N }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const inRank: number[] = [];
  order.forEach((idx, rank) => (inRank[idx] = rank));

  // divergência: de dentro da lente para fora
  const spRank: number[] = [];
  O.map((p, i) => ({ i, r: Math.hypot(p.x - L.axis.x, p.y - L.axis.y) }))
    .sort((a, b) => a.r - b.r)
    .forEach((e, rank) => (spRank[e.i] = rank));

  // azul: varre do eixo da composição para a borda do campo da IA
  const blRank: number[] = [];
  A.map((p, i) => ({ i, d: Math.hypot(p.x - L.axis.x, p.y - L.axis.y) }))
    .sort((a, b) => a.d - b.d)
    .forEach((e, rank) => (blRank[e.i] = rank));

  const anchorOf = (F: P[], c: P) => {
    let best = 0;
    let bd = Infinity;
    F.forEach((p, i) => {
      const d = Math.hypot(p.x - c.x, p.y - c.y);
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    return best;
  };

  return { O, H, A, inRank, spRank, blRank, aH: anchorOf(H, L.hc), aA: anchorOf(A, L.ac) };
}

/** true quando a composição empilhada deve valer. */
function useNarrow(query = "(max-width: 680px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

type Vars = React.CSSProperties & Record<`--${string}`, string>;

export default function ExperimentDivergence({
  seed = 89,
  glassSprite,
  glassWidth = 0.42,
}: {
  seed?: number;
  /** Render sobre preto puro. Composto em `screen`, então o preto some sozinho. */
  glassSprite?: string;
  /** Largura do render como fração da largura do viewBox. Único número a calibrar. */
  glassWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const narrow = useNarrow();
  const L = narrow ? NARROW : WIDE;
  const g = useMemo(() => buildGeometry(seed, L), [seed, L]);

  const { axis: C, lensR: R } = L;
  const specHi = [onCircle(C, R, 200), onCircle(C, R, 285)];
  const specLo = [onCircle(C, R, 25), onCircle(C, R, 62)];
  const [x1, x2, ry] = L.rule;

  const dot = (side: "h" | "a", i: number) => {
    const T = side === "h" ? g.H[i] : g.A[i];
    const isAnchor = side === "h" ? i === g.aH : i === g.aA;
    const r = isAnchor ? 3.6 : 2.4;

    const style: Vars = {
      "--ox": `${g.O[i].x.toFixed(2)}px`,
      "--oy": `${g.O[i].y.toFixed(2)}px`,
      "--tx": `${T.x.toFixed(2)}px`,
      "--ty": `${T.y.toFixed(2)}px`,
      "--din": `${(g.inRank[i] * 0.005).toFixed(3)}s`,
      "--dsp": `${(0.7 + g.spRank[i] * 0.0016).toFixed(4)}s`,
      ...(side === "a" ? { "--dblue": `${(1.62 + g.blRank[i] * 0.0012).toFixed(4)}s` } : {}),
    };

    return (
      <g key={`${side}${i}`} className="xd-dot" style={style}>
        <circle r={r} fill="url(#xd-bead-n)" fillOpacity={isAnchor ? 1 : 0.88} />
        {isAnchor && <circle r={r * 0.3} cx={-r * 0.3} cy={-r * 0.34} fill="#FFFFFF" fillOpacity="0.55" />}
        {side === "a" && (
          <g className="xd-ink">
            <circle r={r} fill="url(#xd-bead-a)" fillOpacity={isAnchor ? 1 : 0.9} />
            {isAnchor && (
              <circle r={r * 0.3} cx={-r * 0.3} cy={-r * 0.34} fill="#FFFFFF" fillOpacity="0.7" />
            )}
          </g>
        )}
      </g>
    );
  };

  return (
    <div ref={ref} className="xd" data-play={inView ? "on" : "off"}>
      <svg
        className="xd-viz"
        viewBox={`0 0 ${L.w} ${L.h}`}
        style={{ "--vs-origin": `${C.x}px ${C.y}px` } as Vars}
        role="img"
        aria-label="Um conjunto de 89 problemas de usabilidade, contido numa lente de vidro, se divide em dois campos de pontos: a classificação dos especialistas e a classificação independente da IA, feitas sobre o mesmo material."
      >
        <defs>
          {/* halos ambientes — G2, no máximo 8% */}
          <radialGradient id="xd-halo-h" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A3B5BF" stopOpacity="0.075" />
            <stop offset="100%" stopColor="#A3B5BF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="xd-halo-a" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--acao-link)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--acao-link)" stopOpacity="0" />
          </radialGradient>

          {/* contas de vidro transparente: núcleo branco de luz atravessada, aro escuro
              na dobra, igual ao objeto do hero. Definido uma vez, usado pelos 178. */}
          <radialGradient id="xd-bead-n" cx="36%" cy="30%" r="76%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="38%" stopColor="#C6D8E2" stopOpacity="0.92" />
            <stop offset="78%" stopColor="#4A5D69" stopOpacity="0.84" />
            <stop offset="100%" stopColor="#0B161D" stopOpacity="0.76" />
          </radialGradient>
          <radialGradient id="xd-bead-a" cx="36%" cy="30%" r="76%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="34%" stopColor="#9ECDFA" stopOpacity="0.96" />
            <stop offset="76%" stopColor="#2F72B8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0B1F31" stopOpacity="0.78" />
          </radialGradient>

          {/* lente de vidro transparente. Interior luminoso, dobra quase preta junto
              à borda, aro que acende em cima à esquerda e esfria em baixo à direita. */}
          <radialGradient id="xd-lens-body" cx="42%" cy="32%" r="74%">
            <stop offset="0%" stopColor="#F4FAFD" stopOpacity="0.10" />
            <stop offset="56%" stopColor="#CFE2EE" stopOpacity="0.045" />
            <stop offset="88%" stopColor="#060D12" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#0B1B26" stopOpacity="0.06" />
          </radialGradient>
          <linearGradient id="xd-lens-rim" x1="16%" y1="2%" x2="84%" y2="98%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="30%" stopColor="#D8E9F4" stopOpacity="0.32" />
            <stop offset="62%" stopColor="#23486B" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#A9C8DE" stopOpacity="0.6" />
          </linearGradient>
          {/* blur estático: realces da lente. nunca animado */}
          <filter id="xd-soft" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="xd-soft-sm" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="2.1" />
          </filter>
        </defs>

        <ellipse
          className="xd-halo"
          cx={L.hc.x}
          cy={L.hc.y}
          rx={L.halo[0]}
          ry={L.halo[1]}
          fill="url(#xd-halo-h)"
        />
        <ellipse
          className="xd-halo"
          cx={L.ac.x}
          cy={L.ac.y}
          rx={L.haloA[0]}
          ry={L.haloA[1]}
          fill="url(#xd-halo-a)"
        />

        {glassSprite ? (
          /* render externo sobre preto puro, composto em screen */
          (() => {
            const gw = L.w * glassWidth;
            const gh = gw * (9 / 16);
            return (
              <image
                className="xd-lens xd-lens--sprite"
                href={glassSprite}
                x={C.x - gw / 2}
                y={C.y - gh / 2}
                width={gw}
                height={gh}
                preserveAspectRatio="xMidYMid meet"
              />
            );
          })()
        ) : (
          /* Sem render, a lente é só a aresta do vidro: um círculo preenchido lê como
             botão, e o material do Andreo é orgânico. O corpo vem do sprite. */
          <circle
            className="xd-lens"
            cx={C.x}
            cy={C.y}
            r={R}
            fill="none"
            stroke="url(#xd-lens-rim)"
            strokeWidth="1.2"
            strokeOpacity="0.75"
          />
        )}

        <g className="xd-nodes">
          {Array.from({ length: N }, (_, i) => dot("h", i))}
          {Array.from({ length: N }, (_, i) => dot("a", i))}
        </g>

        {!glassSprite && (
          <g className="xd-lens">
            {/* aro e especular: ficam NA FRENTE, os pontos saem por baixo da borda */}
            {/* segunda parede do vidro, logo dentro do aro */}
            <circle
              cx={C.x}
              cy={C.y}
              r={R - 3.2}
              fill="none"
              stroke="#EAF4FA"
              strokeOpacity="0.13"
              strokeWidth="0.8"
            />
            <path
              d={`M ${specHi[0].x.toFixed(1)} ${specHi[0].y.toFixed(1)} A ${R} ${R} 0 0 1 ${specHi[1].x.toFixed(1)} ${specHi[1].y.toFixed(1)}`}
              fill="none"
              stroke="#F2F8FC"
              strokeOpacity="0.62"
              strokeWidth="2.2"
              strokeLinecap="round"
              filter="url(#xd-soft-sm)"
            />
            <path
              d={`M ${specLo[0].x.toFixed(1)} ${specLo[0].y.toFixed(1)} A ${R} ${R} 0 0 1 ${specLo[1].x.toFixed(1)} ${specLo[1].y.toFixed(1)}`}
              fill="none"
              stroke="#9EC9F0"
              strokeOpacity="0.32"
              strokeWidth="1.6"
              strokeLinecap="round"
              filter="url(#xd-soft-sm)"
            />
          </g>
        )}

        <g className="xd-vs">
          <text
            x={C.x}
            y={C.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="xd-meta xd-meta--vs"
            fill="var(--texto-forte)"
          >
            VS
          </text>
        </g>

        <text
          x={L.labelH.x}
          y={L.labelH.y}
          textAnchor="middle"
          className="xd-meta xd-lbl-h"
          fill="var(--texto-apoio)"
        >
          ESPECIALISTAS
        </text>
        <text
          x={L.labelA.x}
          y={L.labelA.y}
          textAnchor="middle"
          className="xd-meta xd-lbl-a"
          fill="var(--acao-link)"
        >
          IA
        </text>

        <path
          className="xd-rule"
          d={`M ${x1} ${ry} H ${x2}`}
          stroke="var(--borda-sutil-solida)"
          strokeWidth="1"
          fill="none"
          pathLength={1}
        />
        <circle className="xd-rule-cap" cx={x1} cy={ry} r="2" fill="var(--acao-link)" fillOpacity="0.55" />
        <circle className="xd-rule-cap" cx={x2} cy={ry} r="2" fill="var(--acao-link)" fillOpacity="0.55" />
      </svg>

      <p className="xd-caption">Os mesmos 89 problemas, analisados de forma independente pelos dois lados.</p>
    </div>
  );
}
