# Brief cirúrgico · S02 Visão Geral (v3, explorador com vídeo)

Reescrito em 24 set 2026. **Substitui as versões anteriores inteiras.** O diagrama
em cruz saiu: cada capacidade agora tem um vídeo.

Fonte no Figma, dentro de `Case (Dark) v2 · Modo Repouso`, um frame por capacidade:

| capacidade | frame | nó do vídeo |
|---|---|---|
| 01 Reconhecer | `1022:1356` | `1022:1403` |
| 02 Classificar | `1022:1475` | `1022:1522` |
| 03 Priorizar | `1022:1584` | `1022:1631` |
| 04 Contextualizar | `1022:1693` | `1022:1740` |

O frame antigo `800:1035` (com o diagrama) fica como referência de layout da
intro e da paginação, que não mudaram.

Leia antes: `docs/CONTRATO-RESPONSIVO.md` e `docs/MOTION-SPEC-SYSMED.md`. O que este
brief disser vence os dois.

Arquivo da seção: `src/sections/case-ux-ai/S02VisaoGeral.tsx`.

---

## 1. O que muda nesta versão

- **Vídeo no lugar do diagrama.** Cada capacidade mostra o próprio vídeo à direita
  do texto.
- **O tempo de cada capacidade é a duração do vídeo dela.** O avanço acontece no
  evento `ended`, não num timer.
- **Roda em ciclo.** Depois do 04, volta ao 01. Pausa sempre à mão no botão.
- **Troca manual** pelos pontos, pelo teclado e deslizando no toque.
- **Enquadramento sem corte.** O Figma usa `FILL` e `CROP` e corta o topo e a base
  de alguns objetos. O código **não** reproduz esse recorte: usa arquivos já
  enquadrados e mostra o quadro inteiro.
- **Sem legenda.** "essas capacidades não funcionam isoladamente" não existe mais
  nos frames novos do Figma. Sai do código.
- **Botão com dois estados**: Pausar e Reproduzir. "Ver de novo" saiu, porque o
  ciclo não termina.

---

## 2. Os vídeos (prontos, não reprocessar)

Já estão em `public/case-ux-ai/capacidades/`. Foram gerados a partir dos quatro
arquivos que o Andreo colocou em `public/`.

| arquivo base | px | duração | quadros | webm | mp4 | poster |
|---|---|---|---|---|---|---|
| `cap-01-reconhecer` | 618 × 544 | 5,0s | 150 | 79 KB | 117 KB | 17 KB |
| `cap-02-classificar` | 602 × 544 | 4,0s | 120 | 312 KB | 318 KB | 21 KB |
| `cap-03-priorizar` | 622 × 544 | 4,0s | 120 | 304 KB | 299 KB | 20 KB |
| `cap-04-contextualizar` | 544 × 544 | 4,0s | 120 | 330 KB | 310 KB | 11 KB |

Cada um tem `.webm` (VP9), `.mp4` (H.264 High 3.1, faststart) e `-poster.webp`
(primeiro quadro). 30fps, sem áudio, cor marcada em BT.709.

**O que foi feito nos arquivos:**

1. **Fundo normalizado quadro a quadro para `#15252E`**, o `--superficie-elevada`
   do painel. Os originais tinham fundo `#0B202B`, mais escuro que o painel, e
   variavam no tempo: o 02 clareava o fundo inteiro no meio do vídeo, mais forte
   em cima. A correção atua só no fundo e nas partes transparentes do vidro; os
   brilhos do objeto ficam intactos.
2. **Enquadrado pelo conteúdo real**, medido em todos os quadros, com 12% de
   margem de cada lado. Nenhum pedaço do objeto encosta na borda do arquivo.
3. **Borda esfumada embutida**: a margem vai suavemente para `#15252E` puro. A
   borda do vídeo é exatamente a cor do painel.
4. **O 04 foi girado 180°**, como está no Figma (`rotation: 180` no preenchimento).
   Não gire no CSS.
5. **Resolução de 2× do tamanho exibido** (272px de altura na tela → 544 no
   arquivo). Os quatro juntos têm cerca de 1 MB em webm, contra 2,5 MB dos
   originais.

