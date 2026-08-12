'use client';

import { OKRInput } from '@/types';
import { SAMPLE_INPUT } from '@/lib/sampleData';

interface Props {
  values: OKRInput;
  onChange: (v: OKRInput) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function OKRForm({ values, onChange, onSubmit, loading }: Props) {
  const set = (k: keyof OKRInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...values, [k]: e.target.value });

  const inputCls = 'w-full px-3.5 py-2.5 text-sm rounded-lg bg-white border border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all';
  const labelCls = 'block text-xs font-medium text-gray-700 mb-1.5';

  return (
    <div data-tour="input" className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Product context</h2>
        <button data-tour="sample" onClick={() => onChange(SAMPLE_INPUT)}
          className="text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-300 rounded-lg px-3 py-1.5 transition-colors">
          ✨ Sample data
        </button>
      </div>

      <div>
        <label className={labelCls}>Product name <span className="text-red-500">*</span></label>
        <input type="text" value={values.productName} onChange={set('productName')}
          placeholder="e.g. NovaPay" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Product mission <span className="text-red-500">*</span></label>
        <textarea value={values.mission} onChange={set('mission')} rows={3}
          placeholder="What problem does your product solve and for whom?"
          className={inputCls + ' resize-none'} />
      </div>

      <div>
        <label className={labelCls}>Quarter <span className="text-red-500">*</span></label>
        <input type="text" value={values.quarter} onChange={set('quarter')}
          placeholder="e.g. Q3 2024 (July – September)" className={inputCls} />
      </div>

      <div>
        <label className={labelCls}>Team focus this quarter <span className="text-red-500">*</span></label>
        <textarea value={values.teamFocus} onChange={set('teamFocus')} rows={3}
          placeholder="What are the main bets and initiatives for this quarter?"
          className={inputCls + ' resize-none'} />
      </div>

      <div>
        <label className={labelCls}>Constraints <span className="text-gray-400 font-normal">(optional)</span></label>
        <input type="text" value={values.constraints ?? ''} onChange={set('constraints')}
          placeholder="Team size, budget limits, tech debt…" className={inputCls} />
      </div>

      <button data-tour="run" onClick={onSubmit}
        disabled={loading || !values.productName || !values.mission || !values.quarter || !values.teamFocus}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl py-3 px-6 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
        {loading ? (
          <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Generating OKRs…</>
        ) : '✦ Generate OKRs'}
      </button>
    </div>
  );
}
