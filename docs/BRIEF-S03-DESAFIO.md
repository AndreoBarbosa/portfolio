# Brief cirúrgico · S03–04 O Desafio e o Briefing · v2

**Status: implementado em 25 set 2026** (Proposta B, aprovada pelo Andreo).
Substitui a v1 (frame `800:1038`, bloco central + painel de cinco linhas).

Figma: `Propostas · 25 set · S03 e S05` → `03–04 · Proposta B` (`1052:1139`).
A versão no Figma vence sempre.

Arquivos:

- seção: `src/sections/case-ux-ai/S03Desafio.tsx`
- conteúdo: `desafio` em `src/data/caseUxAi.ts`
- tokens: `S03_BEAT`, `S03_DUR`, `S03_PARALLAX` em `src/motion/caseUxAiTokens.ts`
- imagem: `public/case-ux-ai/s03-vidro-536.{avif,webp}` e `s03-vidro-1072.{avif,webp}`

**Não reverter para o layout da v1.** Os arquivos `s03-vidro-847.*` e
`s03-vidro-1694.*` não são mais usados e podem ser apagados.

---

## 1. O que mudou e por quê

A v1 tinha pouco impacto, texto demais no mesmo peso e um painel que lia como
cartão. A v2:

- divide a tela em duas metades: o vidro à esquerda, o texto numa coluna de 720 à direita;
- faz da pergunta o maior texto da seção (48/52), com "priorizá-los?" em gradiente;
- troca o painel por uma **ficha**: uma régua de 1px no topo e uma grade 2×2, sem fundo;
- tira a linha PERGUNTA do briefing (repetia a pergunta do estudo);
- passa ATUAÇÃO e MÉTODOS para chips.

---

## 2. O vidro

Renderizado do original da Magnific (`public/magnific_large-organic-liquid-glas_dtB1rozXSL.png`,
2048×1152) com a mesma transformação do retângulo `1052:1140` (rotação −46,13°,
canto em (−60, 20), recorte da imagem igual ao do Figma), achatado sobre `#050B0E`
e com a base esfumada do retângulo `1053:1138` (transparente em y 820, sólido em
y 1120). Recorte final: x 0–536, y 144–1120 do frame. Não reprocessar.

| arquivo | tamanho |
|---|---|
| `s03-vidro-536.avif` / `.webp` | 536×976 (1x) |
| `s03-vidro-1072.avif` / `.webp` | 1072×1952 (2x) |

Posição no código: `<picture>` filho da `<section>`, `top: 96px` (o 144 do frame
menos o 48 que separa o padding do Figma, 112, do padding da seção, 64).

`left: min(0px, calc(100% - clamp(24px, 8.33vw, 120px) - 1320px))`: a borda
direita da imagem fica 64px antes da coluna de texto em qualquer largura até
1440. Acima de 1440 fica colada na borda da janela, para o corte do vidro nunca
aparecer no meio da tela.

Só a partir de 1280. Abaixo, `display: none` com `loading="lazy"` (nem baixa).

---

## 3. Estrutura

```
<section id="desafio" aria-labelledby="desafio-heading">
  <picture />                                    vidro, ≥1280
  <Container>
    <div class="coluna">                         720, alinhada à direita em ≥1280
      <p>O DESAFIO</p>
      <p>intro</p>
      <p>A PERGUNTA DO ESTUDO</p>
      <h2 id="desafio-heading">                  uma linha por <span>
      <p>intenção</p>
      <div id="briefing">                        ficha, gatilho próprio
        <span class="régua" />
        <h3 tabindex="-1">BRIEFING</h3>          destino da pílula
        <dl>                                     2×2
          PROBLEMA · CONTEXTO                    texto
          MINHA ATUAÇÃO · MÉTODOS                chips (<ul>)
```

---

## 4. Geometria, desktop 1440

| peça | medida |
|---|---|
| coluna | x 600, largura 720 (1200 do Container, alinhada à direita) |
| eyebrow → intro | 16 |
| intro | largura máx. 520 |
| intro → eyebrow da pergunta | 72 |
| eyebrow → pergunta | 16 |
| pergunta | 720, cinco linhas fixas |
| pergunta → intenção | 32 |
| intenção | largura máx. 560 |
| intenção → ficha | 80 |
| ficha | régua 1px `--borda-padrao` no topo, padding-top 24 |
| BRIEFING → grade | 24 |
| grade | 2 colunas de 340, gap 40 na horizontal e 32 na vertical |
| rótulo → conteúdo | 8 |
| chips | raio total, padding 6 × 12, borda 1px `--borda-padrao` por dentro, gap 8 |

