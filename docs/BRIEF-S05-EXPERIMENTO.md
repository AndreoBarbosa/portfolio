# Brief cirúrgico · S05 Desenho do experimento · v2

**Status: implementado em 25 set 2026** (Proposta B, aprovada pelo Andreo).
Substitui a v1 (frame `800:1043`: duas colunas, cartões de lados, conclusão).

Figma: `Propostas · 25 set · S03 e S05` → `05 · Proposta B` (`1055:1138`).
A versão no Figma vence sempre.

Arquivos:

- seção: `src/sections/case-ux-ai/S05Experimento.tsx`
- palco: `src/sections/case-ux-ai/s05/QuadroDivergencia.tsx` e `quadro-divergencia.css`
- ícones: `src/sections/case-ux-ai/s05/icones.tsx`
- conteúdo: `experimento` em `src/data/caseUxAi.ts`
- tokens: `S05_BEAT` e `S05_QUADRO` em `src/motion/caseUxAiTokens.ts`

**Não reverter para o layout da v1.** Saíram: os cartões ESPECIALISTAS / IA, o
disco VS entre eles, a caixa COMPARAÇÃO, a CONCLUSÃO (com a lâmpada), a legenda
do quadro e o subtítulo O EXPERIMENTO sobre os parágrafos.

---

## 1. O que a seção diz

Os mesmos 89 problemas, analisados de forma independente pelos dois lados. A
seção descreve o **método**. O resultado (68% e 48%) só aparece na S06: nada aqui
antecipa quem acertou mais. Por isso os dois campos do palco são idênticos e só
a cor muda.

---

## 2. Estrutura

```
<Section id="experimento" labelledBy="experimento-titulo">
  <Container>
    1 · cabeçalho
      <p>DESENHO DO EXPERIMENTO</p>
      grade 594fr / 518fr
        <h2 id="experimento-titulo" />           "mesmo problema." em gradiente
        <p>método</p>                            um parágrafo
    2 · palco, largura toda
      <QuadroDivergencia />                      <figure>, SVG role="img" + totais em HTML
    3 · régua 1px, depois
      O EXPERIMENTO + <ol> de 4 etapas           esquerda, 746
      COMPARAÇÃO PAR A PAR + 178 comparações     direita, 320
```

---

## 3. Geometria, desktop 1440

| peça | medida |
|---|---|
| eyebrow → cabeçalho | 16 |
| título | coluna de 594, 3 linhas |
| método | coluna de 518, gap 88, 4px abaixo do topo do título |
| cabeçalho → palco | 96 |
| palco | 1200 × 354 (até a base dos totais) |
| palco → régua | 136 |
| régua → O EXPERIMENTO | 32 |
| O EXPERIMENTO → etapas | 24 |
| etapas | 4 × 152, setas 14×10 com 16 de cada lado (746) |
| etapa | padding 16, raio 12 (`--r-sm`), gap 8; alinhadas pelo centro |
| etapa 03 | fundo `--superficie-card`, borda 1px `--borda-ativa` por dentro |
| comparação | 320, alinhada à direita; rótulo → número 20; número → nota 4 |

---

## 4. Etapas e ícones

Os ícones da v1 (balão, funil, balança, alvo) não diziam o que cada etapa é.
Trocados em 25 set a pedido do Andreo, no código e no Figma. Cada ícone mostra o
próprio insumo:

| etapa | ícone | por quê |
|---|---|---|
| 01 Descrição do problema | documento com linhas de texto | é o relato escrito do problema |
| 02 Heurísticas utilizadas | checklist | a avaliação heurística é uma lista de princípios |
| 03 Escala de severidade | quatro barras crescentes, preenchimento subindo com o nível | a escala tem quatro níveis de gravidade |
| 04 Classificação | etiqueta | cada problema recebe heurística e severidade |

Grade de 24, traço 1,5, pontas redondas, `currentColor` em `--acao-hover`,
renderizados a 22px. Número em JetBrains Mono Medium 22, `--acao-hover`. Nome em
Outfit SemiBold 12, `--texto-apoio` (na 03, `--texto-principal`).

