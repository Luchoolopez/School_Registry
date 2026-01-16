import React from 'react';

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export const SchoolSearch: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="mb-6 relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-slate-400">search</span>
      </div>
      <input 
        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-[#1a232e] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-shadow sm:text-sm shadow-sm" 
        placeholder="Buscar escuela..." 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};