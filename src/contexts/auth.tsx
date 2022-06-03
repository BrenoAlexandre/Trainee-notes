import React, { createContext, useContext, useEffect, useState } from 'react';
import HttpClient from '../services/httpClient';
import checkTokenIsValid from '../utils/checkTokenIsValid';
import getTokenStorage from '../utils/getTokenStorage';
import setTokenStorage from '../utils/setTokenStorage';

interface AuthContextData {
  signed: boolean;
  user: object | null;
  isValid(): boolean;
  Login(user: object): Promise<boolean>;
  Logout(): void;
}

//Criando o contexto
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Crinado o componente que retorna o Provider e suas funções
export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<object | null>(null);

  useEffect(() => {
    const storagedToken = getTokenStorage();
    console.log('auth');

    if (storagedToken) {
      HttpClient.api.defaults.headers.common.authorization = `Bearer ${storagedToken}`;
    }
  }, []);

  function isValid() {
    if (!checkTokenIsValid('authorization')) {
      return false;
    }

    return true;
  }

  async function Login(userData: object) {
    const { data, headers } = await HttpClient.api.post(
      `http://localhost:3333/api/v1/users/login`,
      userData
    );

    const token = setTokenStorage('authorization', headers.authorization);

    if (checkTokenIsValid('authorization')) {
      HttpClient.api.defaults.headers.common.authorization = token;

      localStorage.setItem('user', data);
      setUser(data);

      if (!user) return false;

      return true;
    }

    return false;
  }

  async function Logout() {
    setTokenStorage('authorization');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signed: Boolean(user), isValid, user, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook do context
export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export default AuthContext;
