import React, { useState } from 'react';
import type{ Student } from '../../types/student.types';
import studentService from '../../services/student.service';

interface Props {
  student: Student;
  onUpdate: (s: Student) => void;
  onClose: () => void;
}

export const ProfileTab: React.FC<Props> = ({ student, onUpdate, onClose }) => {
  const [firstName, setFirstName] = useState(student.first_name);
  const [lastName, setLastName] = useState(student.last_name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) return setError('Datos requeridos');
    try {
      setLoading(true);
      const updated = await studentService.updateStudent(student.id, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });
      onUpdate(updated);
      setLoading(false);
      onClose();
    } catch (err) {
      setError('Error al actualizar');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 max-w-sm mx-auto py-4">
       <div className="space-y-1">
         <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Nombre</label>
         <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" />
       </div>
       <div className="space-y-1">
         <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Apellido</label>
         <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 outline-none" />
       </div>
       
       {error && <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>}

       <div className="pt-4 flex justify-end">
         <button onClick={handleSave} disabled={loading} className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold shadow-sm shadow-primary/30 transition-all active:scale-95">
           {loading ? 'Guardando...' : 'Guardar Cambios'}
         </button>
       </div>
    </div>
  );
};