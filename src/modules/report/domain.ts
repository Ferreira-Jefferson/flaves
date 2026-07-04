// Domínio da feature "report": o que é um relatório de antes/depois.

export const MAX_IMAGES_PER_SIDE = 3

export type Side = 'before' | 'after'

export interface ImageAsset {
  id: string
  dataUrl: string
  width: number
  height: number
  name: string
}

export interface Block {
  id: string
  label: string // rótulo opcional do bloco (ex: "Cozinha")
  before: ImageAsset[] // 0..3 na edição; ideal 1..3 ao exportar
  after: ImageAsset[]
}

export interface Report {
  title: string
  description: string
  location: string
  blocks: Block[]
}

export function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return 'id-' + Math.random().toString(36).slice(2)
}

export function createBlock(): Block {
  return { id: newId(), label: '', before: [], after: [] }
}

export function createReport(): Report {
  return { title: '', description: '', location: '', blocks: [createBlock()] }
}
