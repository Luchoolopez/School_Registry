import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  schoolName: string;
  onSearch: (val: string) => void;
  onAdd: () => void;
  onExport: () => void;
}

export const StudentHeader: React.FC<Props> = ({ schoolName, onSearch, onAdd, onExport }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col gap-1">
        <button 
          onClick={() => navigate('/')} 
          className="text-xs text-primary font-medium flex items-center gap-1 hover:underline w-fit"
        >
          <span className="material-symbols-outlined text-[14px]">arrow_back</span>
          Volver a Escuelas
        </button>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {schoolName || 'Cargando...'}
        </h1>
        <p className="text-slate-500 text-sm">Planilla de seguimiento académico</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input 
            type="text"
            placeholder="Buscar alumno..."
            onChange={(e) => onSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#1a232e] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary text-sm shadow-sm"
          />
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-[#1a232e] border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px] text-green-600">table_view</span>
            <span className="hidden sm:inline">Excel</span>
          </button>
          
          <button 
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
          >
            <span className="material-symbols-outlined text-[20px]">person_add</span>
            <span>Agregar Alumno</span>
          </button>
        </div>
      </div>
    </div>
  );
};