import React, { useState } from 'react';
import '../../css/admin/AdminPage.css';
import DashboardTab from './DashboardTab';
import UsersTab from './UsersTab';
import GamesTab from './GamesTab';
import OrdersTab from './OrdersTab';

const tabs = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'users', label: 'Users' },
  { key: 'games', label: 'Games' },
  { key: 'orders', label: 'Orders' }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
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
        </ul>
      </aside>

      <main className="admin-content">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'games' && <GamesTab />}
        {activeTab === 'orders' && <OrdersTab />}
      </main>
    </div>
  );
}