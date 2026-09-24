# Brief cirúrgico — S01 Hero

Substitui o Prompt 1 do `BRIEF-CASE-SYSMED.md`. Tudo aqui foi medido nó a nó no
Figma em 23 set 2026, frame `01 — Repouso` (`800:1032`), dentro de
`Case (Dark) v2 — Modo Repouso`. Nenhum número foi estimado.

Regra que vale para o arquivo inteiro: **a versão no Figma vence sempre.**

---

## 1. O erro de modelo mental que está travando a implementação

`S01Hero.tsx` hoje monta um grid de três colunas, `[1fr_auto_1fr]`, com
`<HeroMedia />` como elemento do meio. Isso não existe no Figma.

No Figma o vídeo é um **fill de vídeo no próprio frame Hero** (`802:1032`), com
`scaleMode: FIT`, cobrindo os 1440×1024 inteiros. Ele é camada de fundo, não item
de layout. O texto e os dois blocos laterais ficam por cima, em posição absoluta.

Enquanto o vídeo for tratado como coluna do meio, nada vai bater: ele empurra as
laterais, muda a largura do título e desalinha a faixa de stats. É essa a causa
raiz.

---

## 2. Estrutura correta

```
<section class="hero">                         1440 × 1024, bg --fundo-pagina, position: relative
  <video class="hero-video" />                 absolute inset-0, w/h 100%, object-fit: contain
  <LatticeHero />                              absolute inset-0, SVG, pointer-events: none
  <NavBar />                                   relative, z acima
  <div class="hero-title-block" />             absolute, x374 y142
  <div class="hero-ia" />                      absolute, x160 y600
  <div class="hero-humanos" />                 absolute, x1087 y627
</section>
<section class="hero-stats">                   1440 × 284
  <div class="stats-card" />                   x96 y0, 1248 × 196
  <p class="hook" />                           y220
</section>
```

`object-fit: contain` é a tradução de `scaleMode: FIT`. Com fonte 4:3 numa caixa
1440×1024, sobram ~37px de cada lado. Como o fundo do vídeo é gravado exatamente
em `#050B0E`, essas bordas são invisíveis. Não usar `cover`: recorta o objeto.

---

## 3. Geometria, desktop 1440

Origem no canto superior esquerdo da seção. Todos os valores em px.

| elemento | nó | x | y | w | h | notas |
|---|---|---|---|---|---|---|
| Hero (fundo + vídeo) | `802:1032` | 0 | 0 | 1440 | 1024 | fill de vídeo, FIT |
| Nav | `802:1033` | 0 | 0 | 1440 | 78 | auto-layout H, pad 16/120, space-between |
| Bloco do título | `802:1034` | 374 | 142 | 692 | 300 | auto-layout V, gap 24, itens centralizados |
| Chip | `802:1036` | 565.5 | 142 | 309 | 38 | r16, borda 1px `#FFFFFF@0.10`, fundo `--fundo-pagina`, pad 10 |
| H1 | `802:1038` | 381.5 | 204 | 677 | 140 | 2 linhas |
| Subtítulo | `802:1039` | 439.5 | 368 | 561 | 74 | 3 linhas, largura trava a quebra |
| Bloco IA | `802:1040` | 160 | 600 | 224 | 151 | auto-layout V, gap 16, **pad 16**, r16, sem fill, sem borda |
| Bloco Humanos | `802:1043` | 1087 | 627 | 193 | 119 | auto-layout V, gap 16, **pad 0** |
| Stats Wrap | `802:1046` | 0 | 1024 | 1440 | 284 | auto-layout V, gap 24, pad 0/96/40/96 |
| Card de stats | `802:1047` | 96 | 1024 | 1248 | 196 | r20, fill `#091218@0.5`, pad 40/8, H, gap 0 |
| Coluna de stat (×4) | — | — | +40 | 307.25 | 116 | V, gap 12, pad 0/24, centralizado |
| Divisor (×3) | — | — | +66 | 1 | 64 | `--superficie-hover` `#21323B` |
| Frase-gancho | `802:1063` | 96 | 1244 | 1248 | 24 | centralizada |

