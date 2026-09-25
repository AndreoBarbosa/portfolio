# Contrato responsivo e de estados — Case SYSMED

Vale para as 15 seções. Cada brief de seção descreve só o que **desvia** daqui.
Decidir isto uma vez é o que faz "uma seção por vez" escalar sem a página virar
uma colcha de retalhos.

O Figma só tem o desenho de 1440. Tudo abaixo disso é derivação, e a derivação
mora aqui, não na cabeça de quem implementa.

---

## 1. Breakpoints

Já existem no `tailwind.config.ts`. Não criar outros.

| nome | largura | o que acontece |
|---|---|---|
| `case-xl` | ≥ 1440 | geometria literal do Figma |
| (sem prefixo) | < 1440 | layout de fluxo, derivado |

Dois pontos internos, escritos com media query comum quando a seção precisar:

- **1024** separa "lado a lado" de "empilhado" nos pares de blocos.
- **768** separa tablet de telefone: abaixo daqui tudo é uma coluna.

**Regra dura: nada de `width` fixa em px numa seção.** O hero de 1440 é um
`max-width`, nunca um `width`. Largura travada em 1440 cria scroll horizontal em
qualquer tela menor, inclusive no notebook do Andreo.

---

## 2. Grid e container

Medido nas 15 seções em 24 set 2026: **12 delas usam coluna de 1200 com margem de
120.** É o grid do case.

```
max-width: 1200px
padding-inline: clamp(24px, 8.33vw, 120px)
margin-inline: auto
```

É exatamente o `Container.tsx` que já existe. **Não mudar.** Uma versão anterior
deste contrato mandava 1248 com margem de 96: estava errada, tirada de um elemento
só. Se o `Container.tsx` foi alterado por causa dela, volte para 1200/120.

Exceções, e só estas:

- **Hero, card de stats:** 1248, sobrando 24px de cada lado da coluna. Faixa de
  dado mais larga que o texto, de propósito.
- **S10, S12 e S13** encostam em 82, 1344 e 1348 no Figma. Drift de desenho:
  seguem a coluna de 1200.

A nav também usa margem de 120 e bate com a coluna.

**Posição absoluta só existe em `case-xl`.** Abaixo de 1440 nenhuma seção usa
`position: absolute` para layout. Se uma seção precisar, o desenho está errado,
pare e pergunte.

**Espaço vertical de seção.** 64px em cima e embaixo a partir de 768, 48px abaixo
disso. Seção que abre com divisor de 1px (como a S02) usa o divisor na largura da
coluna, em `--superficie-hover`, e 32px dele até o eyebrow.

---

## 3. Escala de tipo

Medido nas 15 seções. **O brief de cada seção traz o tamanho medido, e o medido
vence esta tabela.** Ela é o padrão para o que o brief não disser.

| papel | < 768 | 768–1439 | ≥ 1440 | onde |
|---|---|---|---|---|
| H1 do hero | 40 | `clamp(40px, 4.44vw, 64px)` | 64 | S01 |
| título de achado | 32 | `clamp(32px, 2.78vw, 40px)` | 40 | S05 a S08 |
| título de seção | 28 | 32 | 32 | S02 a S04, S09 a S14 |
| título do CTA | 36 | `clamp(36px, 3.33vw, 48px)` | 48 | S15 |
| número de dado grande | 40 | 48 | 56 | |
| corpo | 16 | 16 | 16 | |
| corpo secundário | 14 | 14 | 14 | |
| rótulo, eyebrow, chip, legenda | 12 | 12 | 12 | |

Os quatro títulos de achado são maiores de propósito: S05 a S08 são o núcleo do
estudo, e o tamanho marca isso.

**Tamanho ímpar no Figma sobe para o par seguinte.** Regra fixa do Andreo. 11 vira
12, 13 vira 14, 15 vira 16, 17 vira 18. Tamanho fracionado, que aparece quando
alguém escalou um grupo no Figma, vira o par mais próximo, nunca abaixo de 12.

Títulos usam `--texto-principal`. Alguns frames usam `#E7E8E9` no título, que
seria um quinto cinza; o guia proíbe, então vale o token.

Entrelinha e tracking não mudam com o breakpoint. Só o tamanho muda.

---

## 4. Regras de empilhamento

Valem para toda seção que tem par ou grade.

- **Par de blocos** (IA × Humanos, especialistas × IA, CLASSIFICAR × PRIORIZAR):
  lado a lado em ≥ 1024, empilhado abaixo. Ao empilhar, o bloco da esquerda vem
  primeiro.
- **Grade de 4** (stats, fatores, capacidades): 4 colunas em ≥ 1024, 2×2 entre
  768 e 1023, 2×2 também abaixo de 768. Nunca 1 coluna: quatro números em coluna
  única viram uma lista e perdem a comparação.
- **Sequência** (etapas numeradas ligadas por uma linha: o fluxo da S10): em
  linha quando cabe, lista vertical quando não cabe. Na lista, a linha passa na
  vertical pelos nós, à esquerda, e o texto fica alinhado à esquerda.
  **Sequência nunca vira grade 2×2**: a grade quebra a leitura da ordem. Fluxo
  (6) em linha a partir de 1280. As capacidades da S02 deixaram de ser
  sequência em 24 set 2026: viraram explorador com paginação, que não empilha.
