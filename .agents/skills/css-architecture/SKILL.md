---
name: css-architecture
description: Preserva a qualidade, escalabilidade e organização do código Vanilla CSS contido na tag <style> do site Ligeira Telecom.
---

# Skill 13 — CSS Architecture

Esta skill assegura a integridade estrutural e a manutenibilidade do código Vanilla CSS contido na seção `<style>` de `ligeira-telecom-site.html`. Evita a proliferação de código duplicado, regras redundantes e seletores desordenados.

## Quando usar esta skill
- Sempre que houver necessidade de adicionar, remover ou modificar regras de estilização (CSS).
- Ao realizar refatorações no layout para reduzir o peso do arquivo HTML.
- Durante revisões de código de folha de estilo.

## Padrões de Arquitetura CSS

### 1. Organização e Divisão do CSS (Comentários de Seção)
O código CSS deve ser estritamente agrupado e precedido por comentários em caixa alta para demarcar os blocos:
*   `/* ===================== NAVBAR ===================== */`
*   `/* ===================== HERO ===================== */`
*   `/* ===================== TRUST BAR ===================== */`
*   `/* ===================== PLANS ===================== */`
*   `/* ===================== COVERAGE ===================== */`
*   `/* ===================== BENEFITS ===================== */`
*   `/* ===================== APPS ===================== */`
*   `/* ===================== DIFFERENTIALS ===================== */`
*   `/* ===================== FAQ ===================== */`
*   `/* ===================== BUSINESS ===================== */`
*   `/* ===================== CTA FINAL ===================== */`
*   `/* ===================== FOOTER ===================== */`
*   `/* ===================== MOBILE BOTTOM BAR ===================== */`
*   `/* ===================== WIZARD MODAL ===================== */`
*   `/* ===================== COVERAGE RESULT ===================== */`
*   `/* ===================== RESPONSIVE ===================== */`

### 2. Boas Práticas e Convenções
*   **Apenas Vanilla CSS**: Não adicione Tailwind CSS, Sass ou bibliotecas de utilitários externas no escopo do projeto Ligeira Telecom, a menos que solicitado formalmente pelo usuário.
*   **Utilização Estrita de Variáveis**: Valores de cores, fontes e bordas devem utilizar as variáveis declaradas no `:root` (Skill 02) para facilitar mudanças globais futuras.
*   **Prevenção de Duplicidades**: Não declare o mesmo seletor em múltiplos locais. Novos ajustes responsivos móveis devem ficar exclusivamente localizados dentro de suas respectivas consultas de mídia (`@media`) agrupadas no final do bloco de estilos.
*   **Transições Suaves**: Elementos com estados interativos devem possuir a propriedade `transition: all 0.15s` ou `0.2s` para evitar mudanças visuais bruscas.

## Checklist de Verificação
- [ ] O CSS modificado foi inserido na seção e categoria conceitual correspondente?
- [ ] Não há seletores CSS duplicados espalhados pelo arquivo?
- [ ] Todas as regras de responsividade móvel foram centralizadas nos blocos `@media` no fim do estilo?
- [ ] O código utiliza variáveis globais para cores, fontes e bordas em vez de valores brutos fixados (hardcoded)?
