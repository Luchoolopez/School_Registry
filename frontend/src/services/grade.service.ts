import apiClient from './apiClient';
import type{ Grade, CreateGradeDTO } from '../types/grade.types';

export const gradeService = {
  async addGrade(studentId: number, data: CreateGradeDTO): Promise<Grade> {
    const res = await apiClient.post(`/grade/student/${studentId}`, data);
    return res.data.data as Grade;
  },

  async updateGrade(id: number, data: Partial<CreateGradeDTO>): Promise<Grade> {
    const res = await apiClient.put(`/grade/${id}`, data);
    return res.data.data as Grade;
  },

  async deleteGrade(id: number): Promise<void> {
    await apiClient.delete(`/grade/${id}`);
  }
};

export default gradeService;
