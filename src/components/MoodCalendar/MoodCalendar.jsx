import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MoodCalendar.css';

import { getEmoji } from '../../utils/moodUtils';


const MoodCalendar = ({ moods }) => {

    const getTileEmoji = ({ date, view }) => {
        if (view !== 'month') return null;

        const moodForDate = moods.find((mood) => {
            const moodDate = new Date(mood.createdAt);

            return (
                moodDate.getDate() === date.getDate() &&
                moodDate.getMonth() === date.getMonth() &&
                moodDate.getFullYear() === date.getFullYear()
            );

        });
        if(moodForDate) {
            return (
                <div className='emoji-container'>{getEmoji(moodForDate.moodLabel)}</div>
            )
        }

        return null;
    }

    return (
        <div className='calendar-container'>
            <h2>My Calendar</h2>
            <Calendar tileContent={getTileEmoji}/>
        </div>
    )
}

export default MoodCalendar;