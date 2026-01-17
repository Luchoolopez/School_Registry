import React, { useState } from 'react';
import type { Student } from '../../types/student.types';
import absenceService from '../../services/absence.service';
import { ConfirmModal } from '../ConfirmModal';
import { CreateAbsenceModal } from '../students/CreateAbsenceModal';
import { CalculateAttendanceModal } from './base/CalculateAttendanceModal'; 

interface Props {
  student: Student;
  onRefresh: () => Promise<void>;
}

export const AttendanceTab: React.FC<Props> = ({ student, onRefresh }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false); 
  
  const [absenceToDelete, setAbsenceToDelete] = useState<number | null>(null);
  const [absenceToToggle, setAbsenceToToggle] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (date: string) => {
    await absenceService.createAbsence(student.id, { date, justified: false });
    await onRefresh();
    setIsAdding(false);
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
         
         <div className="flex items-center gap-2">
           {/* Botón Nueva Falta */}
           <button 
              onClick={() => setIsAdding(true)} 
              className="text-xs flex items-center gap-1 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors font-bold"
           >
              <span className="material-symbols-outlined text-[18px]">add_circle</span> 
              Nueva Falta
           </button>

           {/* Botón Calcular Promedio */}
           <button 
              onClick={() => setIsCalculating(true)} // <--- Abre el modal
              className="text-xs flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-lg transition-colors font-medium border border-slate-200 dark:border-slate-700"
           >
              <span className="material-symbols-outlined text-[18px]">calculate</span> 
              Calcular %
           </button>
         </div>
       </div>

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
                <tr key={absence.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{absence.date}</td>
                  <td className="px-4 py-3 text-center">
                    <button 
                      onClick={() => setAbsenceToToggle(absence.id)}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:opacity-80 transition-opacity ${absence.justified ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
                      title="Click para cambiar estado"
                    >
                      {absence.justified ? 'Justificada' : 'Injustificada'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                     <div className="flex justify-end opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                        <button 
                            onClick={() => setAbsenceToDelete(absence.id)} 
                            className="p-2 text-slate-400 active:text-red-500 md:hover:text-red-500 active:bg-slate-100 rounded-full transition-colors"
                        >
                            <span className="material-symbols-outlined text-[20px] md:text-[18px]">delete</span>
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
              {(!student.absences || student.absences.length === 0) && (
                <tr>
                    <td colSpan={3} className="px-4 py-8 text-center text-slate-400 text-xs italic">
                        Asistencia perfecta. No hay faltas registradas.
                    </td>
                </tr>
              )}
            </tbody>
          </table>
       </div>

       {/* --- MODALES --- */}
       
       <CreateAbsenceModal 
          isOpen={isAdding}
          onClose={() => setIsAdding(false)}
          onSave={handleAdd}
       />
       
       {/* NUEVO MODAL DE CÁLCULO */}
       <CalculateAttendanceModal 
          isOpen={isCalculating}
          onClose={() => setIsCalculating(false)}
          currentAbsencesCount={student.absences?.length || 0} // Pasamos la cantidad actual
       />

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
          message={`¿Deseas cambiar el estado de esta falta a ${!student.absences?.find(a => a.id === absenceToToggle)?.justified ? 'Justificada' : 'Injustificada'}?`}
          confirmText="Cambiar"
          onClose={() => setAbsenceToToggle(null)}
          onConfirm={handleToggle}
          loading={loading}
       />
    </div>
  );
};