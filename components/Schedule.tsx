"use client";

import { DailyPlan } from '@/lib/schedule';

function download(filename: string, content: string, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime + ';charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function toCSV(plan: DailyPlan[]): string {
  const header = ['Day','Focus','Tasks','Expected outcomes','Time (hrs)'];
  const sanitize = (s: string) => s.replace(/\n/g, ' ');
  const escapeQuotes = (s: string) => s.replace(/"/g, '""');
  const rows = plan.map(p => [
    String(p.day),
    sanitize(p.focus),
    sanitize(p.tasks.join(' | ')),
    sanitize(p.outcomes.join(' | ')),
    String(p.timeAllocationHours)
  ]);
  return [header, ...rows]
    .map(r => r.map(v => '"' + escapeQuotes(v) + '"').join(','))
    .join('\n');
}

export default function Schedule({ plan }: { plan: DailyPlan[] }) {
  return (
    <div className="card">
      <div className="downloads">
        <button className="secondary" onClick={() => download('schedule.json', JSON.stringify(plan, null, 2), 'application/json')}>Download JSON</button>
        <button className="secondary" onClick={() => download('schedule.csv', toCSV(plan), 'text/csv')}>Download CSV</button>
      </div>
      <table className="table" role="table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Focus</th>
            <th>Tasks</th>
            <th>Expected outcomes</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {plan.map((p) => (
            <tr key={p.day}>
              <td><span className="badge">Day {p.day}</span></td>
              <td>{p.focus}</td>
              <td>
                <ul>
                  {p.tasks.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </td>
              <td>
                <ul>
                  {p.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                </ul>
              </td>
              <td>{p.timeAllocationHours}h</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
