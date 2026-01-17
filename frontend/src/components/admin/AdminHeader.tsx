import React from 'react';

interface Props {
  onCreate: () => void;
}

export const AdminHeader: React.FC<Props> = ({ onCreate }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          Panel de Administración
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Gestiona el acceso y roles de los usuarios
        </p>
      </div>
      
      <button 
        onClick={onCreate}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 shadow-sm shadow-primary/20 transition-all active:scale-[0.98]"
      >
        <span className="material-symbols-outlined text-[20px]">person_add</span>
        <span>Nuevo Usuario</span>
      </button>
    </div>
  );
};