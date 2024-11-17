import React from 'react';

const Profile = () => (
  <div className="container mt-5">
    <h2>User Profile</h2>
    <div className="row">
      <div className="col-md-6">
        <div className="mb-3">
          <label>Email Address:</label>
          <p>user@example.com</p>
        </div>
        <div className="mb-3">
          <label>Username:</label>
          <p>john_doe</p>
        </div>
        <div className="mb-3">
          <label>Account Balance:</label>
          <p>2.5 ETH</p>
        </div>
        <button className="btn btn-primary">Edit Profile</button>
      </div>
    </div>
  </div>
);

export default Profile;
