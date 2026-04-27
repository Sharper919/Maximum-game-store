import React, { useState } from 'react';
import '../../css/user_profile/UserProfile.css';
import ProfileTab from './ProfileTab';
import GamesTab from './GamesTab';
import OrdersTab from './OrdersTab';
import SettingsTab from './SettingsTab';
// import Header from '../header/Header';

const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'my_games', label: 'My Games' },
  { key: 'orders', label: 'Orders' },
  { key: 'settings', label: 'Settings' }
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <h2>Account</h2>
        <ul>
          {tabs.map(tab => (
            <li
              key={tab.key}
              className={activeTab === tab.key ? 'active' : ''}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'my_games' && <GamesTab />}
        {activeTab === 'orders' && <OrdersTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  );
}