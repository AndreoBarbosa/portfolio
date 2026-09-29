"""Gera as versões leves das imagens do site (AVIF + WebP em várias larguras).

Uso, na raiz do projeto:
    pip install "pillow>=11.2"
    python scripts/otimizar-imagens.py

Lê cada original listado em MANIFESTO, grava public/img/<nome>-<largura>.avif
e .webp e reescreve src/data/imagens.gerado.ts, que o componente <Picture>
usa para montar o srcset. O original fica em assets-fonte/ (fora do deploy)
e não é alterado.

Para uma imagem nova: acrescente uma linha ao MANIFESTO e rode de novo.
Larguras: a maior deve cobrir o tamanho exibido em tela 2x; nunca acima
da largura do original.
"""
from __future__ import annotations

import io
import json
import os
import sys

from PIL import Image

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(RAIZ, 'public')
# Originais pesados moram fora de public/ (assets-fonte/), para não subirem
# no deploy: o navegador só baixa as versões de public/img. Quem ainda
# estiver em public/ continua funcionando, a busca tenta os dois lugares.
ORIGINAIS = os.path.join(RAIZ, 'assets-fonte')
SAIDA = os.path.join(PUBLIC, 'img')
TS = os.path.join(RAIZ, 'src', 'data', 'imagens.gerado.ts')

AVIF_Q = 65  # PSNR ~42 dB nas amostras, igual ao WebP 80 com 20 a 40% menos bytes
WEBP_Q = 80

# (caminho usado no código, arquivo de origem em public/, nome de saída, larguras)
MANIFESTO: list[tuple[str, str, str, list[int]]] = [
    # Home
    ('/hero-poster.webp', 'hero-poster.webp', 'hero-poster', [640, 960, 1664]),
    ('/projects/sona/static.png', 'projects/sona/static.png', 'projeto-sona', [400, 720]),
    ('/projects/sysmed/static.webp', 'projects/sysmed/static.png', 'projeto-sysmed', [400, 720]),
    ('/projects/gabriel/static.png', 'projects/gabriel/static.png', 'projeto-gabriel', [400, 720]),
    ('/onda-faixa-horizontal.webp', 'onda-faixa-horizontal.png', 'onda', [800, 1400, 1998]),
    ('/fundo-trajetoria.webp', 'fundo-trajetoria.png', 'fundo-trajetoria', [768, 1152, 1536]),
    ('/fundo-sobre.webp', 'fundo-sobre.png', 'fundo-sobre', [768, 1152, 1536]),
    ('/perfil.webp', 'perfil.png', 'perfil', [640, 1024, 1536, 2048]),
    # Case Gabriel
    ('/projects/gabriel/cover.png', 'projects/gabriel/cover.png', 'gabriel-capa', [800, 1200, 1600]),
    ('/projects/gabriel/desktop-areas.png', 'projects/gabriel/desktop-areas.png', 'gabriel-areas', [640, 960, 1280]),
    ('/projects/gabriel/desktop-como-funciona.png', 'projects/gabriel/desktop-como-funciona.png', 'gabriel-como-funciona', [640, 960, 1280]),
    ('/gabriel-liquid-wave.webp', 'gabriel-liquid-wave.png', 'gabriel-onda', [800, 1152, 1536]),
    ('/gabriel-liquid-composition.webp', 'gabriel-liquid-composition.png', 'gabriel-composicao', [480, 960]),
    # Case Sona (os originais já são WebP no tamanho 2x; aqui entra o AVIF)
    ('/projects/sona/1 - HERO.webp', 'projects/sona/1 - HERO.webp', 'sona-hero', [560, 1120]),
    ('/projects/sona/desafio/antes-depois.webp', 'projects/sona/desafio/antes-depois.webp', 'sona-antes-depois', [560, 1139]),
    ('/projects/sona/decisao/principal-decisao.webp', 'projects/sona/decisao/principal-decisao.webp', 'sona-decisao', [560, 1000]),
    ('/projects/sona/csd-matriz-priorizacao.webp', 'projects/sona/csd-matriz-priorizacao.webp', 'sona-csd', [560, 1120]),
    ('/projects/sona/prototipacao/01-automatizar.webp', 'projects/sona/prototipacao/01-automatizar.webp', 'sona-proto-01', [240, 320]),
    ('/projects/sona/prototipacao/02-confianca.webp', 'projects/sona/prototipacao/02-confianca.webp', 'sona-proto-02', [240, 320]),
    ('/projects/sona/prototipacao/03-sugerir.webp', 'projects/sona/prototipacao/03-sugerir.webp', 'sona-proto-03', [240, 320]),
    ('/projects/sona/ds-icones-metas.webp', 'projects/sona/ds-icones-metas.webp', 'sona-ds-icones', [452]),
    ('/projects/sona/ds-componentes.webp', 'projects/sona/ds-componentes.webp', 'sona-ds-componentes', [455]),
    ('/projects/sona/12 - DO FIGMA AO COMPORTAMENTO.webp', 'projects/sona/12 - DO FIGMA AO COMPORTAMENTO.webp', 'sona-figma-comportamento', [640, 1200, 1365]),
    ('/projects/sona/14 - APRENDIZADO.webp', 'projects/sona/14 - APRENDIZADO.webp', 'sona-aprendizado', [440, 880]),
]


