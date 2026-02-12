import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { moodLabels } from '../../utils/moodUtils';
import styles from './MoodStats.module.css'
import { getEmoji, getMoodColor } from '../../utils/moodUtils'

const MoodStats = ({ moods }) => {

    const currentMonthMoods = moods.filter(mood => {
        const moodDate = new Date(mood.createdAt);
        const now = new Date();
        return (
            moodDate.getMonth() === now.getMonth() &&
            moodDate.getFullYear() === now.getFullYear()
        );
    });

    const chartData = moodLabels.map(label => {
        const count = currentMonthMoods.filter(m => m.moodLabel === label).length;

        return {
            name: label,            
            emoji: getEmoji(label), 
            count: count,           
            fill: getMoodColor(label) 
        };
    });

    const cleanData = chartData.filter(item => item.count > 0);

    return (
        <div className={styles.container}>
            
            <div className="stats-header">
                <div>
                    <h3>Your Mood Trend</h3>
                    <p>Based on daily mood log</p>
                </div>
            </div>

            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <BarChart data={cleanData} margin={{ top: 20, bottom: 0 }}>
                        <XAxis dataKey="name" hide />
                        <Bar 
                            dataKey="count" 
                            barSize={60} 
                            radius={[20, 20, 20, 20]} 
                        >
                            {cleanData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="count" position="center" fill="white" fontWeight="bold" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>


            <div className="custom-legend">
                {cleanData.map((item) => (
                    <div key={item.name} className="legend-item">
                        <div className="legend-dot" style={{ backgroundColor: item.fill }}></div>
                        <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MoodStats;