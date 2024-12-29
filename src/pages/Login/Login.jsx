import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      alert('Вход выполнен успешно!');
      navigate('/profile');
    } else {
      alert('Неверный email или пароль');
    }
  };

  return (
    <div className="login">
      <h1>Вход</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Войти</button>
      </form>
      <p>
        Ещё нет аккаунта?{' '}
        <a href="/registration">Зарегистрироваться</a>
      </p>
    </div>
  );
};

export default Login;