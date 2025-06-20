import { useState, useEffect, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
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
    const fetchData = async () => {
      try {
        const response = await axios.get();
        const data = response.data.reverse();
        console.log(data);
        setPosts(data);
        setIsLoading(false);
      } catch (err) {
        console.log("Error Fetching Posts:", err);
      } finally {
        console.log("Fetch request completed");
      }
    };

    fetchData();
  }, []);

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

  const getRandomHashtags = (count = 4) => {
    return [...hashtagPool].sort(() => Math.random() - 0.5).slice(0, count);
  };

  const createNewPost = (e) => {
    e.preventDefault();

    const newPostId = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyy p");
    const hashTags =
      userHashTags.length > 0
        ? userHashTags
            .split(/(?=#)/)
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
  };

  return (
    <DataContext.Provider
      value={{
        menuToggle,
        setMenuToggle,
        searchVisible,
        setSearchVisible,
        searchValue,
        setSearchValue,
        defaultAvatar,
        isLoading,
        searchResults,
        posts,
        setPosts,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        userHashTags,
        setUserHashTags,
        postMenuToggle,
        setPostMenuToggle,
        createNewPost,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
