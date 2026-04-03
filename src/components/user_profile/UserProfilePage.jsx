import React, { useState } from 'react';
import '../../css/user_profile/UserProfile.css';
import ProfileTab from './ProfileTab';
import GamesTab from './GamesTab';
import OrdersTab from './OrdersTab';
import SettingsTab from './SettingsTab';
// import Header from '../header/Header';

const tabs = ['Profile', 'My Games', 'Orders', 'Settings'];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('Profile');

  return (
    <div className="profile-container">
      <aside className="sidebar">
        <h2>Account</h2>
        <ul>
          {tabs.map(tab => (
            <li
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </aside>

      <main className="content">
        {activeTab === 'Profile' && <ProfileTab />}
        {activeTab === 'My Games' && <GamesTab />}
        {activeTab === 'Orders' && <OrdersTab />}
        {activeTab === 'Settings' && <SettingsTab />}
      </main>
    </div>
  );
}