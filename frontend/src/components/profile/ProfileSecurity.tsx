import React from 'react';

interface Props {
  onRequestPasswordReset: () => void;
}

export const ProfileSecurity: React.FC<Props> = ({ onRequestPasswordReset }) => {
  return (
    <div className="mt-10">
      <div className="flex items-center px-1 mb-4">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Seguridad y Acceso</h3>
      </div>

      <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <button 
            onClick={onRequestPasswordReset}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">
              <span className="material-symbols-outlined">lock_reset</span>
            </div>
            <div className="text-left">
              <p className="text-slate-900 dark:text-white font-medium text-sm">Cambiar Contraseña</p>
              <p className="text-slate-400 text-xs mt-0.5">Se enviará un correo de recuperación</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">chevron_right</span>
        </button>
      </div>
    </div>
  );
};