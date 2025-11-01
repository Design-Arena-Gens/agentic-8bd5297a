"use client";

import { useState } from 'react';

type Props = {
  onGenerate: (topic: string, days: number, hoursPerDay: number) => void;
};

export default function ScheduleForm({ onGenerate }: Props) {
  const [topic, setTopic] = useState("");
  const [days, setDays] = useState<number>(14);
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = topic.trim();
    if (!trimmed) return;
    const safeDays = Math.max(1, Math.min(365, Math.floor(days)));
    const safeHours = Math.max(0.5, Math.min(12, Number(hoursPerDay)));
    onGenerate(trimmed, safeDays, safeHours);
  }

  return (
    <form onSubmit={handleSubmit} className="card form" aria-label="Learning plan form">
      <div className="row">
        <div>
          <label htmlFor="topic">Topic</label>
          <input
            id="topic"
            placeholder="e.g. Python, UX Design, Linear Algebra"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="days">Days to goal</label>
          <input
            id="days"
            type="number"
            min={1}
            max={365}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="hours">Hours per day</label>
          <input
            id="hours"
            type="number"
            min={0.5}
            max={12}
            step={0.5}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="actions">
        <button type="submit" className="primary">Generate schedule</button>
      </div>
    </form>
  );
}
