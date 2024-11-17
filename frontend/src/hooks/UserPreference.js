import React, { useState } from 'react';
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
