import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StudentHeader } from '../components/students/StudentHeader';
import CreateStudentModal from '../components/students/CreateStudentModal';
import EditStudentModal from '../components/students/EditStudentModal';
import { StudentTable } from '../components/students/StudentTable';
import studentService from '../services/student.service';
//import schoolService from '../services/school.service'; // Para sacar el nombre de la escuela si lo necesitas
import type { Student } from '../types/student.types';
import * as XLSX from 'xlsx'; 

export const StudentList: React.FC = () => {
  const { schoolId } = useParams<{ schoolId: string }>();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [schoolName, setSchoolName] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Cargar datos
  useEffect(() => {
    const fetchData = async () => {
      if (!schoolId) return;
      try {
        setLoading(true);
        const data = await studentService.getStudentsBySchool(Number(schoolId));
        setStudents(data);
        setSchoolName("Escuela Ejemplo"); 

      } catch (error) {
        console.error("Error cargando planilla", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [schoolId]);

  const filteredStudents = students.filter(s => 
    s.last_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => setShowCreateModal(true);
  const handleEdit = (s: Student) => {
    setSelectedStudent(s);
    setShowEditModal(true);
  };
  const handleDelete = (s: Student) => console.log("Borrar", s);
  const handleClick = (s: Student) => console.log("Ver detalle completo (modal notas)", s);

  const handleCreated = (newStudent: Student) => {
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleUpdated = (updated: Student) => {
    setStudents((prev) => prev.map(p => p.id === updated.id ? updated : p));
    if (selectedStudent && selectedStudent.id === updated.id) {
      setSelectedStudent(updated);
    }
  };

  const handleExport = () => {
    const dataToExport = filteredStudents.map(s => ({
      ID: s.id,
      Apellido: s.last_name,
      Nombre: s.first_name,
      Promedio: 0, 
      Faltas: s.absences?.length || 0
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Alumnos");
    XLSX.writeFile(wb, `Planilla_${schoolName}.xlsx`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
      <StudentHeader 
        schoolName={schoolName}
        onSearch={setSearchTerm}
        onAdd={handleCreate}
        onExport={handleExport}
      />

      <StudentTable 
        students={filteredStudents}
        loading={loading}
        onStudentClick={handleClick}
        onEditStudent={handleEdit}
        onDeleteStudent={handleDelete}
      />
      
      <CreateStudentModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        schoolId={Number(schoolId)}
        onCreated={handleCreated}
      />
      <EditStudentModal
        isOpen={showEditModal}
        student={selectedStudent}
        onClose={() => { setShowEditModal(false); setSelectedStudent(null); }}
        onUpdated={(s) => { handleUpdated(s); }}
      />
    </div>
  );
};