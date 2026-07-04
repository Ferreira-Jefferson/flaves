import { ReportEditor } from '@/modules/report/ReportEditor'
import { ThemePicker } from '@/shared/ui/ThemePicker'

export function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <div className="brand">
          <span className="brandTick" aria-hidden="true" />
          flaves
        </div>
        <p className="tagline">Relatórios de antes &amp; depois</p>
        <div className="headerActions">
          <ThemePicker />
        </div>
      </header>
      <main className="appMain">
        <ReportEditor />
      </main>
    </div>
  )
}
