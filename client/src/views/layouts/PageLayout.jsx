import React from "react";
import Sidebar from "../components/Sidebar/index.jsx";
import "./LayoutStyle.css"
import HeaderLight from "../components/Shared/HeaderLight";
import FooterLight from "../components/Shared/FooterLight";

const Layout = (props) => {
    return (
        <React.Fragment>
            <HeaderLight/>
            {props.children}
            <FooterLight/>
            {/*<Sidebar/>*/}
        </React.Fragment>
    );
};

export default Layout;