**Três gutters diferentes, de propósito.** Nav usa 120. Stats usam 96. Os blocos
IA e Humanos usam 160 à esquerda e terminam em 1280. Não unifique.

**O desalinhamento de 27px é real e está no Figma.** O bloco IA começa em y600 e
o Humanos em y627. Os rótulos ficam em y616 e y627, 11px de diferença, porque o
bloco IA tem padding de 16 e o Humanos não tem. Reproduza como está. Se você
achar que é erro de desenho, me avise, não corrija por conta própria.

---

## 4. Tipografia exata

| elemento | família | peso | tam | entrelinha | tracking | alinh. | cor |
|---|---|---|---|---|---|---|---|
| Nav links | Outfit | Regular | 16 | 150% | 0 | left | `--texto-principal` |
| Nav CTA | Outfit | Medium | 14 | auto | 0 | left | `--texto-apoio` |
| Chip | **JetBrains Mono** | Regular | 12 | auto | **3%** | left | `--acao-hover` |
| H1 | Hanken Grotesk | SemiBold | **64** | 110% | **-3%** | center | ver gradiente |
| Subtítulo | Outfit | Regular | **16** | 150% | 0 | center | `--texto-apoio` |
| Rótulo IA / Humanos | Hanken Grotesk | SemiBold | **20** | 110% | **-3%** | left | ver gradiente |
| Corpo IA / Humanos | Outfit | Regular | **18** | 150% | 0 | left | `--texto-apoio` |
| Número do stat | Hanken Grotesk | SemiBold | **56** | 110% | **-3%** | center | `--texto-principal` |
| Rótulo do stat | Outfit | Regular | **14** | 150% | 0 | center | `--texto-apoio` |
| Frase-gancho | Outfit | **SemiBold** | 16 | 150% | 0 | center | `--texto-apoio` |

---

## 5. O gradiente

Três textos usam gradiente linear horizontal, não cor sólida: as palavras `IA` e
`sistemas hospitalares` dentro do H1, e os rótulos `IA` e `Humanos` dos blocos
laterais.

```css
background: linear-gradient(90deg, #1B79D7 0%, #E7E8E9 100%);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

> Os dois stops estão fora da rampa de tokens: `#1B79D7` não é nenhum azul do
> sistema e `#E7E8E9` não é `--texto-principal`. A decisão D2 registrada em
> `src/data/caseUxAi.ts` mandava substituir por `--acao-link` sólido justamente
> por isso. **Essa decisão está revogada**: o Figma vence. Implemente o gradiente
> como está e crie dois tokens novos em `case-ux-ai-tokens.css`,
> `--gradiente-destaque-de` e `--gradiente-destaque-para`, para não espalhar hex
> solto pelo código.

---

## 6. Divergências entre o código atual e o Figma

Corrija todas.

| onde | está | deveria |
|---|---|---|
| layout | grid de 3 colunas com o vídeo no meio | vídeo como fundo do hero, laterais em posição absoluta |
| rótulos IA/Humanos | `f-mono 12px` em `--acao-hover` | Hanken Grotesk SemiBold 20, tracking -3%, gradiente |
| corpo IA/Humanos | `14px` | `18px` |
| subtítulo | `18px` | `16px` |
| subtítulo, texto | "Identificar problemas é diferente de compreender contexto." | texto real do Figma, abaixo |
| frase-gancho | `{68%}` e `{48%}` destacados | sem destaque nenhum, cor única `--texto-apoio` |
| H1 destaque | `--acao-link` sólido | gradiente |
| treliça | omitida | `public/case-ux-ai/lattice-hero.svg`, já exportada do Figma |

**Subtítulo, texto correto do nó `802:1039`:**

> O estudo mostrou que reconhecer uma falha é apenas parte do trabalho.
> Priorizá-la exige contexto, e é justamente aí que humanos e IA começam a tomar
> decisões diferentes.

Atualize `src/data/caseUxAi.ts`: troque `hero.subtitle`, e em `hero.hookSentence`
remova `highlightTokens` e as chaves do texto. Tire os marcadores
`[VERIFICAR FIGMA]` desses dois campos, agora estão confirmados.

---

## 7. Treliça

`public/case-ux-ai/lattice-hero.svg`, exportado direto do nó `836:1224`. 11 linhas
com `stroke-opacity 0.06` e 26 pontos em `#2F82D6` com `fill-opacity 0.14`, raio
1,25. Área desenhada: x177 y25, 1228×964, dentro do viewBox de 1440×1024.

Importe como componente React inline, não como `<img>`: o motion precisa animar
`pathLength` em cada `<path>`. Só os 11 paths desenham. Os 26 círculos entram em
fade junto, sem stagger próprio.

`aria-hidden="true"` e `pointer-events: none`.

---

## 8. Responsivo

Regras gerais em `docs/CONTRATO-RESPONSIVO.md`. Só o que é específico do hero:

- **O canvas absoluto vale em `case-xl` (≥1440), não em 1280.** Corrigi o que eu
  tinha escrito antes. Abaixo de 1440 não existe `position: absolute` no hero.
- A seção é `max-width: 1440px`, **nunca `width: 1440px`**. Centralizada, com o
  mesmo `--fundo-pagina` em volta, então em telas largas as laterais somem.
- Abaixo de 1440 a ordem no fluxo é: chip, H1, subtítulo, vídeo, IA, Humanos.
- Vídeo com `aspect-ratio: 4 / 3`, largura do container, `object-fit: contain`.
- IA e Humanos lado a lado entre 1024 e 1439, empilhados abaixo de 1024. Quando
  empilham, a largura fixa de 224 e 193 vira 100%.
- A treliça some abaixo de 768: ela foi desenhada para 1440 e em tela pequena
  vira sujeira.
- A faixa de stats vira 2×2 abaixo de 1024 e os divisores verticais somem.

## 9. Etapa B · Conteúdo e detalhe

```
Etapa B do hero. Leia docs/BRIEF-S01-HERO.md seções 5, 6 e 7.

1. Gradiente. As palavras "IA" e "sistemas hospitalares" no H1, e os rótulos
   "IA" e "Humanos" dos blocos laterais, usam gradiente linear horizontal, não
   cor sólida. Crie dois tokens em case-ux-ai-tokens.css,
   --gradiente-destaque-de: #1B79D7 e --gradiente-destaque-para: #E7E8E9, e
   aplique com background-clip: text. A decisão D2 registrada em
   src/data/caseUxAi.ts está revogada: o Figma vence.

2. Conteúdo. Troque hero.subtitle pelo texto real do nó 802:1039, que está na
   seção 6 do brief. Em hero.hookSentence remova highlightTokens e as chaves do
   texto: no Figma a frase é de cor única. Tire os marcadores [VERIFICAR FIGMA]
   desses dois campos.

3. Treliça. Importe public/case-ux-ai/lattice-hero.svg como componente React
   inline, não como <img>, porque o motion da Etapa D precisa animar pathLength
   em cada path. aria-hidden e pointer-events: none. O arquivo tem um bloco
   <metadata> com um manifesto C2PA embutido pelo processo de entrega: não
   copie esse bloco para o componente, só os 11 <path> e os 26 <circle>.

4. Token que falta. O card de stats usa rgba(9,18,24,0.5) inline hoje. Crie
   --superficie-dado: rgba(9, 18, 24, 0.5) em case-ux-ai-tokens.css e use o
   token. Nenhum hex ou rgba solto no componente.

Nada de motion ainda. npm run build no fim.
```

