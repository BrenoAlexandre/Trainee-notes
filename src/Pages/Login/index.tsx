import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const { Login } = useAuth();
  const navigate = useNavigate();

  const validate = ({ name, value }: { name: string; value: string }) => {
    switch (name) {
      case 'email':
        if (value.trim() === '') {
          setError({ ...error, email: 'Email is required' });
        }
        break;
      case 'password':
        if (value.trim() === '') {
          setError({ ...error, password: 'Password is required' });
        } else if (value.trim().length < 6) {
          setError({ ...error, password: 'Your Password must be 6 digits or more' });
        }
        break;
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isLogged = await Login({ email, password });

    if (isLogged) navigate('/');
  };

  return (
    <div>
      Hello login
      <form onSubmit={submitHandler}>
        <input
          type='email'
          name='email'
          value={email}
          placeholder='Insira seu email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onBlur={(e) => {
            validate(e.target);
          }}
        />
        {error.email && <span>{error.email}</span>}
        <input
          type='password'
          name='password'
          placeholder='Insira sua senha'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          minLength={6}
        />
        {(error.password || error.email) && <span>{error.password}</span>}
        <button type='submit'>Fazer login</button>
      </form>
    </div>
  );
};
