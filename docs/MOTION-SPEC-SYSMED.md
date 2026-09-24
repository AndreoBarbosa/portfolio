# Spec de Motion — Case SYSMED (case-ux-ai)

Fonte de verdade de motion da página do case. Mora no repositório de propósito: o
`IMPLEMENTATION BLUEPRINT — CASE UX + AI` que os comentários do código citam
(§11, §14, §18, §23, §24) nunca foi commitado e se perdeu. Este arquivo substitui
a parte de motion dele. Se algo aqui conflitar com um comentário de código que
cita o blueprint, este arquivo vence e o comentário deve ser atualizado.

- Desenho: Figma `BPffDtLmobPgTMqljJPBoj`, frames `Case (Dark) v2 — Modo Repouso`
  (`814:1164`) e `Case (Dark) v2 — Modo Interativo` (`814:1165`).
- Material e cor: `Portfólio — Guia de Estilo Visual` (`917:1133`).
- Tokens de cor já implementados: `src/styles/case-ux-ai-tokens.css`.
- Tokens de motion já implementados: `src/motion/caseUxAiTokens.ts`.
- Receitas já implementadas: `src/motion/caseUxAiRecipes.ts`.
- Scroll e reduced motion: `src/motion/CaseUxAiMotionProvider.tsx`.

Atualizado em 23 set 2026. Sem 3D, sem Three.js nesta página.

---

## 1. A ideia que organiza tudo

O case tem uma tese: a IA reconhece o problema e erra a gravidade. A diferença
entre 68% e 48%.

O motion não decora a tese, ele a executa. Dois motivos, e nada além deles.

**Motivo A, a divergência.** Dois elementos nascem no mesmo ponto e se afastam
por uma distância mensurável. Aparece exatamente três vezes: seção 01 (IA e
Humanos saindo do mesmo objeto), seção 05 (especialistas e IA partindo do mesmo
corpus), seção 09 (as duas linhas de divisão de trabalho). Três vezes mantém o
motivo significativo. Uma quarta o transforma em maneirismo.

**Motivo B, a treliça.** A malha de linhas finas do fundo das seções 01 e 08
desenha o traço uma única vez, devagar, a 5% de opacidade. Nunca entra em loop.

**A regra de cor vale para o motion.** Hierarquia vem de luminância, não de
matiz. Todo hover sobe um degrau de luminância e nunca troca de matiz. E o azul
só entra depois que o neutro já está na tela, porque a IA chega depois dos dados.

Descartado de propósito: rotação, bounce, elástico, partícula em loop, gradiente
animado, cursor customizado, scrolljacking.

---

## 2. Tokens

Já existem. **Não criar nomes novos, não duplicar em CSS.** Importar de
`src/motion/caseUxAiTokens.ts`:

| Conceito | Token | Valor |
|---|---|---|
| entrada | `EASE.enter` | `[0.16, 1, 0.3, 1]` |
| troca de estado | `EASE.state` | `[0.65, 0, 0.35, 1]` |
| hover | `EASE.micro` | `[0.2, 0, 0, 1]` |
| saída | `EASE.exit` | `[0.4, 0, 1, 1]` |
| hover | `DUR.hover` | 0.2s |
| troca de estado | `DUR.state` | 0.32s |
| entrada de bloco | `DUR.enter` | 0.64s |
| título | `DUR.headline` | 0.8s |
| contagem de número | `DUR.data` | 1.0s |
| cascata de item | `STAGGER.item` | 0.064s |
| cascata de linha | `STAGGER.line` | 0.08s |
| cascata de célula | `STAGGER.cell` | 0.04s |
| cascata de stat | `STAGGER.stat` | 0.12s |
| teto de deslocamento de texto | `MOVE.md` | 24px |
| gatilho de entrada | `VIEWPORT` | `once: true`, margem `-15%` |