---

## 10. Etapa C · Responsivo

```
Etapa C do hero. Leia docs/CONTRATO-RESPONSIVO.md inteiro, é a primeira vez que
ele entra em uso, e depois a seção 8 de docs/BRIEF-S01-HERO.md.

Correções estruturais que vêm junto, todas do contrato:

1. Troque width: 1440px por max-width: 1440px na seção do hero e na faixa de
   stats. Width fixa cria scroll horizontal em qualquer tela menor.
2. Atualize Container.tsx: max-width 1248, padding-inline clamp(24px, 6.67vw,
   96px). Hoje está em 1200/120, herdado do blueprint perdido.
3. Em CaseUxAiMotionProvider.tsx, suba o teste de isDesktop de 1024 para 1440,
   para bater com a tabela da seção 7 do contrato.
4. O canvas absoluto do hero passa a valer só em case-xl. Abaixo de 1440,
   layout de fluxo, na ordem da seção 8 do brief.
5. Nav. Você está autorizado a mexer em CaseUxAi.tsx e NavBar.tsx. No Figma o
   nav é filho do frame Hero, em y0, por cima do vídeo. Hoje ele ocupa 78px
   próprios e empurra o hero inteiro para baixo. O nav precisa sobrepor o hero,
   não empurrar: o hero começa em y0 da página e o nav fica por cima. Mantenha o
   comportamento sticky dele para o resto da página.

Teste em 360, 768, 1024, 1280, 1440 e 1920. Em nenhuma dessas larguras pode
haver scroll horizontal. Me diga o que quebrou e como resolveu.
```

---

## 11. Etapa D · Motion e estados

```
Etapa D do hero, a última. Leia docs/MOTION-SPEC-SYSMED.md seção 6, S01, e a
seção 6 e 7 de docs/CONTRATO-RESPONSIVO.md.

1. Tokens. Adicione HERO_VIDEO e HERO_BEAT em caseUxAiTokens.ts exatamente como
   estão no spec. Nenhum segundo hardcoded no componente.

2. Vídeo. HeroMedia passa a usar hero-motion.webm e hero-motion.mp4 com poster
   hero-poster.webp, muted, playsinline, preload auto, SEM loop. Toca uma vez e
   congela no último frame.

3. Sequência de entrada. A tabela de beats do spec. A treliça desenha em
   paralelo, nunca bloqueia.

4. Motivo da divergência nas colunas IA e Humanos. Crie enterDivergence em
   caseUxAiRecipes.ts, uma implementação só, ela será reusada nas seções 05 e 09.

5. Estados das colunas. Hover dentro de @media (hover: hover): borda vai de
   transparente para --borda-ativa e o texto sobe para --texto-principal. Foco
   com :focus-visible acrescenta o anel de 2px em --acao-foco com offset 3px, e
   mantém o tratamento de hover. Em ambos, 68% e 48% ficam em --texto-principal
   e 89 e 11 recuam para --texto-apoio.

6. Parallax. Mouse só em case-xl, até 8px na direção oposta ao cursor com
   suavização forte. Scroll a 0.85x, teto de 40px. Nada disso abaixo de 1440.

7. Reduced motion. Poster estático, sem parallax, sem contagem, treliça já
   desenhada, fade de 200ms no lugar de cada entrada.

Ao terminar, navegue a seção inteira só com Tab e me diga o que você alcançou,
em que ordem, e se o anel apareceu em todos.
```

---

## 12. O que eu quero ver no fim de cada etapa

Screenshot não está funcionando pela extensão do Chrome, então o relato escrito
substitui. Em toda etapa, me devolva:

- arquivo por arquivo, o que mudou e por quê;
- qual item da tabela de divergências da seção 6 você fechou;
- o que você decidiu sozinho e não estava escrito no brief;
- o que ficou fora e por quê.
