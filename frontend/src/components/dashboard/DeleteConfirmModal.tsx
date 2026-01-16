import React from 'react';

interface Props {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const DeleteConfirmModal: React.FC<Props> = ({
  isOpen,
  title = 'Confirmar eliminación',
  message = '¿Estás seguro que deseas eliminar este elemento? Esta acción no se puede deshacer.',
  confirmLabel = 'Eliminar',
  cancelLabel = 'Cancelar',
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-sm p-6 border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{message}</p>

        <div className="flex items-center justify-end gap-3">
          <button onClick={onClose} className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700">{cancelLabel}</button>
          <button onClick={onConfirm} disabled={loading} className="px-3 py-2 rounded-lg bg-red-600 text-white">
            {loading ? 'Eliminando...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
