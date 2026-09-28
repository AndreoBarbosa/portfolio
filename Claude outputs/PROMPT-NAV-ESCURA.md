# PROMPT · Nav bar escura no case SYSMED (logo e nav iguais ao resto do site)

Cole este prompt inteiro no Claude Code, na pasta `C:\Users\andreob\Documents\Portifolio`. Faça um passo por vez e pare nos pontos marcados.

---

## Contexto

A página do case SYSMED (`src/pages/CaseUxAi.tsx`, rotas `/case/ia-hospitalar`, `/case/sysmed` e `/dev/case-ux-ai`) usa uma nav própria, `src/components/case-ux-ai/layout/NavBar.tsx`, que não segue o resto do site:

1. **Logo.** Mostra o texto "AB" em Hanken Grotesk 20. O Figma usa o monograma vetorial de 38×24.
2. **Formato.** É uma faixa na largura toda. O site usa uma lâmina flutuante de 1152 × 76, raio 24, a 28px do topo.
3. **Links.** Estão em 14px e fora do centro: o centro fica em x 640 em vez de x 720. No site eles têm 16px, em Hanken Grotesk, centralizados.
4. **CTA.** Usa Outfit 14 com a seta ↗. No site é Inter 16 com a seta →.
5. **Celular.** Não tem botão de menu, então os links somem abaixo de 768px e não há como navegar.

A Home, o Sona e o Gabriel usam `src/components/liquid/LiquidHeader.tsx`. O objetivo é **uma nav só para o site inteiro**, com um tema escuro para esta página. Nada de uma segunda nav paralela.

## Fonte da verdade (Figma, arquivo `BPffDtLmobPgTMqljJPBoj`)

- **Nav escura nova:** container `1138:1138`.
  - Desktop, estado A (topo): `1138:1141`.
  - Desktop, estado B (rolou 32px): `1138:1153`.
  - Mobile, estado A: `1138:1169`.
  - Mobile, estado B: `1138:1181`.
  - Mobile, menu aberto: `1138:1195`.
- **Nav clara de referência:** component set `nav bar` `382:1432` (variante `290:281`).
- **Guia de estilo:** `917:1133`. Seções `02 Modo Escuro` (`917:1140`) e `05 Liquid Glass` (`917:1158`). Pelo guia, a nav usa **vidro médio**.

**Passo 0, obrigatório, antes de escrever código:** rode `get_metadata` e `get_design_context` nos 5 frames da nav escura. Leia X, Y, largura, altura, preenchimentos, bordas e efeitos de cada camada e compare com os valores deste prompt. Se o Figma divergir de algo aqui, o Figma vence: pare e me mostre a divergência antes de seguir.

## Regras

- Mexa só nos arquivos listados em cada passo. Nada de refatorar outras coisas "de passagem".
- Nenhuma cor fora do guia. Todos os valores abaixo já são tokens do guia.
- Nada de travessão (—) em comentário ou texto novo.
- A nav clara da Home, do Sona e do Gabriel não pode mudar, fora a correção da logo do Passo 1.

---

## Passo 1 · Logo com o tamanho certo (arquivos novos em `public/logo/svg/`)

Os arquivos `logo-icon*.svg` têm `viewBox="0 0 107 120"`, com margem em volta do monograma. Numa caixa de 38×24 o monograma sai com cerca de 18×11, metade do Figma (o grupo de 38×24 em `290:281` e em `1138:1141`). Isso já acontece hoje na Home.

Crie dois arquivos novos a partir dos existentes, sem alterar os originais:

1. **`logo-mark.svg`:** cópia de `logo-icon.svg`. Troque só a tag de abertura por:
   `<svg width="38" height="24" viewBox="8 31.6 90.8 56.8" fill="none" xmlns="http://www.w3.org/2000/svg">`
   O preenchimento continua `#0C1A22`.
2. **`logo-mark-dark.svg`:** cópia de `logo-icon-dark.svg`, com a mesma tag de abertura. Troque `fill="white"` por `fill="#F2F5F8"` (o `texto-principal` do guia).

Confira abrindo os dois no navegador: o monograma tem que ocupar a caixa inteira, sem margem e sem corte.

## Passo 2 · Tema escuro no `LiquidHeader` (`src/components/liquid/LiquidHeader.tsx`)

1. Nova prop `tema?: 'claro' | 'escuro'`, com padrão `'claro'`. Sem a prop, tudo continua como está hoje.
2. Na div externa (a `fixed top-4 md:top-7 ...`), acrescente a classe `liquid-header--escuro` quando `tema === 'escuro'`.
3. Logo: troque `logoSrc` por um mapa `{ claro: '/logo/svg/logo-mark.svg', escuro: '/logo/svg/logo-mark-dark.svg' }`. Mantenha o link, o `aria-label`, a caixa `w-[38px] h-6` e `alt="Andreo Barbosa"`. Acrescente `width={38} height={24}` no `<img>`.
4. CTA: hoje a cor vem por `style={{ color: contatoColor }}`. Aplique esse style só no tema claro. No escuro, a cor vem do CSS do Passo 3.

## Passo 3 · CSS do tema escuro (`src/styles/liquid-glass.css`)

Acrescente um bloco novo logo depois das regras da nav (depois de `.liquid-mobile-nav-link:last-child`). Não altere nenhuma regra existente.

A nav escura vive fora de `.liquid-root`, onde as variáveis da nav clara não existem. Por isso o bloco define os próprios valores e sobrescreve **toda** propriedade da nav que hoje usa `var(--text-strong)`, `var(--glass-*)` ou `var(--accent-glass-soft)`.

