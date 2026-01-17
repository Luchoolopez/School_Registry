import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onCreate: () => void;
  onSearch: (value: string) => void;
}

export const AdminHeader: React.FC<Props> = ({ onCreate, onSearch }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-start gap-4">
        <button 
          onClick={() => navigate('/')} 
          className="mt-1 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          title="Volver al Dashboard"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            Panel de Administración
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Gestiona el acceso y roles de los usuarios del sistema.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input 
            type="text"
            placeholder="Buscar por nombre, DNI o email..."
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#1a232e] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow sm:text-sm shadow-sm"
          />
        </div>

        <button 
          onClick={onCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 shadow-sm shadow-primary/20 transition-all active:scale-[0.98] whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[20px]">person_add</span>
          <span>Nuevo Usuario</span>
        </button>
      </div>
    </div>
  );
};