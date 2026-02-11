import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getEmoji, getMoodColor } from '../../utils/moodUtils';
import './MoodStats.css';
import { moodLabels } from '../../utils/moodUtils';

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
        <div className="stats-container">
            <h3>Monthly Breakdown</h3>
            <p className="stats-subtitle">
                Total entries this month: {currentMonthMoods.length}
            </p>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={cleanData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>

                        <XAxis 
                            dataKey="emoji" 
                            tick={{ fontSize: 24 }} 
                            axisLine={false} 
                            tickLine={false} 
                            interval={0} 
                        />

                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const data = payload[0].payload;
                                    return (
                                        <div style={{ background: 'white', padding: '10px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', textTransform: 'capitalize' }}>
                                                {data.emoji} {data.name}
                                            </p>
                                            <p style={{ margin: 0 }}>Count: {data.count}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                        
                        <Bar dataKey="count" radius={[10, 10, 10, 10]} barSize={40}>
                            {
                                cleanData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MoodStats;