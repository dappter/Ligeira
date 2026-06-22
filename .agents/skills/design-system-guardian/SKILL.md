---
name: design-system-guardian
description: Preserva a identidade visual da Ligeira Telecom. Valida o uso correto de cores, tipografia (Montserrat) e tokens CSS de borda e espaçamento.
---

# Skill 02 — Design System Guardian

Esta skill protege a identidade visual da Ligeira Telecom. Ela garante que qualquer estilização CSS nova ou modificada utilize estritamente os tokens de design do projeto e respeite os padrões estéticos definidos.

## Quando usar esta skill
- Ao alterar o estilo CSS no elemento `<style>` de `ligeira-telecom-site.html`.
- Ao criar ou modificar componentes visuais (botões, modais, cards, tabelas, etc.).
- Ao fazer revisões de UI/UX antes da entrega da tarefa.

## Tokens Oficiais de Design (Extraídos do `:root`)

### Cores Principais (Púrpuras e Laranjas)
*   **Púrpura Escuro**: `--purple-dark: #3a0faa;` (Usado em fundos principais como Navbar, Footer e gradientes de seções escuras).
*   **Púrpura Principal**: `--purple-main: #4e1dd4;` (Usado em textos destacados e botões primários).
*   **Púrpura Médio**: `--purple-mid: #6028FF;` (A cor vibrante primária para CTAs, títulos de seção e destaques).
*   **Púrpura Claro**: `--purple-light: #8B5CF6;` (Usado para bordas ativas e estados de hover).
*   **Púrpura Pálido**: `--purple-pale: #ede9fe;` (Usado como fundo leve para seções e ícones).
*   **Laranja**: `--orange: #FFBF1A;` (Destaques da marca, botões secundários primordiais e badge de atenção).
*   **Laranja Escuro**: `--orange-dark: #e6a800;` (Hover de botões laranjas).
*   **Laranja Claro**: `--orange-light: #fff3cc;` (Fundo de alertas secundários).

### Cores de Suporte e Neutras
*   **Verde**: `--green: #10B981;` (Sucesso, cobertura ativa, preços com desconto).
*   **Branco**: `--white: #FFFFFF;`
*   **Escala de Cinzas (Neutros)**:
    - `--gray-50: #F9FAFB;` (Fundo de seções claras)
    - `--gray-100: #F3F4F6;`
    - `--gray-200: #E5E7EB;` (Bordas padrão)
    - `--gray-300: #D1D5DB;`
    - `--gray-400: #9CA3AF;`
    - `--gray-500: #6B7280;` (Textos secundários e descrições)
    - `--gray-600: #4B5563;`
    - `--gray-700: #374151;`
    - `--gray-800: #1F2937;`
    - `--gray-900: #111827;` (Texto principal de alta legibilidade)

### Tipografia
*   **Fonte**: `'Montserrat', sans-serif`
*   **Pesos (Weights)**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold), 900 (black).
*   **Font-size base**: `16px` no body, com títulos de seção dinâmicos (`clamp(28px, 3vw, 40px)`).

### Bordas (Bordas arredondadas padrão)
*   `--radius-sm: 8px;` (Botões pequenos, inputs, badges)
*   `--radius-md: 12px;` (Ícones de benefício, botões grandes, elementos médios)
*   `--radius-lg: 16px;` (Cards normais, inputs de busca, modais médios)
*   `--radius-xl: 24px;` (Cards de planos, display de velocidade, modal wizard)

## Diretrizes de Uso
1. **Sem Cores Ad-hoc**: É proibido introduzir cores arbitrárias diretamente no CSS (ex: `color: #ff0000` ou `background-color: blue`). Sempre utilize as variáveis nativas (ex: `var(--purple-mid)`).
2. **Preservação de Fontes**: Não utilize fontes alternativas fora do sistema Montserrat. Todos os novos estilos de texto devem respeitar a escala de peso e família definidos no `:root`.
3. **Hover Effects Obrigatórios**: Todos os elementos interativos (botões, links, cards interativos) devem possuir transições suaves (`transition: all 0.15s` ou `0.2s`) e estados de hover coerentes (ex: mudar de `var(--purple-mid)` para `var(--purple-main)` no hover, ou alterar opacidades e elevações suaves de cards).
4. **Alinhamento do Logo**: O logotipo oficial deve manter sua proporção original, utilizando a URL oficial do Zyrosite/Ligeira atualmente integrada.

## Checklist de Verificação
- [ ] Todas as cores adicionadas ou modificadas utilizam variáveis CSS do `:root`?
- [ ] A fonte do texto alterado está usando `Montserrat`?
- [ ] Os cantos arredondados de novos componentes seguem os tokens `--radius-*`?
- [ ] Os botões e links novos/alterados possuem efeitos de hover consistentes com o design system?
