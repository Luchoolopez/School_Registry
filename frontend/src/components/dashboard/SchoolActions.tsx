import React, { useState } from 'react';
import type { School } from '../../types/school.types';
import schoolService from '../../services/school.service';
import EditSchoolModal from './EditSchoolModal';
import DeleteConfirmModal from './DeleteConfirmModal';

interface Props {
  school: School;
  onUpdated?: (s: School) => void;
  onDeleted?: (id: number) => void;
}

export const SchoolActions: React.FC<Props> = ({ school, onUpdated, onDeleted }) => {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      await schoolService.deleteSchool(school.id);
      onDeleted && onDeleted(school.id);
      setConfirmOpen(false);
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Error al eliminar la escuela');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-gray-200 dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-slate-800">
        <span className="material-symbols-outlined text-sm">edit</span>
        <span>Editar</span>
      </button>

      <button onClick={handleDelete} disabled={deleting} className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-red-200 text-sm text-red-600 hover:bg-red-50">
        <span className="material-symbols-outlined text-sm">delete</span>
        <span>{deleting ? 'Eliminando...' : 'Eliminar'}</span>
      </button>

      <EditSchoolModal isOpen={editing} onClose={() => setEditing(false)} school={school} onUpdated={(s) => { onUpdated && onUpdated(s); setEditing(false); }} />
      <DeleteConfirmModal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={deleting} />
    </div>
  );
};

export default SchoolActions;
