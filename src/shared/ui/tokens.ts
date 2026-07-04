// Fonte única de verdade do design (usada pela UI e pelo PDF).
// Direção: portfólio editorial, cromia quase-monocromática — as fotos trazem a cor.
// O usuário escolhe entre 5 temas pastel-claros; o acento tinge a marca, o rótulo
// "DEPOIS" e os estados ativos, tanto na tela quanto no PDF.

export interface Palette {
  ink: string // texto primário (quase-preto quente)
  stone: string // texto secundário / labels
  paper: string // fundo da página
  card: string // molduras / cartões
  line: string // fio de cabelo / passe-partout
  accent: string // marca o "DEPOIS" e estados ativos
  accentWeak: string // tinta suave do acento
}

// Neutros constantes entre os temas (garantem legibilidade em qualquer cor).
const neutrals = {
  ink: '#17181A',
  stone: '#74777A',
  card: '#FFFFFF',
} as const

export type ThemeId = 'eucalipto' | 'nevoa' | 'argila' | 'lavanda' | 'trigo'

export interface Theme {
  id: ThemeId
  label: string
  palette: Palette
}

export const themes: readonly Theme[] = [
  {
    id: 'eucalipto',
    label: 'Eucalipto',
    palette: { ...neutrals, paper: '#F3F3F1', line: '#E3E2DD', accent: '#3B5A4E', accentWeak: '#EAF0EC' },
  },
  {
    id: 'nevoa',
    label: 'Névoa',
    palette: { ...neutrals, paper: '#F1F3F5', line: '#DEE4E9', accent: '#4B6A82', accentWeak: '#E7EEF3' },
  },
  {
    id: 'argila',
    label: 'Argila',
    palette: { ...neutrals, paper: '#F6F2F0', line: '#E9DFDA', accent: '#A05C48', accentWeak: '#F3E8E3' },
  },
  {
    id: 'lavanda',
    label: 'Lavanda',
    palette: { ...neutrals, paper: '#F4F2F6', line: '#E4E0EA', accent: '#6C5E88', accentWeak: '#EDEAF3' },
  },
  {
    id: 'trigo',
    label: 'Trigo',
    palette: { ...neutrals, paper: '#F6F4EE', line: '#E7E2D3', accent: '#7C6A34', accentWeak: '#F1EDDD' },
  },
] as const

export const defaultThemeId: ThemeId = 'eucalipto'

// Retrocompatibilidade: `color` é a paleta padrão (usada como fallback do PDF).
export const color: Palette = themes[0].palette

export const font = {
  display: 'Fraunces', // títulos e rótulos de bloco
  body: 'Inter', // corpo, UI, labels
} as const

export const space = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const

export const radius = { sm: 6, md: 10 } as const
