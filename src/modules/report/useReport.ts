import { useCallback, useState } from 'react'
import { resizeImageFile } from '@/shared/image/resize'
import {
  type ImageAsset,
  type Report,
  type Side,
  MAX_IMAGES_PER_SIDE,
  createBlock,
  createReport,
  newId,
} from './domain'

type MetaField = 'title' | 'description' | 'location'

export function useReport() {
  const [report, setReport] = useState<Report>(createReport)
  const [busy, setBusy] = useState(false)

  const setField = useCallback((key: MetaField, value: string) => {
    setReport((r) => ({ ...r, [key]: value }))
  }, [])

  const addBlock = useCallback(() => {
    setReport((r) => ({ ...r, blocks: [...r.blocks, createBlock()] }))
  }, [])

  const removeBlock = useCallback((blockId: string) => {
    setReport((r) => ({
      ...r,
      blocks: r.blocks.length > 1 ? r.blocks.filter((b) => b.id !== blockId) : r.blocks,
    }))
  }, [])

  const setBlockLabel = useCallback((blockId: string, label: string) => {
    setReport((r) => ({
      ...r,
      blocks: r.blocks.map((b) => (b.id === blockId ? { ...b, label } : b)),
    }))
  }, [])

  const addImages = useCallback(async (blockId: string, side: Side, files: File[]) => {
    if (files.length === 0) return
    setBusy(true)
    try {
      // Reduz sequencialmente para poupar memória em celulares.
      const resized: ImageAsset[] = []
      for (const file of files) {
        try {
          const img = await resizeImageFile(file)
          resized.push({ id: newId(), ...img })
        } catch {
          // ignora arquivo ilegível (ex: formato não suportado)
        }
      }
      setReport((r) => ({
        ...r,
        blocks: r.blocks.map((b) => {
          if (b.id !== blockId) return b
          const room = MAX_IMAGES_PER_SIDE - b[side].length
          return room <= 0 ? b : { ...b, [side]: [...b[side], ...resized.slice(0, room)] }
        }),
      }))
    } finally {
      setBusy(false)
    }
  }, [])

  const removeImage = useCallback((blockId: string, side: Side, imageId: string) => {
    setReport((r) => ({
      ...r,
      blocks: r.blocks.map((b) =>
        b.id === blockId ? { ...b, [side]: b[side].filter((img) => img.id !== imageId) } : b,
      ),
    }))
  }, [])

  return { report, busy, setField, addBlock, removeBlock, setBlockLabel, addImages, removeImage }
}
