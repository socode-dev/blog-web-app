import { useNavigate, useParams, Link } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";
import MoreVertTwoToneIcon from "@mui/icons-material/MoreVertTwoTone";
import Style from "./post_page.module.css";
import Action from "../../components/action/Action";
const PostPage = ({
  posts,
  defaultAvatar,
  setPosts,
  setPostTitle,
  setPostBody,
  setUserHashTags,
  postMenuToggle,
  setPostMenuToggle,
}) => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const postIndex = posts.findIndex((post) => post.id === Number(postId));

  if (postIndex === -1) return <h2>Post not found</h2>;

  const post = posts[postIndex];
  const prevPost = postIndex > 0 && posts[postIndex + 1];
  const nextPost = postIndex < posts.length + 1 && posts[postIndex - 1];

  const renderContent = (text) => {
    const lines = text.split("\n");
    const elements = [];
    let codeBlock = [];
    let isCodeBlock = false;
    let language = "javascript";

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (isCodeBlock) {
          elements.push(
            <div className={Style.codeBlockCon}>
              <SyntaxHighlighter
                key={index}
                language={language}
                style={dracula}
                className={Style.codeBlock}
              >
                {codeBlock.join("\n")}
              </SyntaxHighlighter>
            </div>
          );
          codeBlock = [];
        } else {
          language = line.includes("js") ? "javascript" : "typescript";
        }
        isCodeBlock = !isCodeBlock;
      } else if (isCodeBlock) {
        codeBlock.push(line);
      } else {
        elements.push(<p key={index}>{line}</p>);
      }
      return <p key={index}>{line}</p>;
    });
    return elements;
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    const updatedPost = posts.filter((p) => p.id !== id);
    setPosts(updatedPost);
    navigate("/");
  };

  const handleEdit = () => {
    const confirmEdit = window.confirm(
      "Are you sure you want to edit this post?"
    );
    if (!confirmEdit) return;

    setPostTitle(post.title);
    setPostBody(post.content);
    setUserHashTags(post.hashtags);
    navigate("/post");
  };

  const handlePostMenuToggle = () => setPostMenuToggle((prev) => !prev);

  return (
    <article className={Style.article}>
      <Link to="/" className={Style.homeLink}>
        <ArrowLeftTwoToneIcon className={Style.backArrow} />
        Back
      </Link>
      <div className={Style.postContainer}>
        <div className={Style.menuCon}>
          <div className={Style.detailsCon}>
            <img
              src={post.avatar || defaultAvatar}
              alt={post.author}
              loading="lazy"
            />
            <div className={Style.authorDetails}>
              <h3 className={Style.author}>{post.author}</h3>
              <p className={Style.postDate}>{`Posted on ${post.dateTime}`}</p>
            </div>
          </div>

          <div className={Style.menuContainer}>
            <MoreVertTwoToneIcon
              className={Style.menuIcon}
              onClick={handlePostMenuToggle}
            />
            {postMenuToggle && (
              <div className={Style.actionLink}>
                <button onClick={handleEdit} className={Style.editPost}>
                  <Link className={Style.link}>Edit</Link>
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className={Style.deletePost}
                >
                  <Link className={Style.link}>Delete</Link>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className={Style.contentCon}>
          <h4 className={Style.title}>{post.title}</h4>
          <p className={Style.hashtags}>
            {post.hashtags.map((tag, index) => {
              return (
                <span key={index + 1} className={Style.hashtag}>
                  {`${tag}  `}
                </span>
              );
            })}
          </p>
          <div className={Style.content}>{renderContent(post.content)}</div>
          <Action />
        </div>
      </div>
      <div className={Style.pagination}>
        {prevPost && (
          <button
            onClick={() => navigate(`/post/${prevPost.id}`)}
            className={`${Style.button} ${Style.prevButton}`}
          >
            <ArrowBackTwoToneIcon />
            Previous
          </button>
        )}
        {nextPost && (
          <button
            onClick={() => navigate(`/post/${nextPost.id}`)}
            className={`${Style.button} ${Style.nextButton}`}
          >
            Next
            <ArrowForwardTwoToneIcon />
          </button>
        )}
      </div>
    </article>
  );
};

export default PostPage;
