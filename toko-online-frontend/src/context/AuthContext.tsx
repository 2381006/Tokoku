import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userId: number | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('userId');
    if (token && id) {
      setIsLoggedIn(true);
      setUserId(Number(id));
    }
  }, []);

  const login = (token: string) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    localStorage.setItem('token', token);
    localStorage.setItem('userId', payload.sub);
    setIsLoggedIn(true);
    setUserId(payload.sub);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