Por que não sincronizar a cor do painel com o vídeo em tempo real: o clarão do 02
não é uniforme (mais forte em cima), então pintar o painel inteiro não casaria com
a borda do vídeo; e o texto à esquerda ia pulsar junto. Corrigir dentro do arquivo
deixa o fundo idêntico ao painel em todo quadro, sem custo em tempo de execução.

**Dependência:** os vídeos estão casados com `#15252E`. Se `--superficie-elevada`
mudar, os arquivos precisam ser reprocessados. Não troque a cor do painel.

**Os originais** (`01 - Reconhecer.webm` e os outros três, na raiz de `public/`)
não são usados. Mova para `assets-src/capacidades/`, fora do build, para não
irem para o deploy.

---

## 3. Estrutura

```
<section id="visao-geral">                                    Container, padding 64
  <hr class="divisor" />
  <p class="eyebrow">VISÃO GERAL</p>
  <div class="intro"> <h2 /> <p class="corpo" /> </div>

  <div class="explorador" role="group"
       aria-roledescription="carrossel" aria-label="Quatro capacidades">

    <div class="painel">
      <div class="slides" aria-live="off | polite">              4 slides na MESMA célula de grid
        4 × <div role="tabpanel" id="cap-01" aria-labelledby="tab-01">
              <p class="rotulo">ETAPA ATIVA</p>
              <h3>01. Reconhecer</h3>
              <p class="descricao" />
            </div>
      </div>
      <div class="palco" aria-hidden="true">                       432 × 272
        4 × <video muted playsinline disablepictureinpicture
                   disableremoteplayback preload="none" tabindex="-1"
                   width="618" height="544" poster="…-poster.webp">
              <source src="….webm" type="video/webm; codecs=vp9" />
              <source src="….mp4"  type='video/mp4; codecs="avc1.64001F"' />
            </video>
      </div>
    </div>

    <div class="navegacao">
      <div role="tablist" aria-label="Capacidades" class="pilula">
        4 × <button role="tab" id="tab-01" aria-controls="cap-01"
                    aria-selected aria-label="01. Reconhecer" />
      </div>
      <button class="play" aria-label="Pausar | Reproduzir" />
    </div>
  </div>
</section>
```

- Os quatro slides de texto ficam empilhados na mesma célula de grid
  (`grid-area: 1 / 1`): o painel tem sempre a altura do slide mais alto. Slide
  inativo com `opacity: 0` e `visibility: hidden`, nunca `display: none`.
- Os quatro vídeos também ficam empilhados, na célula do palco. Todos montados o
  tempo todo; só um visível.
- Os vídeos são decorativos (`aria-hidden`, `tabindex="-1"`, sem `controls`). A
  informação está no texto.
- Sem atributo `autoplay`. O player chama `play()` quando deve.

---

## 4. Geometria, desktop 1440

Coordenadas da seção. Coluna de conteúdo de x120 a x1320. Intro e navegação
iguais à v2.

| elemento | x | y | w | h | notas |
|---|---|---|---|---|---|
| Seção | 0 | 0 | 1440 | 731 | padding 64/120 |
| Divisor | 120 | 64 | 1200 | 1 | `--superficie-hover` |
| Eyebrow | 120 | 97 | 80 | 18 | |
| Intro | 120 | 147 | 1200 | 96 | título 608, corpo em x792 com 528, gap 64 |
| Painel | 120 | 307 | 1200 | 272 | 64 abaixo da intro |
| Texto do slide | 168 | centro | 608 | 104 | centralizado na vertical |
| Palco do vídeo | 840 | 307 | 432 | 272 | **encosta no topo e na base do painel** |
| Navegação | 600 | 611 | 240 | 56 | 32 abaixo do painel, centralizada |

**Painel.** Fundo `--superficie-elevada`, borda 1px `--borda-padrao` por dentro,
raio 24, `overflow: hidden`. Sem `backdrop-filter`.

```css
.painel {
  display: grid;
  grid-template-columns: 1fr 432px;
  column-gap: 64px;
  padding-inline: 48px;          /* sem padding vertical: o palco usa a altura toda */
  height: 272px;
  align-items: center;
}
.slides { padding-block: 48px; }
.palco  { height: 100%; }
```

O palco ocupa a altura inteira do painel de propósito: o objeto fica do tamanho
que o Figma mostra (cerca de 220px de altura) sem cortar nada. Como a borda do
vídeo é a cor do painel, não aparece caixa.

