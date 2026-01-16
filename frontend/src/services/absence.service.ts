import apiClient from './apiClient';
import type { Absence, CreateAbsenceDTO } from '../types/absence.types';

export const absenceService = {
  async createAbsence(studentId: number, data: CreateAbsenceDTO): Promise<Absence> {
    const res = await apiClient.post(`/absence/student/${studentId}`, data);
    return res.data.data as Absence;
  },

  async toggleJustification(id: number): Promise<Absence> {
    const res = await apiClient.patch(`/absence/${id}/toggle`);
    return res.data.data as Absence;
  },

  async deleteAbsence(id: number): Promise<void> {
    await apiClient.delete(`/absence/${id}`);
  }
};

export default absenceService;
