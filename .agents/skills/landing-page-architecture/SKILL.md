---
name: landing-page-architecture
description: Organiza e preserva a estrutura de seções da homepage do site Ligeira Telecom. Valida a hierarquia visual e o fluxo de conversão.
---

# Skill 04 — Landing Page Architecture

Esta skill regula a arquitetura de informação e a hierarquia visual da homepage da Ligeira Telecom. Ela garante que a estrutura atual do site não seja fragmentada ou alterada de forma a quebrar o fluxo natural de conversão do usuário.

## Quando usar esta skill
- Ao reordenar, adicionar ou remover qualquer seção da página.
- Ao planejar mudanças estruturais de layout.
- Para verificar se o fluxo do topo ao rodapé está logicamente estruturado para guiar o cliente rumo à contratação.

## Estrutura de Seções Oficial (Ordem no HTML)

1.  **Navbar (`.navbar`)**: Logo, links de navegação (`#planos`, `#cobertura`, `#empresas`, `#blog`, `#atendimento`), botão secundário (2ª via de boleto exibido dinamicamente no scroll) e botão primário ("Contratar agora").
2.  **Hero Section (`.hero`)**: Primeira dobra. Badge informativo, título de alta conversão, campo de verificação de cobertura direta, atalhos de navegação/ação e widget dinâmico de velocidade (600+ Mbps) com pilhas de diferenciais técnicos rápidos.
3.  **Trust Bar (`.trust-bar`)**: Barra cinza clara de prova social e segurança pós-hero com 5 gatilhos rápidos (instalação rápida, sem fidelidade, 100% fibra, suporte WhatsApp, apps inclusos).
4.  **Planos Residenciais (`#planos`)**: Seção principal com grade de 4 cards de planos ordenados de forma crescente (300, 400, 600 - destacado, 800 Mega).
5.  **Seção de Cobertura (`#cobertura`)**: Métodos de verificação de cobertura (Endereço, CEP e Localização) e mapa visual mockup.
6.  **Benefícios / Diferenciais Gerais (`.benefits-section`)**: Grade de 6 cards detalhando vantagens da conexão (fibra, Wi-Fi na casa toda, baixa latência, suporte, home office, streaming).
7.  **Apps e Benefícios Integrados (`#apps`)**: Lista de logos/cards de aplicativos inclusos (Globoplay, Go Read, Imagina Só, etc.) e CTA de contratação.
8.  **Estrutura Técnica / Diferenciais de Rede (`.diff-section`)**: Seção escura focando em GPON, redundância de backbone e monitoramento 24/7, acompanhado por 4 cards numéricos de métricas técnicas.
9.  **Dúvidas Frequentes (`.faq-section`)**: Seção de sanar atritos com acordeões sanfonados para perguntas comuns.
10. **B2B / Internet para Empresas (`#empresas`)**: Bloco contendo benefícios para CNPJ e formulário de captação de leads corporativos.
11. **CTA Final (`.cta-section`)**: Chamada de fechamento com botões para rolar até a cobertura ou abrir WhatsApp.
12. **Footer (`footer`)**: Links de produtos, suporte, informações da empresa, cidades atendidas e direitos autorais.
13. **Mobile Bottom Bar (`#mobile-bar`)**: Barra fixa em telas móveis contendo CTAs rápidos ("Ver planos", "Verificar cobertura", "WhatsApp").

## Diretrizes de Arquitetura Visual
1.  **Hierarquia de Headings**: Garanta que haja apenas um `<h1>` no topo da página (no Hero) e títulos de seção coerentes (`<h2>`).
2.  **Fluxo de Conversão**: A página deve levar o cliente a:
    - Digitar o endereço no Hero ou na seção de Cobertura.
    - Escolher um plano diretamente na grade de Planos.
    - Se qualquer alteração quebrar esses links ou botões, a arquitetura de conversão está comprometida.
3.  **Coerência entre Seções**: Seções de suporte ou B2B não devem se misturar com os planos residenciais no fluxo de leitura.

## Checklist de Verificação
- [ ] A ordem de leitura original de seções de 1 a 13 foi estritamente mantida?
- [ ] Existe apenas um `<h1>` no documento inteiro?
- [ ] As âncoras internas (`#planos`, `#cobertura`, `#empresas`) rolam perfeitamente até seus alvos?
- [ ] O fluxo de conversão (cards de planos e formulários) continua visível e intuitivo?
