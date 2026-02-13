import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import * as moodService from '../../services/moodService'
import styles from './Community.module.css'
import ProfileIcon from '../../assets/profile.png';

const Community = () => {
    const [moods,setMoods] = useState([]);

    useEffect(() => {
        const fetchMoods = async () => {
            const data = await moodService.getCommunityMoods();
            setMoods(data)
        };

        fetchMoods();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Community</h1>
            <div className={styles.cardsWrapper}>
                {moods.map((mood)=> (
                <div key={mood._id} className={styles.moodCard}>
                    <Link to={`/moods/${mood._id}`} className={styles.cardLink}>
                    <h3>{mood.moodLabel}</h3>
                    </Link>
                    <p className={styles.cardNote}>{mood.note}</p>
                    <small className={styles.userBox}>
                        <p>Posted by:</p>   
                        {mood.author ? (
                            <div className={styles.userContent}>
                            <Link to={`/users/${mood.author._id}`} className={styles.cardLink}>
                                <img src={ProfileIcon} alt="The user's avatar" />
                                {mood.author.username}
                            </Link>
                            </div>
                        ) : (
                            <span>Unknown User</span>
                        )}
                    </small>
                </div>
            ))}
            </div>
            
        </div>
    )
}

export default Community