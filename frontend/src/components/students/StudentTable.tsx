import React from 'react';
import type { Student } from '../../types/student.types';
import { StudentRow } from './StudentRow';
import StudentCard from './StudentCard';

interface Props {
  students: Student[];
  loading: boolean;
  onStudentClick: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (student: Student) => void;
}

export const StudentTable: React.FC<Props> = ({ 
  students, loading, onStudentClick, onEditStudent, onDeleteStudent 
}) => {
  
  if (loading) {
    return <div className="p-8 text-center text-slate-500">Cargando planilla...</div>;
  }

  if (students.length === 0) {
    return (
      <div className="p-12 text-center bg-white dark:bg-[#1a232e] rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">school</span>
        <p className="text-slate-500">No hay alumnos registrados en esta escuela.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Mobile: show cards */}
      <div className="sm:hidden space-y-3">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            onClick={() => onStudentClick(student)}
            onEdit={(e) => { e.stopPropagation(); onEditStudent(student); }}
            onDelete={(e) => { e.stopPropagation(); onDeleteStudent(student); }}
          />
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block bg-white dark:bg-[#1a232e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 text-xs uppercase text-slate-500 font-semibold tracking-wide">
              <th className="px-4 py-3 w-1/2">Alumno</th>
              <th className="px-4 py-3 text-center">Promedio</th>
              <th className="px-4 py-3 text-center">Faltas</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((student) => (
              <StudentRow 
                key={student.id} 
                student={student}
                onClick={() => onStudentClick(student)}
                onEdit={(e) => { e.stopPropagation(); onEditStudent(student); }}
                onDelete={(e) => { e.stopPropagation(); onDeleteStudent(student); }}
              />
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};