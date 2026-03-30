import { projectStages } from '../../types/project.types';

const calculateProgress = (stages: projectStages[]) => {
  const total = stages.length;
  const completed = stages.filter((s) => s.completed).length;

  if (total === 0) return 0;

  return (completed / total) * 100;
};
export function updateProjectTemplate({
  project,
  clientName,

  stages,
  phase,
}: {
  project: string;
  clientName: string;
  stages: projectStages[];
  phase: string;
}) {
  const progress = calculateProgress(stages);
  return `
    <div style="font-family: Arial, sans-serif;">
        <h2>Project Progress Update</h2>
        <p>Dear <strong>${clientName}</strong>,</p>
        <p>Your project <strong>${project}</strong> progress is ${progress}% and phase is ${phase}</p>
        <p>Thank you for choosing Space Dezyn! We look forward to bringing your vision to life.</p>
    </div>
  `;
}
