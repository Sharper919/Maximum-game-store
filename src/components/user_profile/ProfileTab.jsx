export default function ProfileTab() {
    return (
        <div className="card">
            <div className="avatar">
                <img src="https://placehold.co/100" alt="avatar" />
            </div>
            <div className="user-info">
                <h3>Username</h3>
                <p>Email: user@email.com</p>
                <button>Edit Profile</button>
            </div>
        </div>
    );
}
