import { useEffect,useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import * as moodService from "../../services/moodService"

const AuthorInfo = () => {
    const { userId } = useParams();
    const [moods, setMoods] = useState([]);
    const [authorName,setAuthorName]= useState("User")

  useEffect(() => {
    const fetchUserMoods = async () => {
      const data = await moodService.authorInfo(userId);
      setMoods(data);

      if(data && data.length > 0 && data[0].author?.username){
        setAuthorName(data[0].author.username);
      } else {
        setAuthorName("Unknown User")
      }
    };

    fetchUserMoods();
  }, [userId]);
  return (
     <main>
      <h1>{authorName}'s Moods Entries</h1>
       {moods.length === 0 && <p>This user has not posted any entries yet</p>}
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