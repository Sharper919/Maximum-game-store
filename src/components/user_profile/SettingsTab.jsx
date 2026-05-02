export default function SettingsTab() {
  return (
    <div className="settings-container">
      <div className="settings">
        <h3>Change Email</h3>
        <input type="email" placeholder="New Email" />
        <button>Save Changes</button>
      </div>
      <div className="settings">
        <h3>Change Password</h3>
        <input type="password" placeholder="Current Password" />
        <input type="password" placeholder="New Password" />
        <button>Save Changes</button>
      </div>
    </div>
  );
}