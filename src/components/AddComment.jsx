import { useState } from "react";
import CurrentUserPhoto from "../assets/avatars/image-juliusomo.png";

const AddComment = ({ newComment }) => {
  const [formData, setFormData] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setFormData(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    newComment(formData);
    setFormData("");
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div className="user-photo">
        <img src={CurrentUserPhoto} alt="Juliusomo" />
      </div>

      <textarea
        name="addComment"
        placeholder="Add a comment..."
        onChange={handleChange}
        value={formData}
      />

      <button aria-label="Add new comment">SEND</button>
    </form>
  );
};

export default AddComment;
