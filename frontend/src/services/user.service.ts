import apiClient from './apiClient';

export const userService = {
  async getAll(includeInactive = false) {
    const params = includeInactive ? { includeInactive: true } : {};
    const res = await apiClient.get('/user', { params });
    return res.data.data;
  },

  async getById(id: number) {
    const res = await apiClient.get(`/user/${id}`);
    return res.data.data;
  },

  async updateUser(id: number, data: Partial<{ username: string; dni: string; role?: string; password?: string; active?: boolean }>) {
    const res = await apiClient.put(`/user/${id}`, data);
    return res.data.data;
  },

  async deactivateUser(id: number) {
    const res = await apiClient.delete(`/user/${id}`);
    return res.data;
  }
};

export default userService;
