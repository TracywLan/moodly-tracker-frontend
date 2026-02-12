import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from './MoodList.module.css';
import { getEmoji, getMoodColor } from '../../utils/moodUtils'

const MoodList = ({ moods }) => {
    const { user } = useContext(UserContext);

    const filteredMoods = moods.filter((mood) => {
        if (!mood.author) return false;
        return mood.author._id.toString() === user._id.toString();
    })
    const sortedMoods = filteredMoods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18 ) return 'Good Evening';
        return 'Good Evening';
    }
    

    return (
    <main className={styles.container}>
        
        <header className={styles.header}>
            <h1>{getGreeting()}</h1>
            <p>Don't let a bad day make you feel like you have a bad life.</p>
            
            <Link to="/moods/new" className={styles.newEntryBtn}>
            + Add New Entry
            </Link>
        </header>

        <div className={styles.cardsWrapper}>
            {sortedMoods.map((mood) => (
            <Link to={`/moods/${mood._id}`} key={mood._id} className={styles.cardLink}>
                
                <article className={styles.moodCard}>
                
                <div className={styles.dateBox}>
                    <span className={styles.dateNumber}>
                        {new Date(mood.createdAt).getDate()}
                    </span>
                    <span className={styles.dateMonth}>
                        {new Date(mood.createdAt).toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                </div>

                <div className={styles.cardContent}>
                    <div className={styles.cardTopRow}>
                        <h3>{mood.moodLabel}</h3>
                        <span className={styles.moodEmoji}>{getEmoji(mood.moodLabel)}</span>
                    </div>
                    <p className={styles.cardNote}>{mood.note}</p>
                </div>

                <div 
                    className={styles.moodIndicator} 
                    style={{ backgroundColor: getMoodColor(mood.moodLabel) }}
                ></div>

                </article>
            </Link>
            ))}
        </div>
        </main>
    );
};

export default MoodList;
