---
name: qa-automation
description: Define cenários de teste manuais e simulados para automação de testes de QA no site Ligeira Telecom, prevenindo quebras em fluxos críticos.
---

# Skill 26 — QA Automation

Esta skill orienta a validação de qualidade (QA) do site Ligeira Telecom através da especificação de cenários de testes e fluxos de homologação funcionais para simular o comportamento do usuário.

## Quando usar esta skill
- Durante a fase de testes e validação após qualquer alteração lógica de Javascript ou estrutural de HTML.
- Para instruir agentes de testes automatizados (como subagentes de navegador) sobre os fluxos críticos a serem verificados.

## Matriz de Cenários de Teste

### Cenário 1: Fluxo de Consulta de Cobertura com Sucesso (Hero e Seção)
1.  **Ação**: Digitar "Rua São Francisco, 120" no input de cobertura e clicar em "Verificar cobertura".
2.  **Resultado Esperado**: O sistema exibe o bloco `#result-success` contendo a mensagem verde de sucesso. O bloco de erro deve estar invisível.
3.  **Ação**: Clicar no botão "Contratar agora →" presente no resultado de sucesso.
4.  **Resultado Esperado**: O Modal Wizard é aberto imediatamente exibindo a `Etapa 1` de confirmação do plano.

### Cenário 2: Fluxo de Consulta sem Cobertura e Captação de Lead
1.  **Ação**: Forçar uma simulação sem cobertura (o script simula alternância aleatória). Se o bloco `#result-unavailable` for exibido:
2.  **Resultado Esperado**: O formulário compacto com campos de Nome, WhatsApp e botão "Me avise" deve ficar visível e interativo.

### Cenário 3: Fluxo Completo do Wizard de Contratação (Checkout)
1.  **Ação**: Clicar em "Contratar este plano" no card do Plano 600 Mega.
2.  **Resultado Esperado**: O modal abre na `Etapa 1` com o título "Confirme o plano escolhido", mostrando o nome "Plano 600 Mbps" e preço "R$ 83,90".
3.  **Ação**: Clicar em "Continuar → Endereço".
4.  **Resultado Esperado**: Abre a `Etapa 2` contendo campos de CEP, Cidade (Juazeiro do Norte pré-selecionado), Bairro, Rua e Número.
5.  **Ação**: Preencher os dados fictícios e avançar.
6.  **Resultado Esperado**: Abre a `Etapa 3` ("Dados para contato").
7.  **Ação**: Preencher Nome, CPF, WhatsApp e marcar o checkbox de consentimento de privacidade. Clicar em "Finalizar pedido →".
8.  **Resultado Esperado**: Exibe a `Etapa 4` de Sucesso ("Pedido enviado!") contendo o resumo correto do plano e o botão verde do WhatsApp habilitado.

### Cenário 4: Comportamento de FAQ Acordeão
1.  **Ação**: Clicar no primeiro item do FAQ.
2.  **Resultado Esperado**: O item ganha a classe `.open` e a resposta fica visível.
3.  **Ação**: Clicar no segundo item do FAQ.
4.  **Resultado Esperado**: O primeiro item perde a classe `.open` (resposta oculta) e o segundo item abre (resposta visível).

## Checklist de Verificação
- [ ] O fluxo de sucesso da cobertura leva corretamente ao Wizard?
- [ ] O Wizard valida a obrigatoriedade da caixa de privacidade antes da etapa final?
- [ ] Os acordeões do FAQ fecham os itens vizinhos ao abrir um novo item?
- [ ] O botão do WhatsApp no fim do Wizard e Hero está apontando para a API do WhatsApp com número da Ligeira?
