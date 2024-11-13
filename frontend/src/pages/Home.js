import React from 'react';
import useWeb3 from '../hooks/useWeb3';
import { toast } from 'react-toastify';

const Home = () => {
  const { account, connectWallet } = useWeb3();

  const handleConnect = () => {
    connectWallet().then(() => {
      toast.success("Wallet connected!");
    }).catch((error) => {
      toast.error("Failed to connect wallet.");
    });
  };

  return (
    <div>
      <h1>Welcome to Palace of Goods</h1>
      {account ? (
        <p>Connected Wallet: {account}</p>
      ) : (
        <button onClick={handleConnect}>Connect Wallet</button>
      )}
    </div>
  );
};

export default Home;
