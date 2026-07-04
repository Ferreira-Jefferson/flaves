import { pdf } from '@react-pdf/renderer'
import { type Palette } from '@/shared/ui/tokens'
import { type Report } from '../domain'
import { ReportDocument } from './ReportDocument'

const DIACRITICS = new RegExp('[\\u0300-\\u036f]', 'g')

function fileName(report: Report): string {
  const slug =
    report.title
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(DIACRITICS, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'relatorio'
  return `flaves-${slug}.pdf`
}

// Gera o PDF no navegador e dispara o download.
export async function downloadReportPdf(report: Report, palette: Palette): Promise<void> {
  const blob = await pdf(<ReportDocument report={report} palette={palette} />).toBlob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName(report)
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}
