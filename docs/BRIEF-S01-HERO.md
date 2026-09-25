# Brief cirúrgico — S01 Hero

Substitui o Prompt 1 do `BRIEF-CASE-SYSMED.md`. Tudo aqui foi medido nó a nó no
Figma em 23 set 2026, frame `01 — Repouso` (`800:1032`), dentro de
`Case (Dark) v2 — Modo Repouso`. Nenhum número foi estimado.

Regra que vale para o arquivo inteiro: **a versão no Figma vence sempre.**

> **Atualização 24 set 2026.** Vídeo trocado pelo `hero-v2` e treliça removida
> do hero, a pedido do Andreo: só vídeo e texto. Se o hero já passou pelas
> etapas B e D, cole só a **seção 13**. Se ainda não passou, as etapas abaixo já
> estão corrigidas.

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
| treliça | renderizada | **removida do hero**, só vídeo e texto |

**Subtítulo, texto correto do nó `802:1039`:**

> O estudo mostrou que reconhecer uma falha é apenas parte do trabalho.
> Priorizá-la exige contexto, e é justamente aí que humanos e IA começam a tomar
> decisões diferentes.

Atualize `src/data/caseUxAi.ts`: troque `hero.subtitle`, e em `hero.hookSentence`
remova `highlightTokens` e as chaves do texto. Tire os marcadores
`[VERIFICAR FIGMA]` desses dois campos, agora estão confirmados.

---

## 7. Treliça

**Removida do hero em 24 set 2026.** O Figma tem uma treliça de fundo neste frame
(nó `836:1224`), mas o Andreo decidiu tirar: o vídeo novo carrega a atmosfera
sozinho e as linhas competiam com ele. O hero fica com vídeo e texto, nada mais.

`public/case-ux-ai/lattice-hero.svg` não é mais usado por esta seção. O
componente `LatticeBackground` pode ficar no projeto: a S08 tem treliça própria no
Figma e vai reaproveitá-lo.

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

3. Treliça. Remova o LatticeBackground do S01Hero. O hero fica só com vídeo e
   texto. Não apague o componente: a S08 vai reaproveitar.

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
2. Container.tsx fica em max-width 1200 com padding-inline clamp(24px, 8.33vw,
   120px). É o grid medido em 12 das 15 seções. Se ele já foi mudado para 1248,
   volte. No hero, só o card de stats usa 1248.
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

2. Vídeo. HeroMedia passa a usar hero-v2.webm e hero-v2.mp4 com poster
   hero-v2-poster.webp, autoplay, muted, playsinline, preload auto, SEM loop. Toca
   o ciclo de 10s uma vez e para no último frame, que é a mesma forma do
   primeiro. Aplique a máscara radial da borda descrita no spec.

3. Sequência de entrada. A tabela de beats do spec.

4. Motivo da divergência nas colunas IA e Humanos. Crie enterDivergence em
   caseUxAiRecipes.ts, uma implementação só, ela será reusada nas seções 05 e 09.

5. Colunas IA e Humanos não têm estado. São texto: sem hover, sem foco, sem
   borda, sem tabindex. A faixa de stats também não reage. (Revisto em 24 set
   2026: a borda no hover fazia a coluna parecer clicável. Ver seção 14.)

6. Parallax. Mouse só em case-xl, até 8px na direção oposta ao cursor com
   suavização forte. Scroll a 0.85x, teto de 40px. Nada disso abaixo de 1440.

7. Reduced motion. Poster estático, vídeo não toca, sem parallax, sem
   contagem, fade de 200ms no lugar de cada entrada.

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

---

## 13. Ajuste final: vídeo v2 e remoção da treliça

Cole este se o hero já passou pelas etapas B e D. Ele funciona sozinho.

