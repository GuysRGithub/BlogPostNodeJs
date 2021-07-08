import React from "react";
import Card from "../UI/Card";
import Logo from "../Logo/Logo";
import NavBar from "../Navbar";

const Hero = (props) => {
  return (
    <div>
      <Card>
        <Logo />
        <div style={{ padding: "50px 0" }}></div>
        <NavBar/>
      </Card>
    </div>
  );
};

export default Hero;