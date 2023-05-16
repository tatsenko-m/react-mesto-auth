import React, { useState } from 'react';

function Login() {
  return (
    <div className="auth">
      <form className="auth__form">
        <h2 className="auth__title">Вход</h2>
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
        <button className="auth__submit-button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;