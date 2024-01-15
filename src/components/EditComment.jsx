import { useState, useEffect } from "react";
import CurrentUserPhoto from "../assets/avatars/image-juliusomo.png";

const EditComment = ({ data, updateComment }) => {
  const [formData, setFormData] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setFormData(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    updateComment(data.id, formData);
  }

  useEffect(() => {
    setFormData(data.content);
  }, []);

  return (
    <form className="followup-comment-form" onSubmit={handleSubmit}>
      <div className="user-photo">
        <img src={CurrentUserPhoto} alt="Juliusomo" />
      </div>

      <textarea
        name="followupComment"
        placeholder="Add a comment..."
        onChange={handleChange}
        value={formData}
      />

      <button>UPDATE</button>
    </form>
  );
};

export default EditComment;
