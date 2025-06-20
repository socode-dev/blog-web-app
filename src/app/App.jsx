import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../components/header/Header";
import Home from "../pages/home/Home";
import PostPage from "../pages/post_page/PostPage";
import NewPost from "../pages/new_post/NewPost";
import Missing from "../pages/missing/Missing";
import Footer from "../components/footer/Footer";
import styles from "./app.module.css";
import { DataProvider } from "../context/PostContext";

const App = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [menuToggle, setMenuToggle] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [postBody, setPostBody] = useState("");
  const [userHashTags, setUserHashTags] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [postMenuToggle, setPostMenuToggle] = useState(false);
  const defaultAvatar = "https://avatar.iran.liara.run/public/girl";
  const hashtagPool = [
    "#Finance",
    "#Money",
    "#Investing",
    "#Budgeting",
    "#Savings",
    "#PassiveIncome",
    "#DebtFree",
    "#Retirement",
    "#Wealth",
    "#SideHustle",
    "#FinancialFreedom",
    "#Stocks",
    "#Crypto",
    "#Entrepreneur",
    "#Earning",
    "#FrugalLiving",
    "#SmartSpending",
    "#MoneyTips",
    "#CompoundInterest",
    "#EmergencyFund",
  ];

  useEffect(() => {
    if (!searchValue) {
      setSearchResults(posts);
      return;
    }
    const filteredResult = posts.filter((p) =>
      p.title.toLowerCase().includes(searchValue?.toLowerCase())
    );
    setSearchResults([...filteredResult]);
  }, [posts, searchValue]);

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  const getRandomHashtags = (count = 4) => {
    return [...hashtagPool].sort(() => Math.random() - 0.5).slice(0, count);
  };

  const createNewPost = useCallback(
    (e) => {
      e.preventDefault();

      const newPostId = posts.length ? posts[posts.length - 1].id + 1 : 1;
      const datetime = format(new Date(), "MMMM dd, yyy p");
      const hashTags =
        userHashTags.length > 0
          ? userHashTags
              .split(/[\s,]+/)
              .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
          : getRandomHashtags();

      const newPost = {
        id: newPostId,
        title: postTitle,
        content: postBody,
        dateTime: datetime,
        author: "Anonymous",
        avatar: defaultAvatar,
        hashtags: hashTags,
      };
      setPosts([newPost, ...posts]);
      setPostTitle("");
      setUserHashTags("");
      setPostBody("");
      navigate("/");
    },
    [posts, postTitle, postBody, userHashTags]
  );

  return (
    <div className={styles.app}>
      <ScrollToTop />
      <DataProvider>
        <Header className={styles.header} />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="post/:postId" element={<PostPage />} />
            <Route path="post" element={<NewPost />} />
            <Route path="*" element={<Missing />} />
          </Routes>
        </main>
      </DataProvider>
      <Footer className={styles.footer} />
    </div>
  );
};

export default App;
