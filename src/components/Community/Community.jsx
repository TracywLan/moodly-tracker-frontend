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
                    <h3>{mood.title}</h3>
                    </Link>
                    <p>{mood.description}</p>
                    <small>Posted by: {mood.author.username}</small>
                </div>
            ))}
        </div>
    )
}

export default Community