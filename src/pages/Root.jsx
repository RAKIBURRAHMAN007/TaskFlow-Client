import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Login/Navbar/NavBar";
import Footer from "../components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
