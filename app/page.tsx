"use client";

import { useState } from 'react';
import ScheduleForm from '@/components/ScheduleForm';
import Schedule from '@/components/Schedule';
import { generateSchedule, DailyPlan } from '@/lib/schedule';

export default function Page() {
  const [plan, setPlan] = useState<DailyPlan[] | null>(null);

  return (
    <main className="container">
      <h1>Learning Planner</h1>
      <p className="subtitle">Enter a topic and your target timeline. We?ll build a day-by-day plan.</p>
      <ScheduleForm
        onGenerate={(topic, days, hoursPerDay) => {
          const p = generateSchedule({ topic, days, hoursPerDay });
          setPlan(p);
        }}
      />
      {plan && (
        <section className="results">
          <h2>Your Personalized Schedule</h2>
          <Schedule plan={plan} />
        </section>
      )}
    </main>
  );
}
