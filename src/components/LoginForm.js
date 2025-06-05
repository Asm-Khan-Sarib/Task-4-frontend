import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-4-backend-83tr.onrender.com/login', {
        email,
        password,
      });
      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/admin';
    } catch (err) {
      const errorMsg =
        err.response?.data?.error || err.message || 'Something went wrong';
      alert(errorMsg);
    }
    
  };

  return (
    <div className="container mt-5"
      style={{
        backgroundColor: 'white',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: '100px'
      }}>

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email}
            onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password}
            onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <div className="text-center mt-3">
        <span>Don't have an account? </span>
        <a href="/register">Register here</a>
      </div>
    </div>
  );
}

export default LoginForm;
