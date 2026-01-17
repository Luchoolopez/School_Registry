export interface User {
  id: number;
  username: string;
  dni: string;      
  email?: string;
  role: 'admin' | 'docente';
  active: boolean;  
  createdAt?: string;
}
export interface AuthResult {
  token: string;
  user: User;
}
