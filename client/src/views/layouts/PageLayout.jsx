import React from "react";
import HeaderLight from "../components/shared/Header";
import Footer from "../components/shared/Footer";

const Layout = (props) => {
    return (
        <React.Fragment>
            <HeaderLight/>
            {props.children}
            <Footer/>
            {/*<Sidebar/>*/}
        </React.Fragment>
    );
};

export default Layout;
