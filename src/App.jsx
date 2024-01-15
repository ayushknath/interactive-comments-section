import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";
import commentData from "./data.json";
import "./App.css";

function App() {
  const [comments, setComments] = useState(
    JSON.parse(localStorage.getItem("comments")) || commentData.comments
  );

  function upVote(id) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return comment.id === id
          ? {
              ...comment,
              score: comment.score + 1,
            }
          : comment;
      });
    });
  }

  function replyUpVote(id) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            return reply.id === id
              ? {
                  ...reply,
                  score: reply.score + 1,
                }
              : reply;
          }),
        };
      });
    });
  }

  function downVote(id) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return comment.id === id
          ? {
              ...comment,
              score: comment.score - 1,
            }
          : comment;
      });
    });
  }

  function replyDownVote(id) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            return reply.id === id
              ? {
                  ...reply,
                  score: reply.score - 1,
                }
              : reply;
          }),
        };
      });
    });
  }

  function newComment(content) {
    setComments((prevComments) => [
      ...prevComments,
      {
        id: nanoid(),
        content: content,
        createdAt: "Now",
        score: 0,
        user: {
          image: {
            png: "/src/assets/avatars/image-juliusomo.png",
          },
          username: "juliusomo",
        },
        replies: [],
      },
    ]);
  }

  function deleteComment(id) {
    setComments((prevComments) => {
      return prevComments.filter((comment) => comment.id !== id);
    });
  }

  function deleteReply(id) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== id),
        };
      });
    });
  }

  function updateComment(id, updatedContent) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return comment.id === id
          ? {
              ...comment,
              content: updatedContent,
            }
          : comment;
      });
    });
  }

  function updateReply(id, updatedContent) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            return reply.id === id
              ? {
                  ...reply,
                  content: updatedContent,
                }
              : reply;
          }),
        };
      });
    });
  }

  function postReply(id, reply) {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        return comment.id === id
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: nanoid(),
                  content: reply,
                  createdAt: "Now",
                  score: 0,
                  replyingTo: comment.user.username,
                  user: {
                    image: {
                      png: "/src/assets/avatars/image-juliusomo.png",
                    },
                    username: "juliusomo",
                  },
                },
              ],
            }
          : comment;
      });
    });
  }

  function postReplyToReply(id, reply) {
    let replyingTo = "";
    let index;
    let isInnerLoopComplete = false;
    comments.forEach((comment, i) => {
      comment.replies.forEach((reply) => {
        if (reply.id === id) {
          replyingTo = reply.user.username;
          index = i;
          isInnerLoopComplete = true;
          return;
        }
      });

      if (isInnerLoopComplete) return;
    });

    setComments((prevComments) => {
      return prevComments.map((comment, i) => {
        return i === index
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: nanoid(),
                  content: reply,
                  createdAt: "Now",
                  score: 0,
                  replyingTo: replyingTo,
                  user: {
                    image: {
                      png: "/src/assets/avatars/image-juliusomo.png",
                    },
                    username: "juliusomo",
                  },
                },
              ],
            }
          : comment;
      });
    });
  }

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  return (
    <main className="comments-section">
      {comments.map((comment) => (
        <Comment
          key={nanoid()}
          data={comment}
          upVote={upVote}
          replyUpVote={replyUpVote}
          downVote={downVote}
          replyDownVote={replyDownVote}
          deleteComment={deleteComment}
          deleteReply={deleteReply}
          updateComment={updateComment}
          updateReply={updateReply}
          postReply={postReply}
          postReplyToReply={postReplyToReply}
        />
      ))}
      <AddComment newComment={newComment} />
    </main>
  );
}

export default App;
