import { Link } from 'react-router';

const MoodList = (props) => {
    return (
        <main>
            {props.moods.map((mood) => (
                <div key={mood._id}>
                    <Link to={`/moods/${mood._id}`}>
                        <article>
                            <header>
                                <h2>{mood.rating}</h2>
                                <p>{`${new Date(mood.createdAt).toLocaleDateString()}`}</p>
                            </header>
                        </article>
                    </Link>
                    <p key={mood._id}>{mood.moodLabel}</p>
                </div>
            ))}
        </main>
    )

};

export default MoodList;