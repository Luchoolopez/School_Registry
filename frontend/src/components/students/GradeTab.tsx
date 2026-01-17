import React, { useState } from 'react';
import type { Student } from '../../types/student.types';
import type { Grade } from '../../types/grade.types';
import gradeService from '../../services/grade.service';
import { ConfirmModal } from '../ConfirmModal';    
import { EditGradeModal } from './base/EditGradeModal'; 
import { CreateGradeModal } from './base/CreateGradeModal'; 

interface Props {
  student: Student;
  onRefresh: () => Promise<void>;
}

export const GradesTab: React.FC<Props> = ({ student, onRefresh }) => {
  const [isAdding, setIsAdding] = useState(false);
  
  const [gradeToDelete, setGradeToDelete] = useState<number | null>(null);
  const [gradeToEdit, setGradeToEdit] = useState<Grade | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (data: { concept: string; value: number; date: string }) => {
    await gradeService.addGrade(student.id, data);
    await onRefresh();
    setIsAdding(false);
  };

  const handleDelete = async () => {
    if (!gradeToDelete) return;
    setLoading(true);
    await gradeService.deleteGrade(gradeToDelete);
    await onRefresh();
    setGradeToDelete(null);
    setLoading(false);
  };

  const handleEdit = async (id: number, data: { concept: string; value: number; date: string }) => {
    await gradeService.updateGrade(id, data);
    await onRefresh();
    setGradeToEdit(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Historial de Calificaciones</h3>
        
        <button 
            onClick={() => setIsAdding(true)} 
            className="text-xs flex items-center gap-1 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors font-bold"
        >
            <span className="material-symbols-outlined text-[18px]">add_circle</span> 
            Nueva Nota
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 uppercase font-semibold">
            <tr>
              <th className="px-4 py-3">Concepto</th>
              <th className="px-4 py-3 text-center">Nota</th>
              <th className="px-4 py-3 text-right">Fecha</th>
              <th className="px-4 py-3 text-right w-24">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {student.grades?.map(grade => (
              <tr key={grade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{grade.concept}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${Number(grade.value) >= 7 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : Number(grade.value) >= 4 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {grade.value}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-slate-500">{grade.date}</td>
                <td className="px-4 py-3 text-right">
                   <div className="flex justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                     <button onClick={() => setGradeToEdit(grade)} className="p-2 text-slate-400 active:text-primary md:hover:text-primary active:bg-slate-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[20px] md:text-[18px]">edit</span>
                     </button>
                     <button onClick={() => setGradeToDelete(grade.id)} className="p-2 text-slate-400 active:text-red-500 md:hover:text-red-500 active:bg-slate-100 rounded-full transition-colors">
                        <span className="material-symbols-outlined text-[20px] md:text-[18px]">delete</span>
                     </button>
                   </div>
                </td>
              </tr>
            ))}
            {(!student.grades || student.grades.length === 0) && (
                <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-400 text-xs italic">
                        No hay notas registradas. Haz click en "Nueva Nota" para comenzar.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>


      <CreateGradeModal 
        isOpen={isAdding}
        onClose={() => setIsAdding(false)}
        onSave={handleAdd}
      />

      <ConfirmModal 
        isOpen={!!gradeToDelete} 
        title="Eliminar Nota"
        message="¿Estás seguro de que deseas eliminar esta calificación? Esta acción no se puede deshacer."
        confirmText="Eliminar"
        isDanger
        onClose={() => setGradeToDelete(null)}
        onConfirm={handleDelete}
        loading={loading}
      />

      <EditGradeModal 
        isOpen={!!gradeToEdit}
        grade={gradeToEdit}
        onClose={() => setGradeToEdit(null)}
        onSave={handleEdit}
      />
    </div>
  );
};