Receitas prontas em `caseUxAiRecipes.ts`: `enterFadeUp`, `enterCard`,
`enterRule`, `enterRuleVertical`, `enterDraw`, `lineMaskContainer`,
`lineMaskLine`, `staggerContainer`. Escolher a receita pelo tipo de elemento,
não por conveniência.

### Constantes do vídeo do hero

O tempo do hero é derivado do vídeo, não inventado. Medido no arquivo atual
(23 set 2026): VP9, sem canal alfa, movimento real do objeto só nos primeiros
1,6s, pico em 0,8s, e depois 8,3s de frame congelado. Ou seja, o arquivo original
era um loop com pausa longa embutida.

Criar em `src/motion/caseUxAiTokens.ts`:

```ts
/** Vídeo do hero. Ao trocar o arquivo, remedir e atualizar SÓ este bloco:
 *  o resto da sequência é derivado daqui. */
export const HERO_VIDEO = {
  webm: '/case-ux-ai/hero-motion.webm',
  mp4:  '/case-ux-ai/hero-motion.mp4',
  poster: '/case-ux-ai/hero-poster.webp',
  /** Duração do arquivo, em segundos. */
  duration: 2.0,
  /** Instante do pico de movimento do objeto. */
  motionPeak: 0.8,
  /** Instante em que o objeto para. */
  motionEnd: 1.6,
} as const

/** Sequência do hero, derivada de HERO_VIDEO. Não hardcodar segundos aqui. */
export const HERO_BEAT = {
  video:    0,
  chip:     HERO_VIDEO.motionPeak * 0.25,  // 0.20s
  headline: HERO_VIDEO.motionPeak * 0.40,  // 0.32s
  subtitle: HERO_VIDEO.motionPeak * 0.95,  // 0.76s
  columns:  HERO_VIDEO.motionEnd  * 0.63,  // 1.00s
  stats:    HERO_VIDEO.motionEnd  * 0.75,  // 1.20s
  hook:     HERO_VIDEO.motionEnd  * 1.06,  // 1.70s
} as const
```

Trocou o vídeo: meça o novo com `ffprobe` mais uma varredura de diferença entre
frames, atualize `duration`, `motionPeak` e `motionEnd`, e a sequência inteira se
recalibra sozinha. Se não tiver ffmpeg à mão, me mande o arquivo que eu meço.

Falta criar: `enterDivergence(direction)`, a receita do motivo A. Sai de
`x: 0, opacity: 0` para `x: ±distância, opacity: 1` com `EASE.enter` e
`DUR.enter`. Uma única implementação, usada nas três seções.

---

## 3. Regras transversais, não negociáveis

1. **Nunca animar o blur.** Regra do guia, seção 09. O `backdrop-filter` é
   montado no estado inicial e permanece. Anima opacidade, posição ou sombra.
   Vale para a nav: ela nasce com blur e o que sobe no scroll é a opacidade da
   superfície.
2. **Só `opacity` e `transform`.** Nada de `width`, `height`, `top`, `left`. A
   barra da seção 06 é a única que cresce, e usa `scaleX` com origem à esquerda.
3. **Reveal roda uma vez.** Usar `VIEWPORT`, que já tem `once: true`.
4. **Um movimento por vez no foco.** Mudança de luminância simultânea em vários
   elementos não conta como movimento.
5. **Máximo uma superfície `--vidro-forte` visível por vez.** Na prática isso a
   reserva para a pílula de briefing.
6. **Todo hover tem equivalente de teclado, e o foco nunca tem o mesmo desenho
   do hover.** Anel de 2px em `--acao-foco` com offset de 3px, igual em todo
   elemento focável. Acessibilidade é a tese do projeto: um case sobre
   julgamento humano não pode ser inoperável por teclado.
7. **Cor nunca é o único portador de informação.** A célula da matriz carrega o
   número, o chip do fluxo carrega a palavra.
