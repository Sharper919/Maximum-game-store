import { useState } from 'react';
import { apiFetch } from '../../api/client';

export default function ProfileTab({ user, onEdit, onDeleted }) {
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm('Delete your account? This action cannot be undone.');

        if (!confirmed) {
            return;
        }

        try {
            setIsDeleting(true);
            setError('');
            await apiFetch('/api/user/delete', { method: 'PUT' });
            onDeleted();
        } catch (err) {
            setError(err.message || 'Failed to delete account');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            {error && <div className="profile-error">{error}</div>}
            <div className="profile-card">
                <div className="avatar">
                    <div className="avatar-placeholder">
                        {getInitial(user?.userName)}
                    </div>
                </div>

                <div className="user-info">
                    <h3>{user?.userName || 'User'}</h3>
                    <p>Email: {user?.email || '-'}</p>
                    <p>Member since: {formatDate(user?.createdAt)}</p>

                    <div className="actions">
                        <button onClick={onEdit}>Edit Profile</button>
                        <button className="danger" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : 'Delete Account'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function getInitial(userName) {
    return userName?.trim()?.[0]?.toUpperCase() || 'U';
}

function formatDate(date) {
    if (!date) {
        return '-';
    }

    return new Date(date).toLocaleDateString();
}
