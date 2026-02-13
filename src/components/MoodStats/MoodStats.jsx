import { BarChart, Bar, XAxis, ResponsiveContainer} from 'recharts';
import styles from './MoodStats.module.css'
import { moodLabels, getEmoji } from '../../utils/moodUtils';

const MoodStats = ({ moods }) => {
    if(!moods) return null;

    const currentMonthMoods = moods.filter(mood => {
        const moodDate = new Date(mood.createdAt);
        const now = new Date();
        return (
            moodDate.getMonth() === now.getMonth() &&
            moodDate.getFullYear() === now.getFullYear()
        );
    });

    const data = moodLabels.map(label => {
        const count = currentMonthMoods.filter(m => m.moodLabel === label).length;

        return {
            name: label,            
            count: count,
            emoji:getEmoji(label)           
        };
    });

    if (data.length === 0) {
        return (
            <div className={styles.container}>
                <p>No mood data for this month yet.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Your Mood Trend</h3>
                <p>Based on daily mood log</p>
            </div>

            <div className={styles.chartContainer}>
                <ResponsiveContainer>
                    <BarChart data={data} margin={{ top: 20, bottom: 0 }}>
                        <XAxis dataKey="name" hide />
                        <Bar 
                            dataKey="count" 
                            fill='#FF80AB'
                            barSize={60} 
                            radius={[20, 20, 20, 20]} 
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* legend */}
            <div className={styles.legend}>
                {data.map((item) => (
                    <div key={item.name} className={styles.legendItem}>
                        <span className={styles.emoji}>{item.emoji}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodStats;