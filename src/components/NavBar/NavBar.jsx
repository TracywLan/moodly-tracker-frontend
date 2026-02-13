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
            <div className={styles.logoContainer}>
                <div className={styles.logo}></div>
                <div>
                    <h1>Moodly</h1>
                </div>
            </div>
            <div className={styles.content}>
                {user ? (
                <ul>
                    <li><Link to='/' >HOME</Link></li>
                    <li><Link to='/community'>COMMUNITY</Link></li>
                    <li><Link to='/moods'>YOUR MOODS</Link></li>
                    <li><Link to='/' onClick={handleSignOut}>Sign-out</Link></li>
                </ul>
            ) : (
                <ul>
                    <li><Link to='/' >HOME</Link></li>
                    <li><Link to='/sign-in' >Sign In</Link></li>
                    <li><Link to='/sign-up'>Sign Up</Link></li>
                </ul>
            )}
            </div>
            
        </nav>
    );
};

export default NavBar;