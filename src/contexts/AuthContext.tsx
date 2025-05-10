import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      const storedUser = localStorage.getItem('@Assoripa:user');
      const storedToken = localStorage.getItem('@Assoripa:token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }

      setLoading(false);
    };

    loadStoredData();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    const { user, token } = response;

    localStorage.setItem('@Assoripa:user', JSON.stringify(user));
    localStorage.setItem('@Assoripa:token', token);

    setUser(user);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await authService.register({ name, email, password });
    const { user, token } = response;

    localStorage.setItem('@Assoripa:user', JSON.stringify(user));
    localStorage.setItem('@Assoripa:token', token);

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('@Assoripa:user');
    localStorage.removeItem('@Assoripa:token');
    setUser(null);
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export default AuthContext; 