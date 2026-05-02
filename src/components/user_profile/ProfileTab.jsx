export default function ProfileTab() {
    return (
        <div className="profile-card">
            <div className="avatar">
                <img src="https://placehold.co/100" alt="avatar" />
            </div>

            <div className="user-info">
                <h3>Username</h3>
                <p>Email: user@email.com</p>
                <p>Member since: 12.09.2023</p>

                <div className="actions">
                    <button>Edit Profile</button>
                    <button className="danger">Delete Account</button>
                </div>
            </div>
        </div>
    );
}