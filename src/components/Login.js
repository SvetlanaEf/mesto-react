import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Login({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password: pass });
  }

  return (
    <div className="login">
      <h2 className="login__heading">Вход</h2>
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
        <button className="login__form-submit" type="submit">Войти</button>
      </form>
      <p className="login__register-text">
          Ещё не зарегистрированы? <Link className="login__link" to="/sign-up">Регистрация</Link>
      </p>
    </div>
  );
}