---
name: image-strategy
description: Define a estratégia de imagem, escolha de ativos visuais, ilustrações técnicas e elementos gráficos flutuantes do site Ligeira Telecom.
---

# Skill 08 — Image Strategy

Esta skill dita a estratégia de uso de imagens, ícones e assets de mídia na Ligeira Telecom. Ela é responsável por garantir que as mídias escolhidas transmitam o padrão premium de tecnologia do site (estilo NIO), evitando fotografias genéricas ou pesadas que prejudiquem a performance.

## Quando usar esta skill
- Ao adicionar novas imagens ou ilustrações na página.
- Ao atualizar o logotipo da marca ou ícones de navegação/benefícios.
- Ao inserir ilustrações técnicas ou mockups de interface (ex: mapas, roteadores).

## Diretrizes de Imagens e Ilustrações

### 1. Curadoria e Conceito
*   **Minimalista e Tecnológico**: Dê preferência a ilustrações vetoriais limpas, mockups de dispositivos modernos ou composições de interface interativas (como o velocímetro digital `.speed-display` e o mapa de cobertura com malha GPON `.coverage-map-mockup`), em vez de fotos genéricas de banco de imagens com pessoas falsas sorrindo.
*   **Estilo Premium (Inspirado na NIO)**: Elementos devem flutuar com sombras sutis e fundos translúcidos (`backdrop-filter: blur()`). Use glows de gradiente no fundo para dar profundidade de luz.

### 2. Formato e Otimização
*   **Imagens Leves**: Qualquer imagem adicionada deve estar otimizada no formato **WebP** ou **SVG** (para ícones e logos).
*   **Logotipo Oficial**: Use exclusivamente o endereço CDN verificado do logotipo da Ligeira Telecom:
    `https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop,q=95/YrDNWozL9xuO22EZ/ligeira-vertical---fundo-roxo-Yan91bXgrbSOw721.png`

### 3. Posicionamento e Elementos Flutuantes
*   **Mockups e Mapas**: Devem possuir cantos arredondados generosos (`--radius-xl` ou `var(--radius-lg)`) e contornos finos de cor cinza claro ou branco translúcido (`border: 1px solid rgba(255,255,255,0.1)`) para simular sofisticação.
*   **Uso de Emojis como Ícones**: O site atual utiliza emojis representativos (ex: ⚡, 📶, ⏱️, 🛠️, 🏠, 🎬, 🌿, 📚) integrados em blocos de ícones para velocidade de carregamento e contraste. Se for alterá-los por SVGs, garanta que os SVGs tenham cores consistentes do design system.

## Checklist de Verificação
- [ ] As imagens ou elementos adicionados seguem o estilo moderno, limpo e premium?
- [ ] O logotipo oficial da Ligeira Telecom está usando a URL CDN correta e preserva suas proporções?
- [ ] Novas imagens foram salvas no formato otimizado WebP ou SVG?
- [ ] Elementos gráficos novos usam as bordas arredondadas e sombras padrão do projeto?
