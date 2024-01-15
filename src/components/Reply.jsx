import { useState } from "react";
import { FaPlus, FaMinus, FaReply, FaTrash, FaPen } from "react-icons/fa";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";

const Reply = ({
  data,
  replyUpVote,
  replyDownVote,
  deleteReply,
  updateReply,
  postReplyToReply,
}) => {
  const [editReply, setEditReply] = useState(false);
  const [replyToReply, setReplyToReply] = useState(false);

  const currentUser = data.user.username;
  const commentActions =
    currentUser === "juliusomo" ? (
      <div className="comment-actions">
        <button className="comment-delete" onClick={() => deleteReply(data.id)}>
          <FaTrash />
          Delete
        </button>
        <button className="comment-edit" onClick={() => setEditReply(true)}>
          <FaPen />
          Edit
        </button>
      </div>
    ) : (
      <button className="comment-reply" onClick={() => setReplyToReply(true)}>
        <FaReply />
        Reply
      </button>
    );

  return (
    <>
      {editReply ? (
        <EditComment data={data} updateComment={updateReply} />
      ) : (
        <>
          <div className="reply-box">
            <aside className="vote">
              <button className="upvote" onClick={() => replyUpVote(data.id)}>
                <FaPlus />
              </button>
              <span>{data.score}</span>
              <button
                className="downvote"
                onClick={() => replyDownVote(data.id)}
              >
                <FaMinus />
              </button>
            </aside>

            <section className="comment-text">
              <div className="comment-header">
                <div>
                  <img src={data.user.image.png} alt={data.user.username} />
                  <span className="user-name">
                    {data.user.username}
                    {currentUser === "juliusomo" && (
                      <span className="user-identifier">you</span>
                    )}
                  </span>
                  <span className="comment-time">{data.createdAt}</span>
                </div>
                {commentActions}
              </div>

              <p className="comment-body">
                <span className="mention">{`@${data.replyingTo} `}</span>
                {data.content}
              </p>
            </section>
          </div>

          {replyToReply && (
            <ReplyComment data={data} postReply={postReplyToReply} />
          )}
        </>
      )}
    </>
  );
};

export default Reply;
