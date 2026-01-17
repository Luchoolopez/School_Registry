import React, { useState } from 'react';
import type { Student } from '../../types/student.types';
import absenceService from '../../services/absence.service';
import { ConfirmModal } from '../ConfirmModal';

interface Props {
  student: Student;
  onRefresh: () => Promise<void>;
}

export const AttendanceTab: React.FC<Props> = ({ student, onRefresh }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newDate, setNewDate] = useState('');
  
  const [absenceToDelete, setAbsenceToDelete] = useState<number | null>(null);
  const [absenceToToggle, setAbsenceToToggle] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!newDate) return;
    setLoading(true);
    await absenceService.createAbsence(student.id, { date: newDate, justified: false });
    await onRefresh();
    setNewDate(''); setIsAdding(false); setLoading(false);
  };

  const handleDelete = async () => {
    if (!absenceToDelete) return;
    setLoading(true);
    await absenceService.deleteAbsence(absenceToDelete);
    await onRefresh();
    setAbsenceToDelete(null); setLoading(false);
  };

  const handleToggle = async () => {
    if (!absenceToToggle) return;
    setLoading(true);
    await absenceService.toggleJustification(absenceToToggle);
    await onRefresh();
    setAbsenceToToggle(null); setLoading(false);
  };

  return (
    <div className="space-y-4">
       <div className="flex justify-between items-center mb-2">
         <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Registro de Ausencias</h3>
         {!isAdding && (
            <button onClick={() => setIsAdding(true)} className="text-xs flex items-center gap-1 text-primary hover:underline font-medium">
              <span className="material-symbols-outlined text-[16px]">add</span> Nueva Falta
            </button>
         )}
       </div>

       {isAdding && (
         <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-4 flex gap-3">
            <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="flex-1 px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800" />
            <button onClick={handleAdd} disabled={loading} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded hover:bg-primary/90">Guardar</button>
            <button onClick={() => setIsAdding(false)} className="px-3 py-2 bg-white border border-slate-300 text-xs font-bold rounded hover:bg-slate-50 text-slate-600">Cancelar</button>
         </div>
       )}

       <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 uppercase font-semibold">
              <tr>
                <th className="px-4 py-3">Fecha</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {student.absences?.map(absence => (
                <tr key={absence.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 group">
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{absence.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => setAbsenceToToggle(absence.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:opacity-80 transition-opacity ${absence.justified ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}
                      title="Click para cambiar estado"
                    >
                      {absence.justified ? 'Justificada' : 'Injustificada'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                     <button onClick={() => setAbsenceToDelete(absence.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>

       <ConfirmModal 
          isOpen={!!absenceToDelete}
          title="Eliminar Falta"
          message="¿Deseas eliminar este registro de inasistencia?"
          confirmText="Eliminar"
          isDanger
          onClose={() => setAbsenceToDelete(null)}
          onConfirm={handleDelete}
          loading={loading}
       />
       <ConfirmModal 
          isOpen={!!absenceToToggle}
          title="Cambiar Estado"
          message="¿Deseas cambiar el estado (Justificada/Injustificada) de esta falta?"
          confirmText="Cambiar"
          onClose={() => setAbsenceToToggle(null)}
          onConfirm={handleToggle}
          loading={loading}
       />
    </div>
  );
};