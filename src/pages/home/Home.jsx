import { Link } from "react-router-dom";
import Style from "./home.module.css";
import { useContext } from "react";
import DataContext from "../../context/PostContext";

const Home = () => {
  const { searchResults, defaultAvatar, isLoading } = useContext(DataContext);

  return (
    <div className={Style.mainContainer}>
      {isLoading ? (
        <p>Loading...</p>
      ) : searchResults.length ? (
        searchResults.map((post) => {
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
