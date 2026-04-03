export default function SettingsTab() {
  return (
    <div className="card">
      <h3>Settings</h3>
      <input type="email" placeholder="New Email" />
      <input type="password" placeholder="New Password" />
      <button>Save Changes</button>
    </div>
  );
}