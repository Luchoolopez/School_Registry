import React, { useEffect, useState } from 'react';
import type { Student } from '../../types/student.types';
import studentService from '../../services/student.service';
import absenceService from '../../services/absence.service';
import gradeService from '../../services/grade.service';

interface Props {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onUpdated: (student: Student) => void;
}

type Tab = 'profile' | 'grades' | 'attendance';

export const EditStudentModal: React.FC<Props> = ({ isOpen, student, onClose, onUpdated }) => {
  // Estado UI
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isAddingAbsence, setIsAddingAbsence] = useState(false);
  const [absenceDate, setAbsenceDate] = useState<string>('');
  
  const [isAddingGrade, setIsAddingGrade] = useState(false);
  const [gradeConcept, setGradeConcept] = useState('');
  const [gradeValue, setGradeValue] = useState<number | ''>(''); 
  const [gradeDate, setGradeDate] = useState<string>('');

  useEffect(() => {
    if (student) {
      setFirstName(student.first_name);
      setLastName(student.last_name);
      setAbsenceDate('');
      setGradeConcept('');
      setGradeValue('');
      setGradeDate('');
      setError(null);
      setIsAddingAbsence(false);
      setIsAddingGrade(false);
      setActiveTab('profile'); 
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const refreshStudent = async () => {
    try {
      const fresh = await studentService.getStudentById(student.id);
      onUpdated(fresh);
    } catch (err) {
      console.error('Error refrescando alumno', err);
    }
  };

  const handleSaveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) return setError('Datos requeridos');
    try {
      setLoading(true);
      const updated = await studentService.updateStudent(student.id, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });
      onUpdated(updated);
      setLoading(false);
      onClose(); 
    } catch (err) {
      setError('Error al actualizar');
      setLoading(false);
    }
  };

  const handleAddAbsence = async () => {
    if (!absenceDate) return;
    try {
      setLoading(true);
      await absenceService.createAbsence(student.id, { date: absenceDate, justified: false });
      await refreshStudent();
      setAbsenceDate('');
      setIsAddingAbsence(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGrade = async () => {
    if (!gradeConcept || gradeValue === '' || !gradeDate) return; 
    try {
      setLoading(true);
      await gradeService.addGrade(student.id, {
        concept: gradeConcept,
        value: Number(gradeValue),
        date: gradeDate,
      });
      await refreshStudent();
      setGradeConcept('');
      setGradeValue('');
      setGradeDate('');
      setIsAddingGrade(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              {student.last_name}, {student.first_name}
            </h2>
            <p className="text-xs text-slate-500">ID: {student.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* TABS DE NAVEGACIÓN */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 px-6">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Perfil
          </button>
          <button 
            onClick={() => setActiveTab('grades')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'grades' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Notas ({student.grades?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab('attendance')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'attendance' ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            Asistencia ({student.absences?.length || 0})
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#1a232e]">
          
          {/* PERFIL */}
          {activeTab === 'profile' && (
            <div className="space-y-5 max-w-sm mx-auto py-4">
               <div className="space-y-1">
                 <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Nombre</label>
                 <input 
                   value={firstName} 
                   onChange={(e) => setFirstName(e.target.value)} 
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                 />
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Apellido</label>
                 <input 
                   value={lastName} 
                   onChange={(e) => setLastName(e.target.value)} 
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none"
                 />
               </div>
               
               {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}

               <div className="pt-4 flex justify-end">
                 <button 
                   onClick={handleSaveProfile} 
                   disabled={loading}
                   className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold shadow-sm shadow-primary/30 transition-all active:scale-95"
                 >
                   {loading ? 'Guardando...' : 'Guardar Cambios'}
                 </button>
               </div>
            </div>
          )}

          {/*NOTAS */}
          {activeTab === 'grades' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Historial de Calificaciones</h3>
                {!isAddingGrade && (
                   <button onClick={() => setIsAddingGrade(true)} className="text-xs flex items-center gap-1 text-primary hover:underline font-medium">
                     <span className="material-symbols-outlined text-[16px]">add</span> Nueva Nota
                   </button>
                )}
              </div>

              {isAddingGrade && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 mb-4">
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input 
                        placeholder="Concepto (ej. Parcial)" 
                        value={gradeConcept} 
                        onChange={e => setGradeConcept(e.target.value)}
                        className="sm:col-span-2 px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                      
                      <input 
                        type="number" 
                        placeholder="Nota (1-10)" 
                        value={gradeValue}
                        onChange={e => setGradeValue(e.target.value === '' ? '' : Number(e.target.value))}
                        className="px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                      
                      <input 
                        type="date" 
                        value={gradeDate}
                        onChange={e => setGradeDate(e.target.value)}
                        className="sm:col-span-2 px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                      />
                      <div className="flex gap-2">
                         <button onClick={handleAddGrade} disabled={loading} className="flex-1 bg-primary text-white text-xs font-bold rounded hover:bg-primary/90">Guardar</button>
                         <button onClick={() => setIsAddingGrade(false)} className="px-3 bg-white border border-slate-300 text-xs font-bold rounded hover:bg-slate-50 text-slate-600">Cancelar</button>
                      </div>
                   </div>
                </div>
              )}

              {/* Lista de Notas */}
              {(!student.grades || student.grades.length === 0) ? (
                <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                   Sin notas registradas
                </div>
              ) : (
                <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 uppercase font-semibold">
                      <tr>
                        <th className="px-4 py-3">Concepto</th>
                        <th className="px-4 py-3 text-center">Nota</th>
                        <th className="px-4 py-3 text-right">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {student.grades.map(grade => (
                        <tr key={grade.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{grade.concept}</td>
                          <td className="px-4 py-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${Number(grade.value) >= 7 ? 'bg-green-100 text-green-700' : Number(grade.value) >= 4 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                               {grade.value}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right text-slate-500">{grade.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/*ASISTENCIA */}
          {activeTab === 'attendance' && (
             <div className="space-y-4">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Registro de Ausencias</h3>
                 {!isAddingAbsence && (
                    <button onClick={() => setIsAddingAbsence(true)} className="text-xs flex items-center gap-1 text-primary hover:underline font-medium">
                      <span className="material-symbols-outlined text-[16px]">add</span> Nueva Falta
                    </button>
                 )}
               </div>

               {isAddingAbsence && (
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700 animate-in slide-in-from-top-2 mb-4 flex items-center gap-3">
                    <input 
                      type="date" 
                      value={absenceDate} 
                      onChange={e => setAbsenceDate(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800"
                    />
                    <button onClick={handleAddAbsence} disabled={loading} className="px-4 py-2 bg-primary text-white text-xs font-bold rounded hover:bg-primary/90">Guardar</button>
                    <button onClick={() => setIsAddingAbsence(false)} className="px-3 py-2 bg-white border border-slate-300 text-xs font-bold rounded hover:bg-slate-50 text-slate-600">Cancelar</button>
                 </div>
               )}

               {(!student.absences || student.absences.length === 0) ? (
                 <div className="text-center py-8 text-slate-400 text-sm border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg">
                    Asistencia perfecta
                 </div>
               ) : (
                 <div className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 uppercase font-semibold">
                        <tr>
                          <th className="px-4 py-3">Fecha</th>
                          <th className="px-4 py-3 text-center">Estado</th>
                          <th className="px-4 py-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {student.absences.map(absence => (
                          <tr key={absence.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{absence.date}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${absence.justified ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                                {absence.justified ? 'Justificada' : 'Injustificada'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                               <button className="text-xs text-slate-400 hover:text-primary">Opciones</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
               )}
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default EditStudentModal;