---
name: plan-cards-specialist
description: Estrutura, destaca visualmente e organiza a grade de comparação de planos de internet residencial no site Ligeira Telecom.
---

# Skill 17 — Plan Cards Specialist

Esta skill controla a estrutura visual, comportamento interativo e elementos de conversão da grade de planos residenciais (`.plans-grid`) do site Ligeira Telecom.

## Quando usar esta skill
- Ao alterar o estilo CSS dos cards (`.plan-card`).
- Ao modificar o layout dos planos ou o posicionamento dos preços.
- Ao atualizar a lista de itens inclusos em cada plano.

## Estrutura do Plan Card

### 1. Elementos Padrão do Card
*   **Velocidade**: Exibida em fonte gigante (`52px` com peso `900`) e cor `--purple-dark` para contraste máximo.
*   **Área de Preço (`.plan-price-area`)**: Caixa cinza clara (`--gray-50`) que agrupa o preço antigo tachado, o preço promocional (ex: `R$ 83,90`) com os centavos em tag `<small>`, e a mensagem verde de pontualidade: `✓ Pagando até o vencimento`.
*   **Recursos Inclusos (`.plan-features`)**: Lista semântica (`<ul>`) onde cada item possui uma bolinha verde com um ícone de "check" (`✓`).
*   **CTAs de Ação**:
    - Botão primário roxo (`.btn-plan.primary`) ou laranja (`.btn-plan.featured-cta`) chamando `abrirWizard(plano)` ao ser clicado.
    - Botão de detalhes secundário (`.btn-plan-secondary`).

### 2. Destaque Visual do Plano de 600 Mega (Featured)
*   O plano de **600 Mbps** deve reter a classe `.plan-card.featured`, que aplica:
    - Borda roxa mais espessa de `2px` (`var(--purple-mid)`).
    - Fundo em gradiente suave arroxeado (`linear-gradient(160deg, #F5F3FF 0%, white 60%)`).
    - Uma etiqueta superior absoluta (`.plan-badge`) indicando "⭐ Mais popular".
    - O número da velocidade destacado na cor `--purple-mid`.
    - Botão de contratação na cor laranja (`.btn-plan.featured-cta`) para atrair cliques imediatos.

## Checklist de Verificação
- [ ] A grade de planos exibe os cards ordenados por velocidade (300, 400, 600, 800 Mbps)?
- [ ] O card de 600 Mbps sobressai visualmente em relação aos outros cards através de sua borda e badge?
- [ ] Os botões de contratação disparam o Wizard com a string identificadora de plano correta ('300', '400', '600', '800')?
- [ ] A lista de benefícios de cada card utiliza os marcadores de check verde e mantém boa legibilidade?
