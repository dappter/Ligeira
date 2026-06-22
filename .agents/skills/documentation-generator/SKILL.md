---
name: documentation-generator
description: Padroniza e automatiza a geração de documentação, registro de decisões arquiteturais e relatórios de modificações (changelogs) no projeto Ligeira Telecom.
---

# Skill 27 — Documentation Generator

Esta skill orienta a criação e manutenção da documentação do projeto Ligeira Telecom. Ela garante que todas as decisões técnicas sejam registradas de forma limpa e que o progresso do desenvolvimento esteja sempre documentado.

## Quando usar esta skill
- No fechamento de tarefas, para registrar as modificações feitas.
- Ao atualizar arquivos como `walkthrough.md`, `task.md` ou gerar notas de versão.

## Diretrizes de Geração de Documentação

### 1. Atualização do Walkthrough (`walkthrough.md`)
*   O arquivo `walkthrough.md` deve conter um resumo detalhado de todas as modificações realizadas no arquivo principal do site.
*   Deve descrever:
    - O que foi alterado e o porquê (raciocínio de design).
    - Quais seletores CSS ou lógicas de Javascript foram afetados.
    - Como a alteração foi testada e validadas (plano de QA).
*   Se aplicável, incorpore mídias visuais ou capturas de tela das alterações de UI.

### 2. Registro de Decisões de Arquitetura (ADR)
*   Se houver mudanças significativas que alterem a estrutura do site (ex: modularização do arquivo HTML em arquivos JS separados, adição de bibliotecas externas), documente os motivos que justificaram a escolha técnica no histórico de alterações ou em uma seção dedicada de documentação.

### 3. Changelog
*   Sempre utilize um formato padronizado e cronológico de changelog com categorias de alterações legíveis:
    - **Adicionado**: Para novos recursos.
    - **Corrigido**: Para correção de bugs.
    - **Modificado**: Para refatorações ou mudanças em recursos existentes.

## Checklist de Verificação
- [ ] O changelog foi atualizado com todas as alterações efetuadas?
- [ ] O arquivo `walkthrough.md` resume de forma clara e profissional as modificações visuais e lógicas?
- [ ] Links clicáveis para os arquivos criados ou modificados foram incluídos na documentação utilizando o esquema `file:///`?
- [ ] Todas as decisões técnicas importantes foram registradas e justificadas?
