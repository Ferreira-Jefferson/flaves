import { type Block, type Side } from './domain'
import { ImageSlots } from './ImageSlots'
import styles from './report.module.css'

interface Props {
  block: Block
  index: number
  canRemove: boolean
  busy: boolean
  onLabelChange: (label: string) => void
  onRemoveBlock: () => void
  onAddImages: (side: Side, files: File[]) => void
  onRemoveImage: (side: Side, imageId: string) => void
}

export function BlockEditor({
  block,
  index,
  canRemove,
  busy,
  onLabelChange,
  onRemoveBlock,
  onAddImages,
  onRemoveImage,
}: Props) {
  return (
    <section className={styles.block}>
      <header className={styles.blockHead}>
        <span className={styles.blockNum}>Bloco {index + 1}</span>
        <input
          className={styles.blockLabel}
          value={block.label}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Cômodo ou área (opcional) — ex: Cozinha"
        />
        {canRemove && (
          <button type="button" className={styles.ghostBtn} onClick={onRemoveBlock}>
            Remover
          </button>
        )}
      </header>

      <div className={styles.sides}>
        <ImageSlots
          block={block}
          side="before"
          label="Antes"
          disabled={busy}
          onAdd={(files) => onAddImages('before', files)}
          onRemove={(id) => onRemoveImage('before', id)}
        />
        <ImageSlots
          block={block}
          side="after"
          label="Depois"
          disabled={busy}
          onAdd={(files) => onAddImages('after', files)}
          onRemove={(id) => onRemoveImage('after', id)}
        />
      </div>
    </section>
  )
}
