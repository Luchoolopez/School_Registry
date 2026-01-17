import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentAbsencesCount: number; 
}

export const CalculateAttendanceModal: React.FC<Props> = ({ isOpen, onClose, currentAbsencesCount }) => {
  const [totalClasses, setTotalClasses] = useState<number | ''>('');
  const [absences, setAbsences] = useState<number | ''>(currentAbsencesCount);
  
  const [result, setResult] = useState<{ attendance: string; absence: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAbsences(currentAbsencesCount);
      setResult(null);
      setError(null);
    }
  }, [isOpen, currentAbsencesCount]);

  if (!isOpen) return null;

  const handleCalculate = () => {
    const total = Number(totalClasses);
    const inasistencias = Number(absences);

    if (!totalClasses || total <= 0) {
      setError('El total de clases debe ser mayor que 0.');
      return;
    }
    if (inasistencias < 0) {
      setError('Las inasistencias no pueden ser negativas.');
      return;
    }
    if (inasistencias > total) {
      setError('Las inasistencias no pueden superar al total de clases.');
      return;
    }

    setError(null);
    const asistencias = total - inasistencias;
    const porcentajeAsistencia = (asistencias * 100) / total;
    const porcentajeInasistencia = 100 - porcentajeAsistencia;

    setResult({
      attendance: porcentajeAsistencia.toFixed(2),
      absence: porcentajeInasistencia.toFixed(2)
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] w-full max-w-sm rounded-xl shadow-xl p-6 border border-slate-100 dark:border-slate-800">
        
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">calculate</span>
                Calculadora
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Total de Clases</label>
            <input 
              type="number"
              placeholder="Ej. 20"
              value={totalClasses} 
              onChange={e => {
                  setTotalClasses(e.target.value === '' ? '' : Number(e.target.value));
                  setResult(null); 
              }} 
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase">Faltas del Alumno</label>
            <input 
              type="number"
              value={absences} 
              onChange={e => {
                  setAbsences(e.target.value === '' ? '' : Number(e.target.value));
                  setResult(null);
              }} 
              className="w-full px-3 py-2 mt-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-primary/50 outline-none" 
            />
            <p className="text-[10px] text-slate-400 mt-1">* Se completó automáticamente con las faltas actuales.</p>
          </div>

          {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  {error}
              </div>
          )}

          {/* Resultado */}
          {result && (
              <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-400">Asistencia:</span>
                      <span className={`text-lg font-bold ${Number(result.attendance) >= 75 ? 'text-green-600' : 'text-red-500'}`}>
                          {result.attendance}%
                      </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-3">
                      <div className={`h-2.5 rounded-full ${Number(result.attendance) >= 75 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${result.attendance}%` }}></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Inasistencia: {result.absence}%</span>
                  </div>
              </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cerrar
          </button>
          <button 
            onClick={handleCalculate} 
            className="px-4 py-2 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-lg shadow-sm transition-colors"
          >
            Calcular
          </button>
        </div>
      </div>
    </div>
  );
};