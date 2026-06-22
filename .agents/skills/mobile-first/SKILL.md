---
name: mobile-first
description: Garante a excelência, responsividade de layout, conformidade de touch targets e alta performance em dispositivos móveis no site Ligeira Telecom.
---

# Skill 10 — Mobile First

Esta skill garante que o site Ligeira Telecom ofereça uma experiência de uso móvel impecável. Dita as regras de responsividade, tamanhos mínimos de área de toque (touch targets) e otimização geral para celulares e tablets.

## Quando usar esta skill
- Ao escrever ou modificar qualquer código CSS de Media Queries (`@media`).
- Ao adicionar novos botões, inputs, links ou menus.
- Durante a validação de layout em emuladores móveis ou telas físicas.

## Diretrizes para Dispositivos Móveis

### 1. Pontos de Quebra (Breakpoints)
*   **Abaixo de 900px (Tablets e Celulares grandes)**:
    - Ocultar links da Navbar (`.navbar-links`) e habilitar botão de hambúrguer (`.hamburger`).
    - Hero muda para uma única coluna (`grid-template-columns: 1fr`).
    - Grade de planos passa para 2 colunas.
    - Grade de apps passa para 3 colunas.
    - Seções de cobertura e diferenciais passam para coluna simples.
    - Exibir a barra fixa de ação inferior (`.mobile-bar`).
*   **Abaixo de 600px (Celulares padrão)**:
    - Reduzir espaçamentos de seção (`padding: 56px 16px`).
    - Mudar grade de planos e benefícios para coluna única.
    - Caixa de busca do Hero muda para coluna e o botão ocupa largura total.
    - Tamanho do título do Hero cai para `26px`.
    - Modal Wizard ocupa até `95vh` de altura com rolagem interna ativa para evitar corte de conteúdo.

### 2. Áreas de Toque (Touch Targets)
*   **Tamanho Mínimo**: Todos os elementos interativos clicáveis em telas móveis (botões, links, checkboxes) devem possuir uma área de toque ativa de no mínimo **48x48px** para evitar cliques acidentais e problemas de usabilidade para dedos humanos.
*   **Espaçamento**: Garanta espaçamento de pelo menos `8px` a `12px` entre botões adjacentes.

### 3. Otimização de Performance Móvel
*   Evite o carregamento de animações JS complexas em telas de celulares para economizar processamento.
*   Preserve os gradientes puros em CSS ao invés de imagens gigantescas como fundo do site.

## Checklist de Verificação
- [ ] O layout se adapta perfeitamente sem quebras de texto ou transbordamento horizontal (`overflow-x`) em resoluções de 375px, 414px e 768px?
- [ ] Todos os botões e áreas clicáveis possuem tamanho mínimo recomendado de 48px?
- [ ] A barra fixa de rodapé (`#mobile-bar`) é exibida somente abaixo de 900px e possui links corretos?
- [ ] O menu hamburger de navegação abre e exibe os links em formato de lista suspensa no mobile?
