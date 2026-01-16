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

  const filteredSchools = schools.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.academic_year.toString().includes(searchTerm)
  );

  const handleCreated = (school: School) => {
    setSchools(prev => [school, ...prev]);
  };

  return (
    <div className="w-full max-w-md mx-auto md:max-w-3xl animate-in fade-in duration-500">
      
      <DashboardHeader onCreate={() => setModalOpen(true)} />
      
      <SchoolSearch value={searchTerm} onChange={setSearchTerm} />
      <CreateSchoolModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onCreated={handleCreated} />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-100 dark:bg-slate-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4 pb-24">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <SchoolCard key={school.id} school={school} />
            ))
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