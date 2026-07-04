import { useSyncExternalStore } from 'react'
import { type Palette, type Theme, type ThemeId } from './tokens'
import { getPalette, getTheme, getThemeId, setThemeId, subscribe } from './theme'

// Hook React sobre o store de tema. Re-renderiza quem usa quando o tema muda.
export function useTheme(): {
  themeId: ThemeId
  theme: Theme
  palette: Palette
  setTheme: (id: ThemeId) => void
} {
  const themeId = useSyncExternalStore(subscribe, getThemeId, getThemeId)
  return {
    themeId,
    theme: getTheme(),
    palette: getPalette(),
    setTheme: setThemeId,
  }
}
