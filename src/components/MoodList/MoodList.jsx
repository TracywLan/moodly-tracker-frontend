import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const MoodList = ({ moods }) => {
  const { user } = useContext(UserContext);

    const filteredMoods = moods.filter((mood) => {
        if (!mood.author) return false;
        return mood.author?._id?.toString() === user?._id?.toString();
    });

    const sortedMoods = filteredMoods.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

  return (
    <main>
      <h1>Your Mood Entries</h1>
      <Link to="/moods/new" className="new-mood-btn">
        + Add New Entry
      </Link>

      {sortedMoods.map((mood) => {

        return (
          <div key={mood._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
            <Link to={`/moods/${mood._id}`}>
              <header className="mood-list-header">
                <h2>{mood.rating}</h2>
                <p>{new Date(mood.createdAt).toLocaleDateString()}</p>
              </header>
              <div>
                <p>{mood.moodLabel}</p>
                <p>{mood.note}</p>
              </div>
            </Link>


          </div>
        );
      })}
    </main>
  );
};

export default MoodList;
