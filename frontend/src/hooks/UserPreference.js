import React, { useState, useEffect } from "react";
import './UserPreference.css';

const UserPreference = () => {
  const [preferences, setPreferences] = useState({
    theme: "light", // 'light' or 'dark'
    emailNotifications: true,
    smsNotifications: false,
    preferredPaymentMethod: "creditCard",
  });

  // Load preferences from localStorage if available
  useEffect(() => {
    const savedPreferences = JSON.parse(localStorage.getItem('userPreferences'));
    if (savedPreferences) {
      setPreferences(savedPreferences);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
  }, [preferences]);

  // Handle change in preferences
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences({
      ...preferences,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className={`user-preference-container ${preferences.theme}`}>
      <h2>User Preferences</h2>

      <form className="user-preference-form">
        <div className="preference-section">
          <h3>Theme</h3>
          <label>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={preferences.theme === "light"}
              onChange={handlePreferenceChange}
            />
            Light
          </label>
          <label>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={preferences.theme === "dark"}
              onChange={handlePreferenceChange}
            />
            Dark
          </label>
        </div>

        <div className="preference-section">
          <h3>Notifications</h3>
          <label>
            <input
              type="checkbox"
              name="emailNotifications"
              checked={preferences.emailNotifications}
              onChange={handlePreferenceChange}
            />
            Email Notifications
          </label>
          <label>
            <input
              type="checkbox"
              name="smsNotifications"
              checked={preferences.smsNotifications}
              onChange={handlePreferenceChange}
            />
            SMS Notifications
          </label>
        </div>

        <div className="preference-section">
          <h3>Payment Method</h3>
          <label>
            <input
              type="radio"
              name="preferredPaymentMethod"
              value="creditCard"
              checked={preferences.preferredPaymentMethod === "creditCard"}
              onChange={handlePreferenceChange}
            />
            Credit Card
          </label>
          <label>
            <input
              type="radio"
              name="preferredPaymentMethod"
              value="paypal"
              checked={preferences.preferredPaymentMethod === "paypal"}
              onChange={handlePreferenceChange}
            />
            PayPal
          </label>
        </div>
      </form>
    </div>
  );
};

export default UserPreference;import React, { useState } from 'react';
import axios from 'axios';

const UserPreference = ({ userId }) => {
  const [theme, setTheme] = useState('light');

  const saveThemePreference = async () => {
    await axios.post(`/api/user/${userId}/preferences`, { theme });
  };

  return (
    <div>
      <h3>Theme Preference</h3>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <button onClick={saveThemePreference}>Save</button>
    </div>
  );
};

export default UserPreference;
