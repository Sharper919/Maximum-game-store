export default function UsersTab() {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>user1</td>
          <td>user@mail.com</td>
          <td>User</td>
          <td><button>Block</button></td>
        </tr>
      </tbody>
    </table>
  );
}