8. **Nada com áudio.** Vídeo do hero é `muted playsinline`.
9. **`prefers-reduced-motion` desliga deslocamento, escala, desenho de traço,
   parallax e contagem.** Sobra fade curto e troca de estado instantânea.
   Nenhuma informação se perde: todo dado tem número escrito, a barra da 06
   renderiza cheia, a treliça renderiza pronta. WCAG 2.3.3, nível AAA, pede
   exatamente isso para motion disparado por interação.
10. **Sticky, scrub e parallax só em L/XL com ponteiro fino.** Já resolvido por
    `useCaseMotion().isDesktop`. Abaixo disso, a rolagem nativa é a experiência.

---

## 4. Entrada no case

Cortina neutra, não fade de página. Painel sólido em `--fundo-pagina` cobre de
baixo para cima em 350ms e revela de cima para baixo em 350ms. Durante a
cobertura, o vídeo do hero faz preload. Scroll travado só nesses 700ms.

Por que cortina: o piso `#050B0E` é o mesmo da home, então um fade cruzado não
comunica nada.

Reduced motion: corte seco.

---

## 5. Elementos persistentes

**Nav** (`components/case-ux-ai/layout/NavBar.tsx`). Transparente em repouso.
Passando de 120px de scroll, a opacidade da superfície sobe para `--vidro-medio`
e a aresta `--borda-vidro` aparece. 300ms em `EASE.state`. O blur já estava lá.

**Barra de progresso do case.** 2px no topo, largura dirigida pelo scroll da
página, em `--acao-link`. Único uso de acento em faixa longa, e com 2px de altura
não conflita com "acento é tinta, nunca superfície".

**Pílula de briefing.** Colapso do painel BRIEFING do fim da seção 03–04.
Aparece quando o painel sai da viewport: `opacity` e `translateY 8px`, 300ms.
Fixa no rodapé, centralizada, `--vidro-forte` com fallback sólido. Some quando o
topo da seção 09 cruza 60% da viewport. Não existe em mobile. Focável, com o anel
padrão, e leva de volta ao painel completo.

---

## 6. As seções

Numeração igual à do Figma na v2. Arquivos em `src/sections/case-ux-ai/`,
padrão `S01Hero.tsx`.

### S01 · Hero
Já construído estaticamente. Falta o motion.

| beat | t | elemento | movimento |
|---|---|---|---|
| `video` | 0ms | vídeo do objeto | `opacity 0→1` em 500ms, toca **uma vez**, congela no último frame |
| — | 0ms | treliça de fundo | `enterDraw` em 2400ms, em paralelo, nunca bloqueia |
| `chip` | 200ms | chip de tags | fade |
| `headline` | 320ms | título | `lineMaskContainer` + `lineMaskLine`, por palavra, `STAGGER.item` |
| `subtitle` | 760ms | subtítulo | `enterFadeUp` |
| `columns` | 1000ms | colunas IA e Humanos | **motivo A**, 24px para fora, com fade |
| `stats` | 1200ms | faixa de stats | `staggerContainer(STAGGER.stat)` + `useCountUp` de 800ms |
| `hook` | 1700ms | frase-gancho | fade, 400ms |

Último elemento pousa em ~2,1s. O texto entra enquanto o objeto ainda se move,
e isso é deliberado: título acima e objeto abaixo formam um gesto composto, não
dois movimentos disputando foco. O que a regra proíbe é competição no mesmo
ponto de atenção. O pico do objeto (0,8s) cai entre o título e o subtítulo de
propósito, para o olho ter para onde ir.

As palavras em destaque do título usam gradiente linear no Figma. O código hoje
usa `--acao-link` sólido (decisão D2, registrada em `data/caseUxAi.ts`). Manter o
sólido: o gradiente está fora da rampa do guia.

**Vídeo.** Assets prontos em `public/case-ux-ai/`: `hero-motion.webm` (VP9,
1440×1080, 2,0s, 31 KB), `hero-motion.mp4` (H.264, mesmo corte, 48 KB, fallback
para Safari antigo) e `hero-poster.webp` (26 KB, frame de repouso).

Três coisas que mudaram em relação ao que eu tinha assumido:

