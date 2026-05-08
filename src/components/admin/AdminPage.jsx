import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/admin/AdminPage.css';
import DashboardTab from './DashboardTab';
import UsersTab from './UsersTab';
import GamesTab from './GamesTab';
import OrdersTab from './OrdersTab';
import Header from '../header/Header';
import { apiFetch, isAuthenticated } from '../../api/client';

const tabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'users', label: 'Users' },
  { key: 'games', label: 'Games' },
  { key: 'orders', label: 'Orders' }
];

export default function AdminPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const loadAdminData = useCallback(async () => {
    if (!isAuthenticated()) {
      navigate('/signin');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const [usersData, gamesData, ordersData] = await Promise.all([
        apiFetch('/api/admin/users'),
        apiFetch('/api/admin/games'),
        apiFetch('/api/orders')
      ]);

      setUsers(usersData || []);
      setGames(gamesData || []);
      setOrders(ordersData || []);
    } catch (err) {
      if (err.status === 401) {
        navigate('/signin');
        return;
      }

      setError(err.status === 403 ? 'Admin access required.' : err.message || 'Failed to load admin data');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadAdminData();
  }, [loadAdminData]);

  const blockUser = async (userId) => {
    const confirmed = window.confirm('Block this user?');

    if (!confirmed) {
      return;
    }

    try {
      setIsUpdating(true);
      setError('');
      await apiFetch(`/api/admin/users/${userId}/block`, { method: 'PUT' });
      setUsers(prev => prev.filter(user => user.id !== userId));
      setMessage('User blocked.');
    } catch (err) {
      setError(err.message || 'Failed to block user');
      setMessage('');
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteGame = async (gameId) => {
    const confirmed = window.confirm('Delete this game?');

    if (!confirmed) {
      return;
    }

    try {
      setIsUpdating(true);
      setError('');
      await apiFetch(`/api/admin/games/${gameId}/delete`, { method: 'PUT' });
      setGames(prev => prev.filter(game => game.id !== gameId));
      setMessage('Game deleted.');
    } catch (err) {
      setError(err.message || 'Failed to delete game');
      setMessage('');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Header showButtons={false} />
      <div className="admin-container">
        <aside className="sidebar">
          <h2>Admin Panel</h2>
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
            <button className="admin-sidebar-btn" onClick={() => navigate('/profile')}>
              Back to Profile
            </button>
          </ul>
        </aside>

        <main className="admin-content">
          {isLoading && <div className="admin-message">Loading...</div>}
          {message && <div className="admin-success">{message}</div>}
          {error && <div className="admin-error">{error}</div>}

          {!isLoading && !error && activeTab === 'dashboard' && (
            <DashboardTab users={users} games={games} orders={orders} />
          )}
          {!isLoading && !error && activeTab === 'users' && (
            <UsersTab users={users} onBlock={blockUser} disabled={isUpdating} />
          )}
          {!isLoading && !error && activeTab === 'games' && (
            <GamesTab
              games={games}
              onAdd={() => navigate('/admin/games/create')}
              onDelete={deleteGame}
              disabled={isUpdating}
            />
          )}
          {!isLoading && !error && activeTab === 'orders' && <OrdersTab orders={orders} />}
        </main>
      </div>
    </>
  );
}
