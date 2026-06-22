---
name: hero-section-specialist
description: Regula a estrutura, hierarquia visual, posicionamento e elementos de conversão da primeira dobra (Hero Section) do site Ligeira Telecom.
---

# Skill 07 — Hero Section Specialist

Esta skill gerencia especificamente a Hero Section (primeira dobra do site). Garante que a área de maior impacto visual e conversão imediata do site siga os princípios de design da marca, mantenha a legibilidade e posicione corretamente seus elementos dinâmicos.

## Quando usar esta skill
- Ao fazer qualquer alteração no HTML/CSS dentro da classe `.hero`.
- Ao otimizar o campo de busca de endereço do topo.
- Ao atualizar o widget de velocidade `.speed-display` ou as estatísticas rápidas `.hero-stats`.

## Estrutura da Primeira Dobra (Hero)

### 1. Coluna da Esquerda (Conteúdo e Conversão)
*   **Badge Superior (`.hero-badge`)**: Indica que a rede é "⚡ 100% Fibra Óptica no Cariri". Deve ficar acima do título principal.
*   **Título Principal (`.hero-title`)**: Deve conter o `<h1>` do site. Usa tamanho dinâmico (`clamp(34px, 4vw, 52px)`) e o destaque de cor (`.accent`) na palavra chave (atualmente "sua casa").
*   **Subtítulo (`.hero-subtitle`)**: Apresentação curta de benefícios. Max-width fixado em `440px` para evitar linhas excessivamente longas e manter boa legibilidade.
*   **Barra de Consulta Rápida (`.hero-search-box`)**: Caixa branca com sombra pesada, contendo ícone de mapa, campo de CEP/endereço e o botão primário `.btn-search` chamando `verificarCobertura()`.
*   **Opções Rápidas (`.hero-search-options`)**: Links de atalho em formato de pílulas (`.search-option-btn`) com ícones inline.
*   **Estatísticas de Autoridade (`.hero-stats`)**: Exibe estatísticas de assinantes, uptime e cidades. Fica no rodapé da seção esquerda, com linha divisória superior.

### 2. Coluna da Direita (Impacto Visual)
*   **Widget de Velocidade (`.speed-display`)**: Um cartão de fundo translúcido (`rgba(255,255,255,0.06)`) contendo um raio indicador, o número "600+" destacado em laranja, a unidade "Mbps" e as pílulas coloridas para Fibra Óptica, Wi-Fi 6 e Latência.
*   *Nota de Design:* Este widget substitui imagens pesadas genéricas e simula um velocímetro de rede moderno e futurista. Deve manter seu posicionamento centralizado e flexível na coluna da direita.

## Diretrizes Visuais
1.  **Fundos e Gradientes**: O fundo do Hero deve manter o gradiente em diagonal escuro (`linear-gradient(135deg, #1a0066 0%, var(--purple-dark) 40%, var(--purple-mid) 100%)`) com os pseudoelementos `::before` e `::after` criando glows radiais de iluminação secundária.
2.  **Responsividade**: Em telas menores de 900px, a estrutura muda de grid bidimensional (`grid-template-columns: 1fr 1fr`) para coluna simples (`grid-template-columns: 1fr`), posicionando o display de velocidade abaixo das estatísticas da esquerda.

## Checklist de Verificação
- [ ] O `<h1>` está presente no Hero com tamanho e legibilidade corretos?
- [ ] A caixa de busca rápida de CEP/endereço está funcional e chama a consulta?
- [ ] O widget `.speed-display` mantém sua estrutura sem quebras de layout?
- [ ] Os pseudo-elementos de glow de fundo (`::before` e `::after`) continuam funcionando no CSS?
