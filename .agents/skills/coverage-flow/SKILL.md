---
name: coverage-flow
description: Rege o fluxo de verificação de cobertura por CEP, endereço ou GPS no site Ligeira Telecom, controlando a captação de leads e a conversão final.
---

# Skill 16 — Coverage Flow

Esta skill regula o fluxo técnico e a experiência do usuário durante a verificação de cobertura no site Ligeira Telecom, garantindo que a jornada do cliente seja contínua e sem atritos.

## Quando usar esta skill
- Ao alterar o formulário de consulta de cobertura do Hero ou da seção `#cobertura`.
- Ao modificar as funções Javascript `checkCoverage()`, `usarGPS()`, `setMethod()`, ou `verificarCobertura()`.
- Ao otimizar o fluxo de exibição dos blocos de resultado de sucesso ou indisponibilidade.

## Fluxo Técnico de Cobertura

### 1. Métodos de Consulta (`setMethod`)
O site oferece exatamente 3 métodos de verificação na seção `#cobertura`:
*   **Digitar Endereço (`address`)**: Placeholder padrão: `Ex: Rua São Francisco, 120 - Juazeiro do Norte`.
*   **Consultar por CEP (`cep`)**: Muda o placeholder para `Digite seu CEP (ex: 63010-000)` e foca o campo.
*   **Usar minha localização (`gps`)**: Chama `usarGPS()`, acessa a API de geolocalização do navegador e escreve as coordenadas de latitude/longitude no input para disparar a verificação.

### 2. Estados de Resposta da Consulta (`checkCoverage`)
A consulta possui um comportamento simulado via `setTimeout` de `600ms` para criar uma experiência realista. Existem dois resultados possíveis:
*   **Cobertura Disponível (Sucesso — `#result-success`)**:
    - Exibe uma mensagem verde parabenizando o usuário.
    - Apresenta um botão primário destacado para acionar o Wizard de contratação na Etapa 1.
*   **Cobertura Indisponível (Sem Cobertura — `#result-unavailable`)**:
    - Exibe uma mensagem laranja/vermelha suave informando que a rede ainda não chegou no local.
    - Abre um formulário compacto de lead alternativo (Campos: Nome e WhatsApp com botão "Me avise").

### 3. Integração com o Hero Search Box
*   A barra de busca rápida no topo (Hero) deve ler o valor digitado e, ao clicar em "Consultar cobertura", rolar a página suavemente até `#cobertura`, preencher o campo principal e disparar o processo `checkCoverage()`.

## Checklist de Verificação
- [ ] O atalho do Hero de verificar cobertura rola suavemente a tela até a seção e executa a verificação?
- [ ] O método GPS solicita a permissão de geolocalização correta e exibe coordenadas no input?
- [ ] A simulação da consulta apresenta atraso intencional (`600ms`) com scroll suave focado no resultado?
- [ ] O formulário de lead alternativo para endereços sem cobertura captura os dados do cliente corretamente?
- [ ] O botão do resultado de sucesso abre o Modal Wizard de contratação diretamente?
