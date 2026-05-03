export default function UsersTab({ users, onBlock, disabled }) {
  if (users.length === 0) {
    return <div className="admin-message">No users found.</div>;
  }

  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Created</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.userName}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{formatDate(user.createdAt)}</td>
            <td>
              <button
                className="danger"
                onClick={() => onBlock(user.id)}
                disabled={disabled || user.role === 'Admin'}
              >
                Block
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function formatDate(date) {
  return date ? new Date(date).toLocaleDateString() : '-';
}