- **O vídeo não tem canal alfa.** Não precisa, e é melhor assim: o fundo dele já
  está gravado exatamente em `#050B0E`, medido pixel a pixel nos quatro cantos.
  Some a exigência de trilha HEVC com alfa para Safari, que era o ponto mais
  frágil do plano. Basta o MP4 comum como fallback.
- **Sem `loop`.** O arquivo original tinha 1,6s de movimento e 8,3s de frame
  parado, então repetir significava decodificar uma imagem estática 83% do tempo.
  O corte novo tem só o movimento: toca uma vez e congela no último frame, o que
  também respeita a regra de não ter loop na página.
- **O original era 2880×2160.** Decodificar 4K em loop custa GPU sem entregar
  nada. O corte em 1440×1080 baixou o peso de 456 KB para 31 KB.

Atributos: `muted playsinline preload="auto"`, `poster={HERO_VIDEO.poster}`, sem
`loop`. `hero.webm` original fica no repositório como referência, não é
referenciado pelo código.

> **Enquadramento, pendência real.** No vídeo o objeto fica abaixo e à direita do
> centro, com muito vazio em cima. No Figma ele está centralizado no slot. Ou o
> componente corrige com `object-position`, ou o vídeo definitivo precisa nascer
> com o objeto centralizado. Isso vale para o vídeo final também, quando ele
> aparecer.

**Parallax.** Mouse: até 8px na direção oposta ao cursor, com suavização forte.
Scroll: objeto a 0.85x da velocidade do texto, teto `PARALLAX_OBJECT` por
breakpoint. Desligado em toque e em reduced motion.

**Interação nas colunas.** A coluna sobe um degrau de luminância, a borda vai de
`--borda-sutil` para `--borda-ativa`, e 68% e 48% na faixa de stats sobem o mesmo
degrau enquanto 89 e 11 descem um. `DUR.hover`, `EASE.micro`.

> Decisão aprovada, 23 set 2026. Não construir painel de vidro novo no hover. O
> realce acontece na faixa de stats que já está na página. Uma superfície a menos,
> um movimento por vez, nenhuma informação duplicada.

**Teclado.** As duas colunas são `<button>`. Foco produz o mesmo realce mais o
anel.

### S02 · Visão Geral, as quatro capacidades
Eyebrow, título e parágrafo em sequência padrão. Campo de pesquisa de fundo faz
fade até 6% em 1.2s, pontos em `STAGGER.cell` com ordem de semente fixa. Os
quatro nós entram da esquerda para a direita em `STAGGER.line`, com a linha
conectora em `enterDraw`.

Hover ou foco num nó: o nó cresce de 9 para 18px de diâmetro, o trecho de linha à
esquerda sobe um degrau, e o painel "ETAPA ATIVA" **troca de conteúdo em
cross-fade**, sem entrar e sair, sem deslocamento vertical. Se o painel
aparecesse e sumisse, a altura mudaria e a página pularia sob o cursor. Em
repouso ele mostra a etapa 01.

Teclado: roving tabindex nos quatro nós, setas navegam, Home e End vão às pontas,
painel segue o foco. O texto de affordance já foi corrigido no Figma para
"Passe o mouse ou navegue com as setas para explorar cada capacidade."

### S03–04 · O Desafio e o Briefing
Parágrafo, eyebrow, e a pergunta em display. A pergunta entra linha a linha com
`lineMaskLine` em `STAGGER.line`. É o único texto do case com máscara além do
fecho, porque é a pergunta que organiza o estudo. A expressão em acento entra
120ms depois da linha dela.

Imagem de vidro à esquerda: fade, parallax 0.9x. Painel de briefing entra como
bloco e as cinco linhas em `STAGGER.item`. A pílula fixa nasce daqui.

### S05 · Desenho do experimento
ESPECIALISTAS e IA entram pelo **motivo A**, 32px cada. "VS" entra por último,
`scale 0.94→1`. As quatro etapas em `STAGGER.line` com as setas em `enterDraw`.

