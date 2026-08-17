export type UserRole = 'STUDENT' | 'ADMIN';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  avatarInitial: string;
  role: UserRole;
}

export interface AuthResult {
  token: string;
  user: AuthUser;
}
