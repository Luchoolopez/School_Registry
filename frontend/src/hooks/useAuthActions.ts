import { useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import authService from '../services/auth.service';
import type { AuthResult } from '../types/user.types';

export const useAuthActions = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthActions debe ser usado dentro de AuthProvider');

  const login = useCallback(async (username: string, password: string) => {
    const res = await authService.login(username, password);
    const payload = res as AuthResult;
    ctx.setAuth({ user: payload.user, token: payload.token });
    return payload;
  }, [ctx]);

  const register = useCallback(async (data: { username: string; dni: string; password: string; role?: string }) => {
    const res = await authService.register(data);
    return res;
  }, []);

  const logout = useCallback(() => {
    ctx.setAuth({ user: null, token: null });
    window.location.href = '/iniciar-sesion';
  }, [ctx]);

  return { login, register, logout };
};

export default useAuthActions;
