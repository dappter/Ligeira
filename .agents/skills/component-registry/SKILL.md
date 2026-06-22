---
name: component-registry
description: Cataloga os componentes de interface existentes em ligeira-telecom-site.html e evita a criação de componentes redundantes ou duplicados.
---

# Skill 12 — Component Registry

Esta skill gerencia o catálogo de componentes de interface do projeto Ligeira Telecom. Tem como principal objetivo evitar a duplicação de estruturas visuais e incentivar o reaproveitamento de estilos e scripts já estabelecidos.

## Quando usar esta skill
- Antes de criar qualquer nova seção ou bloco visual na página.
- Ao revisar componentes que compartilham comportamento ou design semelhante.

## Catálogo de Componentes Existentes

1.  **Botões (Buttons)**:
    - `.btn-orange` (Botão principal laranja com hover em `--orange-dark`).
    - `.btn-outline-white` (Botão secundário com borda translúcida branca).
    - `.btn-search` (Botão de busca em formulários/ inputs rápidos).
    - `.btn-plan.primary` (Botão roxo para planos normais).
    - `.btn-plan.featured-cta` (Botão de alta conversão para planos em destaque).
    - `.btn-plan-secondary` (Botão transparente com borda cinza para detalhes).
2.  **Cards**:
    - `.plan-card` (Card para planos residenciais, com versão `.featured` para planos em destaque).
    - `.benefit-card` (Card para diferenciais com ícones circulares coloridos).
    - `.app-card` (Card quadrado minimalista de aplicativo).
    - `.diff-number-card` (Card de estatística numérica com versão `.highlight` em laranja).
3.  **Formulários & Inputs**:
    - `.hero-search-box` (Barra de busca branca com ícone à esquerda e botão à direita).
    - `.form-field` (Container vertical com label e input/select/textarea padronizados).
4.  **Acordeão FAQ (`.faq-item`)**:
    - Bloco contendo pergunta e resposta revelada ao adicionar a classe `.open`.
5.  **Modal Wizard (`.wizard-overlay` & `.wizard-modal`)**:
    - Modal de finalização de pedido em 4 etapas, controlado por progresso dinâmico e botões de navegação.

## Regras de Reutilização
1.  **Não Crie Componentes Duplicados**: Se precisar de um novo card de estatísticas, reuse `.diff-number-card`. Se precisar de um novo formulário, baseie-se em `.business-form` e nas classes `.form-field` e `.form-submit`.
2.  **Padrão de Nomenclatura**: Mantenha a nomenclatura semântica baseada em classes do CSS do arquivo principal. Não crie IDs redundantes onde classes CSS genéricas possam resolver o estilo.

## Checklist de Verificação
- [ ] O novo recurso visual reaproveita estilos de botões ou cards existentes no arquivo HTML?
- [ ] Foram evitados estilos redundantes que duplicam propriedades visuais de componentes do registro?
- [ ] As classes CSS utilizadas correspondem às do catálogo original?
