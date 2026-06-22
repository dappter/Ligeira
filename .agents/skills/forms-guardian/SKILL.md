---
name: forms-guardian
description: Valida formulários, máscaras de inputs (CPF, WhatsApp), feedbacks de erros e integridade de dados no site Ligeira Telecom.
---

# Skill 19 — Forms Guardian

Esta skill controla as lógicas de validação, usabilidade (UX) e tratamento de dados de todos os formulários e inputs presentes no site Ligeira Telecom.

## Quando usar esta skill
- Ao alterar o formulário B2B para empresas (`.business-form`).
- Ao modificar as etapas com inputs do Modal Wizard de contratação (Etapa 2: Endereço, Etapa 3: Dados Pessoais).
- Ao implementar ou alterar validações Javascript de campos de entrada.

## Diretrizes de Formulários e Validações

### 1. Máscaras de Entrada e Formatação
Todos os campos sensíveis de entrada de dados devem possuir máscaras para guiar o preenchimento e evitar dados inválidos:
*   **WhatsApp / Telefone**: Formato `(88) 9 9999-9999` ou `(XX) X XXXX-XXXX`.
*   **CPF**: Formato `000.000.000-00`.
*   **CEP**: Formato `00000-000` (Etapa 2 do Wizard).

### 2. Validação de Campos Obrigatórios
*   Impeça o progresso no Wizard (função `nextStep()`) caso os campos obrigatórios da etapa ativa estejam em branco ou possuam dados incompletos.
*   **Etapa 3 (Dados Pessoais)**: O checkbox de privacidade (`#privacy`) deve ser obrigatoriamente marcado para permitir a submissão final do pedido.

### 3. Usabilidade dos Formulários (UX)
*   **Focus e Feedback**: Elementos com erro de validação devem receber destaque visual imediato e focar o primeiro campo com erro automaticamente.
*   **Textareas**: Textareas (como o campo de observações do B2B) devem possuir redimensionamento vertical habilitado com altura mínima (`min-height: 80px`).

## Checklist de Verificação
- [ ] Todos os campos de CPF, WhatsApp e CEP possuem placeholders e máscaras de preenchimento adequadas?
- [ ] O botão de progresso do Wizard bloqueia o avanço caso campos obrigatórios estejam inválidos ou vazios?
- [ ] A caixa de consentimento de privacidade (`#privacy`) é obrigatória para finalizar a contratação?
- [ ] O formulário B2B valida e higieniza e-mails antes de disparar o lead?
