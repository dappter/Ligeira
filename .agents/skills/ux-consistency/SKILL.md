---
name: ux-consistency
description: Garante consistência de interações de UX no site Ligeira Telecom, incluindo modais, scroll suave, menus suspensos e feedbacks visuais.
---

# Skill 09 — UX Consistency

Esta skill governa a consistência das interações de experiência do usuário (UX) em todos os pontos de contato da página da Ligeira Telecom, tanto em ambiente desktop quanto mobile.

## Quando usar esta skill
- Ao programar ou alterar qualquer script de comportamento de tela (Javascript).
- Ao modificar o comportamento do Modal Wizard de contratação ou acordeões do FAQ.
- Ao atualizar animações ou efeitos de scroll da página.

## Padrões de Interação e UX Estabelecidos

### 1. Comportamento do Modal Wizard
*   **Abertura e Fechamento**: O modal abre ao clicar em botões de contratação chamando `abrirWizard(plano)`. Ele impede o scroll da página de fundo adicionando `overflow: hidden` ao body. Ao fechar com `fecharWizard()`, o scroll do body deve ser restaurado.
*   **Fechamento Externo**: Clicar na área escura de overlay do modal (`fecharWizardExterno(event)`) deve fechar o modal automaticamente para conveniência do usuário.
*   **Progresso Visível**: O progresso do Wizard deve ser atualizado visualmente na barra horizontal superior (`#wizard-progress`) e exibir textualmente a etapa atual (ex: "Etapa 2 de 4 — Seu endereço").

### 2. Acordeões de FAQ (`toggleFaq`)
*   **Exclusividade de Abertura**: Quando o usuário clica em uma pergunta do FAQ para abri-la, todos os outros acordeões abertos devem se fechar automaticamente, focando a atenção na resposta selecionada.

### 3. Navegação e Rolagem de Página
*   **Scroll Suave**: Toda transição interna de link de âncora (ex: `href="#planos"`) deve acontecer através de rolagem suave controlada por Javascript (`scrollIntoView({ behavior: 'smooth' })`).
*   **Exibição de Elementos por Rolagem (Scroll Events)**: O botão de "2ª via de boleto" na Navbar (`#nav-boleto`) deve ser exibido (`display: block`) somente após o usuário descer mais de `200px` de altura na página.

## Checklist de Verificação
- [ ] O comportamento de rolagem do body é devidamente travado e destravado na abertura/fechamento do Modal Wizard?
- [ ] O fechamento externo do modal clicando no overlay escuro está funcional?
- [ ] Clicar em uma pergunta do FAQ fecha as outras perguntas ativas automaticamente?
- [ ] Todos os links internos com `#` efetuam rolagem suave (`smooth scroll`)?
- [ ] O botão de boleto na navbar respeita o gatilho de rolagem de `200px`?
