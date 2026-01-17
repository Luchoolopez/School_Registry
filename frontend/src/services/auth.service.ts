import apiClient from './apiClient';
import type { AuthResult, User } from '../types/user.types';

export const authService = {
  async login(username: string, password: string): Promise<AuthResult> {
    const res = await apiClient.post('/auth/login', { username, password });
    return res.data.data as AuthResult;
  },

  async register(data: { username: string; dni: string; email?: string; password: string; role?: string }): Promise<User> {
    const res = await apiClient.post('/auth/register', data);
    return res.data.data as User;
  }
};

export default authService;
