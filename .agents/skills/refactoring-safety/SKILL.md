---
name: refactoring-safety
description: Minimiza riscos de regressões, protege o comportamento de funções Javascript existentes e garante refatorações seguras no site Ligeira Telecom.
---

# Skill 24 — Refactoring Safety

Esta skill é responsável por garantir a segurança de qualquer processo de refatoração no código da Ligeira Telecom. Protege a retrocompatibilidade das lógicas, previne quebras em navegadores antigos e evita regressões de recursos existentes.

## Quando usar esta skill
- Ao alterar a estrutura de funções Javascript.
- Ao limpar ou otimizar regras CSS antigas ou redundantes.
- Ao reorganizar elementos no HTML.

## Diretrizes de Refatoração Segura

### 1. Detecção de Riscos
*   Identifique se a mudança afeta scripts essenciais de usabilidade.
*   *Exemplos de risco:* Remover o evento de escuta de scroll (`window.addEventListener('scroll')`) que controla a exibição do botão de boleto, ou alterar a nomenclatura de classes utilizadas no JS (ex: `.faq-item` na lógica de acordeão `toggleFaq`).

### 2. Evitar Regressões
*   **Compatibilidade do Script**: Mantenha o uso de lógicas Javascript nativas (ES6 padrão) compatíveis com navegadores móveis sem requerer loaders ou empacotadores (como Webpack/Vite), uma vez que o arquivo é entregue de forma direta e estática.
*   **Backup e Teste Contínuo**: Antes de salvar modificações profundas, valide se o site continua renderizando perfeitamente no navegador através de testes locais.

### 3. Preservação de Funcionalidades
*   Qualquer limpeza de código "morto" no CSS deve ser precedida de uma busca rigorosa (com `grep_search`) para garantir que o estilo não esteja sendo injetado dinamicamente via Javascript (ex: manipulação de classes como `.open` ou `.active`).

## Checklist de Verificação
- [ ] O código refatorado preserva exatamente a mesma API pública e assinaturas de funções existentes (ex: `abrirWizard`, `toggleFaq`)?
- [ ] Foi verificado se classes CSS removidas não eram utilizadas para manipulação dinâmica via JS?
- [ ] O site mantém a compatibilidade direta com navegadores tradicionais sem requerer compiladores?
- [ ] A refatoração passou por um teste de regressão manual rápido dos fluxos principais (Wizard, FAQ e Cobertura)?
