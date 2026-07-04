# Módulo: report

**Propósito:** montar um relatório de antes/depois e exportá-lo como PDF editorial.
É a única feature do app.

## Entry points

- `ReportEditor.tsx` — tela completa (usada por `App.tsx`).
- `pdf/generate.tsx` — `downloadReportPdf(report)` monta o PDF e dispara o download.

## Estrutura

- `domain.ts` — tipos `Report` / `Block` / `ImageAsset` + fábricas. Sem UI, sem PDF.
- `useReport.ts` — estado da feature (campos, blocos, imagens). Enforce máx. 3 imagens/lado.
- `ReportEditor.tsx` → `BlockEditor.tsx` → `ImageSlots.tsx` — UI em 3 níveis.
- `report.module.css` — estilos co-locados.
- `pdf/` — `fonts.ts` (registra Cormorant/Inter), `ReportDocument.tsx` (layout), `generate.tsx` (blob + download).

## Depende de (shared)

- `shared/image/resize.ts` — reduz cada foto antes de guardar no estado / PDF.
- `shared/ui/tokens.ts` — cores/tipografia (compartilhadas com o PDF).

## Contratos / dados

- Nenhuma tabela, rede ou persistência: estado vive só na sessão do navegador.
- Não importa nenhuma outra feature (não há outra).