```css
/* Nav bar · tema escuro (case SYSMED). Figma 1138:1138. Mesma geometria
   da nav clara; só cor, borda e vidro mudam. Valores do guia 917:1133:
   texto-principal, borda-padrao, borda-vidro, vidro-medio, acao-foco. */
.liquid-header--escuro {
  --nav-texto: #F2F5F8;
  --nav-borda: rgba(255, 255, 255, 0.10);
  --nav-borda-vidro: rgba(255, 255, 255, 0.14);
  --nav-vidro: rgba(12, 26, 34, 0.68);
  --nav-foco: #69B1FF;
}
.liquid-header--escuro .liquid-nav-link,
.liquid-header--escuro .liquid-navbar-cta,
.liquid-header--escuro .liquid-mobile-menu-btn {
  color: var(--nav-texto);
}
/* Estado A: CTA só com contorno. */
.liquid-header--escuro .liquid-navbar-cta {
  border-color: var(--nav-borda);
}
/* Estado B: vidro médio do guia. */
.liquid-header--escuro .liquid-navbar.is-scrolled {
  background: var(--nav-vidro);
  -webkit-backdrop-filter: blur(22px) saturate(1.2);
  backdrop-filter: blur(22px) saturate(1.2);
  border-color: var(--nav-borda);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.24);
}
.liquid-header--escuro .liquid-navbar::before {
  background: none;
  box-shadow: inset 0 1px 0 var(--nav-borda-vidro);
}
.liquid-header--escuro .liquid-navbar.is-scrolled .liquid-navbar-cta,
.liquid-header--escuro .liquid-navbar.is-scrolled .liquid-mobile-menu-btn {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--nav-borda-vidro);
}
.liquid-header--escuro .liquid-mobile-menu-btn:hover,
.liquid-header--escuro .liquid-mobile-menu-btn:active,
.liquid-header--escuro .liquid-mobile-menu-btn:focus-visible {
  background: rgba(242, 245, 248, 0.08);
  border-color: var(--nav-texto);
}
/* Menu mobile. */
.liquid-header--escuro .liquid-mobile-menu {
  background: var(--nav-vidro);
  -webkit-backdrop-filter: blur(22px) saturate(1.2);
  backdrop-filter: blur(22px) saturate(1.2);
}
.liquid-header--escuro .liquid-mobile-menu.is-open {
  border-color: var(--nav-borda);
  box-shadow: inset 0 1px 0 var(--nav-borda-vidro), 0 4px 20px rgba(0, 0, 0, 0.24);
}
/* Foco do guia no escuro: 2px, offset 3px, nunca igual ao hover. */
.liquid-header--escuro :focus-visible {
  outline: 2px solid var(--nav-foco);
  outline-offset: 3px;
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .liquid-header--escuro .liquid-navbar.is-scrolled,
  .liquid-header--escuro .liquid-mobile-menu {
    background: #0C1A22;
  }
}
```

## Passo 4 · Trocar a nav do case (`src/pages/CaseUxAi.tsx`)

1. Remova `import NavBar ...` e `<NavBar />`.
2. No mesmo lugar, use:
   `<LiquidHeader tema="escuro" activeSection={null} basePath="/" ctaLabel="Ver todos os projetos" ctaHref="/#projetos" ctaArrow />`
3. Importe `LiquidHeader` de `../components/liquid/LiquidHeader`. Importe também `../styles/liquid-glass.css`, igual a `CaseGabriel.tsx`, para não depender da ordem do bundle.
4. Rode `grep -rn "NavBar\|nav-vidro" src`. Se o `NavBar.tsx` não for usado em mais nada, apague o arquivo e o bloco `.nav-vidro` de `src/styles/case-ux-ai-tokens.css`. Se `nav` em `src/data/caseUxAi.ts` também ficar sem uso, remova esse objeto. Se algo ainda usar qualquer um dos três, **pare e me avise**.

## Passo 5 · Espaço da nav na S06 (`src/sections/case-ux-ai/S06Descoberta.tsx`)

A lâmina flutua de 28 a 104px. A S06 presa ainda reserva 88px, da nav antiga, e o rótulo "O PRIMEIRO SINAL" ficaria embaixo da lâmina.

1. Na div presa, troque `pt-[88px]` por `pt-[120px]`.
2. Na conta de `u`, troque o `88` por `120` e ajuste o comentário: "120 da nav (lâmina até 104 + 16 de respiro)".

Mais nada muda na S06.

## Passo 6 · Verificação (me mostre prints)

1. **Desktop 1440 × 900, topo do case.** Compare com `1138:1141`: lâmina em x 144, y 28, 1152 × 76; logo 38×24 a 24px da borda; links centralizados em x 720; borda direita do CTA em x 1272.
2. **Desktop, depois de rolar mais de 32px.** Compare com `1138:1153`: vidro médio, borda branca 10%, brilho de 1px no topo, CTA com fundo branco 6%.
3. **Celular 390.** Compare com `1138:1169`, `1138:1181` e `1138:1195`. O botão abre e fecha o menu, e cada link leva para `/#projetos`, `/#trajetoria`, `/#sobre` e `/#contato`.
4. **Home, Sona e Gabriel no desktop e no celular.** A nav tem que ser idêntica à de antes, fora a logo, agora com 38×24 como no Figma `290:281`.
5. **S06 em 1440 × 900.** O rótulo e o título aparecem inteiros, abaixo da lâmina.
6. **Teclado.** Tab pela nav do case mostra anel azul `#69B1FF` de 2px com offset 3, diferente do hover.
7. **Build.** `npm run build` sem erro.

Se algum item falhar, corrija antes de me devolver. Não corrija nada fora do escopo: anote e me diga.