---

## 5. Enquadramento do vídeo

**Regra: o vídeo inteiro sempre aparece.** Nada de `object-fit: cover`, nada de
recorte, nada de escala acima do quadro.

Cada `<video>` tem `width` e `height` com as medidas do arquivo (tabela da seção
2), para o navegador reservar a proporção antes de carregar. No CSS:

```css
.palco {
  display: grid;
  place-items: center;
}
.palco video {
  grid-area: 1 / 1;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;               /* o palco precisa ter altura definida */
  display: block;
  background: transparent;
}
```

Assim a caixa do elemento é exatamente o tamanho do vídeo desenhado, sem faixa
vazia. Isso importa para a máscara abaixo, que é em porcentagem da caixa.
**Confira com um `outline` temporário** que a caixa do `<video>` coincide com o
quadro desenhado nos quatro vídeos.

Em 1440 os quatro ficam com 272 de altura: 01 com 309 de largura, 02 com 301,
03 com 311 e 04 com 272.

**Máscara de borda**, rede de segurança para diferença de cor entre o decodificador
de vídeo e o CSS (acontece no Safari e em telas de gama ampla):

```css
.palco video {
  -webkit-mask-image:
    linear-gradient(to right, transparent, #000 7%, #000 93%, transparent),
    linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent);
  -webkit-mask-composite: source-in;
          mask-image:
    linear-gradient(to right, transparent, #000 7%, #000 93%, transparent),
    linear-gradient(to bottom, transparent, #000 7%, #000 93%, transparent);
          mask-composite: intersect;
}
```

Os 7% caem dentro da margem de 12% do arquivo, onde só existe fundo. A máscara
nunca apaga o objeto. Ela é estática: não anime.

---

## 6. Tipografia

| elemento | família | peso | tamanho | entrelinha | tracking | cor |
|---|---|---|---|---|---|---|
| Eyebrow | Outfit | SemiBold | 12 | 150% | 2% | `--acao-link` |
| Título | Hanken Grotesk | SemiBold | 32 | 110% | -2% | `--texto-principal` |
| Destaque do título | idem | idem | 32 | | | gradiente do hero |
| Corpo | Outfit | Regular | 16 | 150% | 0 | `--texto-apoio` |
| Rótulo ETAPA ATIVA | JetBrains Mono | Regular | 12 | 16px | 1,5px | `--acao-hover` |
| Nome (`01. Reconhecer`) | Outfit | SemiBold | 24 | 32px | 0 | `--texto-principal` |
| Descrição | Outfit | Regular | 16 | 24px | 0 | `--texto-apoio` |

Abaixo de 768: título 28, nome 20 com entrelinha 28.

---

## 7. Tokens e correções

`--controle-inativo: #727F8B` em `case-ux-ai-tokens.css`, se ainda não existir
(ponto não visitado; 3,8:1 sobre a pílula).

Na intro, continuam valendo: título em `--texto-principal` (não `#E7E8E9`),
"decidir melhor" com o gradiente do hero, ponto final na cor do título.

---

## 8. Conteúdo

Substitua o bloco `visaoGeral` em `src/data/caseUxAi.ts`:

```ts
// ── 02 · Visão Geral · Figma 1022:1356, 1022:1475, 1022:1584, 1022:1693 ──
const CAPACIDADES_BASE = '/case-ux-ai/capacidades/'

export const visaoGeral = {
  eyebrow: 'VISÃO GERAL',
  title: {
    lines: ['IA pode acelerar a análise.', 'Mas acelerar não significa decidir melhor.'],
    highlight: ['decidir melhor'],
  },
  body:
    'Modelos de linguagem conseguem processar grandes volumes de informação e ' +
    'encontrar padrões rapidamente. Em sistemas hospitalares, porém, uma decisão ' +
    'de UX pode depender de fatores que não estão visíveis na interface.',
  explorador: {
    ariaLabel: 'Quatro capacidades',
    rotulo: 'ETAPA ATIVA',
    controles: { pausar: 'Pausar', reproduzir: 'Reproduzir' },
    base: CAPACIDADES_BASE,
    capacidades: [
      { n: '01', nome: 'Reconhecer',     descricao: 'Identificar qual princípio de usabilidade está sendo violado.',
        video: { slug: 'cap-01-reconhecer',     largura: 618, altura: 544, duracao: 5.0 } },
      { n: '02', nome: 'Classificar',    descricao: 'Organizar grandes volumes de problemas e encontrar padrões.',
        video: { slug: 'cap-02-classificar',    largura: 602, altura: 544, duracao: 4.0 } },
      { n: '03', nome: 'Priorizar',      descricao: 'Determinar o que precisa ser resolvido primeiro.',
        video: { slug: 'cap-03-priorizar',      largura: 622, altura: 544, duracao: 4.0 } },
      { n: '04', nome: 'Contextualizar', descricao: 'Considerar rotina, frequência, impacto clínico e risco.',
        video: { slug: 'cap-04-contextualizar', largura: 544, altura: 544, duracao: 4.0 } },
    ],
  },
} as const
```

