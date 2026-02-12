import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
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
        // 👇 CHECK THIS: Does this className match your CSS?
        <div className="stats-container">
            
            {/* Header Section */}
            <div className="stats-header">
                <div>
                    <h3>Satisfaction</h3>
                    <p className="stats-subtitle">Based on daily mood log</p>
                </div>
                {/* Visual Toggle Button */}
                <div className="stats-toggle">
                    <button className="toggle-btn">W</button>
                    <button className="toggle-btn active">M</button>
                </div>
            </div>

            {/* Chart Section */}
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, bottom: 0 }}>
                        <XAxis dataKey="name" hide />
                        <Tooltip 
                            cursor={{ fill: 'transparent' }}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar 
                            dataKey="count" 
                            barSize={40} 
                            radius={[20, 20, 20, 20]} /* 👈 This makes them pill-shaped (JS, not CSS!) */
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            {/* Puts the white number inside the bar */}
                            <LabelList dataKey="count" position="center" fill="white" fontWeight="bold" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Custom Legend Section */}
            <div className="custom-legend">
                {chartData.map((item) => (
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