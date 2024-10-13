import React, { useState, useEffect } from 'react';
import { fetchUserData } from '../api';  // Using Axios to fetch data

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    getUserData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Profile;
