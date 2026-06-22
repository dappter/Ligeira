---
name: accessibility-guardian
description: Valida práticas de acessibilidade web (WCAG), contraste de cores, suporte a navegação por teclado e marcações semânticas ARIA na Ligeira Telecom.
---

# Skill 11 — Accessibility Guardian

Esta skill atua como o defensor de acessibilidade web do site Ligeira Telecom. Ela assegura que usuários com necessidades especiais, leitores de tela ou navegando apenas por teclado consigam utilizar todas as funções da página perfeitamente.

## Quando usar esta skill
- Ao alterar a estrutura de tags HTML do site.
- Ao atualizar contrastes de cores de texto e elementos de segundo plano.
- Ao criar ou revisar formulários, modais ou links de navegação.

## Diretrizes de Acessibilidade (Padrão WCAG)

### 1. Semântica HTML5
*   Use tags semânticas estruturais: `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`, `<aside>`.
*   Utilize a hierarquia correta de headings: um único `<h1>`, seguido de `<h2>` para seções e `<h3>` para subseções. Não pule níveis de heading.

### 2. Navegação por Teclado
*   Todos os elementos interativos (botões, links, inputs, checkboxes) devem ser focáveis usando a tecla `Tab`.
*   Mantenha estados de foco visíveis no CSS (`:focus` ou `:focus-visible`) para indicar claramente onde o cursor do teclado está posicionado.
*   **Gestão de Foco no Modal**: Quando o Modal Wizard abrir, o foco deve ser transferido para dentro dele (geralmente para o título do modal ou primeiro botão) e, ao fechar, o foco deve retornar ao botão que disparou a ação.

### 3. Marcações ARIA e Alternativas de Texto
*   **Imagens e Logos**: Todas as imagens significativas devem conter o atributo `alt` preenchido de forma descritiva. Emojis integrados a textos decorativos devem usar `aria-hidden="true"` se não carregarem significado técnico.
*   **Botões Sem Texto**: Botões com apenas ícones ou de menu (como o `.hamburger` ou o fechar do modal `.wizard-close`) devem conter o atributo `aria-label` (ex: `aria-label="Menu"`, `aria-label="Fechar Modal"`).

### 4. Contraste de Cores
*   O contraste de cor do texto com o fundo deve ser de pelo menos **4.5:1** para textos normais e **3:1** para textos grandes (WCAG AA). Evite cinza claro sobre fundo branco, ou roxo claro sobre fundo escuro sem o contraste adequado.

## Checklist de Verificação
- [ ] O site é navegável por teclado através do botão `Tab` sem ficar preso em nenhuma armadilha de foco?
- [ ] O botão hamburger e de fechar modal possuem atributos `aria-label` descritivos?
- [ ] O contraste dos textos adicionados ou modificados atende aos limites da WCAG?
- [ ] Os elementos decorativos possuem tags corretas para serem ignorados por leitores de tela?
