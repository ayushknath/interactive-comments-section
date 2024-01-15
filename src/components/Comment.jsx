import { useState } from "react";
import { nanoid } from "nanoid";
import { FaPlus, FaMinus, FaReply, FaTrash, FaPen } from "react-icons/fa";
import EditComment from "./EditComment";
import ReplyComment from "./ReplyComment";
import Reply from "./Reply";

const Comment = ({
  data,
  upVote,
  replyUpVote,
  downVote,
  replyDownVote,
  deleteComment,
  deleteReply,
  updateComment,
  updateReply,
  postReply,
  postReplyToReply,
}) => {
  const [editComment, setEditComment] = useState(false);
  const [replyComment, setReplyComment] = useState(false);

  const currentUser = data.user.username;
  const commentActions =
    currentUser === "juliusomo" ? (
      <div className="comment-actions">
        <button
          className="comment-delete"
          onClick={() => deleteComment(data.id)}
          aria-label="Delete comment"
        >
          <FaTrash />
          Delete
        </button>
        <button
          className="comment-edit"
          onClick={() => setEditComment(true)}
          aria-label="Edit comment"
        >
          <FaPen />
          Edit
        </button>
      </div>
    ) : (
      <button
        className="comment-reply"
        onClick={() => setReplyComment(true)}
        aria-label="Reply to comment"
      >
        <FaReply />
        Reply
      </button>
    );

  return (
    <>
      {editComment ? (
        <EditComment data={data} updateComment={updateComment} />
      ) : (
        <>
          <div className="comment-box">
            <aside className="vote">
              <button
                className="upvote"
                onClick={() => upVote(data.id)}
                aria-label="Upvote comment"
              >
                <FaPlus />
              </button>
              <span>{data.score}</span>
              <button
                className="downvote"
                onClick={() => downVote(data.id)}
                aria-label="Downvote comment"
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

              <p className="comment-body">{data.content}</p>
            </section>
          </div>

          {data.replies.map((reply) => (
            <Reply
              key={nanoid()}
              data={reply}
              replyUpVote={replyUpVote}
              replyDownVote={replyDownVote}
              deleteReply={deleteReply}
              updateReply={updateReply}
              postReplyToReply={postReplyToReply}
            />
          ))}

          {replyComment && <ReplyComment data={data} postReply={postReply} />}
        </>
      )}
    </>
  );
};

export default Comment;
