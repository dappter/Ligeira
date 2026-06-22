---
name: codebase-intelligence
description: Exige a análise completa do código existente, mapeamento de dependências e análise de impacto antes de efetuar qualquer alteração no site Ligeira Telecom.
---

# Skill 23 — Codebase Intelligence

Esta skill orienta o agente a compreender profundamente a base de código do projeto antes de propor ou injetar qualquer linha de código. Garante que modificações respeitem o fluxo lógico e os relacionamentos de estilo/scripts do arquivo principal.

## Quando usar esta skill
- No início de qualquer tarefa de modificação para mapear os arquivos e funções afetadas.
- Ao investigar bugs ou inconsistências de comportamento de scripts.

## Diretrizes de Inteligência de Código

### 1. Leitura Inicial Obrigatória
*   Antes de editar qualquer seletor CSS ou função JS, use as ferramentas de leitura do ambiente (`view_file` ou `grep_search`) para localizar onde o elemento está definido e quais regras herdadas ele possui.

### 2. Mapeamento de Dependências
*   O site da Ligeira é construído em um arquivo único HTML autônomo (`ligeira-telecom-site.html`). Mapeie como o CSS no `<head>` afeta a estrutura HTML no `<body>` e como os scripts no `<script>` manipulam os IDs e classes da DOM.
*   *Exemplo:* O Modal Wizard (`#wizard`) possui botões que chamam `nextStep()` e `prevStep()`. Alterar o HTML do Wizard sem atualizar as lógicas Javascript que exibem/ocultam as IDs `#wizard-step-1` a `#wizard-step-4` quebrará o fluxo.

### 3. Análise de Impacto
*   Avalie se uma mudança local (como alterar o seletor `.btn-primary` ou `.btn-search`) impactará outras partes do site não relacionadas (ex: mudar o botão do Hero de busca de CEP pode desalinhá-lo na seção de cobertura se compartilharem as mesmas classes de botão).

## Checklist de Verificação
- [ ] O código a ser modificado foi integralmente lido e compreendido na sua localização original?
- [ ] Foram mapeadas todas as dependências Javascript e relacionamentos CSS que afetam o elemento editado?
- [ ] A alteração proposta mantém a integridade das lógicas e fluxos dependentes?
- [ ] A alteração foi isolada ou planejada para não quebrar outros componentes globais?