Caminhos: `${base}${slug}.webm`, `${base}${slug}.mp4`, `${base}${slug}-poster.webp`.
A `duracao` é só referência (fallback e testes): quem manda no tempo é o evento
`ended` do vídeo.

---

## 9. Comportamento do player

### Tokens

Em `src/motion/caseUxAiTokens.ts`. Se `CAPACIDADES_AUTOPLAY` existir da v2,
substitua:

```ts
/** S02: player do explorador das capacidades. O tempo de cada slide é a duração do vídeo. */
export const CAPACIDADES_PLAYER = {
  /** Fração da seção visível para o player rodar. */
  visibleRatio: 0.5,
  /** Espera depois que a entrada da seção termina, em segundos. */
  startDelay: 0.4,
  /** Distância da viewport em que os vídeos começam a carregar. */
  preloadMargin: '600px',
  /** A troca começa este tanto antes do fim do vídeo, em segundos. */
  antecipa: 0.5,
  /** Coreografia da troca de slide (seção 19). Segundos e px. */
  transicao: {
    video: 0.9,
    escalaEntrada: 1.03,
    textoSai: 0.28,
    textoEntra: 0.48,
    textoAtraso: 0.24,
    textoDesloc: 8,
    capsula: 0.6,
  },
} as const
```

### Estado

Tudo num hook, `src/sections/case-ux-ai/s02/useCapacidadesPlayer.ts`:

```
ativo:     0 a 3                       (useState)
tocando:   boolean, o que o botão mostra (useState)
vistos:    Set dos slides já mostrados   (useState)
segurado:  boolean, pausa temporária     (ref, não state)
progresso: 0 a 1 da cápsula              (MotionValue, nunca state)
videos:    refs dos quatro <video>
```

### Regras

1. **Carregar.** Quando a seção chega a `preloadMargin` da viewport, uma vez só:
   põe `preload="auto"` nos quatro e chama `load()`. Antes disso, `preload="none"`
   e só o poster.
2. **Começar.** Terminada a entrada da seção, espera `startDelay`. Se a seção
   estiver visível acima de `visibleRatio` e não houver reduced motion nem
   Save-Data, liga `tocando` e dá `play()` no vídeo 01.
3. **Avançar.** Quando o vídeo ativo chega a `duration − antecipa`, com
   `tocando`, vai para o próximo: `(ativo + 1) % 4`. **Do 04 volta ao 01.** O
   ciclo não para sozinho. O vídeo que sai continua tocando até o fim durante o
   fade, para não congelar em movimento. Use o `ended` só como rede de segurança,
   se o quadro de `duration − antecipa` for perdido.
4. **Trocar de slide** (`irPara(k, tocar)`):
   - vídeo `k`: `currentTime = 0`, e `play()` se `tocar` e não `segurado`;
   - `ativo = k`, `k` entra em `vistos`, `progresso` volta a 0;
   - a coreografia da seção 19: cross-fade longo nos vídeos, texto que sai
     primeiro e texto que entra depois;
   - no fim do fade, o vídeo que saiu recebe `pause()` e `currentTime = 0`, para
     estar pronto no primeiro quadro quando voltar.
   - Clicar no ponto do slide que já está ativo não faz nada.
5. **Pausar e reproduzir.** O botão alterna `tocando`. Pausar congela o vídeo e a
   cápsula onde estão. Reproduzir continua do mesmo ponto.
