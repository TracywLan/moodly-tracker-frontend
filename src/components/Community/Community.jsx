import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import * as moodService from '../../services/moodService'
import styles from './Community.module.css'

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
                        Posted by:   
                        {mood.author ? (
                        <Link to={`/users/${mood.author._id}`} className={styles.cardLink}>{mood.author.username}</Link>
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