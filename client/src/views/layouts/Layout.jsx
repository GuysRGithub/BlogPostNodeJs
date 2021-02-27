import React from "react";
import Sidebar from "../components/Sidebar/index.jsx";
import "./LayoutStyle.css"

const Layout = (props) => {
  return (
    <React.Fragment>
      {props.children}
      <Sidebar />
    </React.Fragment>
  );
};

export default Layout;
