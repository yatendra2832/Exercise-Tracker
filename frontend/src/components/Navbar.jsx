import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand navbar-expand-lg">
      <Link to={"/"} className="navbar-brand">
        Excersier
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navabr-item">
            <Link to={"/"} className={"nav-link"}>
              Exercise
            </Link>
          </li>
          <li className="navabr-item">
            <Link to={"/create"} className={"nav-link"}>
              Create Exercise Log
            </Link>
          </li>
          <li className="navabr-item">
            <Link to={"/user"} className={"nav-link"}>
              Create User
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
