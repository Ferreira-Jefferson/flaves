// Fonte única de verdade do design (usada pela UI e pelo PDF).
// Direção: portfólio editorial, cromia quase-monocromática — as fotos trazem a cor.

export const color = {
  ink: '#17181A', // texto primário (quase-preto quente)
  stone: '#74777A', // texto secundário / labels
  paper: '#F3F3F1', // fundo da página
  card: '#FFFFFF', // molduras / cartões
  line: '#E3E2DD', // fio de cabelo / passe-partout
  accent: '#3B5A4E', // eucalipto — marca o "DEPOIS" e estados ativos
  accentWeak: '#EAF0EC', // tinta suave do acento
} as const

export const font = {
  display: 'Fraunces', // títulos e rótulos de bloco
  body: 'Inter', // corpo, UI, labels
} as const

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const

export const radius = { sm: 6, md: 10 } as const
