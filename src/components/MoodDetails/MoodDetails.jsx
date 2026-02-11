import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as moodService from "../../services/moodService";
import CommentForm from "../CommentForm/CommentForm";

export default function MoodDetails({ user, handleDeleteMood }) {
  const { moodId } = useParams();
  const navigate = useNavigate();

  const [mood, setMood] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const fetchMood = async () => {
      const data = await moodService.show(moodId);
      setMood(data);
    };
    fetchMood();
  }, [moodId]);
  const handleDeleteClick = async () => {
    await handleDeleteMood(moodId)
    navigate("/moods")
  }

  if (!mood) return <p>Loading...</p>;

  const isAuthor =
    user?._id ===
    (typeof mood.author === "string"
      ? mood.author
      : mood.author?._id);


  const handleAddComment = async (formData) => {
    const updatedMood = await moodService.addComment(
      moodId,
      formData
    );
    setMood(updatedMood);
  };

  const handleUpdateComment = async (formData, commentId) => {
    const updatedMood = await moodService.updateComment(
      moodId,
      commentId,
      formData
    );
    setMood(updatedMood);
    setEditingCommentId(null);
  };

  const handleDeleteComment = async (commentId) => {
    const updatedMood = await moodService.deleteComment(moodId,commentId);
    setMood(updatedMood);
  };

  return (
    <main>
      <h1>Mood Details</h1>

      <p><strong>Rating:</strong> {mood.rating}</p>
      <p><strong>Mood:</strong> {mood.moodLabel}</p>
      <p><strong>Note:</strong> {mood.note}</p>

      <hr />

    
      <h2>Comments</h2>

      <CommentForm handleAddComment={handleAddComment} />

      {mood.comments?.map((comment) => {
        const commentAuthorId =
          typeof comment.author === "string"
            ? comment.author
            : comment.author?._id;

        const isCommentOwner =
          user?._id === commentAuthorId;

        return (
          <div key={comment._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p>{comment.text}</p>

            <small>
              Posted by: {comment.author?.username || "Unknown"} |{" "}
              {new Date(comment.createdAt).toLocaleString()}
            </small>

            {isCommentOwner && (
              <div>
                <button onClick={() => setEditingCommentId(comment._id)}>
                  Edit
                </button>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Delete
                </button>
              </div>
            )}

            {editingCommentId === comment._id && (
              <CommentForm
                handleUpdateComment={(formData) =>
                  handleUpdateComment(formData, comment._id)
                }
                existingText={comment.text}
              />
            )}
          </div>
        );
      })}

      <br />
      <Link to="/moods">Back</Link>
                  {isAuthor && (
              <div style={{ marginTop: "10px" }}>
                <Link to={`/moods/${mood._id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={handleDeleteClick}>Delete</button>
              </div>
            )}
    </main>
  );
}
