'use client';

import { Objective } from '@/types';

interface Props {
  objectives: Objective[];
  onProgressChange: (objId: string, krId: string, value: number) => void;
}

function objectiveProgress(obj: Objective): number {
  if (!obj.keyResults.length) return 0;
  return Math.round(obj.keyResults.reduce((s, kr) => s + kr.progress, 0) / obj.keyResults.length);
}

function ProgressRing({ pct }: { pct: number }) {
  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  const color = pct >= 70 ? '#16a34a' : pct >= 40 ? '#d97706' : '#1a73e8';
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
      <circle cx="26" cy="26" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 26 26)" style={{ transition: 'stroke-dashoffset 0.3s' }} />
      <text x="26" y="31" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>{pct}%</text>
    </svg>
  );
}

export default function OKRTracker({ objectives, onProgressChange }: Props) {
  return (
    <div className="flex flex-col gap-5">
      {objectives.map((obj, oi) => {
        const pct = objectiveProgress(obj);
        return (
          <div key={obj.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Objective header */}
            <div className="p-5 flex items-start gap-4 border-b border-gray-100">
              <ProgressRing pct={pct} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-brand-600 uppercase tracking-widest mb-0.5">O{oi + 1}</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{obj.title}</p>
                {obj.description && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{obj.description}</p>}
              </div>
            </div>

            {/* Key Results */}
            <div className="divide-y divide-gray-100">
              {obj.keyResults.map((kr, ki) => (
                <div key={kr.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-500 mb-0.5">KR{oi + 1}.{ki + 1}</p>
                      <p className="text-sm text-gray-800 leading-snug">{kr.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {kr.baseline} → <span className="font-semibold text-gray-600">{kr.target}</span> {kr.unit}
                      </p>
                    </div>
                    <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full border ${
                      kr.progress >= 70 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      kr.progress >= 40 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>{kr.progress}%</span>
                  </div>
                  <input type="range" min={0} max={100} step={5} value={kr.progress}
                    onChange={e => onProgressChange(obj.id, kr.id, Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand-500 bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
