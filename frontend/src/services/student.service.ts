import apiClient from './apiClient';
import type{ Student, CreateStudentDTO } from '../types/student.types';

export const studentService = {
  async getStudentsBySchool(schoolId: number): Promise<Student[]> {
    const res = await apiClient.get(`/student/school/${schoolId}`);
    return res.data.data as Student[];
  },

  async createStudent(schoolId: number, data: CreateStudentDTO): Promise<Student> {
    const res = await apiClient.post(`/student/school/${schoolId}`, data);
    return res.data.data as Student;
  },

  async getStudentById(id: number): Promise<Student> {
    const res = await apiClient.get(`/student/${id}`);
    return res.data.data as Student;
  },

  async updateStudent(id: number, data: Partial<CreateStudentDTO>): Promise<Student> {
    const res = await apiClient.put(`/student/${id}`, data);
    return res.data.data as Student;
  },

  async deleteStudent(id: number): Promise<void> {
    await apiClient.delete(`/student/${id}`);
  }
};

export default studentService;
