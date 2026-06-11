import { Injectable, signal } from '@angular/core';
import { AppUser, AuthUser } from '../models/employee.model';

const STORAGE_KEY = 'mock-auth-user';

const mockUsers: AuthUser[] = [
  {
    id: 1,
    nome: 'Ana Silva',
    email: 'admin@empresa.com',
    role: 'ADMINISTRADOR',
    avatar: 'AS',
    senha: '123456'
  },
  {
    id: 2,
    nome: 'Bruno Costa',
    email: 'funcionario@empresa.com',
    role: 'FUNCIONÁRIO',
    avatar: 'BC',
    senha: '123456'
  }
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<AppUser | null>(this.loadStoredUser());

  login(email: string, password: string): AppUser | null {
    const match = mockUsers.find((user) => user.email === email && user.senha === password);

    if (!match) {
      return null;
    }

    const safeUser: AppUser = {
      id: match.id,
      nome: match.nome,
      email: match.email,
      role: match.role,
      avatar: match.avatar
    };

    this.currentUser.set(safeUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  }

  logout(): void {
    this.currentUser.set(null);
    sessionStorage.removeItem(STORAGE_KEY);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): AppUser | null {
    return this.currentUser();
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.role === role;
  }

  private loadStoredUser(): AppUser | null {
    if (typeof window === 'undefined') {
      return null;
    }

    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AppUser) : null;
  }
}
