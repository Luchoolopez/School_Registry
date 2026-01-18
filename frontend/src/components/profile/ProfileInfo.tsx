import React from 'react';
import type { User } from '../../types/user.types';

interface Props {
  user: User;
}

export const ProfileInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between px-1 mb-4">
        <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Información Personal</h3>
        <span translate="no" className="material-symbols-outlined notranslate text-slate-400">info</span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-1">Documento de Identidad (DNI)</label>
          <div className="flex w-full items-center rounded-xl bg-slate-100 dark:bg-[#1e293b]/50 border border-slate-200 dark:border-slate-800 h-14 px-4 opacity-80">
            <input 
              className="bg-transparent border-none text-slate-900 dark:text-slate-300 w-full focus:ring-0 p-0 text-base font-normal font-mono" 
              readOnly 
              value={user.dni}
            />
            <span translate="no" className="material-symbols-outlined notranslate text-slate-400 text-[20px]">badge</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-slate-500 dark:text-slate-400 text-sm font-medium ml-1">Nombre de Usuario</label>
          <div className="flex w-full items-center rounded-xl bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 h-14 px-4">
            <input 
              className="bg-transparent border-none text-slate-900 dark:text-white w-full focus:ring-0 p-0 text-base font-normal" 
              readOnly 
              value={user.username}
            />
            <span translate="no" className="material-symbols-outlined notranslate text-slate-400 text-[20px]">person</span>
          </div>
        </div>
      </div>
    </div>
  );
};