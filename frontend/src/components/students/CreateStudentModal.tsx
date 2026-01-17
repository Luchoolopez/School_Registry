import React, { useState } from 'react';
import type { Student, CreateStudentDTO } from '../../types/student.types';
import studentService from '../../services/student.service';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  schoolId: number;
  onCreated: (student: Student) => void;
}

export const CreateStudentModal: React.FC<Props> = ({ isOpen, onClose, schoolId, onCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const reset = () => {
    setFirstName('');
    setLastName('');
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleCreate = async () => {
    setError(null);
    if (!firstName.trim() || !lastName.trim()) {
      setError('Nombre y apellido son requeridos.');
      return;
    }

    const payload: CreateStudentDTO = {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
    };

    try {
      setLoading(true);
      const created = await studentService.createStudent(schoolId, payload);
      onCreated(created);
      handleClose();
    } catch (err) {
      console.error('Error creando alumno', err);
      setError('No se pudo crear el alumno. Intenta de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-[#0f1720] rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Agregar Alumno</h3>
        <p className="text-sm text-slate-500 dark:text-slate-300 mb-4">Ingresa nombre y apellido del alumno.</p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">Apellido</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white text-sm"
              placeholder="Ej: Pérez"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-300 mb-1">Nombre</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1220] text-slate-900 dark:text-white text-sm"
              placeholder="Ej: Juan"
            />
          </div>

          {error && <div className="text-sm text-red-500">{error}</div>}

          <div className="flex justify-end gap-3 pt-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-white dark:bg-[#08101a] border border-slate-200 dark:border-slate-700 text-sm"
              disabled={loading}
            >
              Cancelar
            </button>

            <button
              onClick={handleCreate}
              className="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStudentModal;
