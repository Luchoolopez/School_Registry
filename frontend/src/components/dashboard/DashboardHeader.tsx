import React, { useState, useRef, useEffect } from 'react';

interface Props {
  onCreate?: () => void;
  sortByName?: boolean; // true = A-Z, false = Z-A
  onToggleSortName?: () => void;
  yearFilter?: string;
  onYearChange?: (v: string) => void;
  onClearYear?: () => void;
}

export const DashboardHeader: React.FC<Props> = ({ 
  onCreate, 
  sortByName = true, 
  onToggleSortName, 
  yearFilter, 
  onYearChange, 
  onClearYear 
}) => {
  const [isYearMenuOpen, setIsYearMenuOpen] = useState(false);
  const yearMenuRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const yearsList = Array.from({ length: 10 }, (_, i) => (currentYear + 1) - i);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearMenuRef.current && !yearMenuRef.current.contains(event.target as Node)) {
        setIsYearMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleYearSelect = (year: string) => {
    if (onYearChange) onYearChange(year);
    setIsYearMenuOpen(false);
  };

  const handleClearYear = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (onClearYear) onClearYear();
    setIsYearMenuOpen(false);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          Mis Escuelas
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Gestiona tus instituciones asignadas
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        
        <button
          onClick={onToggleSortName}
          className="inline-flex items-center gap-2 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a232e] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
          title={sortByName ? "Orden Ascendente" : "Orden Descendente"}
        >
          <span translate="no" className="material-symbols-outlined notranslate text-[20px]">sort_by_alpha</span>
          <span>{sortByName ? 'A-Z' : 'Z-A'}</span>
        </button>

        <div className="relative" ref={yearMenuRef}>
          <button
            onClick={() => setIsYearMenuOpen(!isYearMenuOpen)}
            className="inline-flex items-center justify-between w-32 px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1a232e] text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium shadow-sm"
          >
            <span>{yearFilter || 'Año'}</span>
            
            {yearFilter ? (
               <span 
                 onClick={handleClearYear}
                 className="material-symbols-outlined notranslate text-[16px] text-slate-400 hover:text-red-500 transition-colors"
                 translate="no"
               >
                 close
               </span>
            ) : (
               <span translate="no" className={`material-symbols-outlined notranslate text-[20px] text-slate-400 transition-transform duration-200 ${isYearMenuOpen ? 'rotate-180' : ''}`}>
                 expand_more
               </span>
            )}
          </button>

          {isYearMenuOpen && (
            <div className="absolute z-10 top-full mt-1 w-full bg-white dark:bg-[#1a232e] border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 animate-in fade-in zoom-in-95 duration-100">
              <div className="max-h-48 overflow-y-auto custom-scrollbar">
                <button
                  onClick={() => handleYearSelect('')} 
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${!yearFilter ? 'text-primary font-bold bg-blue-50 dark:bg-blue-900/10' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  Todos
                </button>
                
                {yearsList.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearSelect(year.toString())}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${yearFilter === year.toString() ? 'text-primary font-bold bg-blue-50 dark:bg-blue-900/10' : 'text-slate-700 dark:text-slate-300'}`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {onCreate && (
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all text-sm font-bold shadow-primary/20 ml-2"
          >
            <span translate="no" className="material-symbols-outlined notranslate text-[20px]">add</span>
            <span className="hidden sm:inline">Crear Escuela</span>
            <span className="sm:hidden">Crear</span>
          </button>
        )}
      </div>
    </div>
  );
};