Quebras da pergunta (Figma `1053:1146`), usadas a partir de 1280:
"Até que ponto uma IA consegue / apoiar a análise de problemas de / usabilidade
sem perder o / contexto necessário para / priorizá-los?". Abaixo disso o texto
flui. "priorizá-los?" com `white-space: nowrap`: nunca quebra no hífen.

---

## 5. Tipografia

| elemento | família | peso | tam. | entrelinha | tracking | cor |
|---|---|---|---|---|---|---|
| O DESAFIO, A PERGUNTA DO ESTUDO | Outfit | SemiBold | 12 | 150% | 2% | `--acao-link` |
| intro, intenção | Outfit | Regular | 16 | 24 | 0 | `--texto-apoio` |
| destaque da intenção | idem | | | | | `--acao-link` |
| pergunta | Hanken Grotesk | SemiBold | 48 | 52 | −2% | `--texto-principal` |
| "priorizá-los?" | idem | | | | | `.texto-gradiente` |
| BRIEFING | Outfit | SemiBold | 12 | 150% | 2% | `--texto-metadado` |
| rótulos da grade | Outfit | SemiBold | 12 | 150% | 2% | `--acao-hover` |
| PROBLEMA, CONTEXTO | Outfit | Regular | 16 | 24 | 0 | `--texto-principal` |
| chips | Outfit | Regular | 14 | 20 | 0 | `--texto-apoio` |

Pergunta: 32 abaixo de 768, 40 de 768 a 1279, 48/52 a partir de 1280.

---

## 6. Responsivo

| faixa | vidro | coluna | grade da ficha |
|---|---|---|---|
| ≥ 1280 | visível, com parallax | 720 à direita | 2×2 |
| 768 a 1279 | escondido | largura do Container | 2×2 |
| < 768 | escondido | largura do Container | uma coluna |

Abaixo de 768 o espaço intro → eyebrow da pergunta cai de 72 para 48.

---

## 7. Motion de entrada

Gatilho na seção (`VIEWPORT`):

| t | elemento | movimento |
|---|---|---|
| 0 | vidro | fade 1,2s |
| 0 | O DESAFIO | fade 400ms |
| 0,12s | intro | `enterFadeUp` |
| 0,36s | A PERGUNTA DO ESTUDO | fade |
| 0,44s | pergunta | máscara por linha, `STAGGER.line` (≥1280); abaixo, `enterFadeUp` |
| 0,88s | "priorizá-los?" | fade 480ms (120ms depois da linha 5) |
| 1,1s | intenção | `enterFadeUp` |

Ficha, gatilho próprio:

| t | elemento | movimento |
|---|---|---|
| 0 | régua | `enterRule`, da esquerda |
| 0,16s | BRIEFING | fade |
| 0,24s | as quatro células | sobem 8px, `STAGGER.item` entre elas |

Parallax do vidro: 0,9x da rolagem, teto ±40px, só ≥1280 com ponteiro fino.

Reduced motion: tudo com fade de 200ms, sem máscara, sem parallax.

---

## 8. A pílula de briefing

Sem mudança de desenho nem de comportamento (v1 §10, `BriefingPill.tsx`). O
destino continua `#briefing` com foco no `<h3>`. O texto da pílula continua o
mesmo ("Onde a IA pode apoiar a análise sem substituir contexto por
inferência?"), embora a linha PERGUNTA tenha saído da ficha.

---

## 9. Critério de pronto

- [x] 1440 igual ao frame `1052:1139`
- [x] vidro 64px antes da coluna em 1280 e 1440, colado na borda acima de 1440
- [x] vidro não baixa abaixo de 1280
- [x] pergunta em cinco linhas fixas ≥1280, "priorizá-los?" sem quebra
- [x] ficha sem fundo e sem cartão; chips em ATUAÇÃO e MÉTODOS
- [x] pílula volta para `#briefing` e foca o `<h3>`
- [x] sem rolagem horizontal em 360, 768, 1024, 1280, 1440
- [x] reduced motion: fade de 200ms
