---
name: telecom-business-rules
description: Protege as regras comerciais, planos de internet residenciais oficiais, velocidades de download/upload, cidades atendidas e preços da Ligeira Telecom.
---

# Skill 15 — Telecom Business Rules

Esta skill é a guardiã das regras comerciais e precificações da Ligeira Telecom. Qualquer alteração ou nova proposta de plano, preço, velocidade ou cidade deve ser bloqueada caso não corresponda estritamente a este documento.

**MANDATÓRIO: NUNCA INVENTE PLANOS, PREÇOS OU REGRAS COMERCIAIS.**

## Quando usar esta skill
- Sempre que houver solicitações de alteração na grade de planos (`#planos`).
- Ao atualizar o Modal Wizard de contratação (Etapa 1: Plano, adicionais).
- Ao alterar a lista ou lógicas de cidades atendidas no código Javascript.

## Regras Comerciais e Planos Oficiais

### 1. Grade de Planos Residenciais
O site possui exatamente 4 planos residenciais oficiais. Os preços informados abaixo são os valores promocionais finais aplicando o desconto de pontualidade ("pagando até o vencimento"):

*   **Plano 300 Mega**:
    - Velocidade de download: `300 Mbps`
    - Velocidade de upload: `200 Mbps`
    - Preço oficial: `R$ 69,90/mês` (preço cheio: R$ 75,90)
    - Diferenciais: Wi-Fi 5G incluso, 100% Fibra, sem fidelidade.
*   **Plano 400 Mega**:
    - Velocidade de download: `400 Mbps`
    - Velocidade de upload: `200 Mbps`
    - Preço oficial: `R$ 74,90/mês` (preço cheio: R$ 85,90)
    - Diferenciais: Wi-Fi 5G incluso, Globoplay incluso, sem fidelidade.
*   **Plano 600 Mega (Mais Popular)**:
    - Velocidade de download: `600 Mbps`
    - Velocidade de upload: `300 Mbps`
    - Preço oficial: `R$ 83,90/mês` (preço cheio: R$ 89,90)
    - Diferenciais: Wi-Fi Super Ligeiro (Wi-Fi 6) incluso, Globoplay + Go Read, instalação prioritária, fidelidade de 12 meses.
*   **Plano 800 Mega**:
    - Velocidade de download: `800 Mbps`
    - Velocidade de upload: `400 Mbps`
    - Preço oficial: `R$ 99,90/mês` (preço cheio: R$ 109,90)
    - Diferenciais: Wi-Fi Super Ligeiro (Wi-Fi 6) incluso, Globoplay + apps premium, suporte VIP, fidelidade de 12 meses.

### 2. Serviços Adicionais (Wizard - Etapa 1)
*   **IP Fixo**: `+ R$ 20,00/mês` (Ideal para monitoramento de câmeras).
*   **Suporte Premium 24h**: `+ R$ 15,00/mês` (Prioridade em chamados).

### 3. Cidades com Cobertura Oficial
A Ligeira Telecom opera estritamente nas seguintes 5 cidades da região do Cariri:
1.  **Juazeiro do Norte**
2.  **Brejo Santo**
3.  **Mauriti**
4.  **Milagres**
5.  **Penaforte**

*   *Regra de Validação:* O dropdown de cidades da Etapa 2 do Wizard deve conter exatamente essas 5 cidades, sem abreviações ou alterações.

## Checklist de Verificação
- [ ] Todos os preços e velocidades exibidos correspondem aos valores oficiais?
- [ ] A lógica de desconto de pontualidade está claramente expressa nos cards?
- [ ] O dropdown de cidades de contratação lista unicamente as 5 cidades autorizadas?
- [ ] Nenhuma oferta comercial ou plano fictício foi adicionado ao site?
