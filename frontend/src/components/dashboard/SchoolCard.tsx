// src/components/dashboard/SchoolCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchoolColor } from '../utils/uiHelpers.ts';
import type { School } from '../../types/school.types';

interface Props {
  school: School;
}

export const SchoolCard: React.FC<Props> = ({ school }) => {
  const navigate = useNavigate();
  const theme = getSchoolColor(school.id);

  const handleViewStudents = () => {
    navigate(`/students/school/${school.id}`);
  };

  return (
    <div className="bg-white dark:bg-[#1a232e] rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-4 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4">
          <div className={`w-14 h-14 shrink-0 rounded-lg flex items-center justify-center ${theme.bg} ${theme.text}`}>
            <span className="material-symbols-outlined text-[32px]">{theme.icon}</span>
          </div>
          
          <div className="flex flex-col pt-0.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
              {school.name}
            </h3>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              Ciclo {school.academic_year}
            </span>
            
            {/* Stats (Si el backend no trae esto aún, lo harcodeamos visualmente o lo ocultamos) */}
            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">groups</span> 
                Ver Alumnos
              </span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleViewStudents}
        className="w-full mt-1 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-sm shadow-primary/20"
      >
        <span>Ver Planilla</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  );
};