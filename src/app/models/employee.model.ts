export type UserRole = 'ADMINISTRADOR' | 'FUNCIONÁRIO';

export interface Employee {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
  email: string;
  telefone: string;
  status: 'Ativo' | 'Inativo';
  dataAdmissao: string;
  role: UserRole;
}

export interface AppUser {
  id: number;
  nome: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface AuthUser extends AppUser {
  senha: string;
}
