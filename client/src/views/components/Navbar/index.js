import React, { useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

const BlogNavBar = (props) => {
  const onSubmitSearch = (e) => {
    e.preventDefault();
    alert("Search");
  };

  const openSearch = () => {
    setSearch(true);
  };

  const [search, setSearch] = useState(false);

  const searchClass = search ? "searchInput active" : "searchInput";

  return (
    <li className="navbar">
      <ul className="navbarMenu">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink to="/service">Service</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
      <div className="search">
        <form onSubmit={onSubmitSearch}>
          <input type="text" placeholder="Search" className={searchClass} />
          <img
            src={require("../../../assets/icons/search.png")}
            alt="Search"
            className="searchIcon"
            onClick={openSearch}
          />
        </form>
      </div>
    </li>
  );
};

export default BlogNavBar;
