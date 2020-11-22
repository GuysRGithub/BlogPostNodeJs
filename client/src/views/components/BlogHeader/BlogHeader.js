import React from "react";
import "./BlogHeaderStyle.css";
import { NavLink } from "react-router-dom";
const BlogHeader = (props) => {
  return (
    <header className="header m-0 p-0 dark-theme">
      <nav className="headerMenu">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact Us</a>
      </nav>
      <div>
        <NavLink to="/user/signUp">
          <button>SignUp</button>
        </NavLink>

        <NavLink to="/user/signIn">
          <button>SignIn</button>
        </NavLink>
      </div>
    </header>
  );
};

export default BlogHeader;
