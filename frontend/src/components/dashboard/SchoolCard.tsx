// src/components/dashboard/SchoolCard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getSchoolColor } from '../../utils/uiHelpers';
import type { School } from '../../types/school.types';
import SchoolActions from './SchoolActions';
import { useEffect, useState } from 'react';
import studentService from '../../services/student.service';

interface Props {
  school: School;
  onUpdated?: (s: School) => void;
  onDeleted?: (id: number) => void;
}

export const SchoolCard: React.FC<Props> = ({ school, onUpdated, onDeleted }) => {
  const navigate = useNavigate();
  const theme = getSchoolColor(school.id);
  const [studentCount, setStudentCount] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchCount = async () => {
      try {
        const students = await studentService.getStudentsBySchool(school.id);
        if (mounted) setStudentCount(students.length);
      } catch (err) {
        console.warn('No se pudo obtener cantidad de alumnos para escuela', school.id, err);
        if (mounted) setStudentCount(null);
      }
    };
    fetchCount();
    return () => { mounted = false; };
  }, [school.id]);

  const handleViewStudents = () => {
    navigate(`/students/school/${school.id}`);
  };

  return (
    <div className="bg-white dark:bg-[#1a232e] rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-5 flex flex-col h-full hover:border-primary/30 hover:shadow-md transition-all duration-200">
      
      <div className="flex justify-between items-start gap-4 mb-4">
        
        <div className="flex gap-3 min-w-0 flex-1">
          <div className={`w-12 h-12 shrink-0 rounded-lg flex items-center justify-center ${theme.bg} ${theme.text}`}>
            <span className="material-symbols-outlined text-[24px]">{theme.icon}</span>
          </div>

          <div className="flex flex-col"> 
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight break-words pr-1">
              {school.name}
            </h3>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
              Ciclo {school.academic_year}
            </span>
          </div>
        </div>

        <div className="shrink-0">
             <SchoolActions school={school} onUpdated={onUpdated} onDeleted={onDeleted} />
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2 mb-3 text-xs text-slate-400 dark:text-slate-500 px-1">
            <span className="material-symbols-outlined text-[16px]">groups</span>
            <span>
              {studentCount === null ? 'Ver Alumnos' : `${studentCount} ${studentCount === 1 ? 'Alumno' : 'Alumnos'}`}
            </span>
        </div>

        <button 
            onClick={handleViewStudents}
            className="w-full bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all text-white font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm shadow-sm shadow-primary/20"
        >
            <span>Ver Planilla</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};