import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { useContext } from 'react';


const MoodList = (props) => {
    const { user } = useContext(UserContext)

    const filteredMoods = props.moods.filter(mood => {
        if (!mood.author) return false;

        return mood.author?._id?.toString() === user?._id?.toString();
    })
    const sortMoods = filteredMoods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    

    return (
        <main>
            <h1>Your Mood Entries</h1>
            <Link to ="/moods/new" className="new-mood-btn">+ Add New Entry</Link>
            {sortMoods.map((mood) => (
                <div key={mood._id}>
                    <Link to={`/moods/${mood._id}`}>
                        <article>
                            <header className="mood-list-header">
                                <h2>{mood.rating}</h2>
                                <p>{`${new Date(mood.createdAt).toLocaleDateString()}`}</p>
                            </header>
                        </article>
                    </Link>
                    <div>
                        <p>{mood.moodLabel}</p>
                        <p>{mood.note}</p>
                    </div>
                </div>
            ))}
        </main>
    )
};

export default MoodList;