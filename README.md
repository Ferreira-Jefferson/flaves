# flaves

Gerador de **relatórios de antes e depois** para serviços de reforma.

Você preenche título, local e descrição, adiciona blocos com 1 a 3 fotos de
**antes** e 1 a 3 de **depois**, e baixa um **PDF** bem formatado para enviar ao
cliente. Roda inteiro no navegador — **sem cadastro, sem banco de dados** — e pode
ser **instalado como app** no celular (PWA).

## Rodando localmente

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar (ex.: http://localhost:5173).

## Build de produção

```bash
npm run build      # gera dist/
npm run preview    # serve o build para conferência
```

## Deploy (Vercel)

O projeto é detectado como Vite automaticamente. Configuração de SPA em
`vercel.json`. Basta conectar o repositório na Vercel ou rodar `vercel`.

## Como o código é organizado

Arquitetura **feature-first** (slices por funcionalidade). Detalhes em
[AGENTS.md](AGENTS.md).
