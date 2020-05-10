import React from "react";
import { Link } from "gatsby";

const NavBar = () => {
  return (
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav className="uk-navbar uk-navbar-container">
        <div className="uk-navbar-center">
          <Link
            className="uk-padding-small uk-text-small"
            to="/"
            style={{ textDecoration: "none" }}
          >
            <span className="uk-margin-small-right fas fa-home" />
            Home
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
