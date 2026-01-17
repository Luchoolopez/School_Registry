import React from 'react';
import type{ User } from '../../types/user.types';
import { UserRow } from './UserRow';

interface Props {
  users: User[];
  loading: boolean;
  onToggleStatus: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable: React.FC<Props> = ({ users, loading, onToggleStatus, onDelete }) => {
  
  if (loading) {
    return (
      <div className="w-full bg-white dark:bg-[#1a232e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-slate-500 text-sm">Cargando usuarios...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="w-full bg-white dark:bg-[#1a232e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl text-slate-400">group_off</span>
        </div>
        <h3 className="text-slate-900 dark:text-white font-bold mb-1">No hay usuarios</h3>
        <p className="text-slate-500 text-sm">Comienza registrando un nuevo docente o administrador.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a232e] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Usuario</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Rol</th>
              <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
              <th className="px-4 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {users.map((user) => (
              <UserRow 
                key={user.id} 
                user={user} 
                onToggleStatus={onToggleStatus}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/30">
        <p className="text-xs text-slate-500">
          Mostrando {users.length} {users.length === 1 ? 'usuario' : 'usuarios'} registrados
        </p>
      </div>
    </div>
  );
};