// src/views/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import schoolService from '../services/school.service';
import type { School } from '../types/school.types';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import CreateSchoolModal from '../components/dashboard/CreateSchoolModal';
import { SchoolSearch } from '../components/dashboard/SchoolSearch';
import { SchoolCard } from '../components/dashboard/SchoolCard';

export const DashboardSchool: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const data = await schoolService.getSchools();
        setSchools(data);
      } catch (error) {
        console.error("Error al cargar escuelas", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const filteredSchools = schools.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.academic_year.toString().includes(searchTerm);
    const matchesYear = yearFilter ? s.academic_year === Number(yearFilter) : true;
    return matchesSearch && matchesYear;
  });

  const handleCreated = (school: School) => {
    setSchools(prev => [school, ...prev]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 animate-in fade-in duration-500">
      
      <DashboardHeader
        onCreate={() => setModalOpen(true)}
        sortByName={sortByName}
        onToggleSortName={() => setSortByName(prev => !prev)}
        yearFilter={yearFilter}
        onYearChange={(v) => setYearFilter(v)}
        onClearYear={() => setYearFilter('')}
      />
      
      <SchoolSearch value={searchTerm} onChange={setSearchTerm} />
      <CreateSchoolModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreated={handleCreated} />

      {loading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="pb-24">
          { (filteredSchools.length > 0) ? (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              { (sortByName ? [...filteredSchools].sort((a,b) => a.name.localeCompare(b.name)) : filteredSchools).map((school: School) => (
                <SchoolCard 
                  key={school.id} 
                  school={school} 
                  onUpdated={(s: School) => setSchools(prev => prev.map(p => p.id === s.id ? s : p))}
                  onDeleted={(id: number) => setSchools(prev => prev.filter(p => p.id !== id))}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              <span className="material-symbols-outlined text-4xl mb-2">school</span>
              <p>No se encontraron escuelas.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};