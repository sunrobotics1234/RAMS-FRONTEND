import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  role: 'superadmin' | 'captain' | 'chef' | 'waiter';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Super admin credentials (case-insensitive email)
    if (email.toLowerCase() === 'superadmin@coffeeconcept' && password === 'Coffeeconcept') {
      const superAdmin: User = {
        email: 'superadmin@Coffeeconcept',
        role: 'superadmin',
        name: 'Super Admin'
      };
      setUser(superAdmin);
      localStorage.setItem('auth_user', JSON.stringify(superAdmin));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
