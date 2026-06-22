---
name: anti-hallucination
description: Impede a invenção (alucinação) de requisitos, integrações de APIs, endpoints ou dados no projeto Ligeira Telecom. Exige consulta estrita aos arquivos reais do workspace.
---

# Skill 22 — Anti Hallucination

Esta skill é a defesa absoluta contra alucinações de inteligência artificial no projeto Ligeira Telecom. Estabelece regras rígidas para impedir que o agente assuma ou crie informações não documentadas e não existentes no workspace real.

## Quando usar esta skill
- **Sempre**, em todas as tarefas e interações. É uma regra global obrigatória que deve rodar silenciosamente em segundo plano de todas as ações de codificação.

## Regras Anti-Alucinação

### 1. Invenção de Requisitos e Dados
*   **Proibido Assumir Requisitos**: Se o usuário não detalhou uma regra comercial ou o comportamento de um fluxo, você não deve inventá-los. Pergunte ou consulte o arquivo de origem `ligeira-telecom-site.html`.
*   **Proibido Inventar Dados**: Não invente planos de velocidade alternativos (ex: planos de 1 Giga ou 200 Mega), preços fictícios, novas cidades atendidas ou métricas de rede que não estejam oficialmente mapeadas (Skill 15 e Skill 18).

### 2. Integrações de Sistemas e APIs
*   **Sem Endpoints Fictícios**: Não invente URLs de API (ex: `fetch('/api/v1/cobertura')` ou `axios.post('/submit-lead')`). Atualmente, o formulário de cobertura e o Modal Wizard rodam lógicas puramente locais na DOM e simulações com geolocalização.
*   **Sem Integrações de Terceiros Fantasiosas**: Não assuma que existe uma integração ativa com CRMs (ex: Salesforce, RD Station), gateways de pagamento (ex: Stripe, PagSeguro) ou sistemas de boleto bancário externos, a menos que o código do projeto contenha explicitamente essa implementação ou o usuário instrua de forma detalhada e forneça as credenciais/endpoints corretos.

### 3. Sempre Consultar o Workspace
*   Antes de responder a qualquer pergunta investigativa ("Como funciona X?", "Qual a cor do botão Y?"), você deve ler e pesquisar os arquivos reais do workspace. Nunca confie apenas na memória do modelo.

## Checklist de Verificação
- [ ] A alteração proposta depende de alguma API, endpoint ou serviço de terceiros fictício?
- [ ] Todos os dados de preços, velocidades e cidades foram extraídos diretamente do código real do site?
- [ ] Em caso de dúvida ou ausência de dados, foi solicitada a clarificação ao usuário em vez de assumir uma resposta?
- [ ] O código utiliza apenas as integrações locais de geolocalização e manipulação da DOM presentes no arquivo principal?