Cluster dos 89: cada ponto em `STAGGER.cell`, ordem com semente fixa. **Os pontos
nascem todos em `--dado-neutro`.** Só depois que os dois lados estão completos o
lado da IA transiciona para azul, 600ms. Essa ordem é a tese.

Hover ou foco num ponto: tooltip em `--vidro-leve`, `opacity` e `translateY 4px`,
150ms. O ponto sobe um degrau. O tooltip ancora no ponto, nunca segue o cursor.

Teclado: roving tabindex no cluster.

### S06 · O primeiro sinal, a barra de distância
Momento assinatura. Única animação do case dirigida por scroll.

68% e 48% entram e fazem contagem com `useCountUp`. Depois a barra entre eles
cresce por `useScroll` com `target` na seção e `offset: ["start 0.7", "center
0.4"]`, `scaleX` de 0 a 1, origem à esquerda, suavizado por `SCRUB_SPRING`. O
rótulo "20 PONTOS DE DISTÂNCIA" aparece quando o progresso passa de 0.9. Chegando
em 1, a barra fica e não reseta.

**Enquanto a barra cresce, os dois números ficam parados.** A barra é a medida,
os números são os fatos. Se ambos se mexem, ninguém lê nenhum.

Nenhum elemento focável nesta seção. Em reduced motion, a barra renderiza cheia.

### S07 · A matriz de severidade
Dados em `severityMatrix` (`data/caseUxAi.ts`), com invariantes já testadas.

Entrada em três tempos: moldura e rótulos em fade; as 16 células em
`STAGGER.cell` na ordem de leitura; e **só então** a diagonal sobe um degrau e
recebe `--dado-nivel-2` em `STAGGER.line`. A diagonal é a concordância, e é ela
que o olho precisa ver antes do resto. 45,3% e 6,7% entram depois, com contagem.

Hover ou foco numa célula: `--borda-ativa`, linha e coluna sobem meio degrau
formando um crosshair, tooltip com "N problemas. Humano disse X, IA disse Y."

Teclado: grade com roving tabindex, setas nas duas direções, tooltip segue o
foco.

### S08 · A descoberta central, os quatro fatores
"A INTERFACE" entra primeiro. Os quatro fatores entram em cruz, 24px a partir do
centro, `STAGGER.line`. As linhas de conexão em `enterDraw` com easing **linear**,
porque linha que desenha com easing parece elástica. Treliça de fundo a 5%, uma
vez.

Hover ou foco num fator: ele sobe um degrau, a linha dele sobe um degrau, e os
outros três descem meio degrau. Foco por contraste, sem deslocar nada.

### S09 · Da descoberta para uma decisão
Seção de respiro. A pílula de briefing some aqui. As duas linhas de divisão de
trabalho entram pelo **motivo A**, terceira e última aparição. Sem interação.

### S10 · A proposta de fluxo
As seis etapas entram da esquerda para a direita em `STAGGER.line`, com as setas
em `enterDraw` encadeadas. Os chips entram 200ms depois do card. O chip HUMANO
OBRIGATÓRIO entra por último, com um degrau a mais. Sem pulsar, sem piscar.

Hover ou foco numa etapa: painel de detalhe **fixo abaixo do fluxo**, cross-fade
de conteúdo, mesmo padrão da S02. Em repouso mostra a etapa 01.

> Decisão aprovada, 23 set 2026. Não construir a expansão do nó no lugar. Ela
> empurra as outras cinco etapas e a página pula sob o cursor.

Teclado: roving tabindex nas seis etapas.

### S11 · O resultado
CLASSIFICAR e PRIORIZAR entram lado a lado com 120ms entre eles. Cada número faz
contagem. 68% e 90,7% sobem juntos, 48% e 45,3% sobem juntos, e os dois blocos
terminam no mesmo instante. A simetria da entrada é o que torna a assimetria dos
valores impossível de não ver. Sem interação.

