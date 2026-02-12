import { useContext } from 'react';
import { Link } from 'react-router';
import styles from './NavBar.module.css';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav className={styles.container}>
            {user ? (
                <ul>
                    <li><Link to='/' >HOME</Link></li>
                    <li><Link to='/moods' >MOODS</Link></li>
                    <li><Link to='/' onClick={handleSignOut}>Sign-out</Link></li>
                </ul>
            ) : (
                <ul>
                </ul>
            )}
        </nav>
    );
};

export default NavBar;