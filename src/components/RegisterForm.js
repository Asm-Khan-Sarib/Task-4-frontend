import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://task-4-backend-83tr.onrender.com/register', {
        name,
        email,
        password
      });

      alert(response.data.message);
      setName('');
      setEmail('');
      setPassword('');
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={name}
            onChange={e => setName(e.target.value)} required />
        </div>
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
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
      <div className="text-center mt-3">
        <span>Already have an account? </span>
        <a href="/login">Login here</a>
      </div>
    </div>
  );
}

export default RegisterForm;
