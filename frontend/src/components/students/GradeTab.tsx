import React, { useState } from 'react';
import type { Student } from '../../types/student.types';
import type { Grade } from '../../types/grade.types';
import gradeService from '../../services/grade.service';
import { ConfirmModal } from './base/confirmModal';
import { EditGradeModal } from './base/EditGradeModal';

interface Props {
  student: Student;
  onRefresh: () => Promise<void>;
}

export const GradesTab: React.FC<Props> = ({ student, onRefresh }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newConcept, setNewConcept] = useState('');
  const [newValue, setNewValue] = useState<number | ''>('');
  const [newDate, setNewDate] = useState('');
  
  const [gradeToDelete, setGradeToDelete] = useState<number | null>(null);
  const [gradeToEdit, setGradeToEdit] = useState<Grade | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newConcept || newValue === '' || !newDate) return;
    setLoading(true);
    await gradeService.addGrade(student.id, { concept: newConcept, value: Number(newValue), date: newDate });
    await onRefresh();
    setNewConcept(''); setNewValue(''); setNewDate(''); setIsAdding(false);
    setLoading(false);
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
        {!isAdding && (
           <button onClick={() => setIsAdding(true)} className="text-xs flex items-center gap-1 text-primary hover:underline font-medium">
             <span className="material-symbols-outlined text-[16px]">add</span> Nueva Nota
           </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 mb-4">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input placeholder="Concepto" value={newConcept} onChange={e => setNewConcept(e.target.value)} className="sm:col-span-2 px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
              <input type="number" placeholder="Nota" value={newValue} onChange={e => setNewValue(e.target.value === '' ? '' : Number(e.target.value))} className="px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
              <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="sm:col-span-2 px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
              <div className="flex gap-2">
                 <button onClick={handleAdd} disabled={loading} className="flex-1 bg-primary text-white text-xs font-bold rounded hover:bg-primary/90">Guardar</button>
                 <button onClick={() => setIsAdding(false)} className="px-3 bg-white border border-slate-300 text-xs font-bold rounded hover:bg-slate-50 text-slate-600">Cancelar</button>
              </div>
           </div>
        </div>
      )}

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
              <tr key={grade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 group">
                <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{grade.concept}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${Number(grade.value) >= 7 ? 'bg-green-100 text-green-700' : Number(grade.value) >= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{grade.value}</span>
                </td>
                <td className="px-4 py-3 text-right text-slate-500">{grade.date}</td>
                <td className="px-4 py-3 text-right">
                   <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => setGradeToEdit(grade)} className="p-1 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[18px]">edit</span></button>
                     <button onClick={() => setGradeToDelete(grade.id)} className="p-1 text-slate-400 hover:text-red-500"><span className="material-symbols-outlined text-[18px]">delete</span></button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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