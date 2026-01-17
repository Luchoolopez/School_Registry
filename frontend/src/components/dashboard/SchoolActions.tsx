import React, { useState } from 'react';
import MessageModal from '../MessageModal';
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
  const [msgOpen, setMsgOpen] = useState(false);
  const [msgTitle, setMsgTitle] = useState('');
  const [msgMessage, setMsgMessage] = useState('');

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
      setMsgTitle('Error');
      setMsgMessage(err?.response?.data?.message || 'Error al eliminar la escuela');
      setMsgOpen(true);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
    <div className="flex items-center gap-1">
      <button 
        onClick={() => setEditing(true)} 
        title="Editar escuela"
        className="p-1.5 rounded-full text-slate-400 hover:text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">edit</span>
      </button>

      <button 
        onClick={handleDelete} 
        disabled={deleting} 
        title="Eliminar escuela"
        className="p-1.5 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">delete</span>
      </button>

      {editing && (
        <EditSchoolModal 
            isOpen={editing} 
            onClose={() => setEditing(false)} 
            school={school} 
            onUpdated={(s) => { onUpdated && onUpdated(s); setEditing(false); }} 
        />
      )}
      
      <DeleteConfirmModal 
        isOpen={confirmOpen} 
        onClose={() => setConfirmOpen(false)} 
        onConfirm={handleConfirmDelete} 
        loading={deleting} 
      />
    </div>
    <MessageModal isOpen={msgOpen} title={msgTitle} message={msgMessage} onClose={() => setMsgOpen(false)} />
    </>
  );
};

export default SchoolActions;