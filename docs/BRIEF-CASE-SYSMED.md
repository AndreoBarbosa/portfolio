# Brief de implementação — Case SYSMED

> **ARQUIVO SUPERADO, 24 set 2026. Não cole nada daqui.**
>
> A estratégia mudou para um brief cirúrgico por seção, cada um com as etapas
> A (layout 1440), B (conteúdo), C (responsivo) e D (motion e estados).
>
> - Hero: `docs/BRIEF-S01-HERO.md`
> - Regras que valem para todas as seções: `docs/CONTRATO-RESPONSIVO.md`
> - Motion: `docs/MOTION-SPEC-SYSMED.md`
> - Seções 02 em diante: um arquivo `docs/BRIEF-S0X-*.md` para cada, criado
>   quando a anterior fechar.
>
> Este arquivo fica só como registro das decisões e do plano original.

Briefs para colar no Claude Code, em ordem. Um por vez. Não colar dois juntos:
briefs largos derrubam a fidelidade, briefs restritos a uma seção sobem para
perto de 90%.

Fonte de motion: `docs/MOTION-SPEC-SYSMED.md`.

---

## Prompt 0 · Contrato e plano

Cole este primeiro. Ele não escreve código.

```
Você vai terminar a página do case SYSMED neste repositório. Antes de escrever
qualquer linha, leia e me devolva um plano.

CONTEXTO DO QUE JÁ EXISTE
- A página nova vive em /dev/case-ux-ai (src/pages/CaseUxAi.tsx). Hoje ela tem
  só a nav e a seção 01.
- As rotas reais /case/sysmed e /case/ia-hospitalar ainda apontam para
  src/pages/CaseSysmed.tsx, que é a versão antiga. O objetivo final é a nova
  substituir a antiga nessas rotas.
- Tokens de cor: src/styles/case-ux-ai-tokens.css, escopados em .case-uxai-root.
- Tokens de motion: src/motion/caseUxAiTokens.ts.
- Receitas de motion: src/motion/caseUxAiRecipes.ts.
- Scroll, reduced motion e detecção de desktop: src/motion/CaseUxAiMotionProvider.tsx.
- Conteúdo e dados: src/data/caseUxAi.ts. A matriz de severidade já está lá com
  invariantes documentadas.
- Componentes base: src/components/case-ux-ai/{layout,ui,media,surface,type,data}.
- Padrão de seção: src/sections/case-ux-ai/S01Hero.tsx.

LEIA, NESTA ORDEM
1. docs/MOTION-SPEC-SYSMED.md, inteiro. É a fonte de verdade de motion.
2. src/motion/caseUxAiTokens.ts e caseUxAiRecipes.ts.
3. src/styles/case-ux-ai-tokens.css.
4. src/sections/case-ux-ai/S01Hero.tsx e src/components/case-ux-ai/**.
5. src/data/caseUxAi.ts.
6. src/pages/CaseSysmed.tsx, só para saber qual conteúdo já está aprovado e no ar.

REGRAS QUE NÃO SE NEGOCIAM
- Não invente token, nome de token, cor, duração ou easing. Tudo já existe nos
  dois arquivos de token. Se faltar algo, pare e pergunte.
- Não toque em src/motion/tokens.ts. Aquele arquivo é do resto do site.
- Não toque em nada fora de src/, docs/ e public/case-ux-ai/.
- Ignore as pastas Portifolio/, Ver 1/, dist/ e Mockups/ na raiz. São cópias
  antigas e vão te confundir.
- Nunca anime backdrop-filter. Anime opacidade, posição ou sombra.
- Só opacity e transform em animação. A única exceção é scaleX na barra da S06.
- Todo hover precisa de equivalente de teclado, e o foco nunca pode ter o mesmo
  desenho do hover.
- Não invente número, dado ou frase de case. Todo texto sai de
  src/data/caseUxAi.ts ou do Figma. Se faltar, pare e pergunte.
- Sem em-dash como pontuação. Use vírgula, dois-pontos ou ponto.
- Tamanho de fonte sempre par. Espaçamento sempre múltiplo de 8.

ME DEVOLVA
1. A lista de seções S02 a S15 que faltam, com o arquivo que você vai criar para
   cada uma.
2. Quais componentes novos em src/components/case-ux-ai/ você precisa criar, e
   por quê. Reuse antes de criar.
3. A receita enterDivergence que falta em caseUxAiRecipes.ts, escrita.
4. Onde o spec e o código estão em conflito hoje, se estiverem.
5. As perguntas que você tem antes de começar.

Não escreva nenhum arquivo ainda.
```

