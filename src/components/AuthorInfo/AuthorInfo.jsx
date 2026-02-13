import { useEffect,useState} from 'react'
import { useParams, Link } from 'react-router-dom';
import * as moodService from "../../services/moodService"
import styles from '../Community/Community.module.css'
import ProfileIcon from '../../assets/profile.png';

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
     <main className={styles.container}>
      <h1 className={styles.header}>
        <img
        src={ProfileIcon}
        alt="The user's avatar"
      />
        {authorName}
      </h1>
      <h3>Moods Entries</h3>
      <div className={styles.cardWrapper}>
          {moods.length === 0 && <p>This user has not posted any entries yet</p>}

      {moods.map((mood) => (
          <div key={mood._id} className={styles.moodCard}>
          <Link to={`/moods/${mood._id}`} className={styles.cardLink}>
            <h3>{mood.moodLabel}</h3>
          </Link>
          <p>Rating: {mood.rating}</p>
          <p>{mood.note}</p>
        </div>
      ))}
    </div>

    <div className={styles.btn}>
    <Link to="/community" className={styles.btnLink}>Back to Community</Link>
    </div>
    </main>
  )
}

export default AuthorInfo