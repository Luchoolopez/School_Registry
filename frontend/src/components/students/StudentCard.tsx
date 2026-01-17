import React from 'react';
import type { Student } from '../../types/student.types';
import { calculateAverage, countAbsences, getAverageColor } from '../../utils/studentMath';

interface Props {
  student: Student;
  onClick: () => void;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const StudentCard: React.FC<Props> = ({ student, onClick, onEdit, onDelete }) => {
  const average = calculateAverage(student.grades);
  const absences = countAbsences(student.absences);
  const avgColor = getAverageColor(average);

  return (
    <div onClick={onClick} className="bg-white dark:bg-[#1e293b] rounded-xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-lg">
            {student.first_name[0]}{student.last_name[0]}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">{student.last_name}, {student.first_name}</div>
            <div className="text-xs text-slate-400">ID: {student.id}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`px-3 py-1 rounded-md text-sm font-bold ${avgColor}`}>{average}</div>
          <div className={`text-sm font-medium ${absences > 10 ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}`}>{absences}</div>
          <div className="flex items-center gap-1">
            <button onClick={(e) => { e.stopPropagation(); onEdit(e); }} className="p-1.5 text-slate-400 hover:text-primary rounded-full">
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(e); }} className="p-1.5 text-slate-400 hover:text-red-500 rounded-full">
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
