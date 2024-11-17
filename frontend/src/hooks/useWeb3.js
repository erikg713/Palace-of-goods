import { useState, useEffect } from 'react';
import Web3 from 'web3';

const useWeb3 = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    } else {
      console.error("Ethereum wallet not detected");
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (web3) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return { web3, account, connectWallet };
};

export default useWeb3;
