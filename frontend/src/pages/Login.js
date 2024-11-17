import React from 'react';

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
