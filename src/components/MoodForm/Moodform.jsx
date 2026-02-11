import { useState, useEffect } from "react"
import {useNavigate, useParams} from "react-router-dom"
import * as moodService from "../../services/moodService"
import {toast} from "react-toastify";
import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const initialState = {
    rating: 3,
    moodLabel: "neutral",
    activities: [],
    note: "",
};

const MoodForm = ({ handleAddMood, handleEditMood }) => {
    const { user } = useContext(UserContext);
    const [formData,setFormData] = useState(initialState)
    const { moodId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMood = async () => {
            const moodData = await moodService.show(moodId);
            if(moodData.error) {
                return toast(moodData.error) 
            }
            setFormData(moodData)
        };
        if(moodId) fetchMood();

        return() => setFormData(initialState);
    }, [moodId]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if(type === "number") {
            setFormData({...formData, [name]: Number(value)})
        } else {
            setFormData({ ...formData,[name]: value})
        }
    };

    const handleActivityChange = (e) => {
        const {value} = e.target;

        setFormData((prev)=>({
            ...prev,
            activities:prev.activities.includes(value)
            ? prev.activities.filter((a) => a !== value)
            : [...prev.activities,value],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(moodId) {
            await handleEditMood(moodId, formData);
        } else {
            await  handleAddMood(formData);
        }

        setFormData(initialState);
        navigate('/moods')
    };

    return (
        <main>
            <h1>Dear {user.username}</h1>
            <h1>How are you feeling today?</h1>
            <h1>{moodId ? "Edit Mood" : "New Mood"}</h1>
            <form onSubmit={handleSubmit}>{/*Rating*/}
                <label htmlFor="rating-input">Rating (1-5)</label>
                <input 
                type= "number"
                id="rating-input"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                required
                 />

                 {/*Mood Label*/}
                 <label htmlFor="moodLabel">Mood</label>
                 <select 
                 name="moodLabel"
                 id="moodLabel"
                 value={formData.moodLabel}
                 onChange={handleChange}
                 >
                    <option value="very-sad">Very Sad</option>
                    <option value="sad">Sad</option>
                    <option value="neutral">Neutral</option>
                    <option value="happy">Happy</option>
                    <option value="very-happy">Very Happy</option>
                    <option value="anxious">Anxious</option>
                    <option value="angry">Angry</option>
                    <option value="excited">Excited</option>
                    <option value="tired">Tired</option>
                    <option value="calm">Calm</option>
                 </select>

                 {/* Activities */}
                 <fieldset>
                    <legend>Activities</legend>

                    {[
                        "work",
                        "school",
                        "friends",
                        "family",
                        "hobby",
                        "social event",
                        "food",
                        "health",
                        "other",
                    ].map((activity) => (
                        <label key ={activity}>
                            <input 
                            type="checkbox"
                            value={activity}
                            checked={formData.activities.includes(activity)}
                            onChange={handleActivityChange}
                             />
                             {activity}
                        </label>
                    ))}
                 </fieldset>
                 {/* Note */}
                 <label htmlFor="note">Note:</label>
                 <textarea 
                 name="note" 
                 id="note"
                 value= {formData.note}
                 onChange={handleChange}
                 />
                 <button type="submit">Submit</button>
            </form>
        </main>
    )
}
export default MoodForm