import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './contexts/auth';
import Home from './Pages/Home/Home';
import { LoginPage } from './Pages/Login';
import { SignUpPage } from './Pages/SignUp';

export const AppRouter = () => {
  const { signed } = useAuth();

  return (
    <Routes>
      {/* <Route path='*' element={<p>404</p>} /> */}
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignUpPage />} />
      <Route path='/' element={signed ? <Home /> : Navigate({ to: '/login', replace: true })} />
    </Routes>
  );
};
