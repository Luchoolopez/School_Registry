import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { concept: string; value: number; date: string }) => Promise<void>;
}

export const CreateGradeModal: React.FC<Props> = ({ isOpen, onClose, onSave }) => {
  const [concept, setConcept] = useState('');
  const [value, setValue] = useState<number | ''>('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!concept || value === '' || !date) return;
    
    setLoading(true);
    await onSave({ concept, value: Number(value), date });
    setLoading(false);
    
    setConcept('');
    setValue('');
    setDate('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] w-full max-w-md rounded-xl shadow-xl p-6 border border-slate-100 dark:border-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Agregar Nueva Nota</h3>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Concepto</label>
            <input 
              placeholder="Ej. Parcial de Matemáticas"
              value={concept} 
              onChange={e => setConcept(e.target.value)} 
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Nota (1-10)</label>
                <input 
                type="number"
                value={value} 
                onChange={e => setValue(e.target.value === '' ? '' : Number(e.target.value))} 
                className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
                />
            </div>
            <div>
                <label className="text-xs font-semibold text-slate-500 uppercase">Fecha</label>
                <input 
                type="date"
                value={date} 
                onChange={e => setDate(e.target.value)} 
                className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
                />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={loading || !concept || value === '' || !date} 
            className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Guardando...' : 'Guardar Nota'}
          </button>
        </div>
      </div>
    </div>
  );
};