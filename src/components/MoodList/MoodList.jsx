import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
// import './MoodList.css';

const MoodList = ({ moods }) => {
    const { user } = useContext(UserContext);

    const filteredMoods = moods.filter((mood) => {
        if (!mood.author) return false;
        return mood.author?._id?.toString() === user?._id?.toString();
    });

    const sortedMoods = filteredMoods.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18 ) return 'Good Evening';
        return 'Good Evening';
    }
    

    return (
        <main>
            <h1>
                {getGreeting()}, {user?.username}!
            </h1>
            <Link to ="/moods/new" className="new-mood-btn">+ Add New Entry</Link>
            {sortedMoods.map((mood) => (
                <div key={mood._id}>
                    <Link to={`/moods/${mood._id}`}>
                        <article>
                            <header className="mood-list-header">
                                <h2>{mood.moodLabel}</h2>
                                <p>{`${new Date(mood.createdAt).toLocaleDateString()}`}</p>
                            </header>

                            <div className="mood-details">
                                <p>{mood.rating}</p>
                                <p>{mood.note}</p>
                            </div>
                        </article>
                    </Link>
                </div>
            ))}
        </main>
    )
};

export default MoodList;
