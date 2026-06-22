---
name: prd-guardian
description: Valida conformidade das alterações com o escopo e PRD implícito do site Ligeira Telecom. Impede a criação de páginas, rotas ou recursos não solicitados pelo usuário.
---

# Skill 01 — PRD Guardian

Esta skill atua como o guardião dos requisitos oficiais e escopo do projeto Ligeira Telecom. Ela deve ser consultada e executada antes e depois de qualquer alteração no código para evitar desvios no escopo acordado.

## Quando usar esta skill
- **Sempre** no início de qualquer tarefa de modificação, refatoração ou adição de código.
- Durante a fase de planejamento para validar se os requisitos propostos correspondem ao que está documentado.
- Durante a revisão de código para garantir que nenhuma funcionalidade extra ou não solicitada foi implementada.

## Instruções para o Agente
1. **Leitura Inicial Obrigatória**: Antes de propor qualquer alteração, leia o arquivo principal `ligeira-telecom-site.html` e identifique as seções ativas. O arquivo HTML atual representa a especificação e o escopo de produção.
2. **Bloqueio de Funcionalidades Extra-Escopo**: Se uma tarefa solicitar a criação de novas páginas independentes (ex: `sobre.html`, `blog.html`), novas rotas, novos bancos de dados ou novos endpoints de API que não estejam previstos no arquivo principal do site, você deve alertar o usuário e recusar a implementação direta, a menos que haja aprovação explícita e formal no histórico da conversa.
3. **Validação de Requisitos**: Verifique se as alterações cumprem os objetivos das seções afetadas (ex: se for uma alteração nos planos, confira se não está quebrando a funcionalidade do botão de contratação que aciona o Wizard).
4. **Alertas de Conflito**: Caso uma decisão técnica ou instrução recebida no chat entre em conflito direto com as regras documentadas no HTML (ex: alterar preços dos planos residenciais ou remover cidades de cobertura sem o consentimento do cliente), emita um alerta contendo:
   - O requisito original afetado.
   - O impacto da alteração solicitada.
   - Um pedido de confirmação explícito.

## Checklist de Verificação
- [ ] O escopo da alteração se limita estritamente ao solicitado?
- [ ] Nenhuma nova funcionalidade desnecessária (gold plating) foi adicionada?
- [ ] O código modificado preserva as funcionalidades originais descritas no site?
- [ ] Foram emitidos alertas em caso de conflito com o escopo original?
