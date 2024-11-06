import React from 'react';

const Profile = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Display order history if available */}
    </div>
  );
};

export default Profile;