---

## Prompt 1 · Motion da seção 01

```
Aplique o motion da seção S01 conforme docs/MOTION-SPEC-SYSMED.md, seção 6, S01.
Escopo: apenas src/sections/case-ux-ai/S01Hero.tsx, src/components/case-ux-ai/
media/HeroMedia.tsx e src/motion/caseUxAiTokens.ts. Não crie seção nova.

Primeiro, adicione em caseUxAiTokens.ts os blocos HERO_VIDEO e HERO_BEAT
exatamente como estão no spec. A sequência do hero lê desses dois objetos.
Nenhum segundo pode aparecer hardcoded dentro do componente: quando o vídeo for
trocado, só esses dois blocos mudam.

Depois, HeroMedia.tsx passa a usar os assets novos:
  <video> com <source> webm e mp4, poster, muted, playsinline, preload="auto",
  SEM loop. Toca uma vez e congela no último frame.
Os arquivos já estão em public/case-ux-ai/: hero-motion.webm, hero-motion.mp4 e
hero-poster.webp. O hero.webm antigo fica no repositório mas não é referenciado.

Depois, a sequência: tabela de beats do spec, motivo da divergência nas colunas
IA e Humanos, contagem dos stats começando em zero, hover e foco nas colunas,
parallax de mouse e de scroll, e o comportamento em reduced motion (poster
estático, sem parallax, sem contagem).

Não construa painel de vidro novo no hover. O realce acontece na faixa de stats
que já está na página.

Adicione a receita enterDivergence em src/motion/caseUxAiRecipes.ts antes de
usá-la. Uma implementação só, reusada nas seções 05 e 09.

Corrija também o comentário de src/styles/case-ux-ai-tokens.css que diz que
--acao-hover "também é a cor dos eyebrows". Está errado: eyebrow de seção em
repouso é --acao-link, conforme o guia de estilo. Só o comentário, não mude o
valor do token.

No fim, me diga se o objeto do vídeo bate com o enquadramento do Figma. No
arquivo atual ele fica abaixo e à direita do centro, e no Figma está
centralizado. Se não bater, proponha o object-position e espere meu aval.

Ao terminar, rode npm run build e me diga o que mudou, arquivo por arquivo.
```

## Prompt 2 · Seções 02 e 03–04

```
Crie S02 e S03-04 conforme docs/MOTION-SPEC-SYSMED.md, seção 6.
Arquivos: src/sections/case-ux-ai/S02VisaoGeral.tsx e S0304Desafio.tsx.
Registre as duas em src/pages/CaseUxAi.tsx, na ordem.

Pontos que eu não quero errados:
- O painel "ETAPA ATIVA" da S02 fica sempre na página e só troca de conteúdo em
  cross-fade. Ele não entra e não sai. Nenhuma altura pode mudar durante a
  interação.
- Os quatro nós da S02 formam um grupo com roving tabindex. Setas navegam, Home
  e End vão às pontas, o painel segue o foco.
- A pergunta da S03-04 entra linha a linha com lineMaskLine. É um dos dois únicos
  textos do case com máscara.
- O texto de conteúdo sai de src/data/caseUxAi.ts. Se algum texto não estiver
  lá, pare e me pergunte em vez de escrever.

Ao terminar, npm run build e o diff resumido.
```

---

## Prompt 3 · Seção 05 e a pílula de briefing

```
Crie S05 conforme o spec, e o componente da pílula de briefing descrito na
seção 5 do spec.

A pílula é um elemento persistente, não pertence a uma seção: monte em
src/components/case-ux-ai/ui/BriefingPill.tsx e monte na página, não dentro da
seção.

Na S05, a ordem importa e é a tese: os 89 pontos do cluster nascem todos em
--dado-neutro, e só depois que os dois lados estão completos o lado da IA
transiciona para azul. Não pinte de azul na entrada.

Ao terminar, npm run build e o diff resumido.
```

---

## Prompt 4 · Seção 06, a barra de distância

