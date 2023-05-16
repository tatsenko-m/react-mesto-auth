import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="auth">
      <form className="auth__form">
        <h2 className="auth__title">Регистрация</h2>
        <input 
          name="email" 
          id="email" 
          className="auth__input" 
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          name="password" 
          id="password" 
          className="auth__input" 
          type="password" 
          placeholder="Пароль" 
          required 
        />
        <button className="auth__submit-button" type="submit">Зарегистрироваться</button>
        <Link to="/sign-in" className="auth__link">Уже зарегистрированы? Войти</Link>
      </form>
    </div>
  );
}

export default Register;