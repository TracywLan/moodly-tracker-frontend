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
            <div className={styles.logo}>
                {/* <img src="/logo1.png" alt="Moodly logo" /> */}
                <h1>Moodly</h1>
            </div>

            <div className={styles.content}>
                {user ? (
                <ul>
                    <li><Link to='/' >HOME</Link></li>
                    <li><Link to="/community"/>COMMUNITY</li>
                    <li><Link to='/moods' >YOUR MOODS</Link></li>
                    {/* <li><Link to='/calendar'>Calendar</Link></li> */}
                    <li><Link to='/' onClick={handleSignOut}>Sign-out</Link></li>
                </ul>
            ) : (
                <ul>
                </ul>
            )}
            </div>
            
        </nav>
    );
};

export default NavBar;