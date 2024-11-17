import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="col-md-6 mx-auto">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email address</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;import React from 'react';

const Login = () => (
  <div>
    <h1>Login</h1>
    <form>
      <div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" className="form-control" />
      </div>
      <button className="btn btn-primary">Login</button>
    </form>
  </div>
);

export default Login;
