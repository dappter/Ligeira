---
name: admin-architecture-guardian
description: "Garante o cumprimento da arquitetura (Clean Architecture, SOLID), organização de pastas e uso do React+TypeScript no Painel Administrativo da Ligeira Telecom."
---

# Ligeira Telecom - Painel Administrativo Guardian

## Objetivo
Garantir que todo o desenvolvimento relacionado ao Painel Administrativo siga os mais altos padrões de arquitetura e UI/UX modernos (Padrão SaaS).

## Regras de Arquitetura (React SPA)
- O painel é uma SPA separada do site principal. O site principal é Vanilla HTML/CSS/JS.
- O ponto de entrada do painel é `admin.html` e a lógica está contida exclusivamente dentro de `src/admin/`.
- O painel administrativo foi projetado para **nunca impactar o bundle do site público**.

## Estrutura de Diretórios Rigorosa (`src/admin/`)
- `assets/`: Apenas recursos estáticos que precisam passar pelo bundler (svg, img).
- `components/`: Componentes visuais puramente apresentacionais (Atomic Design). Não devem possuir regras de negócio ou chamadas de API. Devem receber propriedades e emitir eventos (callbacks).
- `constants/`: Constantes imutáveis, rotas, variáveis de configuração, opções de filtros estáticos.
- `features/`: Lógica e componentes de domínio específicos. Cada feature (ex: `Dashboard`, `Ofertas`) deve conter seus próprios componentes locais, hooks e utilitários sempre que possível.
- `hooks/`: Custom Hooks genéricos (`useTheme`, `useClickOutside`).
- `layouts/`: Estruturas de layout de página (ex: `AdminLayout`, contendo Sidebar e Header).
- `pages/`: Arquivos que reúnem componentes para formar as views conectadas às rotas.
- `schemas/`: Validações de entrada de dados (preferencialmente utilizando *Zod*, caso introduzido).
- `services/`: Camada de comunicação de API. *Atualmente retornam apenas mocks (dados simulados), mas devem possuir a assinatura de funções assíncronas padrão (Promises).*
- `store/`: Estado global do lado do cliente utilizando `zustand`. (Ex: `useThemeStore`, `useNotificationStore`).
- `types/`: Declarações de tipos e interfaces do TypeScript (`.ts` ou `.d.ts`).
- `utils/`: Funções utilitárias puras (sem side-effects).
- `styles/`: CSS global e configurações base de estilo. O CSS do projeto é **Vanilla CSS**, gerenciado através de variáveis e Modules quando aplicável.

## Regras de Design e UX
- **Tema Base:** Laranja e Azul Escuro da Ligeira Telecom, aplicando hierarquia visual premium.
- **Glassmorphism:** Usado com moderação em modais, headers fixos e popovers, garantindo contraste.
- **Microinterações:** Todos os botões, cards e inputs devem possuir `hover`, `focus` e `active` states definidos via CSS (`transition: all 0.2s ease`).
- **Estados Visuais de Dados:**
  - *Empty States*: Sempre que uma lista ou tabela estiver vazia.
  - *Loading States / Skeletons*: Durante o tempo (simulado) de requisições.
  - *Feedback States*: Modais de sucesso/erro (Toasts/Snackbars).

## Regras de Código
- Tipagem é obrigatória em arquivos `.ts` e `.tsx` (sem uso excessivo de `any`).
- Seguir os princípios SOLID (especialmente Responsabilidade Única para componentes).
- Utilizar `lucide-react` para iconografia unificada.
- Manter o foco absoluto na experiência de uso do gestor: rápido, organizado e intuitivo.