```
Crie S06 conforme o spec. É a única animação do case dirigida por scroll e o
momento assinatura da página, então trate como tal.

useScroll com target na seção e offset ["start 0.7", "center 0.4"], scaleX de 0
a 1 com origem à esquerda, suavizado por SCRUB_SPRING. O rótulo "20 PONTOS DE
DISTÂNCIA" só aparece depois de 0.9 de progresso. A barra não reseta na volta.

Os dois números ficam parados enquanto a barra cresce. Isso não é detalhe.

Scrub só roda quando useCaseMotion().isDesktop é true. Em reduced motion e em
mobile, a barra renderiza cheia com o rótulo visível.

Ao terminar, npm run build e o diff resumido.
```

---

## Prompt 5 · Seções 07 e 08

```
Crie S07 e S08 conforme o spec.

S07 usa severityMatrix de src/data/caseUxAi.ts. Não redigite os números. As
invariantes documentadas no arquivo precisam continuar valendo.

A entrada da S07 tem três tempos e a ordem é o argumento: moldura, depois as 16
células, e só então a diagonal acende. Não acenda a diagonal junto com as
células.

A matriz é uma grade navegável por teclado com roving tabindex nas duas direções.
Cada célula carrega o número, então a cor nunca é o único portador.

Na S08, as linhas de conexão desenham com easing linear, não com EASE.enter.

Ao terminar, npm run build e o diff resumido.
```

---

## Prompt 6 · Seções 09 a 15

```
Crie S09, S10, S11, S12, S13, S14 e S15 conforme o spec. São seções mais simples,
podem vir juntas.

Dois pontos:
- A S10 usa painel de detalhe fixo abaixo do fluxo, com cross-fade, igual ao da
  S02. Não faça o nó expandir no lugar.
- A S09 carrega a terceira e última aparição do motivo da divergência. Depois
  dela, o motivo não aparece mais em lugar nenhum.

Ao terminar, npm run build e o diff resumido.
```

---

## Prompt 7 · Acessibilidade e reduced motion

```
Passada de verificação, sem construir nada novo.

Rode o checklist da seção 8 de docs/MOTION-SPEC-SYSMED.md item por item, na
página inteira, e me devolva o resultado marcado.

Para cada item que falhar, corrija e me diga o que mudou. Se algum exigir decisão
de design, pare e pergunte em vez de decidir sozinho.

Atenção especial:
- Navegue a página inteira só com Tab e setas. Toda interação de hover precisa
  responder.
- O anel de foco é 2px em --acao-foco com offset de 3px, e tem que ser
  visualmente diferente do hover em todo lugar.
- Com prefers-reduced-motion ligado, nenhuma informação pode sumir.
```

---

## Prompt 8 · Troca de rota e deploy

Só depois que você tiver aprovado a página em `/dev/case-ux-ai`.

```
Hora de publicar.

1. Aponte /case/sysmed e /case/ia-hospitalar em src/App.tsx para CaseUxAi.
2. Remova as rotas /dev/case-ux-ai e /dev/case-ux-ai-foundations e o comentário
   temporário que explica elas.
3. Não delete src/pages/CaseSysmed.tsx nem CaseUxAiFoundations.tsx ainda. Só
   tire das rotas. Eu decido apagar depois de ver no ar.
4. Confira que o card do case na Home aponta para a rota certa.
5. Rode npm run build e me mostre o resultado.
6. Só se o build passar: commit numa branch nova, não na main, e abra o PR.

Mensagem do commit, em português, descrevendo o que entrou. Não coloque nada
sobre quem escreveu o código.
```

---

## Estado das decisões

Fechadas em 23 set 2026, já refletidas no spec e no Figma:

1. **Eyebrow de seção em repouso é `acao/link`.** O guia de estilo vence, e ele é
   Figma também. Quatro eyebrows já corrigidos no arquivo.
2. **Vídeo do hero.** Assets cortados, redimensionados e commitados. Sem alfa,
   sem loop, com fallback MP4 e poster.
3. **Tempo do hero: ~2,1s**, derivado da janela de movimento do vídeo, não
   escolhido no olho.
4. **Contagem dos stats começa em zero.**

Aberta, decidir antes do Prompt 2:

- **Numerais e rótulos em `acao/hover`.** 23 textos em repouso nessa cor que não
  são eyebrow de seção: chip do hero, numerais 01 a 04, rótulos do painel de
  briefing, os valores 45,3% e 6,7%, e CLASSIFICAR e PRIORIZAR. Ou é um segundo
  degrau de acento deliberado, ou é o mesmo engano repetido. Ver seção 10 do
  spec.
