import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { fetchUserData } from '../api'; // Axios call

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // Fetch user data from API
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    getUserData();

    // Initialize Web3 and connect to the user's wallet
    const loadBlockchainData = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        const accounts = await web3Instance.eth.requestAccounts();
        setAccount(accounts[0]);
      } else {
        console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    };
    loadBlockchainData();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {userData ? <pre>{JSON.stringify(userData, null, 2)}</pre> : <p>Loading...</p>}
      <h2>Connected Account: {account ? account : 'Not connected'}</h2>
    </div>
  );
};

export default Profile;
