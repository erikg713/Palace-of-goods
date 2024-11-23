import React, { useState } from 'react';
import web3 from '../utils/web3';

const WalletConnect = () => {
  const [account, setAccount] = useState('');

  const connectWallet = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  return (
    <div>
      <button onClick={connectWallet} className="btn btn-primary">
        Connect Wallet
      </button>
      {account && <p>Connected: {account}</p>}
    </div>
  );
};

export default WalletConnect;
