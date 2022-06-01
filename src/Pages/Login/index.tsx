import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  // const navigate = useNavigate();

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

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // axios
    //   .post('http://localhost:3333/api/v1/users/login', { email, password })
    //   .then((response) => {
    //     setError({ email: '', password: '' });

    //     navigate('/', { replace: true });
    //   })
    //   .catch((error) => {
    //     setError({ email: '', password: 'Email ou Senha inválidos' });
    //   });
  };

  return (
    <div>
      Hello login
      <form method='post' onSubmit={(e) => submitHandler(e)}>
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
