import {useState, useEffect} from 'react'
import {useParams} from "react-router"
import { toast } from "react-toastify"
import * as moodService from "../../services/moodServices"


const CommentForm = (props) => {
    const [formData, setFormData] = useState ({ text: ""});
    const {moodId, commentId} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const mood = await moodService.show(moodId);
            if(mood.err) {
                return toast(mood.err)
            }

            const comment = mood.comments.find(
                (comment) => comment._id === commentId
            );
            setFormData(comment);
        };
        if(moodId && commentId) fetchData();

        return () => setFormData({ text: ""});
    }, [moodId,commentId])

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if(moodId && commentId) {
            props.handleUpdateComment(formData,commentId,moodId)
        } else {
            props.handleAddComment(formData,moodId)
        }

        setFormData({text: ""});
    };
  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="text-input">{commentId ? "Edit Comment:" : "Your Comment:"}
        </label>
        <textarea
         name="text-input" 
         id="text-input"
         value={formData.text}
         onChange={handleChange}
         required
         />
         <button type="submit">Submit Comment</button>
    </form>
  )
}

export default CommentForm