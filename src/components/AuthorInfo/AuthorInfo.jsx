import { useEffect,useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import * as moodService from "../../services/moodService"

const AuthorInfo = () => {
      const { userId } = useParams();
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    const fetchUserMoods = async () => {
      const data = await moodService.getUserMoods(userId);
      setMoods(data);
    };

    fetchUserMoods();
  }, [userId]);
  return (
     <main>
      <h1>User's Moods Entries</h1>

      {moods.map((mood) => (
        <div key={mood._id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
          <Link to={`/moods/${mood._id}`}>
            <h3>{mood.moodLabel}</h3>
          </Link>
          <p>Rating: {mood.rating}</p>
          <p>{mood.note}</p>
        </div>
      ))}

      <Link to="/community">Back to Community</Link>
    </main>
  )
}

export default AuthorInfo