6. **Troca manual por ponteiro** (clique ou toque num ponto, deslizar no painel):
   `irPara(k, true)` e `tocando = true`. Quem escolhe uma capacidade quer vê-la
   rodar, como nas galerias da Apple. Em reduced motion, `irPara(k, false)`.
7. **Troca por teclado** (setas, Home, End): `irPara(k, false)` e
   `tocando = false`. O vídeo aparece parado no primeiro quadro. Para rodar, a
   pessoa vai ao botão. Foco de teclado entrando na paginação também desliga
   `tocando` (padrão de carrossel do WAI-ARIA APG). Detecte com
   `el.matches(':focus-visible')` no `focus`, para o clique do mouse não contar.
8. **Segurar** (pausa o vídeo sem mudar o botão): seção abaixo de
   `visibleRatio` na tela (`IntersectionObserver` com `threshold: [0, 0.5]`) ou
   `document.hidden`. Soltou, e se `tocando`, `play()` de onde parou.
9. **Falha de autoplay.** Se `play()` rejeitar (modo de pouca energia no iPhone,
   política do navegador), `tocando = false`, fica o poster, o botão mostra
   "Reproduzir". Nunca deixe a promessa sem `catch`.
10. **Leitor de tela.** `aria-live="off"` nos slides enquanto `tocando`,
    `"polite"` quando não.

### Progresso da cápsula

`progresso = min(1, currentTime / (duration − antecipa))` do vídeo ativo,
atualizado a cada quadro enquanto ele toca. A cápsula enche exatamente até o
instante da troca:

- use `video.requestVideoFrameCallback` e leia `metadata.mediaTime`;
- sem suporte, `requestAnimationFrame` lendo `currentTime`;
- pare o laço no `pause` e no `ended`, e ao desmontar;
- escreva só no `MotionValue`. Nenhum `setState` por quadro.

Na troca, o progresso já está em 1; a cápsula encolhe cheia, sem voltar.

### Deslizar no toque

Em `pointer: coarse`, arrastar na horizontal sobre o painel troca a capacidade:
mais de 48px e mais horizontal que vertical. Esquerda vai para a próxima, direita
volta, com ciclo nas pontas. Use `touch-action: pan-y` no painel.

### Muted no React

Antes de todo `play()`, garanta `video.muted = true` pela ref. O React não aplica
o atributo `muted` de forma confiável, e sem ele o iOS recusa o `play()`.

---

## 10. Estados visuais

### Paginação

Sem mudança de desenho em relação à v2:

| peça | medida |
|---|---|
| pílula | altura 56, raio 28, fundo `--superficie-elevada` |
| ponto | 8 × 8 |
| cápsula ativa | 48 × 8, raio 4 |
| espaço visual entre peças | 16 |
| borda da pílula à primeira peça | 24 |
| botão | 56 × 56, círculo, fundo `--superficie-elevada`, ícone 20px `--texto-principal` |
| pílula até o botão | 16 |

| peça | não visto | visto | ativo |
|---|---|---|---|
| ponto | `--controle-inativo` | `--acao-link` | vira cápsula |
| cápsula | | | trilho `--controle-inativo`, enchimento em degradê |

Depois da primeira volta completa, os quatro ficam em `--acao-link` e assim
permanecem.

- **Enchimento:** degradê do hero (`--gradiente-destaque-de` a
  `--gradiente-destaque-para`) fixo em 48px, revelado por
  `clip-path: inset(0 calc((1 - p) * 100%) 0 0 round 4px)`. Não use `scaleX`.
- **Troca de ativo:** `layout` do framer-motion nos itens da pílula,
  `transicao.capsula` (600ms), `EASE.state`. Não anime `width`.
- **Área de clique:** `--hit` de 24px com ponteiro fino e 44px em
  `pointer: coarse`, como na v2.
- **Hover** (só em `@media (hover: hover)`): ponto não visto vai para
  `--texto-metadado`, visto para `--acao-hover`; botão com fundo
  `--superficie-hover`.
- **Ícones do botão:** pausa (duas barras 4×14, raio 1, 4 de espaço) e play
  (triângulo). SVG inline de 20px.

### Palco e texto

