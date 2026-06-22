---
name: performance-guardian
description: Protege a velocidade de carregamento, otimização de ativos e as métricas de Core Web Vitals (LCP, CLS, INP) no site Ligeira Telecom.
---

# Skill 21 — Performance Guardian

Esta skill gerencia a performance técnica do site Ligeira Telecom. Evita a inserção de scripts pesados, imagens sem dimensões definidas que causem quebra de layout, ou códigos bloqueantes que prejudiquem a experiência de navegação do usuário.

## Quando usar esta skill
- Ao inserir ou atualizar bibliotecas externas ou fontes.
- Ao adicionar arquivos de mídia (imagens, ícones).
- Ao modificar lógicas de escuta de eventos (`scroll`, `resize`) que rodam em tempo real no cliente.

## Diretrizes de Otimização de Performance

### 1. Evitar Cumulative Layout Shift (CLS)
*   **Dimensões de Imagem**: Todas as imagens (como logos e mockups) devem conter largura (`width`) e altura (`height`) explicitadas em pixels ou estilos CSS definidos, para que o navegador reserve o espaço do elemento antes dele carregar, evitando saltos de tela.
*   **Carregamento de Fontes**: Utilize a diretiva `&display=swap` na importação do Google Fonts Montserrat para garantir que o texto seja exibido imediatamente com fontes seguras do sistema até que a Montserrat seja carregada.

### 2. Otimizar Largest Contentful Paint (LCP)
*   **Assets Críticos**: O logotipo e o widget visual do Hero (`.speed-display`) são os maiores elementos na dobra inicial do site. Garanta que o CSS do Hero seja incorporado diretamente na tag `<style>` (estilo crítico) e não dependa de arquivos externos pesados.

### 3. Reduzir Interaction to Next Paint (INP)
*   **Manipulação de Eventos Sem Bloqueio**: Lógicas que monitoram rolagem da tela (scroll events) ou redimensionamento de janela (resize events) devem ser leves e usar técnicas como *throttle* ou *debounce* se executarem operações pesadas de manipulação da DOM.
*   A simulação da cobertura (`checkCoverage`) deve usar lógicas assíncronas simples (`setTimeout`) e nunca congelar a thread principal do navegador.

## Checklist de Verificação
- [ ] Todas as imagens principais possuem dimensões de largura e altura declaradas?
- [ ] A importação da fonte Montserrat inclui a diretiva `&display=swap`?
- [ ] O código CSS crítico do Hero está embutido diretamente na página?
- [ ] Scripts de monitoramento de scroll/resize rolam sem travar a navegação móvel?
