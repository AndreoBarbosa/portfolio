# Diretrizes de design — Portfólio

## Botões

Todo botão do site segue o mesmo padrão: **pill (border-radius total) + vidro contido**.

- **Forma:** `rounded-full`, sempre — nenhuma exceção. É a única forma geométrica do site que não é redonda por padrão, então o pill alinha os botões ao resto (cards, chips, avatares).
- **Vidro contido:** fundo de baixa opacidade (8–16%) + `backdrop-blur-sm` + borda 1px. Nunca opaco, nunca sem borda — **exceto a variante `solid`, ver abaixo**.
- **Hover:** fundo e borda clareiam ~4–6 pontos de opacidade em 150ms. Sem glow, sem sombra, sem escala.
- **Contraste:** texto sobre o vidro precisa passar AA (4.5:1) contra o fundo real da página, não contra o vidro isolado — o site é escuro (`ink` #1A1714) em quase toda parte, então isso já é folgado (amber ~7.6:1, cream ~15:1). Se um botão for usado sobre fundo claro (ex.: seções claras do case Gabriel), recalcule antes de reusar as mesmas opacidades.

Implementação de referência: `src/components/ui/Button.tsx` (variantes `primary`/`secondary`/`solid`, usadas em todo o site fora dos cases com marca própria). Páginas de case com identidade visual própria (ex. Gabriel) replicam o mesmo padrão geométrico e de hover, mas com a cor da marca do case — não importam o componente `Button` porque a cor não é a do site.

Duas exceções deliberadas à regra do vidro, ambas reservadas para o **único** elemento de maior peso de uma tela — nunca duas no mesmo lugar:
- Ícone-botão sólido (`.social-link--cta` em `src/index.css`, usado no CTA de contato) segue a família visual dos outros ícones-link do site (hero, rodapé — quadrado com `border-radius`, não círculo), mas com fundo âmbar sólido em vez de transparente.
- Variante `solid` do `Button` (fundo âmbar cheio, texto `ink`, ainda `rounded-full`) é o botão de texto mais forte do site — hoje só o "Ver projetos" do hero da home a usa. Todo outro CTA de texto usa `primary` (vidro âmbar) ou `secondary` (vidro cream), que ficam deliberadamente mais fracos por comparação.

## Espaçamento vertical

**Espaço = agrupamento.** O espaço entre dois elementos é proporcional à distância da *relação* entre eles, não a um valor estético solto. Seis degraus, cada um ligado a um tipo de relação — vizinhos precisam ser inconfundíveis:

| Token | Valor | Relação |
|---|---|---|
| `--space-inseparable` | 4px | rótulo/número mono → seu valor · ícone → texto do mesmo item |
| `--space-same` | 8px | título → subtítulo (mesmo elemento) |
| `--space-sequence` | 16px | parágrafo → parágrafo · item → item de lista · Descoberta → Decisão |
| `--space-title` | 40px | label `/0X` → primeiro conteúdo · card → card no grid |
| `--space-block` | 72px | sub-bloco → sub-bloco dentro de uma seção · **texto → botões (CTA)** |
| `--space-section` | 128px | entre seções inteiras |

**Regra-mãe (mudança de categoria):** próximo elemento da mesma categoria → usa o degrau daquela relação. Muda de categoria (texto → ação, conteúdo → novo grupo) → sobe pelo menos um degrau. Ação (botões/CTAs) é sempre a maior mudança de categoria — nunca herda o espaçamento de parágrafo (`--space-sequence`); sempre `--space-block` no mínimo.

Três classes utilitárias (`src/index.css`) centralizam os degraus grandes e são usadas em **toda** a home e em **todos** os cases (mobile ~0,6× do desktop; os degraus pequenos — 4/8/16 — não escalam):

| Classe | Valores (mobile / tablet / desktop) | Mapeia para |
|---|---|---|
| `.section-shell` | 64 / 80 / 128px | `--space-section` — padding vertical de toda section (`CaseSection`, `GabrielSection`, sections da home) |
| `.section-label-gap` | 24 / 32 / 40px | `--space-title` — gap entre o label `/0X` (ou eyebrow) e o primeiro conteúdo (`SectionLabel`, `SectionHeading`) |
| `.block-gap` / `.action-gap` | 44 / 56 / 72px | `--space-block` — sub-bloco → sub-bloco *e* texto → botões. Mesmo valor, dois nomes: use `.action-gap` quando o próximo elemento é uma ação, para deixar a intenção explícita no componente |

`18` foi adicionado à escala de espaçamento do Tailwind (`tailwind.config.ts`) porque 72px não existe por padrão — habilita `mt-18`, `gap-18`, `py-18` etc. para compor a escala responsiva onde as classes utilitárias acima não se aplicam diretamente (ex.: `mt-11 md:mt-14 lg:mt-18`).

| Token de contêiner | Valor |
|---|---|
| Padding interno de card (`--pad-card`) | 24 a 32px — igual em todos os cards |
| Padding de botão (`--pad-btn-y`/`--pad-btn-x`) | 12px / 24px |
| Margem de página no mobile | 20 a 24px |

**Regras condicionais:**
- **Topo de seção curta vs. longa:** seção com pouco conteúdo (fecho de case, "Vamos conversar") — reduzir o padding que empurraria o conteúdo para o fim de um contêiner alto (nunca herdar altura cheia sem essa correção). Seção densa: padding fixo (`.section-shell`), conteúdo começa no topo.
- **Régua/divisória:** respiro simétrico acima e abaixo, grau `--space-title` a `--space-block` (40–72px) — nunca colada ao conteúdo de um só lado.
- **Altura por conteúdo, não fixa:** cards de artefato/mockup respeitam a proporção da imagem; nunca forçar `min-height` que crie vazio.

**Lei da proximidade:** o espaço fora de um grupo precisa ser pelo menos o dobro do espaço dentro dele (proporção mínima 1:2). Se o gap título→parágrafo é igual ao gap parágrafo→próximo bloco, o olho não agrupa nada — é o sintoma mais comum de hierarquia achatada.

**Teste do scan:** passar o olho sem ler o conteúdo. Deve dar pra (1) contar os grupos de cada seção, (2) achar a ação (botões) de imediato, (3) nunca ver dois grupos colados nem um grupo rachado ao meio. Se falhar, o degrau está errado — não o valor absoluto.

## Tipografia

- **Medida de leitura:** nenhum parágrafo de texto corrido passa de 65ch (`TEXT_COL` nas páginas de case já usa 68-70ch, dentro da faixa). Subtítulo de hero é mais estreito: 45-52ch.
- **Line-height inverso ao tamanho:** título grande (32px+) = 95-110%. Corpo = 160%. Caption/label/lista = 150%. Nunca o contrário — line-height generoso num título grande lê como frouxo, não como respiro.
- **Três níveis de peso visual**, todo bloco de texto declara um:
  - **Primário** — o que o olho pega em 3s. `cream` 100%, peso 600-700.
  - **Secundário** — apoio, lido depois. `cream` 70-85%, peso 400.
  - **Terciário** — metadados, labels, notas. `muted` 45-60%, mono, geralmente uppercase.
  
  Dois elementos vizinhos no mesmo nível é o sinal de que um dos dois está errado.

## Comparações antes/depois

Onde o conteúdo é uma transformação (Economic+ → Sona, cor que falha → cor que passa), a hierarquia visual precisa comunicar a direção, não só apresentar dois estados iguais:
- Estado "antes": `opacity-55/60`, borda neutra fraca (`border-muted/10-15`), peso normal.
- Estado "depois": opacidade cheia, borda âmbar (`border-amber/35-50`), fundo com tinta âmbar sutil (`bg-amber/[0.03-0.04]`), peso mais forte (semibold/600+ e/ou tamanho maior).
- Um conector (`→` desktop, `↓` mobile) entre os dois estados — sem ele lê como dois cards soltos, não como narrativa.

Referência: comparador Economic+/Sona e o comparador de swatches de contraste, ambos em `src/pages/CaseSona.tsx`.
