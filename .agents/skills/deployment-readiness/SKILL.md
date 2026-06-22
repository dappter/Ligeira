---
name: deployment-readiness
description: Fornece um checklist completo de homologação e prontidão de deploy para garantir a qualidade de produção do site Ligeira Telecom.
---

# Skill 25 — Deployment Readiness

Esta skill atua como o gatekeeper final antes que as alterações no site Ligeira Telecom sejam consideradas prontas para publicação (deploy). Ela define o checklist de verificação final de ponta a ponta.

## Quando usar esta skill
- No encerramento de qualquer tarefa de desenvolvimento, antes de entregar o resultado ao usuário ou solicitar aprovação.

## Checklist Pré-Deploy Obrigatório

### 1. Integridade Técnica do Arquivo
- [ ] **Sem Erros de Sintaxe HTML/CSS/JS**: O arquivo carrega sem erros de console ou quebras na renderização inicial.
- [ ] **Sem Console Logs**: Remova `console.log()` ou comandos de depuração que tenham sido inseridos temporariamente no código Javascript.
- [ ] **Links Corretos**: Todos os hiperlinks internos e externos (`href`) estão apontando para destinos válidos e não há tags `#` soltas sem âncora funcional.

### 2. Responsividade Móvel
- [ ] O menu hamburger responde ao clique em telas móveis e exibe os links corretamente.
- [ ] O Modal Wizard não corta conteúdos na base ou no topo em telas pequenas (escala de 360px a 414px).
- [ ] A barra fixa inferior para celulares (`#mobile-bar`) está visível abaixo de 900px de largura de viewport.

### 3. Validação de Regras de Negócio e Identidade
- [ ] Preços de planos promocionais mantêm a regra de pontualidade ("pagando até o vencimento") visível.
- [ ] O dropdown de cidades da Etapa 2 do Wizard contém exatamente as 5 cidades oficiais (Juazeiro do Norte, Brejo Santo, Mauriti, Milagres, Penaforte).
- [ ] Não há textos de exemplo genéricos (ex: Lorem Ipsum) ou referências diretas a concorrentes comerciais da Ligeira.

### 4. Acessibilidade e SEO
- [ ] As tags meta de descrição, viewport e o título do site estão corretos no `<head>`.
- [ ] Existe apenas uma tag `<h1>` no topo da página.
- [ ] Leitores de tela podem ler e navegar pelas ações interativas do site graças às marcações de acessibilidade (ARIA labels).

## Procedimento de Validação
Caso qualquer item do checklist acima falhe, a tarefa **não deve ser dada como concluída**. Corrija as inconsistências antes de reportar a conclusão da alteração.