Setas: SVG, `--texto-metadado`, traço 1,5, desenham por `pathLength`.

---

## 5. O palco (`QuadroDivergencia`)

### Composição

Largura `W` medida no contêiner (`ResizeObserver`). SVG em pixels reais:
`viewBox` = tamanho renderizado; texto de 12px é 12px.

**Lado a lado** (`W ≥ 560`), valores do Figma em `W = 1200`:

| peça | posição |
|---|---|
| escala | `s = clamp(0.6, W / 1100, 1)` |
| centros dos campos | `W/2 ± min(320, W/4)` (280 e 920) |
| campo | 11 × 9, passo `26,4s × 23s`, 10 casas vazias, jitter ±1,8 |
| centro do campo (y) | `68 + 92s` (160) |
| pontos | raio `max(3, 4s)` |
| rótulos | topo em y 12, centrados nos campos |
| divisor | vertical no eixo, 24 além do topo e da base dos campos, `--borda-padrao` |
| disco VS | raio 24 no eixo, `--superficie-elevada`, borda 1,5 `--borda-ativa`, "VS" em `--texto-principal` |
| halos | elipses `320s × 180s`: especialistas `--dado-neutro` a 8%, IA `--acao-link` a 10% |
| ligação | curva de âncora a âncora, 45px abaixo da base dos campos, tracejado 3/4, `--borda-ativa` |
| "mesmo problema" | 11px abaixo do fundo da curva, centrado |
| totais | "89 problemas" + modo, centrados nos campos, topo 13px acima do fundo da curva |

**Empilhado** (`W < 560`): especialistas em cima, disco VS, IA embaixo. Sem
divisor. A ligação contorna os campos pela direita (ápice 16px além da borda) e
"mesmo problema" fica entre o VS e o ápice.

### Grade

As casas vazias são as do Figma (`1056:1335`), em máscara no componente:

```
11111111101
11111110011
11111111111
11111111111
11111X11111   X = âncora
11111111111
11111001111
11101110111
11101111001
```

Uma grade só para os dois campos: o problema `i` cai na mesma casa dos dois
lados. A âncora é a casa do centro, a mesma dos dois lados: disco de raio 12
atrás (especialistas `--superficie-elevada`, IA `--acao-fundo-selecionado`) e
núcleo de raio 4 (especialistas `--texto-principal`, IA `--dado-nivel-4`).

### Cor dos pontos

| gradiente | paradas |
|---|---|
| neutro (todos nascem assim) | `--texto-principal` 0 · `--dado-neutro` 40% · `--controle-inativo` 80% · `--superficie-elevada` 100% |
| IA (por cima, depois) | `--texto-principal` 0 · `--dado-nivel-4` 35% · `--dado-nivel-3` 75% · `--dado-nivel-1` 100% |

Foco de luz em 36% / 30%, raio 76%. A troca para azul é cross-fade de opacidade,
nunca transição de `fill`.

### Linha do tempo (`S05_QUADRO`)

| t | o que acontece |
|---|---|
| 0 a 0,7s | os 89 pontos aparecem no eixo, em espiral áurea de raio 28, em ordem sorteada |
| 0,7s | cada ponto se duplica e as cópias viajam para a mesma casa nos dois campos, do centro para fora, 900ms `--ease-enter` |
| 1,3s | halos |
| 1,44s | ESPECIALISTAS |
| 1,5s | âncoras (disco cresce de 0,6) e disco VS (`scale 0.94 → 1`) |
| 1,56s | divisor desenha |
| 1,62s | o campo da IA fica azul, do eixo para a borda, 600ms |
| 1,7s | IA (MODELO DE LINGUAGEM) |
| 1,9s | totais sobem 8px (IA 80ms depois) |
| 2,1s | a ligação desenha entre as âncoras, 900ms |
| 2,6s | "mesmo problema" |

