import apiClient from './apiClient';
import type{ School, CreateSchoolDTO } from '../types/school.types';

export const schoolService = {
  async getSchools(): Promise<School[]> {
    const res = await apiClient.get('/school');
    return res.data.data as School[];
  },

  async createSchool(data: CreateSchoolDTO): Promise<School> {
    const res = await apiClient.post('/school', data);
    return res.data.data as School;
  },

  async updateSchool(id: number, data: Partial<CreateSchoolDTO>): Promise<School> {
    const res = await apiClient.put(`/school/${id}`, data);
    return res.data.data as School;
  },

  async deleteSchool(id: number): Promise<void> {
    await apiClient.delete(`/school/${id}`);
  }
};

export default schoolService;