### S12 · Implicações para UX
Três cards em `STAGGER.line`. Hover com `enterCard` invertido: sombra difusa
cresce e o card sobe 2px, `DUR.hover`. Único hover de card do case.

### S13 · O que este estudo não responde
Quatro limites em `STAGGER.item`, com opacidade final um degrau abaixo do resto
do case. O bloco é mais quieto de propósito. A frase final entra 400ms depois.

### S14 · Aprendizado
As duas linhas do título entram com `lineMaskLine`, eco da pergunta da S03–04.
Só dois textos do case usam máscara: a pergunta que abre e a frase que fecha. É o
que transforma repetição em rima.

### S15 · Vamos conversar
Título, parágrafo e botão em 100ms de cascata. Botão: hover sobe um degrau no
fundo e desloca a seta 4px para a direita. Primário é sólido em
`--acao-botao-fundo`, nunca em acento. Foco com o anel padrão.

---

## 7. Performance

- Só `opacity` e `transform`. Exceção única: `scaleX` na barra da S06.
- `will-change` só no elemento em animação, removido ao terminar.
- Treliças e campos de pontos são SVG inline, não canvas. Sem loop, sem custo
  contínuo de GPU.
- Vídeo do hero pausa fora da viewport.
- Nenhum `backdrop-filter` animado. É a causa mais comum de engasgo em página com
  vidro.
- Meta: 60fps no scroll, CLS 0, nenhum layout shift em entrada, já que todo
  reveal usa transform.

---

## 8. Checklist de aceite, por seção

- [ ] Reveal roda uma vez e não repete na volta.
- [ ] Nenhum `backdrop-filter` anima.
- [ ] Todo hover tem equivalente de teclado, e o foco é visualmente diferente do
      hover.
- [ ] Anel de foco de 2px em `--acao-foco` com offset de 3px.
- [ ] Nenhuma altura muda durante interação.
- [ ] No máximo uma superfície `--vidro-forte` visível.
- [ ] `prefers-reduced-motion` não perde nenhuma informação.
- [ ] Sem áudio, sem loop, sem scrolljacking.
- [ ] 60fps no scroll em notebook de entrada.

---

## 9. Decisões fechadas em 23 set 2026

1. **Contagem dos stats começa em zero.** O case inteiro é sobre a distância
   entre dois números. Começar em valor parcial esconde justamente a parte que
   importa, e economiza 200ms que ninguém percebe.
2. **Duração da entrada do hero: ~2,1s, derivada do vídeo.** Não é um número
   escolhido, é o tempo que o objeto leva para parar. Ver `HERO_BEAT`.
3. **Sem trilha com alfa.** O vídeo já vem com o fundo na cor do piso.
4. **Eyebrow de seção em repouso é `acao/link`.** O guia de estilo é Figma
   também, e ele diz literalmente "link, eyebrow e palavra destacada em título,
   em repouso" sob `acao/link`, e avisa que `acao/hover` não pode virar cor
   padrão. Quatro eyebrows estavam em `acao/hover` e foram corrigidos no Figma:
   O DESAFIO, A PERGUNTA DO ESTUDO, DESENHO DO EXPERIMENTO e CONCLUSÃO. O
   comentário de `case-ux-ai-tokens.css` que diz que `--acao-hover` "também é a
   cor dos eyebrows" está errado e precisa ser corrigido na implementação.

## 10. Pendência aberta

**Numerais e rótulos em `acao/hover`.** Sobraram 23 textos em repouso nessa cor
que não são eyebrow de seção: o chip do hero, os numerais 01 a 04 das listas, os
rótulos do painel de briefing (PROBLEMA, CONTEXTO, PERGUNTA, MINHA ATUAÇÃO,
MÉTODOS), os valores 45,3% e 6,7%, e os rótulos CLASSIFICAR e PRIORIZAR. Podem
ser um segundo degrau de acento deliberado, ou o mesmo engano repetido. Não
mexi: é decisão de sistema, não de eyebrow. Decidir antes de S02.