def abrir(caminho: str) -> Image.Image:
    im = Image.open(caminho)
    im.load()
    tem_alfa = im.mode in ('RGBA', 'LA', 'PA') or (im.mode == 'P' and 'transparency' in im.info)
    im = im.convert('RGBA' if tem_alfa else 'RGB')
    # Alfa todo opaco: grava sem canal alfa (arquivo menor).
    if im.mode == 'RGBA' and im.getchannel('A').getextrema() == (255, 255):
        im = im.convert('RGB')
    return im


def gravar(im: Image.Image, destino: str, fmt: str, original: str | None = None) -> int:
    buf = io.BytesIO()
    if fmt == 'AVIF':
        im.save(buf, 'AVIF', quality=AVIF_Q, speed=4)
    else:
        im.save(buf, 'WEBP', quality=WEBP_Q, method=6)
    dados = buf.getvalue()
    # Mesma largura do original WebP: fica com o menor dos dois.
    if original and os.path.getsize(original) < len(dados):
        dados = open(original, 'rb').read()
    with open(destino, 'wb') as f:
        f.write(dados)
    return len(dados)


def main() -> None:
    os.makedirs(SAIDA, exist_ok=True)
    tabela: dict[str, dict] = {}
    antes = depois = 0
    for chave, origem, nome, larguras in MANIFESTO:
        caminho = os.path.join(ORIGINAIS, origem)
        if not os.path.exists(caminho):
            caminho = os.path.join(PUBLIC, origem)
        if not os.path.exists(caminho):
            sys.exit(f'Falta o original: {origem} (procurei em assets-fonte/ e public/)')
        im = abrir(caminho)
        w0, h0 = im.size
        antes += os.path.getsize(caminho)
        for w in larguras:
            if w > w0:
                sys.exit(f'{nome}: largura {w} maior que o original ({w0})')
            h = round(h0 * w / w0)
            r = im if w == w0 else im.resize((w, h), Image.LANCZOS)
            mesmo_webp = caminho if (w == w0 and origem.endswith('.webp')) else None
            gravar(r, os.path.join(SAIDA, f'{nome}-{w}.avif'), 'AVIF')
            gravar(r, os.path.join(SAIDA, f'{nome}-{w}.webp'), 'WEBP', mesmo_webp)
        # Peso de referência: a maior versão AVIF, que é a que uma tela 2x baixa.
        depois += os.path.getsize(os.path.join(SAIDA, f'{nome}-{larguras[-1]}.avif'))
        tabela[chave] = {'base': f'/img/{nome}', 'larguras': larguras, 'w': w0, 'h': h0}
        print(f'{nome:26s} {w0}x{h0} -> {larguras}')

    linhas = [
        '// Gerado por scripts/otimizar-imagens.py. Não editar à mão.',
        '// Chave: caminho do original em public/. base + "-<largura>.avif|webp".',
        'export const IMAGENS: Record<string, { base: string; larguras: readonly number[]; w: number; h: number }> = '
        + json.dumps(tabela, ensure_ascii=False, indent=2),
        '',
    ]
    with open(TS, 'w', encoding='utf-8') as f:
        f.write('\n'.join(linhas))
    print(f'\n{len(MANIFESTO)} imagens. Originais publicados: {antes // 1024} KB. Maior AVIF de cada: {depois // 1024} KB.')


if __name__ == '__main__':
    main()