```
Ajuste final do hero. Leia docs/MOTION-SPEC-SYSMED.md, seção 2 (bloco
HERO_VIDEO) e seção 6, S01, que foram atualizadas hoje.

1. Remova a treliça do hero. Tire o LatticeBackground do S01Hero: a seção fica
   só com vídeo e texto. Não apague o componente, a S08 vai reaproveitar.

2. Troque o vídeo. Os arquivos novos já estão em public/case-ux-ai/:
   hero-v2.webm, hero-v2.mp4 e hero-v2-poster.webp. No HeroMedia:
   - <video> com <source> webm primeiro e mp4 depois, poster hero-v2-poster.webp;
   - autoplay, muted, playsinline, preload="auto", SEM loop;
   - toca o ciclo de 10s uma vez e para no último frame;
   - object-fit: contain, cobrindo o hero inteiro, como já está;
   - máscara radial na borda, exatamente esta:
     mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 80%, transparent 100%);
     e o mesmo valor em -webkit-mask-image;
   - pausa por IntersectionObserver se sair da viewport antes de terminar;
   - em reduced motion não toca, mostra o poster.

3. Atualize o bloco HERO_VIDEO em src/motion/caseUxAiTokens.ts com os valores
   novos do spec: caminhos hero-v2, duration 10.0, motionPeak 0.4, motionEnd 1.2.
   Se HERO_VIDEO e HERO_BEAT ainda não existirem, crie os dois exatamente como
   estão no spec. Nenhum segundo hardcoded no componente: a sequência inteira
   deve se recalibrar só por essa troca de valores.

4. Não referencie mais hero-motion.*, hero-poster.webp, hero.webm nem
   lattice-hero.svg em lugar nenhum do S01.

Não mexa em mais nada. npm run build no fim, e me diga arquivo por arquivo o que
mudou.
```

---

## 14. Correção: colunas sem estado e nav sobre o conteúdo

Cole este depois da seção 13. Ele funciona sozinho.

Dois problemas vistos no site em 24 set 2026:

- **A coluna IA ganhava borda no hover** e parecia um botão. Ela não leva a lugar
  nenhum. O Figma foi corrigido: o frame `800:1033` agora diz "colunas IA e
  Humanos · sem interação".
- **A nav fica transparente por cima do conteúdo** ao rolar. Os links "Projetos",
  "Trajetória" e "Sobre" aparecem em cima dos números dos stats. O spec já pedia
  uma superfície de vidro depois de 120px de scroll (seção 5 do
  `MOTION-SPEC-SYSMED.md`), e ela não foi feita.

```
Correção do hero e da nav. Leia docs/BRIEF-S01-HERO.md seção 14 e
docs/MOTION-SPEC-SYSMED.md seção 5, parágrafo "Nav".

1. Colunas IA e Humanos não são interativas. Remova o estado de hover com borda
   e fundo, o foco, o tabindex, o cursor pointer e o <button> das duas colunas.
   Elas voltam a ser texto (div e p). A faixa de stats também não reage mais:
   89, 11, 68% e 48% ficam sempre no repouso. Apague a lógica que fazia 89 e 11
   recuarem. O padding de 16 do bloco IA continua, é do Figma.

2. Nav. Transparente no topo. Passando de 120px de scroll, uma superfície de
   vidro aparece por trás dela:
   - fundo --vidro-medio, borda inferior 1px --borda-vidro;
   - backdrop-filter: blur(20px) montado desde o início numa camada própria
     (::before ou div absoluta atrás dos links), e só a opacity dessa camada
     anima, de 0 a 1, em 300ms com EASE.state. Nunca anime o blur;
   - sem suporte a backdrop-filter: fundo --fundo-pagina com 96% de opacidade;
   - se --vidro-medio ou --borda-vidro não existirem em case-ux-ai-tokens.css,
     crie com os valores do Figma no modo Escuro:
     --vidro-medio: rgba(12, 26, 34, 0.68);
     --borda-vidro: rgba(255, 255, 255, 0.14);
   - use um listener de scroll passivo ou um IntersectionObserver num sentinela
     no topo da página. Nada de setState a cada frame.
   Se NavBar.tsx for compartilhada com outras páginas, isso vale só no modo
   sobreposto do case. Não mude as outras páginas.

3. Não mexa em mais nada. npm run build, e me diga arquivo por arquivo o que
   mudou. Depois role até a S02 e confirme que os links da nav nunca ficam por
   cima de texto sem a superfície atrás.
```

---

## 15. Imagem estática de alta qualidade

Pedido do Andreo em 24 set 2026: quando o vídeo para, o quadro final ficava ruim.
O motivo é que o último quadro do `hero-v2` é um quadro de vídeo comprimido, e o
objeto ainda está em movimento no último quadro: ele para de repente.

**O que muda:**

1. **Uma imagem estática de alta qualidade fica por cima do vídeo** e aparece nos
   dois momentos parados: antes de o vídeo começar (substitui o poster) e depois
   que ele termina. É o mesmo quadro do arquivo `HERO-STATIC.png` que o Andreo
   escolheu, tirado do vídeo original em 2880 px e não do PNG: o PNG tem só 82
   cores e mostraria faixas no degradê do fundo, e tem metade da resolução.
