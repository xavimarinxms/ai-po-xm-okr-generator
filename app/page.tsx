import Link from 'next/link';

const HOW_IT_WORKS = [
  { step: '01', title: 'Describe your product context', desc: 'Enter your product mission, quarter, team focus and constraints. The more specific, the more actionable the OKRs.' },
  { step: '02', title: 'Generate in seconds', desc: 'Llama 3.3 produces 3 Objectives with 3 Key Results each — quantitative, measurable, outcome-oriented. Not tasks or vanity metrics.' },
  { step: '03', title: 'Track progress all quarter', desc: 'Update KR progress with a slider. See overall Objective health at a glance. Export to Markdown at any time.' },
];

const ROADMAP: { category: string; items: { label: string; desc: string; status: 'planned' | 'considering' }[] }[] = [
  {
    category: 'Generation',
    items: [
      { label: 'Team-level OKRs', desc: 'Generate aligned OKRs for sub-teams that ladder up to the product-level objectives.', status: 'planned' },
      { label: 'OKR critique mode', desc: 'Paste existing OKRs and get AI feedback on measurability, ambition and alignment.', status: 'planned' },
      { label: 'Multi-quarter planning', desc: 'Generate a connected sequence of OKRs across 2-3 quarters with explicit dependencies.', status: 'considering' },
    ],
  },
  {
    category: 'Tracking',
    items: [
      { label: 'Weekly check-in log', desc: 'Add a weekly note per KR to record blockers, decisions and context alongside the number.', status: 'planned' },
      { label: 'Confidence score', desc: 'Rate confidence (0-100%) per KR separately from progress — a leading indicator of risk.', status: 'planned' },
      { label: 'Health alerts', desc: 'Flag KRs that are off-track based on elapsed time vs progress percentage.', status: 'considering' },
    ],
  },
  {
    category: 'Export & sharing',
    items: [
      { label: 'Notion export', desc: 'Push the full OKR set directly to a Notion database with one click.', status: 'considering' },
      { label: 'Shareable read-only view', desc: 'Generate a URL to share current OKR progress with stakeholders without login.', status: 'planned' },
      { label: 'PDF report', desc: 'Export a formatted OKR quarterly report PDF ready for all-hands presentations.', status: 'planned' },
    ],
  },
];

const STATUS_BADGE: Record<string, string> = { planned: 'bg-blue-50 text-blue-700 border-blue-200', considering: 'bg-gray-100 text-gray-600 border-gray-200' };
const STATUS_LABEL: Record<string, string> = { planned: 'Planned', considering: 'Considering' };

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 4.5H14l-3.75 2.75 1.5 4.5L8 11l-3.75 2.75 1.5-4.5L2 6.5h4.5z" fill="white"/></svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-gray-900">OKR Generator</span>
              <span className="hidden sm:inline text-xs text-gray-500 ml-2">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#roadmap" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">Roadmap</a>
            <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">xavimarin.net</a>
            <Link href="/demo" className="text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 rounded-lg px-3.5 py-1.5 transition-colors">Try Demo</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <section className="max-w-3xl mx-auto px-6 pt-24 pb-24 text-center">
          <p className="text-xs font-semibold text-brand-600 mb-5 tracking-widest uppercase">PO Toolkit · Tool #11 of 13</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5 tracking-tight leading-tight">
            OKRs that actually<br />measure outcomes
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto mb-10 leading-relaxed">
            Describe your product mission and quarter focus — get 3 Objectives with 3 measurable Key Results each. Then track progress all quarter in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold transition-colors shadow-sm">
              ✨ Try with sample data
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor"><path fillRule="evenodd" d="M1 8a.75.75 0 01.75-.75h10.69L8.22 3.03a.75.75 0 111.06-1.06l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l4.22-4.22H1.75A.75.75 0 011 8z"/></svg>
            </Link>
            <Link href="/demo" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors">Start with my context</Link>
          </div>
          <p className="text-xs text-gray-400 mt-6">No login · Progress saved locally · Free forever</p>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12"><h2 className="text-2xl font-bold text-gray-900 mb-2">How it works</h2><p className="text-sm text-gray-500">From mission to measurable outcomes in minutes</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {HOW_IT_WORKS.map(item => (
                <div key={item.step} className="bg-white rounded-xl border border-gray-200 p-6">
                  <span className="text-xs font-bold text-brand-500 font-mono">{item.step}</span>
                  <h3 className="text-sm font-semibold text-gray-900 mt-3 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roadmap" className="border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-6 py-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Roadmap</h2>
              <p className="text-sm text-gray-500">What's coming next</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.planned}`}><span className="w-1.5 h-1.5 rounded-full bg-blue-500"/>Planned</span>
                <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${STATUS_BADGE.considering}`}><span className="w-1.5 h-1.5 rounded-full bg-gray-400"/>Considering</span>
              </div>
            </div>
            <div className="space-y-10">
              {ROADMAP.map(group => (
                <div key={group.category}>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{group.category}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.items.map(item => (
                      <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 leading-snug">{item.label}</p>
                          <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_BADGE[item.status]}`}>{STATUS_LABEL[item.status]}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-100 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6 py-16">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 text-center">Why I built this</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Problem', text: 'Most OKR processes fail because teams write outputs disguised as outcomes, or KRs that can\'t be measured mid-quarter.' },
                { label: 'Solution', text: 'A generator that enforces the outcome format with real baselines and targets, plus a tracker so OKRs aren\'t forgotten after week 1.' },
                { label: 'Impact', text: 'Teams that track OKRs weekly make better decisions faster — they know what\'s off-track before the quarter review.' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-200 p-5">
                  <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">{item.label}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · No data stored on our servers</span>
          <span>PO Toolkit #11 of 13</span>
        </div>
      </footer>
    </div>
  );
}
