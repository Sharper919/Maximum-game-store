import { useState } from 'react';
import { apiFetch } from '../../api/client';

export default function SettingsTab({ user, onUserNameUpdated, onDeleted }) {
  const [newUserName, setNewUserName] = useState(user?.userName || '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const saveUserName = async () => {
    if (!newUserName.trim()) {
      setError('Username cannot be empty.');
      setMessage('');
      return;
    }

    try {
      setIsSavingName(true);
      setError('');
      const result = await apiFetch('/api/user/update/username', {
        method: 'PUT',
        body: JSON.stringify({ newUserName })
      });

      onUserNameUpdated(newUserName.trim());
      setMessage(result.message || 'Username updated.');
    } catch (err) {
      setError(err.message || 'Failed to update username');
      setMessage('');
    } finally {
      setIsSavingName(false);
    }
  };

  const savePassword = async () => {
    if (!oldPassword || !newPassword) {
      setError('Please fill in both password fields.');
      setMessage('');
      return;
    }

    try {
      setIsSavingPassword(true);
      setError('');
      const result = await apiFetch('/api/user/update/password', {
        method: 'PUT',
        body: JSON.stringify({ oldPassword, newPassword })
      });

      setOldPassword('');
      setNewPassword('');
      setMessage(result.message || 'Password updated.');
    } catch (err) {
      setError(err.message || 'Failed to update password');
      setMessage('');
    } finally {
      setIsSavingPassword(false);
    }
  };

  const deleteAccount = async () => {
    const confirmed = window.confirm('Delete your account? This action cannot be undone.');

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      await apiFetch('/api/user/delete', { method: 'PUT' });
      onDeleted();
    } catch (err) {
      setError(err.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="settings-container">
      {message && <div className="profile-success">{message}</div>}
      {error && <div className="profile-error">{error}</div>}

      <div className="settings">
        <h3>Change Username</h3>
        <input
          type="text"
          placeholder="New Username"
          value={newUserName}
          onChange={event => setNewUserName(event.target.value)}
        />
        <button onClick={saveUserName} disabled={isSavingName}>
          {isSavingName ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="settings">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={oldPassword}
          onChange={event => setOldPassword(event.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={event => setNewPassword(event.target.value)}
        />
        <button onClick={savePassword} disabled={isSavingPassword}>
          {isSavingPassword ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="settings">
        <h3>Account</h3>
        <button className="danger" onClick={deleteAccount} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  );
}