Coreografia completa na seção 19. Em resumo: vídeos em cross-fade longo de
900ms, o que entra assentando de 1.03 para 1; texto que sai some rápido, texto
que entra chega depois, subindo 8px. `will-change` só durante a troca.

---

## 11. Teclado e foco

- **Tab** entra na paginação num ponto de parada só (roving tabindex), no ponto
  ativo. O Tab seguinte vai ao botão.
- **Setas** esquerda e direita trocam e ativam na hora. **Home** e **End** vão ao
  01 e ao 04. No teclado não dá a volta: na ponta, a seta não faz nada.
- **Espaço** e **Enter** no botão alternam Pausar e Reproduzir.
- Anel de foco (2px, `--acao-foco`, offset 3px) no `<span>` visível do ponto ou da
  cápsula, com o raio dele. No botão, circular.
- O botão vem depois da pílula no DOM, na ordem visual.

---

## 12. Responsivo

| faixa | intro | painel | palco |
|---|---|---|---|
| ≥ 1024 | linha, `1fr 1fr` (608 + 64 + 528 em 1440) | grade `1fr 432px`, altura 272 | 432 × 272, encostado em cima e embaixo |
| 768 a 1023 | empilha | empilha: texto, depois palco; padding 32; altura automática | quadrado, `width: min(100%, 360px)`, centralizado |
| < 768 | empilha, título 28 | empilha, padding 24, raio 16 | quadrado, `width: 100%`, `max-width: 360px` |

- No palco quadrado, os vídeos continuam sem corte (`max-width` e `max-height`):
  o 04 ocupa o quadrado todo e os outros ficam um pouco mais baixos.
- `aspect-ratio: 1` no palco empilhado, para ele ter altura definida antes do vídeo
  carregar e o `max-height: 100%` funcionar.
- A altura do painel não muda na troca de slide em nenhuma largura.

---

## 13. Motion de entrada

Uma vez, quando a seção entra (`VIEWPORT`):

| t | elemento | movimento |
|---|---|---|
| 0ms | divisor | `enterRule` |
| 120ms | eyebrow | fade |
| 200ms | título | `enterFadeUp` |
| 280ms | corpo | `enterFadeUp` |
| 480ms | painel | `enterCard` |
| 640ms | texto do slide 01 | `enterFadeUp` curto, 8px |
| 720ms | palco (poster do 01) | fade, 400ms, `EASE.enter` |
| 1040ms | pílula e botão | `enterFadeUp` curto, 8px |
| fim da entrada + `startDelay` | vídeo 01 | `play()`; a cápsula começa a encher |

**Reduced motion:** tudo visível com fade de 200ms. O player não liga sozinho: o
botão nasce em "Reproduzir" e os pontos mostram o poster de cada capacidade. Se a
pessoa apertar Reproduzir, o player roda normalmente, porque foi escolha dela.
Troca de slide sem fade.

**Save-Data** (`navigator.connection?.saveData`): igual ao reduced motion quanto ao
autoplay, e `preload="none"` até a pessoa apertar Reproduzir.

---

## 14. Performance

- **Um vídeo tocando por vez.** Dois só durante os 320ms do cross-fade.
- **Nada carrega antes da hora:** `preload="none"` até `preloadMargin`. O hero tem
  prioridade.
- **Nenhum `setState` por quadro.** Progresso em `MotionValue`, escrito pelo
  `requestVideoFrameCallback`.
- **Só composição:** opacidade nos vídeos e nos slides, `clip-path` na cápsula,
  `transform` na troca de ponto. A máscara é estática.
- **Sem layout shift:** `width` e `height` no `<video>`, painel de altura fixa no
  desktop e palco com `aspect-ratio` no mobile.
- **Pausa fora da tela e com a aba escondida.**
- **Sem `backdrop-filter`** no painel, na pílula ou no palco.
- **Orçamento:** cerca de 1 MB de vídeo (webm) e 70 KB de posters para a seção
  inteira.
- **Ordem das fontes:** webm (VP9) primeiro, mp4 depois, para Safari antigo.

---

## 15. Etapa 1 · Vídeos e composição