2. **O fim do vídeo desacelera.** No último 1,2s o `playbackRate` cai de 1 para
   0,4 com curva de saída. O objeto chega devagar na forma de repouso, em vez de
   frear de uma vez.
3. **No `ended`, a imagem estática entra em cross-fade** de 700ms. O último quadro
   do vídeo e a imagem são quase a mesma forma (o ciclo termina onde começou),
   então a troca se lê como o objeto assentando e ganhando nitidez.

**Arquivos**, já em `public/case-ux-ai/`:

| arquivo | px | peso |
|---|---|---|
| `hero-static-1440.avif` | 1440 × 1080 | 23 KB |
| `hero-static-1440.webp` | 1440 × 1080 | 25 KB |
| `hero-static-2880.avif` | 2880 × 2160 | 47 KB |
| `hero-static-2880.webp` | 2880 × 2160 | 57 KB |

Mesma proporção 4:3 do vídeo e mesmo enquadramento: com o mesmo CSS do vídeo,
a imagem cai exatamente em cima dele. Fundo do canto em `#050B0E`, igual à
página.

**Tokens**, acrescente ao bloco do hero em `src/motion/caseUxAiTokens.ts`:

```ts
/** Imagem estática do hero: aparece antes do play e depois do fim do vídeo. */
export const HERO_STATIC = {
  avif: { '1x': '/case-ux-ai/hero-static-1440.avif', '2x': '/case-ux-ai/hero-static-2880.avif' },
  webp: { '1x': '/case-ux-ai/hero-static-1440.webp', '2x': '/case-ux-ai/hero-static-2880.webp' },
  largura: 1440,
  altura: 1080,
  /** Saída do poster quando o primeiro quadro do vídeo aparece. */
  fadeOut: 0.24,
  /** Entrada da imagem no fim do vídeo. */
  fadeIn: 0.7,
  /** Desaceleração no fim do vídeo. */
  desacelera: { ultimos: 1.2, taxaMinima: 0.4 },
} as const
```

**Estrutura** dentro do `HeroMedia`:

```
<div class="hero-media">                 recebe o fade de entrada do beat `video`
  <video … />                            SEM atributo poster
  <picture class="hero-static">          mesmo CSS de caixa, object-fit e máscara do vídeo
    <source type="image/avif"
            srcset="hero-static-1440.avif 1440w, hero-static-2880.avif 2880w"
            sizes="(min-width: 1440px) 1440px, 100vw" />
    <img src="hero-static-1440.webp"
         srcset="hero-static-1440.webp 1440w, hero-static-2880.webp 2880w"
         sizes="(min-width: 1440px) 1440px, 100vw"
         width="1440" height="1080" alt="" aria-hidden="true"
         fetchpriority="high" decoding="async" />
  </picture>
</div>
```

```
Hero, imagem estática. Leia docs/BRIEF-S01-HERO.md seção 15.

1. Tokens: acrescente HERO_STATIC em src/motion/caseUxAiTokens.ts exatamente como
   na seção 15. Os quatro arquivos já estão em public/case-ux-ai/.

2. No HeroMedia, coloque o <picture> da seção 15 por cima do <video>, com a mesma
   caixa, o mesmo object-fit e a mesma máscara radial do vídeo. Tire o atributo
   poster do vídeo e pare de referenciar hero-v2-poster.webp. O fade de entrada
   do beat `video` passa a valer para o wrapper dos dois, não só para o vídeo.

3. Começo: a imagem está visível. Quando o vídeo apresentar o primeiro quadro
   (requestVideoFrameCallback, com fallback no evento playing), a imagem vai a
   opacity 0 em HERO_STATIC.fadeOut. O quadro 0 do vídeo é o mesmo da imagem, a
   troca não aparece.

4. Fim: a partir de duration − HERO_STATIC.desacelera.ultimos, reduza
   video.playbackRate de 1 até desacelera.taxaMinima com curva de saída
   (1 − (1 − p)^3), atualizando a cada 100ms, não a cada quadro. No ended, a
   imagem volta a opacity 1 em HERO_STATIC.fadeIn com EASE.state. Restaure o
   playbackRate para 1 depois.

5. Reduced motion, falha de autoplay ou erro de vídeo: a imagem fica visível e o
   vídeo não toca. Nada muda na sequência de texto.

6. Anime só opacity. will-change: opacity só durante os dois fades.

Não mexa em mais nada. npm run build, e me diga: quanto tempo o vídeo leva do
play até a imagem voltar, e se a troca no começo aparece.
```
