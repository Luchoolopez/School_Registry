import React, { useState, useEffect } from 'react';
import type { Student } from '../../types/student.types';
import studentService from '../../services/student.service';
import { ProfileTab } from './ProfileTab';
import { GradesTab } from './GradeTab';
import { AttendanceTab } from './AttendanceTab';

interface Props {
  isOpen: boolean;
  student: Student | null;
  onClose: () => void;
  onUpdated: (student: Student) => void;
}

type Tab = 'profile' | 'grades' | 'attendance';

export const EditStudentModal: React.FC<Props> = ({ isOpen, student, onClose, onUpdated }) => {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  // Resetear el tab cuando cambia el estudiante
  useEffect(() => {
    if (isOpen) setActiveTab('profile');
  }, [isOpen, student?.id]);

  if (!isOpen || !student) return null;

  const refreshStudent = async () => {
    try {
      const fresh = await studentService.getStudentById(student.id);
      onUpdated(fresh);
    } catch (err) {
      console.error('Error refrescando', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a232e] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              {student.last_name}, {student.first_name}
            </h2>
            <p className="text-xs text-slate-500">ID: {student.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="flex border-b border-slate-200 dark:border-slate-700 px-6">
          <TabButton label="Perfil" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <TabButton label={`Notas (${student.grades?.length || 0})`} isActive={activeTab === 'grades'} onClick={() => setActiveTab('grades')} />
          <TabButton label={`Asistencia (${student.absences?.length || 0})`} isActive={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} />
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-[#1a232e]">
          {activeTab === 'profile' && (
            <ProfileTab student={student} onUpdate={onUpdated} onClose={onClose} />
          )}
          {activeTab === 'grades' && (
            <GradesTab student={student} onRefresh={refreshStudent} />
          )}
          {activeTab === 'attendance' && (
            <AttendanceTab student={student} onRefresh={refreshStudent} />
          )}
        </div>
      </div>
    </div>
  );
};

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void }> = ({ label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
  >
    {label}
  </button>
);

export default EditStudentModal;