import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/user_profile/UserProfile.css';
import ProfileTab from './ProfileTab';
import GamesTab from './GamesTab';
import OrdersTab from './OrdersTab';
import SettingsTab from './SettingsTab';
import Header from '../header/Header';
import { apiFetch, isAuthenticated } from '../../api/client';

const tabs = [
  { key: 'profile', label: 'Profile' },
  { key: 'my_games', label: 'My Games' },
  { key: 'orders', label: 'Orders' },
  { key: 'settings', label: 'Settings' }
];

export default function UserProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadUser = useCallback(async () => {
    if (!isAuthenticated()) {
      navigate('/signin');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const data = await apiFetch('/api/user/home');
      setUser(data);
    } catch (err) {
      if (err.status === 401) {
        navigate('/signin');
        return;
      }

      setError(err.message || 'Failed to load profile');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const handleUserNameUpdated = (newUserName) => {
    setUser(prev => prev ? { ...prev, userName: newUserName } : prev);
    localStorage.setItem('userName', newUserName);
  };

  const handleAccountDeleted = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div>
      <Header />
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
            <button className="back-to-store-btn" onClick={() => navigate('/')}>
              Back to Store
            </button>
            {user?.role === 'Admin' && (
              <button className="back-to-store-btn" onClick={() => navigate('/admin')}>
                Admin Panel
              </button>
            )}
          </ul>
        </aside>

        <main className="content">
          {isLoading && <div className="profile-message">Loading...</div>}
          {error && <div className="profile-error">{error}</div>}

          {!isLoading && !error && activeTab === 'profile' && (
            <ProfileTab
              user={user}
              onEdit={() => setActiveTab('settings')}
              onDeleted={handleAccountDeleted}
            />
          )}
          {!isLoading && !error && activeTab === 'my_games' && <GamesTab />}
          {!isLoading && !error && activeTab === 'orders' && <OrdersTab />}
          {!isLoading && !error && activeTab === 'settings' && (
            <SettingsTab
              user={user}
              onUserNameUpdated={handleUserNameUpdated}
              onDeleted={handleAccountDeleted}
            />
          )}
        </main>
      </div>
    </div>
  );
}
