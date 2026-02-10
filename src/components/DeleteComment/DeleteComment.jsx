import {useState, useEffect} from 'react'
import {useParams} from "react-router"
import * as moodService from "../../services/moodServices";

export default function DeleteComment({
    moodId,            
    commentId,
    isOwner,
    token,
    onDeleted,
    handleDelete

}) {
    const [error, setError] = useState("");
    if (!isOwner) return null;

    const handleDelete = async () => { setError("")

        const ok = window.confirm("Are you sure you want to delete this comment?");
        if (!ok) return;

        try {
            const res = await fetch(`${moodService.BASE_URL}/${moodId}/comments/${commentId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.err || "Could not delete comment.");
            }

            onDeleted(commentId);
        } catch (err) {
            setError(err.message);
        }
    };
}
    return (
        <>

        {/*ACTION BUTTONS */}

<div className="actions">
        {moodId && (
          <Link className="btn" to={`/moods/${moodId}`}>
            Back
          </Link>
        )}

        {editPath && (
          <Link className="btn btnPrimary" to={editPath}>
            Edit
          </Link>
        )}

        <button className="btn btnDanger" type="button" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </>
  );



