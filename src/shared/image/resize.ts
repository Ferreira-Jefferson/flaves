// Especialista transversal: carrega uma imagem do dispositivo e devolve uma
// versão reduzida/comprimida (JPEG). Celular manda fotos de vários MB — sem isso
// o PDF fica gigante. Não conhece o domínio da feature (só imagem).

export interface ResizedImage {
  dataUrl: string
  width: number
  height: number
  name: string
}

const DEFAULT_MAX_DIM = 1600
const DEFAULT_QUALITY = 0.82

export async function resizeImageFile(
  file: File,
  maxDim = DEFAULT_MAX_DIM,
  quality = DEFAULT_QUALITY,
): Promise<ResizedImage> {
  const bitmap = await loadBitmap(file)
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D não suportado neste navegador.')
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close?.()

  const dataUrl = canvas.toDataURL('image/jpeg', quality)
  return { dataUrl, width, height, name: file.name }
}

async function loadBitmap(file: File): Promise<ImageBitmap> {
  // imageOrientation: 'from-image' respeita EXIF (fotos de celular deitadas).
  try {
    return await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    return await createImageBitmap(file)
  }
}
