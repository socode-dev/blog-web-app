import { useEffect, useRef } from "react";
import Nav from "../nav/Nav";
import Search from "../search/Search";
import SearchStyle from "../search/search.module.css";
import Style from "./header.module.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import ButtonStyle from "../button/button.module.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({
  menuToggle,
  setMenuToggle,
  searchVisible,
  setSearchVisible,
  searchValue,
  setSearchValue,
}) => {
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    setSearchVisible(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchVisible && searchRef) {
      searchRef.current.focus();
    } else {
      setSearchValue("");
    }
  }, [searchVisible, setSearchValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (searchRef.current && !searchRef.current.contains(event.target)) ||
        (menuRef.current && !menuRef.current.contains(event.target))
      ) {
        setSearchVisible(false);
        setMenuToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuToggle((p) => !p);
  const toggleSearch = () => setSearchVisible((prev) => !prev);
  const getSearchValue = (e) => setSearchValue(e.target.value);
  const searchIcon = <SearchIcon className={SearchStyle.searchIcon} />;

  return (
    <>
      <header className={Style.header}>
        <h1 className={Style.title}>
          <Link to="/" className={Style.titleLink}>
            WealthWise Hub
          </Link>
        </h1>
        <div className={Style.searchContainer}>
          <Search
            onChange={getSearchValue}
            value={searchValue}
            searchRef={searchRef}
            searchIcon={searchIcon}
          />
        </div>
        <div
          className={`${Style.navLinks} ${menuToggle ? Style.showMenu : ""}`}
        >
          <Nav menuToggle={menuToggle} setMenuToggle={setMenuToggle} />
          <Button text="Login" cssClass={ButtonStyle.login} />
          <Button text="Sign Up" cssClass={ButtonStyle.signUp} />
        </div>
        <SearchIcon className={Style.search} onClick={toggleSearch} />
        <MenuIcon onClick={toggleMenu} className={Style.menuIcon} />
      </header>

      {searchVisible && (
        <div className={Style.mobileSearchContainer}>
          <Search
            onChange={getSearchValue}
            value={searchValue}
            searchRef={searchRef}
          />
        </div>
      )}
    </>
  );
};

export default Header;
