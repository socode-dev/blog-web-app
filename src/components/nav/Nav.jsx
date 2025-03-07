import { NavLink } from "react-router-dom";
import Style from "./nav.module.css";

const Nav = ({ menuToggle, setMenuToggle }) => {
  const hideMenu = () => {
    setMenuToggle(!menuToggle);
  };

  return (
    <nav className={Style.linkContainer}>
      <NavLink to="/" onClick={hideMenu} className={Style.link}>
        Home
      </NavLink>
      <NavLink to="/post/1" onClick={hideMenu} className={Style.link}>
        Posts
      </NavLink>
      <NavLink to="post" onClick={hideMenu} className={Style.link}>
        New Post
      </NavLink>
    </nav>
  );
};

export default Nav;
