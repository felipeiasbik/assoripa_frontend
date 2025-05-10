export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt: string;
    updatedAt: string;
  };
}

export interface DecodedToken {
  sub: string;
  email: string;
  role: 'admin' | 'user';
  iat: number;
  exp: number;
} 