```
S02 com vídeos. Leia docs/BRIEF-S02-VISAO-GERAL.md inteiro: é a versão 3,
reescrita hoje, e substitui as anteriores. No Figma, um frame por capacidade:
1022:1356, 1022:1475, 1022:1584 e 1022:1693.

1. Os vídeos prontos estão em public/case-ux-ai/capacidades/ (seção 2). Não
   reencode, não recorte, não gire. Mova os quatro originais da raiz de public/
   ("01 - Reconhecer.webm" e os outros três) para assets-src/capacidades/, fora
   do build.

2. Substitua o bloco visaoGeral em src/data/caseUxAi.ts pelo da seção 8. Se
   existirem da versão anterior, remova o diagrama em cruz, a legenda e o estado
   "Ver de novo".

3. Painel com a grade da seção 4: texto à esquerda, palco de 432×272 à direita,
   encostado no topo e na base do painel (padding só na horizontal).

4. Palco com os quatro <video> empilhados, atributos da seção 3, enquadramento e
   máscara da seção 5. Sem object-fit cover, sem recorte. Só o 01 visível, no
   poster.

5. Paginação e botão estáticos, como na seção 10. Botão com o ícone de pausa.

Sem comportamento ainda. npm run build e me diga arquivo por arquivo o que mudou.
Depois, em 1440, confira duas coisas e me diga: a caixa de cada <video>
(outline temporário) coincide com o quadro desenhado, e não aparece nenhum
retângulo de cor diferente em volta do objeto.
```

---

## 16. Etapa 2 · Player

```
S02, etapa 2. Leia as seções 9, 10 e 11 de docs/BRIEF-S02-VISAO-GERAL.md, na
ordem.

1. CAPACIDADES_PLAYER em src/motion/caseUxAiTokens.ts, exatamente como na seção 9.
   Se CAPACIDADES_AUTOPLAY existir, substitua.

2. Hook useCapacidadesPlayer em src/sections/case-ux-ai/s02/, com o estado da
   seção 9. Progresso em MotionValue, nunca em state.

3. As regras 1 a 10 da seção 9: carregar, começar, avançar no ended com ciclo
   do 04 para o 01, trocar com cross-fade, pausar e reproduzir, troca por ponteiro
   (continua tocando), troca por teclado (para), segurar fora da tela e com a aba
   escondida, falha de autoplay, aria-live.

4. Cápsula dirigida pelo tempo do vídeo: requestVideoFrameCallback com fallback em
   requestAnimationFrame, clip-path no enchimento, progresso a 1 no ended.

5. Pontos vistos em --acao-link, troca de ativo com layout do framer-motion, hover
   só em @media (hover: hover), anel de foco no span visível.

6. Teclado da seção 11 e deslizar no toque da seção 9.

7. video.muted = true pela ref antes de todo play(), e catch em todo play().

Ao terminar, me descreva cinco testes e o que o botão e a cápsula mostraram em
cada um: deixar rodar dois ciclos completos; clicar no 03 no meio do 01; pausar
no meio do 02 e retomar; rolar a seção para fora da tela e voltar; navegar só com
teclado.
```

---

## 17. Etapa 3 · Responsivo, entrada e performance

```
S02, etapa 3, a última. Leia as seções 12, 13 e 14 de
docs/BRIEF-S02-VISAO-GERAL.md.

1. Responsivo da seção 12: painel em grade a partir de 1024; abaixo empilha, com
   o palco quadrado (aspect-ratio 1, até 360px) embaixo do texto. Título 28 e nome
   20 abaixo de 768. A altura do painel não muda na troca em nenhuma largura.

2. Entrada da seção 13. O player só liga depois do fim da entrada mais
   startDelay, e só com metade da seção visível.

3. Reduced motion e Save-Data da seção 13: sem autoplay, botão em "Reproduzir",
   poster em cada ponto, troca sem fade.

4. Confira a seção 14 item por item. No Chrome DevTools, aba Performance, grave
   um ciclo completo e me diga: quantos vídeos tocam ao mesmo tempo, se aparece
   alguma long task, e se há layout shift.

Teste em 360, 768, 1024, 1280, 1440 e 1920. Nenhum scroll horizontal. npm run
build no fim.
```

---

## 18. Critério de pronto

(Ver também a seção 19.)

- [ ] Em 1440, texto à esquerda e vídeo à direita, como nos frames `1022:1356` a
      `1022:1693`, com o objeto inteiro visível em todos os quadros dos quatro
      vídeos.
