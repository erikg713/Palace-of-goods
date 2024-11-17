import React, { createContext, useState } from 'react';
import Web3 from 'web3';

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
    } else {
      console.error("MetaMask not found.");
    }
  };

  return (
    <Web3Context.Provider value={{ account, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};
