import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmation: '',
  });

  // const navigate = useNavigate();

  const validate = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'username':
        if (value.trim() === '') {
          setError({ ...error, username: 'Name is required' });
        } else {
          setError({ ...error, username: '' });
        }
        break;
      case 'email':
        if (value.trim() === '') {
          setError({ ...error, email: 'Email is required' });
        } else {
          setError({ ...error, email: '' });
        }
        break;
      case 'password':
        if (value.trim() === '') {
          setError({ ...error, password: 'Password is required' });
        } else {
          setError({ ...error, password: '' });
        }
        break;
      case 'confirmation':
        if (value.trim() === '') {
          setError({ ...error, confirmation: 'Password confirmation is required' });
        } else if (value.trim() !== password) {
          setError({ ...error, confirmation: `Your password doesn't match` });
        } else {
          setError({ ...error, confirmation: '' });
        }
        break;
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // axios
    //   .post('http://localhost:3333/api/v1/users/', { name, email, password })
    //   .then((response) => {
    //     console.log(response);
    //     navigate('/login', { replace: true });
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data);
    //     // Not a valid email
    //     // Email has already been registered
    //     // Password too short - should be 6 chars minimum
    //     //? minLength={6} muito simples
    //   });
  };

  return (
    <div>
      Preencha seus dados de registro
      <form method='post' onSubmit={(e) => submitHandler(e)}>
        <input
          type='text'
          name='username'
          placeholder='Nome'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          required
          onBlur={(e) => {
            validate(e);
          }}
        />
        {error.username && <span>{error.username}</span>}

        <input
          type='email'
          name='email'
          placeholder='E-mail'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          onBlur={(e) => {
            validate(e);
          }}
        />
        {error.email && <span>{error.email}</span>}
        <input
          type='password'
          name='password'
          placeholder='Senha'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          minLength={6}
          required
          onBlur={(e) => {
            validate(e);
          }}
        />
        {error.password && <span>{error.password}</span>}
        <input
          type='password'
          name='confirmation'
          placeholder='Confirmar senha'
          value={confirmation}
          onChange={(e) => {
            setConfirmation(e.target.value);
          }}
          minLength={6}
          required
          onBlur={(e) => {
            validate(e);
          }}
        />
        {error.confirmation && <span>{error.confirmation}</span>}
        <button
          type='submit'
          disabled={Boolean(error.username || error.email || error.password || error.confirmation)}
        >
          Cadastrar-se
        </button>
      </form>
    </div>
  );
};
