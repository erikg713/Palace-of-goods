import React, { useState } from 'react';
import axios from 'axios';

function Onboarding() {
    const [walletAddress, setWalletAddress] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/create_account', { wallet_address: walletAddress });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Error: " + error.response.data.error);
        }
    };

    return (
        <div>
            <h1>Onboarding</h1>
            <input 
                type="text"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                placeholder="Enter your wallet address"
            />
            <button onClick={handleSubmit}>Create Account</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Onboarding;