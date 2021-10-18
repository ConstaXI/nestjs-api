export interface User {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}

export enum UserRole {
  ADMIN = 'admin',
  PLAYER = 'player',
}
