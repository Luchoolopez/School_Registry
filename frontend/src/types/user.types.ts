export interface User {
  id: number;
  username: string;
  dni: string;
  role: 'admin' | 'docente';
}

export interface AuthResult {
  token: string;
  user: User;
}
