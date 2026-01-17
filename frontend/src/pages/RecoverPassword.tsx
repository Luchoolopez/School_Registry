import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const RecoverPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!token) {
      setError('Token inválido o faltante.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);
      const emailService = (await import('../services/email.service')).default;
      await emailService.reset(token, password);
      alert('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
      navigate('/iniciar-sesion');
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Error al restablecer la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#0f1724] rounded-xl shadow-xl p-6 border border-slate-100 dark:border-slate-800">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Restablecer contraseña</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Ingresa tu nueva contraseña dos veces.</p>

        {error && <div className="mb-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none dark:text-white"
              placeholder="Nueva contraseña"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm outline-none dark:text-white"
              placeholder="Repite la contraseña"
              required
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded-lg font-bold">
              {loading ? 'Restableciendo...' : 'Restablecer contraseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
