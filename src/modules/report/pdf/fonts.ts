import { Font } from '@react-pdf/renderer'
// IMPORTANTE: usar .woff (não .woff2). O subsetting do @react-pdf/renderer
// (fontkit) falha ao embutir .woff2 ("Offset is outside the bounds of the
// DataView"); .woff e .ttf funcionam. O @fontsource fornece ambos.
import inter400 from '@fontsource/inter/files/inter-latin-400-normal.woff'
import inter500 from '@fontsource/inter/files/inter-latin-500-normal.woff'
import inter600 from '@fontsource/inter/files/inter-latin-600-normal.woff'
import cormorant500 from '@fontsource/cormorant/files/cormorant-latin-500-normal.woff'
import cormorant600 from '@fontsource/cormorant/files/cormorant-latin-600-normal.woff'

let registered = false

// Registra Cormorant + Inter no @react-pdf/renderer usando os arquivos servidos
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
    family: 'Cormorant',
    fonts: [
      { src: cormorant500, fontWeight: 500 },
      { src: cormorant600, fontWeight: 600 },
    ],
  })
  // Quebra apenas palavras MUITO longas (ex: strings coladas sem espaço) para
  // não estourar a largura; palavras normais permanecem inteiras.
  Font.registerHyphenationCallback((word) =>
    word.length > 20 ? (word.match(/.{1,18}/g) ?? [word]) : [word],
  )
  registered = true
}
