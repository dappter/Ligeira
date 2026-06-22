---
name: conversion-optimization
description: Otimiza taxas de conversão (CRO), reduz fricção nos formulários de cadastro e melhora os CTAs da Ligeira Telecom.
---

# Skill 06 — Conversion Optimization

Esta skill é responsável por garantir que as modificações no site Ligeira Telecom maximizem a captura de leads e contratações, minimizando barreiras de usabilidade e pontos de fricção para o usuário.

## Quando usar esta skill
- Ao alterar o texto, cor ou comportamento de qualquer botão de chamada para ação (CTA).
- Ao modificar as etapas, validações ou campos do Modal Wizard de contratação.
- Ao atualizar seções que contêm formulários de captação de leads (cobertura indisponível, formulário B2B).

## Diretrizes de Otimização de Conversão (CRO)

### 1. Chamadas para Ação (CTAs) Persuasivas
*   **Hierarquia de Botões**: Mantenha uma diferenciação clara entre ações primárias (botão laranja `.btn-orange` ou roxo `.btn-primary-lg`) e ações secundárias (botão de borda `.btn-outline-white` ou link discreto).
*   **Clareza de Ação**: O texto do CTA deve ser direto sobre o próximo passo.
    - *Exemplos bons:* "Contratar este plano", "Consultar cobertura", "Finalizar pedido →".
    - *Evite:* "Enviar", "Clique aqui", "Saiba mais".

### 2. Redução de Fricção no Cadastro
*   **Wizard por Etapas**: O formulário de contratação deve seguir a divisão em etapas implementada (`Etapa 1: Plano` -> `Etapa 2: Endereço` -> `Etapa 3: Dados Pessoais` -> `Etapa 4: Sucesso`). Nunca aglomere todos os 15+ campos em uma única tela longa.
*   **Inputs Inteligentes**: Certifique-se de que os campos tenham placeholders adequados que demonstrem o formato esperado (ex: CPF: `000.000.000-00`, Telefone: `(88) 9 9999-9999`).
*   **Opções de Escape Fácil**: Em caso de indisponibilidade de cobertura, a interface deve imediatamente oferecer o formulário alternativo de captura ("Me avise quando chegar") com campos mínimos (Nome e WhatsApp).

### 3. Posicionamento de Elementos de Conversão
*   **Barra de Ação Mobile Fixa (`#mobile-bar`)**: Garanta que a barra inferior com botões de atalho rápido permaneça fixa e visível em telas menores que 900px, permitindo acesso imediato à verificação de cobertura ou contratação.

## Checklist de Verificação
- [ ] O CTA primário de cada seção está visualmente destacado e com texto de ação claro?
- [ ] O Wizard por etapas foi mantido sem aglomeração de campos?
- [ ] Há um fluxo claro de captura de lead alternativo quando a cobertura falha?
- [ ] A barra fixa de conversão para celulares (`#mobile-bar`) continua funcional?
