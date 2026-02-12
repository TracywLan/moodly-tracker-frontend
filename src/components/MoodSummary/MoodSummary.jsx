import { getEmoji } from '../../utils/moodUtils';
import styles from './MoodSummary.module.css'

const MoodSummary = ({ moods}) => {
    const totalLogs = moods.length;
    const today = new Date().toDateString();
    const todaysEntry = moods.find(mood => 
        new Date(mood.createdAt).toDateString() === today
    );


    return (
        <div className={styles.card}>
            <div className={styles.totalLog}>
                <p>Total Entries</p>
                <h3>{totalLogs}</h3>
            </div>
            <div className={styles.todayEntry}>
                <div className={styles.icon}>
                    {todaysEntry ? getEmoji(todaysEntry.moodLabel) : '❤️'}
                </div>
                <div className={styles.text}>
                    {todaysEntry ? todaysEntry.moodLabel : 'Not logged yet'}
                </div>
            </div>
        </div>
    )
}

export default MoodSummary