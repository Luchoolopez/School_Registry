import React from 'react';
import type{ Student } from '../../types/student.types';
import { calculateAverage, countAbsences, getAverageColor } from '../../utils/studentMath';

interface Props {
  student: Student;
  onClick: () => void; 
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

export const StudentRow: React.FC<Props> = ({ student, onClick, onEdit, onDelete }) => {
  const average = calculateAverage(student.grades);
  const absences = countAbsences(student.absences);
  const avgColor = getAverageColor(average);

  return (
    <tr 
      onClick={onClick}
      className="group border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
    >
      {/* Nombre */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold text-xs">
            {student.first_name[0]}{student.last_name[0]}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white text-sm">
              {student.last_name}, {student.first_name}
            </div>
            <div className="text-xs text-slate-400">ID: {student.id}</div>
          </div>
        </div>
      </td>

      {/* Promedio*/}
      <td className="px-4 py-4 text-center">
        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-xs font-bold ${avgColor}`}>
          {average}
        </span>
      </td>

      {/* Faltas */}
      <td className="px-4 py-4 text-center">
        <span className={`text-sm font-medium ${absences > 10 ? 'text-red-500' : 'text-slate-600 dark:text-slate-300'}`}>
          {absences}
        </span>
      </td>

      {/* Acciones */}
      <td className="px-4 py-4 text-right">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={onEdit}
            className="p-1.5 text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full"
            title="Editar nombre"
          >
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </button>
          <button 
            onClick={onDelete}
            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
            title="Eliminar alumno"
          >
            <span className="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </td>
    </tr>
  );
};