import React, { useState, useEffect } from 'react';
import type { CreateSchoolDTO, School } from '../../types/school.types';
import schoolService from '../../services/school.service';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  school: School | null;
  onUpdated?: (school: School) => void;
}

export const EditSchoolModal: React.FC<Props> = ({ isOpen, onClose, school, onUpdated }) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (school) {
      setName(school.name);
      setYear(school.academic_year);
    }
  }, [school]);

  if (!isOpen || !school) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('El nombre es requerido');
    if (!year || isNaN(year)) return setError('Año inválido');

    const payload: CreateSchoolDTO = { name: name.trim(), academic_year: year };
    setLoading(true);
    try {
      const updated = await schoolService.updateSchool(school.id, payload);
      onUpdated && onUpdated(updated);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al actualizar la escuela');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Editar Escuela</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre de la escuela" className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700" />
          </div>

          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300 mb-1">Año académico</label>
            <input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="w-full rounded-lg border px-3 py-2 bg-white dark:bg-slate-800 border-gray-200 dark:border-gray-700" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-primary text-white">
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSchoolModal;
