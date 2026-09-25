# Brief · S06 a S15 · revisão e implementação

**Status: implementado em 25 set 2026.** Revisão das telas 06 a 15 do Figma
(`Case (Dark) v2 — Modo Repouso`, `814:1164`) antes de implementar. As telas do
Figma foram a base, não o molde: onde a composição enfraquecia a história, ela
mudou. Este brief registra cada decisão e vence o `MOTION-SPEC-SYSMED.md` e os
frames 06 a 15 do Figma para essas seções.

**Não reverter para os frames v2 do Figma.** O código é a referência de 06 a 15.

Arquivos:

| seção | arquivo |
|---|---|
| 06 · clímax | `src/sections/case-ux-ai/S06Descoberta.tsx` |
| 07 · matriz | `src/sections/case-ux-ai/S07Matriz.tsx` |
| 08 · contexto | `src/sections/case-ux-ai/S08Contexto.tsx` |
| 09–10 · divisão do trabalho | `src/sections/case-ux-ai/S09Divisao.tsx` |
| 12 e 13 | `src/sections/case-ux-ai/S12Implicacoes.tsx` (`S12Implicacoes`, `S13Limites`) |
| 14–15 | `src/sections/case-ux-ai/S14Fechamento.tsx` |
| estilos | `src/sections/case-ux-ai/secoes-finais.css` |
| conteúdo | `descoberta`, `matriz`, `contexto`, `divisao`, `implicacoes`, `limites`, `aprendizado`, `contatoFinal` em `src/data/caseUxAi.ts` |
| tokens | `S06_CLIMAX` em `src/motion/caseUxAiTokens.ts` |

---

## 1. O diagnóstico

O case começava forte (hero, pergunta, experimento) e perdia energia justamente
na descoberta. Nos frames 06 a 15:

- **O clímax estava escondido.** 68% e 48% apareciam em 40px, numa linha, ao
  lado de um vidro grande, e dividiam a tela com a matriz dentro de um cartão.
- **A 11 repetia a 06.** Os mesmos 68% e 48%, em dois cartões, cinco seções depois.
- **Seis seções seguidas com a mesma forma:** eyebrow, título, parágrafo e uma
  fileira de cartões ou colunas iguais (08 com 4 cartões, 10 com 6, 11 com 2,
  12 com 3 colunas, 13 com 4).
