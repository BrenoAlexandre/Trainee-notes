import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import { LoginPage } from './Pages/Login';
import { SignUpPage } from './Pages/SignUp';

export const AppRouter = () => (
  <Routes>
    {/* <Route path='/login' element={<LoginPage />} /> */}
    // <Route path='/signup' element={<SignUpPage />} />
    <Route path='/' element={<Home />} />
  </Routes>
);
