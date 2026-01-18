import React from 'react';
import type { User } from '../../types/user.types';

interface Props {
  user: User;
  onToggleStatus: (user: User) => void; 
  onDelete: (user: User) => void;       
}

export const UserRow: React.FC<Props> = ({ user, onToggleStatus, onDelete }) => {
  
  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : 'US';
  };

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
      
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
            {getInitials(user.username)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              {user.username}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              DNI: {user.dni}
            </span>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border capitalize ${
          user.role === 'admin' 
            ? 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800' 
            : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800'
        }`}>
           {user.role === 'admin' && <span translate="no" className="material-symbols-outlined notranslate text-[14px]">security</span>}
           {user.role}
        </span>
      </td>

      <td className="px-4 py-4">
        <button 
           onClick={() => onToggleStatus(user)}
           className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${
             user.active ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'
           }`}
           title={user.active ? "Desactivar usuario" : "Activar usuario"}
        >
           <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
             user.active ? 'translate-x-6' : 'translate-x-1'
           }`} />
        </button>
        <span className="ml-2 text-xs font-medium text-slate-500">
            {user.active ? 'Activo' : 'Inactivo'}
        </span>
      </td>

      <td className="px-4 py-4 text-right">
         <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
           <button 
             onClick={() => onDelete(user)}
             className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
             title="Eliminar usuario permanentemente"
           >
             <span translate="no" className="material-symbols-outlined notranslate text-[20px]">delete</span>
           </button>
         </div>
      </td>
    </tr>
  );
};