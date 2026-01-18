import React from 'react';
import type { User } from '../../types/user.types';
import { useNavigate } from 'react-router-dom';

interface Props {
  user: User;
}

export const ProfileHeader: React.FC<Props> = ({ user }) => {

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : 'US';
  };

  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate('/')}
        className="text-xs text-primary font-medium flex items-center gap-1 hover:underline w-fit"
      >
        <span translate="no" className="material-symbols-outlined notranslate text-[14px]">arrow_back</span>
        Volver al menu principal
      </button>
      <div className="relative mt-4 bg-white dark:bg-[#1e293b] rounded-xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800">

        <div className="h-32 w-full bg-gradient-to-br from-[#2111d4] to-[#4f46e5]"></div>

        <div className="flex flex-col items-center -mt-16 pb-6 px-4">
          <div className="relative">
            <div className="flex items-center justify-center h-32 w-32 rounded-full border-4 border-white dark:border-[#1e293b] bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-300 text-4xl font-bold shadow-lg">
              {getInitials(user.username)}
            </div>
            <div className={`absolute bottom-2 right-2 h-5 w-5 border-4 border-white dark:border-[#1e293b] rounded-full ${user.active ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>

          <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{user.username}</h1>
            <p className="text-slate-400 dark:text-slate-500 text-xs mt-1 font-mono">ID: #{user.id}</p>
          </div>

          <div className="flex gap-2 mt-4">
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-full bg-primary/10 dark:bg-blue-500/20 px-4 border border-primary/20 dark:border-blue-500/30">
              <span translate="no" className="material-symbols-outlined notranslate text-primary dark:text-blue-400 text-[18px]">school</span>
              <p className="text-primary dark:text-blue-400 text-xs font-bold uppercase tracking-wider">{user.role}</p>
            </div>

            <div className={`flex h-8 shrink-0 items-center justify-center gap-x-1.5 rounded-full px-4 border ${user.active ? 'bg-green-100 dark:bg-green-500/10 border-green-500/20' : 'bg-red-100 dark:bg-red-500/10 border-red-500/20'}`}>
              <span translate="no" className={`material-symbols-outlined notranslate text-[18px] ${user.active ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {user.active ? 'check_circle' : 'block'}
              </span>
              <p className={`text-xs font-bold uppercase tracking-wider ${user.active ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {user.active ? 'Activo' : 'Inactivo'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};