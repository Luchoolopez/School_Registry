import React, { useState } from 'react';
import authService from '../../services/auth.service'; 

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateUserModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [dni, setDni] = useState('');
  const [role, setRole] = useState<'docente' | 'admin'>('docente');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameTrim = username.trim();
    const dniTrim = dni.trim();
    if (!usernameTrim || !dniTrim) {
        setError("Todos los campos son obligatorios");
        return;
    }

    try {
      setLoading(true);
      setError(null);

      await authService.register({
        username,
        dni,
        role,
        password: dni 
      });

      onSuccess();
      handleClose();
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al registrar usuario.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setUsername('');
    setDni('');
    setRole('docente');
    setError(null);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] w-full max-w-md rounded-xl shadow-xl p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Registrar Nuevo Usuario</h3>
        <p className="text-xs text-slate-500 mb-4">Se usará el servicio de Registro (Auth).</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Nombre de Usuario</label>
            <input 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/50 outline-none dark:text-white" 
              placeholder="Ej. Juan Perez"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">DNI (Será la contraseña)</label>
            <input 
              type="text"
              inputMode="numeric"
              value={dni} 
              onChange={e => setDni(e.target.value)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/50 outline-none dark:text-white" 
              placeholder="Ej. 12345678"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Rol</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value as any)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-primary/50 outline-none dark:text-white"
            >
              <option value="docente">Docente</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {error && <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</div>}

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={handleClose} className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg">Cancelar</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm">
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};