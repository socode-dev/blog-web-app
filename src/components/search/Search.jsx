import Style from "./search.module.css";

const Search = ({ searchIcon, onChange, value, searchRef }) => {
  return (
    <form className={Style.form}>
      <label htmlFor="search" className={Style.label}>
        Search
      </label>
      <input
        type="text"
        id="search"
        className={Style.input}
        placeholder="Search..."
        onChange={onChange}
        value={value}
        ref={searchRef}
      />
      {searchIcon}
    </form>
  );
};

export default Search;
