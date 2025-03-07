import { Link } from "react-router-dom";
import Style from "./home.module.css";

const Home = ({ posts, defaultAvatar, isLoading }) => {
  return (
    <div className={Style.mainContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        posts.map((post) => {
          return (
            <div key={post.id} className={Style.postContainer}>
              <div className={Style.detailsContainer}>
                <img
                  src={post.avatar || defaultAvatar}
                  alt={post.author}
                  loading="lazy"
                />
                <div className={Style.authorDetails}>
                  <h3 className={Style.author}>{post.author}</h3>
                  <p className={Style.postDate}>{post.dateTime}</p>
                </div>
              </div>

              <div>
                <h4 className={Style.title}>
                  <Link to={`post/${post.id}`} className={Style.titleLink}>
                    {post.title}
                  </Link>
                </h4>
                <p className={Style.hashtags}>{post.hashtags.slice(0, 2)}</p>
              </div>
            </div>
          );
        })
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Home;
