'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export interface User {
  email: string;
  type: 'hospital' | 'rehab';
  name: string;
  role: string;
  loggedIn: boolean;
  timestamp: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app load
    const storedUser = localStorage.getItem('openBedUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        
        // Check if session is expired (24 hours)
        const loginTime = new Date(userData.timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - loginTime.getTime()) / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
          localStorage.removeItem('openBedUser');
          setUser(null);
        } else {
          setUser(userData);
        }
      } catch (error) {
        localStorage.removeItem('openBedUser');
        setUser(null);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check credentials
        if ((email === 'hospital-admin@openbed.com' || email === 'rehab-admin@openbed.com') && password === 'admin123') {
          const userType = email.includes('hospital') ? 'hospital' : 'rehab';
          const userData: User = {
            email: email,
            type: userType,
            name: userType === 'hospital' ? 'Sarah Johnson' : 'Michael Davis',
            role: userType === 'hospital' ? 'Hospital Administrator' : 'Rehabilitation Director',
            loggedIn: true,
            timestamp: new Date().toISOString()
          };
          
          localStorage.setItem('openBedUser', JSON.stringify(userData));
          setUser(userData);
          resolve({ success: true });
        } else {
          resolve({ success: false, error: 'Invalid email or password. Please try again.' });
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('openBedUser');
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 