- **A 09 era um respiro sem função:** duas linhas soltas ("IA → velocidade e
  escala") que não ligavam a pergunta ao fluxo.

## 2. O arco

| arco | seção | tipo | o que o olho vê primeiro |
|---|---|---|---|
| impacto | 01 hero | imersivo | o título e o objeto de vidro |
| contexto | 02 visão geral | produto | o explorador das capacidades |
| tensão | 03 desafio | experimental | a pergunta do estudo, ao lado do vidro |
| exploração | 05 experimento | dados | os 89 pontos se dividindo |
| **clímax** | **06 o primeiro sinal** | **dados, monumental** | **68% e 48%, e o vão entre eles** |
| prova | 07 matriz | dados | a diagonal e as marginais |
| descoberta | 08 contexto | narrativo + experimental | a frase, depois o quadro da interface |
| resposta | 09–10 divisão | produto | as duas raias e o fluxo trocando de raia |
| reflexão | 12 implicações | editorial | três numerais grandes |
| silêncio | 13 limites | silencioso | nada grita: é o respiro |
| encerramento | 14–15 | narrativo + imersivo | a frase final e os fios de vidro |

Nenhuma seção repete a forma da anterior.

---

## S06 · O primeiro sinal (clímax)

**Função:** a descoberta. É o momento para o qual o hero prometeu ("a diferença
entre 68% e 48% é a história deste case").

**Mudança estrutural.** Os dois números viram o maior texto da página depois do
H1 (até 176px), numa escala comum de 0 a 100 na largura toda. A barra de 48%
para onde a de 68% seguiu; o vão de 20 pontos fica visível como trecho
hachurado, com uma guia tracejada em 68%. O vidro e a matriz saem da tela.

- Rótulos: CLASSIFICAR e PRIORIZAR (verbos da S02 e da 11).
- Notas: 90,7% sob a linha 1 e 45,3% sob a linha 2 (os dados da 11 que não
  estavam na 06).
- Fecho: "Reconhecer “o que está errado” e decidir “o quanto isso importa” são
  tarefas diferentes." com o segundo trecho em gradiente.

**Motion (a única seção guiada por rolagem).** A partir de 1024px, ponteiro fino
e altura ≥680, a seção fica presa na tela por 260vh e a rolagem conduz o
progresso: linha 1 (barra e contagem juntas), linha 2, o vão, o fecho
(`S06_CLIMAX`). Chegando ao fim, fica: o vão não some ao voltar. Fora disso, o
mesmo progresso roda no tempo (3,4s) quando a seção entra. Reduced motion:
estado final direto.

A pílula de briefing some enquanto a seção ocupa o rodapé (`data-sem-pilula`):
um foco por tela.

**Absorve a 11.** A seção "O resultado" deixa de existir.

## S07 · A matriz de severidade

**Função:** a prova do clímax. O título afirma uma distribuição ("convergia para
o meio da escala") que a matriz sozinha não mostrava.

**Mudança estrutural.** Sem cartão e sem vidro. A matriz é a figura da seção:
intensidade da célula pela contagem (uma cor só), diagonal com anel claro. Duas
marginais que não existiam no Figma, calculadas das próprias células:

- à direita, como os especialistas distribuíram cada nível (34, 22, 12, 7), em
  neutro (o humano);
- embaixo, como a IA distribuiu (13, 26, 28, 8), em azul (a máquina).

A concentração no meio aparece sem precisar ler número. A linha catastrófica
ganha anel e a nota do Figma. 45,3% e 6,7% ficam na coluna de texto, com um
glifo 4×4 que mostra a região de cada um. A frase "O erro mais importante…"
fecha a figura em 24px (não é mais uma frase grande solta: a próxima é da S08).

Tabela real para leitor de tela; a grade visual é `aria-hidden`.

## S08 · A descoberta central

**Função:** a virada de sentido. Não é só que a IA erra a gravidade: é por quê.

**Mudança estrutural.** O Figma tinha um círculo "A INTERFACE" e quatro cartões
em volta. A ideia é espacial, então virou desenho: a interface é um quadro de
vidro com o esquema de uma tela (a única camada que a IA via), sobre a treliça
(a rede de contexto), e os quatro fatores ficam **fora do quadro**, sem cartão,
ligados às quinas por traços. Único uso de vidro de 05 a 13: separa a camada da
interface da camada do contexto.

O título carrega a tese pela luminância: "A IA tinha a interface." um degrau
abaixo, "Os profissionais tinham o contexto." em `--texto-principal`, em 56px.

Motion: quadro, esquema, traços saindo das quinas (lineares), fatores se
afastando do centro.

## S09–10 · Da descoberta para uma decisão + a proposta de fluxo

**Função:** a resposta prática.

**Mudança estrutural.** As duas seções viram uma. A pergunta abre; a resposta é
o desenho da divisão de trabalho: duas raias (IA · velocidade e escala; Humano ·
contexto e julgamento, as duas linhas soltas da 09) e o fluxo das seis etapas
trocando de raia onde o trabalho troca de dono. O dono de cada etapa é a raia,
então os chips somem, menos HUMANO OBRIGATÓRIO, que é a exceção que importa.

As raias nascem num ponto só e se separam: terceira e última aparição do motivo
A. Raias só a partir de 1280; abaixo, lista vertical com o dono em cada etapa.

A pílula de briefing termina aqui (`data-briefing-fim`).

## S12 · Implicações para UX

**Refino.** Três colunas iguais viram três linhas largas: numeral de 56px,
título, texto, régua entre elas. Editorial, para não repetir a forma da 13.

## S13 · O que este estudo não responde

**Refino.** A seção silenciosa do case: título menor (28), um degrau abaixo na
luminância, mais ar em volta, 2×2 em texto miúdo. É o respiro antes do fecho.

## S14–15 · Aprendizado e contato

**Refino.** A frase final sobe para 56px, alinhada à esquerda, com máscara por
linha (rima com a pergunta da S03). Os fios de vidro do Figma ficam à direita,
afastados do texto, e somem em direção a ele e ao pé. "Vamos conversar?" em 64,
botão sólido.

Asset: `public/case-ux-ai/s14-fios-1088.{avif,webp}` e `-1536`, feitos de
`public/magnific_transparent-background-pn_hEmRApUvqL.png` (fundo branco),
invertido para o piso `#050B0E` e esfriado. Não reprocessar. Só a partir de
1280.

CTA: "Entrar em contato" abre o LinkedIn (`contact.linkedin` da home), em nova
aba. Trocar em `contatoFinal.cta` se o destino for outro.

---

## 3. Fora das seções novas

- **Nav com vidro ao rolar** (BRIEF-S01 §14, pendente desde 24 set): passando de
  120px, `--vidro-medio` com blur fixo; só a opacidade anima. Os links não ficam
  mais por cima do texto.
- **Pílula de briefing:** suporte a `data-sem-pilula`, e a correção do erro de
  tipo que o `tsc` apontava (`window.setTimeout` em ramo `never`).
- **S02 (pendente, não mexi):** o painel ainda é fixo em `1fr 432px` e 272 de
  altura, sem responsivo (o próprio arquivo diz "sem responsivo ainda"). No
  celular ele cria rolagem horizontal. Recomendação para a etapa de responsivo:
  em ≥1280, painel com 400 de altura e palco de 560, nome da capacidade em 40.
  Hoje o objeto ocupa 180px num painel de 1200: é o momento mais morno do case.

## 4. Dado para confirmar

A matriz de severidade (`severityMatrix`) soma **75**, não 89. Os percentuais
batem com 75 (36/75 = 48%, 34/75 = 45,3%, 5/75 = 6,7%). A página não mostra o
total da matriz, mas vale confirmar se a comparação de severidade foi feita
sobre 75 dos 89 problemas, e dizer isso em algum lugar do case.

## 5. Critério de pronto

- [x] clímax em escala monumental, com o vão de 20 pontos visível
- [x] 11 absorvida pela 06, sem números repetidos em cartões
- [x] nenhuma seção de 06 a 15 com fileira de cartões iguais
- [x] nenhuma forma repetida entre seções vizinhas
- [x] 1440, 1280×720, 1024, 768, 390: sem sobreposição; rolagem horizontal só
      por causa da S02
- [x] reduced motion: estado final, nenhuma informação perdida
- [x] nenhum texto sem animação ficou invisível após a rolagem
- [x] `tsc` limpo no case inteiro
