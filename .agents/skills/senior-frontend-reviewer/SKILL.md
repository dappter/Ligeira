---
name: senior-frontend-reviewer
description: Atua como revisor sênior de front-end, analisando legibilidade do código, semântica HTML, performance, consistência de UI/UX e acessibilidade.
---

# Skill 28 — Senior Frontend Reviewer

Esta skill define as diretrizes de qualidade que um revisor de código sênior de front-end aplica no site Ligeira Telecom. Qualquer modificação de código deve passar por este crivo estrito para garantir que o projeto atenda a padrões de engenharia de nível de produção.

## Quando usar esta skill
- Na fase final de verificação de código, após a conclusão da implementação e testes automatizados, e imediatamente antes da entrega.

## Diretrizes de Revisão Técnica

### 1. Qualidade e Legibilidade do Código
- **Semantismo Limpo**: Verifique se o HTML está bem indentado, se as tags de fechamento estão corretas e se não existem tags inline de CSS órfãs ou de JS misturadas de maneira desorganizada.
- **Javascript Moderno e Eficiente**: Avalie se as funções do Javascript estão limpas, bem documentadas com comentários explicativos (onde necessário) e se não há vazamentos de memória (ex: event listeners adicionados em loops).
- **Sem Comentários Temporários**: Certifique-se de remover comentários como `// TODO: arrumar isso` ou códigos comentados mortos.

### 2. Validação da Experiência do Usuário (UX)
- **Fluidabilidade e Micro-interações**: Hover em links e botões devem estar suaves. Transições e modais não devem apresentar travamentos ou tremores na renderização.
- **Alinhamentos e Margens**: Verifique se o espaçamento visual do layout está simétrico (ex: paddings laterais de seções consistentes, alinhamento vertical de textos e ícones correto).

### 3. Homologação de Acessibilidade (WCAG)
- O código atende a navegação por teclado (`Tab`)? As marcações ARIA estão adequadamente descritas para elementos interativos que carecem de texto explícito?

### 4. Validação de Performance
- Garanta que imagens carregadas de CDNs possuam as dimensões reservadas no HTML/CSS para evitar saltos visuais durante o carregamento inicial.

## Checklist de Verificação
- [ ] O código-fonte está livre de lixo, console.logs e trechos comentados de rascunhos?
- [ ] Todos os novos seletores CSS e classes utilizam as variáveis globais de estilo de forma consistente?
- [ ] O alinhamento visual de todas as seções modificadas está correto e simétrico?
- [ ] O código passou nas validações de acessibilidade (ARIA, teclado e semântica)?
- [ ] A performance de renderização inicial da dobra de entrada não foi prejudicada pelas alterações?
