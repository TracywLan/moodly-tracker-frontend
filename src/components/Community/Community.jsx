import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import * as moodService from '../../services/moodService'


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
        <div>
            <h1>Community</h1>

            {moods.map((mood)=> (
                <div key={mood._id} className="mood-card">
                    <Link to={`/moods/${mood._id}`}>
                    <h3>{mood.moodLabel}</h3>
                    </Link>
                    <p>{mood.note}</p>
                    <small>Posted by: <Link to={`/users/${mood.author._id}`}>{mood.author.username}</Link></small>
                </div>
            ))}
        </div>
    )
}

export default Community