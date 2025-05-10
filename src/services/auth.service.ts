import api from './api';

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
  };
  token: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/login', {
    email,
    password,
  });
  return response.data;
};

export const register = async (data: RegisterData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/auth/register', data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/auth/profile');
  return response.data;
}; 