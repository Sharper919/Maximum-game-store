import { useNavigate } from 'react-router-dom';

export default function UserIcon({ userName }) {
    const navigate = useNavigate()

    const firstLetter = userName ? userName.charAt(0).toUpperCase() : null;

    const handleClick = () => {
        navigate('/profile');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.href = '/';
    };

    return (
        <div className="user-block">
            <div className="user-avatar" onClick={handleClick}>
                {firstLetter}
            </div>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}