import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const MoodList = ({ moods }) => {
  const { user } = useContext(UserContext);

    const filteredMoods = moods.filter((mood) => {
        if (!mood.author) return false;
        return mood.author?._id?.toString() === user?._id?.toString();
    })
    const sortMoods = filteredMoods.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour < 12) return 'Good Morning';
        if (hour < 18 ) return 'Good Evening';
        return 'Good Evening';
    }
    

    return (
        <main>
            <h1>
                {getGreeting()}!
            </h1>
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
