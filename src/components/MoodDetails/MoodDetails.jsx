import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function MoodDetails({ user,moods,setMoods }) {
const { moodId } = useParams()
const navigate = useNavigate()

const [mood, setMood] = useState(null)
const [error, setError] = useState("")
const BASE_URL = "http://localhost:3000/moods"


useEffect(() => {
const fetchMood = async () => {
try {
const res = await fetch(`${BASE_URL}/${moodId}`)
const data = await res.json()
setMood(data)
} catch (err) {
console.log(err)
setError("Could not load mood.")
}
}
fetchMood()
}, [moodId])


const handleDelete = async () => {
try {
    await fetch(`${BASE_URL}/${moodId}`, {
    method: "DELETE",
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
}
})
setMoods(moods.filter((mood)=> mood._id !==moodId))
navigate("/moods")
} catch (err) {
console.log(err)
setError("Could not delete mood.")
}
}

if (error) return <p>{error}</p>
if (!mood) return <p>Loading...</p>


const authorId =
typeof mood.author === "string"
? mood.author
: mood.author?._id

const isAuthor = user?._id === authorId

return (
<main>
    <div className="card">

<h1>Mood Details</h1>
</div>

<section className="card">

{/* Rating */}
<p>
<strong>Rating:</strong> {mood.rating} / 5
</p>

{/* Mood Label */}
<p>
<strong>Mood:</strong> {mood.moodLabel}
</p>

{/* Activities */}
<div>
<strong>Activities:</strong>
{mood.activities?.length ? (
<ul>
{mood.activities.map((act, i) => (
<li key={i}>{act}</li>
))}
</ul>
) : (
<p>None selected</p>
)}
</div>

{/* Note */}
<p>
<strong>Note:</strong> {mood.note || "No note added"}
</p>

{/* Date */}
{mood.createdAt && (
<p>
<strong>Date:</strong>{" "}
{new Date(mood.createdAt).toLocaleString()}
</p>
)}

{/* ACTION BUTTONS */}
<div className="actions">
<Link className="btn" to="/moods">
Back
</Link>

{isAuthor && (
<>
<Link
className="btn btnPrimary"
to={`/moods/${moodId}/edit`}
>
Edit
</Link>

<button
className="btn btnDanger"
onClick={handleDelete}
>
Delete
</button>
</>
)}
</div>
</section>

</main>
)
}
