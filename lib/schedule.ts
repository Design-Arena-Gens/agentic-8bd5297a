export type DailyPlan = {
  day: number;
  focus: string;
  tasks: string[];
  outcomes: string[];
  timeAllocationHours: number;
};

export function generateSchedule(args: { topic: string; days: number; hoursPerDay?: number }): DailyPlan[] {
  const topic = args.topic.trim();
  const days = Math.max(1, Math.floor(args.days));
  const hours = Math.round((args.hoursPerDay ?? 2) * 2) / 2; // round to .5

  const phases = allocatePhases(days);
  const plans: DailyPlan[] = [];

  let dayIdx = 1;

  // Foundations
  for (let i = 0; i < phases.foundations; i++) {
    plans.push({
      day: dayIdx++,
      focus: `Foundations of ${topic}`,
      tasks: [
        `Skim overview of ${topic}: key terms, scope, common uses`,
        `Set up tools/environment needed for ${topic}`,
        `Learn core vocabulary and notation used in ${topic}`,
        `Take short notes and build a one-page glossary`
      ],
      outcomes: [
        `Environment configured`,
        `One-pager glossary for ${topic}`,
        `High-level understanding of what you will learn`
      ],
      timeAllocationHours: hours
    });
  }

  // Core Concepts
  for (let i = 0; i < phases.core; i++) {
    const unit = i + 1;
    plans.push({
      day: dayIdx++,
      focus: `${topic} core concept ${unit}`,
      tasks: [
        `Learn a core concept of ${topic} (unit ${unit})`,
        `Work through 2?3 examples applying the concept`,
        `Create a concise summary card for revision`,
      ],
      outcomes: [
        `You can explain the concept in your own words`,
        `You can solve a small problem using it`
      ],
      timeAllocationHours: hours
    });
  }

  // Practice / Projects
  for (let i = 0; i < phases.practice; i++) {
    plans.push({
      day: dayIdx++,
      focus: `${topic} practice & mini-projects`,
      tasks: [
        `Pick a small task aligned to ${topic} (30?60 min)`,
        `Implement it end-to-end (no perfection)`,
        `Reflect: what was hard? add to your notes`,
      ],
      outcomes: [
        `Hands-on familiarity`,
        `A small artifact demonstrating progress`
      ],
      timeAllocationHours: hours
    });
  }

  // Review & Assessment
  for (let i = 0; i < phases.review; i++) {
    const finalDay = i === phases.review - 1;
    plans.push({
      day: dayIdx++,
      focus: finalDay ? `Final review and assessment: ${topic}` : `Spaced review: ${topic}`,
      tasks: finalDay ? [
        `Revisit summaries and glossary; fill gaps`,
        `Attempt a realistic challenge timed (60?90 min)`,
        `Write a brief retrospective: what to learn next`
      ] : [
        `Active recall on key concepts (flashcards)`,
        `Re-solve 1?2 prior exercises without notes`,
        `Refine your cheat sheet`
      ],
      outcomes: finalDay ? [
        `You can demonstrate end-to-end competency at your level`,
        `Clear next steps identified`
      ] : [
        `Reinforced memory of core concepts`,
        `Cleaner, stronger notes`
      ],
      timeAllocationHours: hours
    });
  }

  // Edge case: if rounding reduced days, pad with practice days
  while (plans.length < days) {
    plans.push({
      day: plans.length + 1,
      focus: `${topic} practice & consolidation`,
      tasks: [
        `Build or extend a small project related to ${topic}`,
        `Explain your work to a rubber duck or friend`,
        `Log blockers and questions to research`
      ],
      outcomes: [
        `Deeper understanding through doing`,
        `List of targeted follow-ups`
      ],
      timeAllocationHours: hours
    });
  }

  // Ensure day numbers are consistent
  for (let i = 0; i < plans.length; i++) plans[i].day = i + 1;

  return plans;
}

function allocatePhases(days: number): { foundations: number; core: number; practice: number; review: number } {
  if (days <= 3) {
    // compressed plan
    const foundations = 1;
    const review = 1;
    const remaining = Math.max(0, days - foundations - review);
    const core = Math.ceil(remaining * 0.6);
    const practice = Math.max(0, remaining - core);
    return { foundations, core, practice, review };
  }

  const foundations = Math.max(1, Math.round(days * 0.2));
  const review = Math.max(1, Math.round(days * 0.1));
  const allocated = foundations + review;
  const remaining = Math.max(0, days - allocated);
  const core = Math.max(1, Math.round(remaining * 0.55));
  const practice = Math.max(0, days - (foundations + core + review));

  return { foundations, core, practice, review };
}
