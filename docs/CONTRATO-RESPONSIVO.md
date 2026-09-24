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

O Figma tem três gutters diferentes: 120 na nav, 96 na faixa de stats, 160 nos
blocos laterais do hero. Isso é drift de desenho, não intenção.

**Decisão: um container só, 1248 de conteúdo, gutter de 96 em 1440.**

```
max-width: 1248px
padding-inline: clamp(24px, 6.67vw, 96px)
margin-inline: auto
```

1248 é o valor do card de stats, que é o elemento mais largo do case, e é
múltiplo de 8. O `Container.tsx` atual está em 1200 com gutter de 120, herdado do
blueprint perdido. Atualizar para 1248/96.

A nav fica de fora: ela é instância de um componente compartilhado com os outros
cases e mexer nela tem alcance maior que esta página. Os 24px de diferença de
cada lado não se notam.

**Posição absoluta só existe em `case-xl`.** Abaixo de 1440 nenhuma seção usa
`position: absolute` para layout. Se uma seção precisar, o desenho está errado,
pare e pergunte.

---

## 3. Escala de tipo

Um valor por papel, com o degrau de 1440 vindo do Figma e o degrau pequeno
derivado. Sempre par.

| papel | < 768 | 768–1439 | ≥ 1440 |
|---|---|---|---|
| H1 do hero | 40 | `clamp` | 64 |
| título de seção | 32 | `clamp` | 40 |
| número de dado grande | 40 | 48 | 56 |
| corpo | 16 | 16 | 18 |
| corpo secundário | 14 | 14 | 16 |
| rótulo, eyebrow, chip | 12 | 12 | 12 |

Fórmula do `clamp` entre 768 e 1440, para não inventar valor intermediário:

```css
font-size: clamp(40px, 4.44vw, 64px);   /* H1: 64 exatos em 1440 */
font-size: clamp(32px, 2.78vw, 40px);   /* título de seção */
```

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
- **Grade de 6** (fluxo): 6 em linha em ≥ 1440, 3+3 entre 1024 e 1439, 2+2+2
  abaixo de 1024.
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
- [ ] Container de 1248 com gutter clamp.
- [ ] Tamanho de fonte par, espaçamento múltiplo de 8.
- [ ] Nenhum hex solto: tudo em token de `case-ux-ai-tokens.css`.
- [ ] Hover dentro de `@media (hover: hover)`.
- [ ] `:focus-visible` com anel de 2px e offset de 3px em tudo que é focável.
- [ ] Navegável só com teclado, na ordem visual.
- [ ] `prefers-reduced-motion` não esconde informação.
- [ ] Nenhum `backdrop-filter` anima.
- [ ] Nenhuma altura muda durante interação.
