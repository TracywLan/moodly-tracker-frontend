import { useEffect, useState } from "react";
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
                    <h3>{mood.title}</h3>
                    <p>{mood.description}</p>
                    <small>Posted by: {mood.author.username}</small>
                </div>
            ))}
        </div>
    )
}

export default Community