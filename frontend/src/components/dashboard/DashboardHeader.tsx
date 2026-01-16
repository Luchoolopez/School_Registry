import React from 'react';

interface Props {
  onCreate?: () => void;
}

export const DashboardHeader: React.FC<Props> = ({ onCreate }) => {
  return (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          Mis Escuelas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Gestiona tus instituciones asignadas
        </p>
      </div>

      {onCreate && (
        <div className="mt-1">
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg shadow-sm hover:bg-primary/90 transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Crear Escuela</span>
          </button>
        </div>
      )}
    </div>
  );
};