CSS executa: cada elemento traz o atraso em variável, as animações ficam
pausadas até `useInView(VIEWPORT)` (`data-estado="espera" | "toca" | "fixo"`).
A ligação tracejada desenha por máscara (traço contínuo com `pathLength` 1).
Só `opacity`, `transform` e `stroke-dashoffset`.

**Acessibilidade.** SVG com `role="img"` e `aria-label` (texto em
`experimento.quadro.ariaLabel`). Totais em HTML com `aria-hidden`: o rótulo do
SVG já diz tudo. Nada focável dentro do palco.

**Reduced motion.** `data-estado="fixo"`: estado final, sem animação.

---

## 6. Tipografia

| elemento | família | peso | tam. | entrelinha | tracking | cor |
|---|---|---|---|---|---|---|
| eyebrow | Outfit | SemiBold | 12 | 150% | 2% | `--acao-link` |
| título | Hanken Grotesk | Bold | 40 | 44 | −1% | `--texto-principal` |
| "mesmo problema." | idem | | | | | `.texto-gradiente` |
| método | Outfit | Regular | 16 | 24 | 0 | `--texto-apoio` |
| rótulos do palco | Outfit | SemiBold | 12 | | 2% | especialistas `--texto-apoio`, IA `--acao-link` |
| "89" | Hanken Grotesk | SemiBold | 40 | 44 | −2% | `--texto-principal` |
| "problemas" | Outfit | Regular | 16 | 24 | 0 | `--texto-apoio` |
| modo, "mesmo problema" | Outfit | Regular | 12 | 150% | 0 | `--texto-metadado` |
| O EXPERIMENTO, COMPARAÇÃO PAR A PAR | Outfit | SemiBold | 12 | 150% | 2% | `--texto-metadado` |
| "178" | Hanken Grotesk | SemiBold | 56 | 60 | −2% | `--texto-principal` |
| "comparações" | Outfit | Regular | 16 | 24 | 0 | `--texto-apoio` |
| nota da comparação | Outfit | Regular | 14 | 20 | 0 | `--texto-metadado` |

Título: 32 abaixo de 768, `clamp(32px, 2.78vw, 40px)` acima. 178 é
`quadro.total × comparacao.dimensoes`: nenhum número escrito à mão.

---

## 7. Motion de entrada da seção

| bloco | gatilho | movimento |
|---|---|---|
| eyebrow, título, método | cabeçalho | fade 400ms em 0; `enterFadeUp` em 0,12s e 0,24s |
| palco | próprio | seção 5 |
| régua | faixa de baixo | `enterRule`, da esquerda |
| etapas | faixa de baixo | etapa `k` em `k × 80ms`, sobe 8px; seta `k` desenha 40ms depois, 300ms |
| comparação | faixa de baixo | `enterFadeUp` em 0,32s |

Reduced motion: fade de 200ms, sem deslocamento, sem desenho.

---

## 8. Responsivo

| faixa | cabeçalho | palco | faixa de baixo |
|---|---|---|---|
| ≥ 1280 | 594 / 518, gap 88 | lado a lado | etapas e comparação lado a lado |
| 1024 a 1279 | duas colunas, gap 64 | lado a lado (`s < 1`) | etapas em linha; comparação embaixo |
| 768 a 1023 | uma coluna | lado a lado (`s = 0,6`) | idem |
| < 768 | uma coluna | **empilhado** | etapas em **lista vertical**, setas para baixo |

Sequência nunca vira grade 2×2 (contrato §4). Espaços verticais: 64 abaixo de
768, 96 de 768 a 1279, os do Figma a partir de 1280.

---

## 9. Critério de pronto

- [x] 1440 igual ao frame `1055:1138`, com os ícones novos
- [x] campos idênticos, mesma máscara do Figma, âncora nos dois lados
- [x] nada antecipa o resultado da S06
- [x] palco sem rolagem horizontal em 360, 768, 1024, 1280, 1440
- [x] linha do tempo roda uma vez ao entrar; reduced motion mostra o estado final
- [x] sem cartões, sem conclusão, sem legenda
