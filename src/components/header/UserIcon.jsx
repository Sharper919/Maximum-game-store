import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

export default function UserIcon({ userName }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const role = localStorage.getItem('role');

    const firstLetter = userName ? userName.charAt(0).toUpperCase() : null;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const goTo = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('role');
        window.location.href = '/';
    };

    return (
        <div className="user-block" ref={menuRef}>
            <button
                type="button"
                className="user-avatar"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
                aria-haspopup="menu"
            >
                {firstLetter}
            </button>

            {isOpen && (
                <div className="user-menu" role="menu">
                    <button type="button" role="menuitem" onClick={() => goTo('/profile')}>
                        User Cabinet
                    </button>

                    {role === 'Admin' && (
                        <button type="button" role="menuitem" onClick={() => goTo('/admin')}>
                            Admin Panel
                        </button>
                    )}

                    <button type="button" role="menuitem" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
