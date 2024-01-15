import { useState } from "react";
import CurrentUserPhoto from "../assets/avatars/image-juliusomo.png";

const ReplyComment = ({ data, postReply }) => {
  const [formData, setFormData] = useState("");

  function handleChange(event) {
    const value = event.target.value;
    setFormData(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    postReply(data.id, formData);
  }

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

      <button aria-label="Send reply">REPLY</button>
    </form>
  );
};

export default ReplyComment;
