import React from 'react';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  confirmText?: string;
  isDanger?: boolean;
}

export const ConfirmModal: React.FC<Props> = ({ 
  isOpen, title, message, onClose, onConfirm, loading, 
  confirmText = "Confirmar", isDanger = false 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] rounded-xl shadow-xl max-w-sm w-full p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            disabled={loading}
            className={`px-4 py-2 text-sm font-bold text-white rounded-lg transition-colors shadow-sm ${isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary/90'}`}
          >
            {loading ? 'Procesando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};