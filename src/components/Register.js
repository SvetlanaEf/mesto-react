import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Register({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password: pass });
  }

  return (
    <div className="login">
      <h2 className="login__heading">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__form-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={({target: {value}}) => setEmail(value)}
          required
          minLength={2}
          autoFocus
        />
        <input
          className="login__form-field"
          type="password"
          placeholder="Пароль"
          value={pass}
          onChange={({target: {value}}) => setPass(value)}
          required
          minLength={2}
        />
        <button className="login__form-submit" type="submit">Зарегистрироваться</button>
      </form>
      <p className="login__register-text">
        Уже зарегистрированы? <Link className="login__link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}