- [ ] Nenhum retângulo de cor em volta do vídeo, inclusive no meio do 02, onde o
      original clareava.
- [ ] O 04 aparece girado como no Figma, sem rotação no CSS.
- [ ] Cada capacidade fica na tela exatamente a duração do vídeo: 5s, 4s, 4s, 4s.
- [ ] Depois do 04 volta ao 01, sem parar.
- [ ] Pausar congela vídeo e cápsula; Reproduzir continua do mesmo ponto.
- [ ] Clicar num ponto troca e continua rodando; seta do teclado troca e para.
- [ ] Fora da tela, nenhum vídeo toca.
- [ ] A altura do painel nunca muda.
- [ ] Sem legenda, sem diagrama em cruz.
- [ ] Nenhum tamanho de fonte ímpar.

E no geral: o checklist da seção 9 do contrato.

---

## 19. Ajuste: transição mais suave

Pedido do Andreo em 24 set 2026: a troca entre os slides estava brusca. Três
causas: o fade era curto (320ms), o vídeo que saía congelava em movimento no
último quadro, e o texto trocava ao mesmo tempo que o vídeo, as duas frases
sobrepostas.

**Coreografia da troca**, a partir do instante `t = 0` em que ela começa (que no
avanço automático é `duration − antecipa` do vídeo que sai):

| t | elemento | movimento |
|---|---|---|
| 0 | vídeo que entra | `currentTime = 0`, `play()`, opacity 0 → 1 em 900ms, `EASE.state`; scale 1.03 → 1 em 900ms, `EASE.enter` |
| 0 | vídeo que sai | continua tocando até o fim; opacity 1 → 0 em 900ms, `EASE.state`; scale 1 → 0.98, `EASE.state` |
| 0 | texto que sai | opacity 1 → 0 em 280ms, `EASE.exit`, sem deslocamento |
| 0 | cápsula | encolhe no ponto antigo e cresce no novo, `layout`, 600ms, `EASE.state` |
| 240ms | texto que entra | opacity 0 → 1 e y 8px → 0 em 480ms, `EASE.enter` |
| 900ms | vídeo que saiu | `pause()`, `currentTime = 0`, `visibility: hidden`, tira o `will-change` |

- O texto nunca aparece sobreposto: o que sai termina (280ms) antes de o que
  entra ganhar opacidade visível.
- A escala só existe no vídeo e é `transform`. Nada de blur.
- `will-change: opacity, transform` nos dois vídeos só entre 0 e 900ms.
- Troca manual (ponto, seta, deslizar) usa a mesma coreografia, começando na hora
  do clique.
- Clique durante uma troca em andamento: a troca nova começa do estado atual,
  sem esperar a anterior terminar (framer-motion interrompe e segue da opacidade
  em que está).
- Reduced motion: troca instantânea, sem escala.

```
S02, ajuste de transição. Leia a seção 19 de docs/BRIEF-S02-VISAO-GERAL.md e as
regras 3 e 4 da seção 9, que foram atualizadas.

1. Em src/motion/caseUxAiTokens.ts, acrescente antecipa e transicao ao
   CAPACIDADES_PLAYER, exatamente como na seção 9.

2. Avanço antecipado: a troca começa quando o vídeo ativo chega a
   duration − antecipa (detecte no requestVideoFrameCallback que já atualiza a
   cápsula). O vídeo que sai continua tocando até o fim durante o fade. O ended
   fica só como rede de segurança.

3. Cápsula: progresso = min(1, currentTime / (duration − antecipa)). Troca de
   ativo com layout em transicao.capsula.

4. Coreografia da tabela da seção 19: vídeos em cross-fade de 900ms com escala
   1.03 → 1 no que entra e 1 → 0.98 no que sai; texto que sai em 280ms; texto que
   entra 240ms depois, em 480ms, subindo 8px. Nenhum número hardcoded: tudo de
   CAPACIDADES_PLAYER.transicao.

5. Troca durante troca: interrompe e segue do estado atual. Reduced motion:
   instantâneo.

npm run build. Depois deixe rodar um ciclo inteiro e me diga se algum vídeo
congela antes de sumir e se os dois textos chegam a aparecer juntos.
```

