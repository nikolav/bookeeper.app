import React from "react";
import { Link } from "react-router-dom";
//
const AppBar = () => {
  return (
    <nav className="flex space-x-4 justify-center items-center font-bold">
      <Link to="/">home</Link>
      <Link to="about">about</Link>
    </nav>
  );
};

export default AppBar;
