import { useState, useEffect } from "react";

const CommentForm = ({
  handleAddComment,
  handleUpdateComment,
  existingText = "",
}) => {
  const [formData, setFormData] = useState({ text: "" });

  useEffect(() => {
    setFormData({ text: existingText });
  }, [existingText]);

  const handleChange = (e) => {
    setFormData({ text: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleUpdateComment) {
      handleUpdateComment(formData);
    } else {
      handleAddComment(formData);
    }

    setFormData({ text: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={formData.text}
        onChange={handleChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentForm;
