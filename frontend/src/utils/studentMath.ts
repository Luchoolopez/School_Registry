import type { Grade } from "../types/grade.types";
import type { Absence } from "../types/absence.types";

export const calculateAverage = (grades?: Grade[]): string => {
  if (!grades || grades.length === 0) return '-';
  
  const sum = grades.reduce((acc, curr) => acc + Number(curr.value), 0);
  const avg = sum / grades.length;
  
  // Devuelve con 2 decimales si es necesario, o entero si es redondo
  return avg.toFixed(2).replace(/[.,]00$/, "");
};

export const countAbsences = (absences?: Absence[]): number => {
  if (!absences) return 0;
  // Solo cuenta las injustificadas 
  return absences.length;
};

export const getAverageColor = (average: string) => {
  if (average === '-') return 'bg-gray-100 text-gray-500';
  const num = parseFloat(average);
  if (num >= 7) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
  if (num >= 4) return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
  return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
};