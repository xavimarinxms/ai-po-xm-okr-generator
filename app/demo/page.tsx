'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import OKRForm from '@/components/OKRForm';
import OKRTracker from '@/components/OKRTracker';
import { OKRInput, Objective, GeneratedOKRs } from '@/types';

const EMPTY: OKRInput = { productName: '', mission: '', quarter: '', teamFocus: '', constraints: '' };
const LS_KEY = 'okr-tracker-data';

function withIds(data: GeneratedOKRs): Objective[] {
  return data.objectives.map((obj, oi) => ({
    ...obj,
    id: `obj-${oi}-${Date.now()}`,
    keyResults: obj.keyResults.map((kr, ki) => ({
      ...kr,
      id: `kr-${oi}-${ki}-${Date.now()}`,
      progress: 0,
    })),
  }));
}

export default function DemoPage() {
  return (
    <Suspense fallback={null}>
      <DemoPageInner />
    </Suspense>
  );
}

function DemoPageInner() {
  const embed = useSearchParams().get('embed') === '1';
  const [input, setInput] = useState<OKRInput>(EMPTY);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'generate' | 'track'>('generate');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try { setObjectives(JSON.parse(saved)); setTab('track'); } catch {}
    }
  }, []);

  useEffect(() => {
    if (objectives.length) localStorage.setItem(LS_KEY, JSON.stringify(objectives));
  }, [objectives]);

  const generate = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/generate-okrs', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(input) });
      if (!res.ok) throw new Error('Failed');
      const data: GeneratedOKRs = await res.json();
      const withProgress = withIds(data);
      setObjectives(withProgress);
      localStorage.setItem(LS_KEY, JSON.stringify(withProgress));
      setTab('track');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = (objId: string, krId: string, value: number) => {
    setObjectives(prev => prev.map(obj =>
      obj.id === objId ? { ...obj, keyResults: obj.keyResults.map(kr => kr.id === krId ? { ...kr, progress: value } : kr) } : obj
    ));
  };

  const exportMd = () => {
    const lines = objectives.flatMap((obj, oi) => [
      `## O${oi + 1}: ${obj.title}`,
      obj.description,
      '',
      ...obj.keyResults.flatMap((kr, ki) => [
        `**KR${oi + 1}.${ki + 1}**: ${kr.description}`,
        `Baseline: ${kr.baseline} → Target: ${kr.target} ${kr.unit} | Progress: ${kr.progress}%`,
        '',
      ]),
    ]);
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'okrs.md'; a.click();
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(objectives, null, 2)], { type: 'application/json' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = 'okrs-backup.json'; a.click();
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed: Objective[] = JSON.parse(ev.target?.result as string);
        setObjectives(parsed);
        localStorage.setItem(LS_KEY, JSON.stringify(parsed));
        setTab('track');
      } catch { alert('Invalid backup file.'); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!embed && <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 4.5H14l-3.75 2.75 1.5 4.5L8 11l-3.75 2.75 1.5-4.5L2 6.5h4.5z" fill="white"/></svg>
            </div>
            <span className="text-sm font-semibold text-gray-900">OKR Generator</span>
            <span className="hidden sm:inline text-xs text-gray-500">by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="hover:text-brand-600 transition-colors">Xavi Marín</a></span>
          </div>
          <Link href="/" className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors">← Home</Link>
        </div>
      </nav>}

      <div className="bg-blue-50 border-b border-blue-100 px-4 py-2.5 text-center text-xs text-blue-700 font-medium">
        Progress is saved in your browser (localStorage) · Use <strong>Export JSON</strong> to back up your OKRs
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">OKR Generator + Tracker</h1>
            <p className="text-sm text-gray-500">Generate strategic OKRs and track progress across the quarter.</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {objectives.length > 0 && (
              <>
                <button onClick={exportMd} className="text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 transition-colors">
                  ↓ Export .md
                </button>
                <button onClick={exportJson} className="text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 transition-colors">
                  ↓ Backup JSON
                </button>
              </>
            )}
            <label className="text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-3 py-1.5 transition-colors cursor-pointer">
              ↑ Restore JSON
              <input type="file" accept=".json" className="hidden" onChange={importJson} />
            </label>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 w-fit">
          {(['generate', 'track'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors capitalize ${tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {t === 'generate' ? '✦ Generate' : `📊 Track${objectives.length ? ` (${objectives.length})` : ''}`}
            </button>
          ))}
        </div>

        {tab === 'generate' && (
          <div className="max-w-xl">
            <OKRForm values={input} onChange={setInput} onSubmit={generate} loading={loading} />
            {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
          </div>
        )}

        {tab === 'track' && objectives.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center">
            <p className="text-sm text-gray-400">No OKRs yet — generate them first</p>
            <button onClick={() => setTab('generate')} className="mt-3 text-xs font-semibold text-brand-600 hover:underline">Go to Generate →</button>
          </div>
        )}

        {tab === 'track' && objectives.length > 0 && (
          <OKRTracker objectives={objectives} onProgressChange={updateProgress} />
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-16">
        <div className="max-w-5xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <span>Built by <a href="https://xavimarin.net" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900 transition-colors">Xavi Marín</a> · Progress saved locally in your browser</span>
          <span>PO Toolkit #11 of 13</span>
        </div>
      </footer>
    </div>
  );
}
