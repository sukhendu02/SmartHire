import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'company' | 'hr';
  companyId?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'candidate' | 'company') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'candidate' | 'company') => {
    // Mock login - in real app, this would make API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'candidate' ? 'John Doe' : 'TechCorp Inc.',
      email,
      role,
      companyId: role === 'company' ? 'comp_123' : undefined,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};