import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import { color } from '@/shared/ui/tokens'
import { type Block, type ImageAsset, type Report } from '../domain'
import { registerPdfFonts } from './fonts'

registerPdfFonts()

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: 'Inter',
    fontSize: 10,
    color: color.ink,
    backgroundColor: color.card,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  brandTick: { width: 8, height: 8, backgroundColor: color.accent, marginRight: 8 },
  brand: {
    fontFamily: 'Inter',
    fontWeight: 600,
    fontSize: 11,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: color.ink,
  },
  title: { fontFamily: 'Fraunces', fontWeight: 600, fontSize: 25, lineHeight: 1.12, marginBottom: 14 },
  metaBlock: { marginBottom: 24 },
  dividerRow: { flexDirection: 'row', alignItems: 'center' },
  dividerLine: { flex: 1, borderBottomWidth: 1, borderBottomColor: color.line },
  dividerText: {
    marginHorizontal: 14,
    fontSize: 9.5,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: color.stone,
  },
  metaDate: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 8.5,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: color.stone,
  },
  rule: { borderBottomWidth: 1, borderBottomColor: color.line },
  description: { fontSize: 10.5, lineHeight: 1.5, color: color.ink, marginBottom: 26, maxWidth: 440 },

  block: { marginBottom: 22 },
  blockHead: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  blockLabel: { fontFamily: 'Fraunces', fontWeight: 500, fontSize: 14, color: color.ink },
  blockHairline: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: color.line,
    marginLeft: 10,
    marginBottom: 4,
  },

  sides: { flexDirection: 'row' },
  side: { flex: 1 },
  sideGap: { width: 16 },
  tag: {
    fontSize: 8.5,
    fontWeight: 600,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: color.stone,
    marginBottom: 6,
  },
  tagAfter: { color: color.accent },

  frame: {
    borderWidth: 1,
    borderColor: color.line,
    backgroundColor: color.card,
    padding: 4,
    marginBottom: 8,
  },
  photo: { width: '100%', height: 150, objectFit: 'cover' },
  emptyFrame: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.line,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  emptyText: { fontSize: 8, color: color.stone },

  footer: {
    position: 'absolute',
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: { fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', color: color.stone },
})

function formatDate(): string {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(new Date())
  } catch {
    return ''
  }
}

export function ReportDocument({ report }: { report: Report }) {
  const date = formatDate()
  return (
    <Document title={report.title || 'Relatório flaves'} author="flaves">
      <Page size="A4" style={styles.page}>
        <View style={styles.brandRow}>
          <View style={styles.brandTick} />
          <Text style={styles.brand}>flaves</Text>
        </View>

        {report.title ? <Text style={styles.title}>{report.title}</Text> : null}

        <View style={styles.metaBlock}>
          {report.location ? (
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>{report.location}</Text>
              <View style={styles.dividerLine} />
            </View>
          ) : (
            <View style={styles.rule} />
          )}
          {date ? <Text style={styles.metaDate}>{date}</Text> : null}
        </View>

        {report.description ? <Text style={styles.description}>{report.description}</Text> : null}

        {report.blocks.map((block, i) => (
          <BlockView key={block.id} block={block} index={i} />
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>flaves · antes & depois</Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  )
}

function BlockView({ block, index }: { block: Block; index: number }) {
  const heading = block.label.trim() || `Antes & depois ${index + 1}`
  return (
    <View style={styles.block} wrap={false}>
      <View style={styles.blockHead}>
        <Text style={styles.blockLabel}>{heading}</Text>
        <View style={styles.blockHairline} />
      </View>
      <View style={styles.sides}>
        <SideView title="Antes" images={block.before} after={false} />
        <View style={styles.sideGap} />
        <SideView title="Depois" images={block.after} after />
      </View>
    </View>
  )
}

function SideView({
  title,
  images,
  after,
}: {
  title: string
  images: ImageAsset[]
  after: boolean
}) {
  return (
    <View style={styles.side}>
      <Text style={[styles.tag, after ? styles.tagAfter : {}]}>{title}</Text>
      {images.length === 0 ? (
        <View style={styles.emptyFrame}>
          <Text style={styles.emptyText}>—</Text>
        </View>
      ) : (
        images.map((img) => (
          <View key={img.id} style={styles.frame}>
            <Image src={img.dataUrl} style={styles.photo} />
          </View>
        ))
      )}
    </View>
  )
}
