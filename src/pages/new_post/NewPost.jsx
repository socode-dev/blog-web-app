import Style from "./new_post.module.css";
import { useEffect, useRef, useContext } from "react";
import DataContext from "../../context/PostContext";
import { Link } from "react-router-dom";
import ArrowLeftTwoToneIcon from "@mui/icons-material/ArrowLeftTwoTone";

const NewPost = () => {
  const {
    postTitle,
    setPostTitle,
    postBody,
    setPostBody,
    createNewPost,
    userHashTags,
    setUserHashTags,
  } = useContext(DataContext);
  const titleRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const handleTitleChange = (e) => setPostTitle(e.target.value);
  const handleBodyChange = (e) => setPostBody(e.target.value);
  const handleHashtagChange = (e) => setUserHashTags(e.target.value);

  return (
    <form className={Style.form}>
      <Link to="/" className={Style.homeLink}>
        <ArrowLeftTwoToneIcon className={Style.backArrow} />
        Back
      </Link>
      <h2 className={Style.formHeading}>Create a New Post</h2>

      <div className={Style.titleCon}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          ref={titleRef}
          name="title"
          id="title"
          required
          value={postTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div className={Style.hashtagCon}>
        <label htmlFor="hashtags">Hashtags:</label>
        <input
          type="text"
          name="hashtags"
          id="hashtags"
          value={userHashTags}
          onChange={handleHashtagChange}
        />
      </div>
      <div className={Style.postCon}>
        <label htmlFor="content">Message:</label>
        <textarea
          rows={10}
          cols={30}
          name="content"
          id="content"
          required
          value={postBody}
          onChange={handleBodyChange}
        />
      </div>

      <button onClick={createNewPost} className={Style.postButton}>
        Create Post
      </button>
    </form>
  );
};

export default NewPost;
