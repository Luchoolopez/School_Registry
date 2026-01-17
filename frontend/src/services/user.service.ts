import apiClient from './apiClient';
import type { User } from '../types/user.types';

export const userService = {
  async getAll(includeInactive = false): Promise<User[]> {
    const params = includeInactive ? { includeInactive: true } : {};
    const res = await apiClient.get('/user', { params });
    return res.data.data as User[];
  },

  async getById(id: number): Promise<User> {
    const res = await apiClient.get(`/user/${id}`);
    return res.data.data as User;
  },

  async updateUser(id: number, data: Partial<{ username: string; dni: string; role?: string; password?: string; active?: boolean }>): Promise<User> {
    const res = await apiClient.put(`/user/${id}`, data);
    return res.data.data as User;
  },

  async toggleUserStatus(id: number): Promise<User> {
    const res = await apiClient.patch(`/user/${id}/toggle`);
    return res.data.data as User;
  }
  ,

  async deleteUser(id: number): Promise<void> {
    await apiClient.delete(`/user/${id}`);
  }
};

export default userService;