- **Divisores verticais somem quando o bloco empilha.** Não viram divisores
  horizontais, apenas somem, e o gap sobe para 32.
- **Matriz 4×4 (S07) nunca empilha.** Ela rola na horizontal dentro de um
  contêiner com `overflow-x: auto`, com o rótulo do eixo fixo. Quebrar a matriz
  destrói o argumento dela.

---

## 5. Imagem e mídia

- Todo vídeo e toda imagem larga usam `aspect-ratio` fixo, nunca altura em px.
- `object-fit: contain` onde o Figma diz `FIT`, `cover` onde diz `FILL`. Não
  trocar por conta própria.
- Abaixo de 1440 a mídia entra no fluxo, com a largura do container.
- Imagem decorativa sempre `aria-hidden="true"` e `pointer-events: none`.

---

## 6. Estados

Quatro estados, e eles nunca se confundem.

**Repouso.** O que o Figma desenha no `Modo Repouso`. É o estado padrão e é o
único que existe em toque.

**Hover.** Só dentro de `@media (hover: hover)`. Sobe um degrau de luminância,
ou recua os vizinhos quando o elemento já está no degrau mais alto. Nunca troca
de matiz. Duração `DUR.hover`, easing `EASE.micro`.

**Foco.** Anel de 2px em `--acao-foco` com offset de 3px, em todo elemento
focável, sem exceção. O foco **acrescenta** o anel ao tratamento de hover, nunca
o substitui: hover é convite, foco é posição. Use `:focus-visible`, não `:focus`.

**Reduced motion.** `prefers-reduced-motion: reduce` desliga deslocamento,
escala, desenho de traço, parallax e contagem. Sobra fade de 200ms e troca de
estado instantânea. Nenhuma informação pode sumir.

### Toque

Em `pointer: coarse` não existe hover. Elementos interativos continuam sendo
`<button>` para o teclado, mas:

- o estilo de hover fica dentro de `@media (hover: hover)`;
- o estado de foco continua valendo, e aparece no toque;
- alvo mínimo de 44×44px, contando área invisível se precisar;
- nenhuma informação existe só no hover. Se um tooltip carrega dado que não está
  em outro lugar, ele precisa estar visível em repouso no mobile.

### Avanço automático

Vale para qualquer conteúdo que troca sozinho (hoje, só o explorador da S02):

- botão de pausar sempre visível ao lado (WCAG 2.2.2);
- a S02 roda em ciclo, a pedido do Andreo; qualquer outro caso passa uma vez e
  para;
- troca por teclado desliga o avanço, e ele só volta pelo botão;
- segura enquanto menos da metade está na tela e enquanto a aba está escondida;
- `aria-live="off"` enquanto avança, `"polite"` parado;
- nunca liga sozinho em reduced motion.

---

## 7. Motion por breakpoint

| efeito | ≥1440 | 768–1439 | <768 | reduced |
|---|---|---|---|---|
| reveal de entrada | sim | sim | sim | fade 200ms |
| stagger | sim | sim | sim | não |
| contagem de número | sim | sim | sim | valor final direto |
| desenho de traço | sim | sim | não | não |
| parallax de mouse | sim | não | não | não |
| parallax de scroll | sim | sim | não | não |
| scrub ligado ao scroll | sim | não | não | não |
| Lenis | sim | não | não | não |
| avanço automático (S02) | sim | sim | sim | não, só pelo botão |

`useCaseMotion().isDesktop` já resolve a coluna `≥1440` (hoje ele testa
`min-width: 1024px and pointer: fine`, precisa subir para 1440 para bater com
esta tabela).

---

## 8. Ordem de construção de cada seção

Sempre a mesma, com parada entre etapas:

1. **Etapa A · Layout 1440.** Geometria literal do Figma, sem motion, sem estado.
2. **Etapa B · Conteúdo e detalhe.** Textos reais, gradientes, SVGs, tokens que
   faltarem.
3. **Etapa C · Responsivo.** As regras deste contrato.
4. **Etapa D · Motion e estados.** Entrada, hover, foco, reduced motion, teclado.

Nunca começar D com A quebrado. Foi isso que derrubou a fidelidade do hero na
primeira tentativa.

---

## 9. Checklist de aceite, toda seção

- [ ] Nenhuma `width` fixa em px. Nenhum scroll horizontal em 360, 768, 1024,
      1280, 1440 e 1920.
- [ ] Coluna de 1200 com margem clamp, via `Container.tsx`.
- [ ] Tamanho de fonte par, espaçamento múltiplo de 8.
- [ ] Nenhum hex solto: tudo em token de `case-ux-ai-tokens.css`.
- [ ] Hover dentro de `@media (hover: hover)`.
- [ ] `:focus-visible` com anel de 2px e offset de 3px em tudo que é focável.
- [ ] Navegável só com teclado, na ordem visual.
- [ ] `prefers-reduced-motion` não esconde informação.
- [ ] Nenhum `backdrop-filter` anima.
- [ ] Nenhuma altura muda durante interação.
