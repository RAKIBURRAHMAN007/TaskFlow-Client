import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Login/Navbar/NavBar";
import Footer from "../components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <div className=" lg:min-h-screen min-h-svh flex flex-col">
        <NavBar />
        <div className="flex-grow">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Root;
