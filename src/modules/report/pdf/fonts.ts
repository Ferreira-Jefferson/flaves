import { Font } from '@react-pdf/renderer'
// IMPORTANTE: usar .woff (não .woff2). O subsetting do @react-pdf/renderer
// (fontkit) falha ao embutir .woff2 ("Offset is outside the bounds of the
// DataView"); .woff e .ttf funcionam. O @fontsource fornece ambos.
import inter400 from '@fontsource/inter/files/inter-latin-400-normal.woff'
import inter500 from '@fontsource/inter/files/inter-latin-500-normal.woff'
import inter600 from '@fontsource/inter/files/inter-latin-600-normal.woff'
import fraunces500 from '@fontsource/fraunces/files/fraunces-latin-500-normal.woff'
import fraunces600 from '@fontsource/fraunces/files/fraunces-latin-600-normal.woff'

let registered = false

// Registra Fraunces + Inter no @react-pdf/renderer usando os arquivos servidos
// pelo próprio app (same-origin) — nada de fetch externo na hora de gerar o PDF.
export function registerPdfFonts(): void {
  if (registered) return
  Font.register({
    family: 'Inter',
    fonts: [
      { src: inter400, fontWeight: 400 },
      { src: inter500, fontWeight: 500 },
      { src: inter600, fontWeight: 600 },
    ],
  })
  Font.register({
    family: 'Fraunces',
    fonts: [
      { src: fraunces500, fontWeight: 500 },
      { src: fraunces600, fontWeight: 600 },
    ],
  })
  // Evita hifenização automática estranha em palavras longas.
  Font.registerHyphenationCallback((word) => [word])
  registered = true
}
