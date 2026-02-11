import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './MoodCalendar.css';


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
            return `mood-{moodForDate.rating}`;
        }

        return null;
    }

    return (
        <div className='calendar-container'>
            <Calendar tileEmoji={getTileEmoji}/>
        </div>
    )
}

export default MoodCalendar;