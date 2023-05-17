import React, { useState } from 'react';

function Login({ onLogin }) {
  const [formValue, setFormValue] = useState({
      password: '',
      email: ''
    });
  
  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const { password, email } = formValue;
    onLogin(password, email);
  }
  
  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h2 className="auth__title">Вход</h2>
        <input 
          name="email" 
          id="email" 
          className="auth__input" 
          type="email" 
          value={formValue.email} 
          onChange={handleInputChange} 
          placeholder="Email" 
          required 
        />
        <input 
          name="password" 
          id="password" 
          className="auth__input" 
          type="password" 
          value={formValue.password} 
          onChange={handleInputChange} 
          placeholder="Пароль" 
          required 
        />
        <button className="auth__submit-button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;