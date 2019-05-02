import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="logo">Portfolio multiple</div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <Link to="/" activeClassName="active" class="nav-link">
          Home
        </Link>
        <Link to="/" activeClassName="active" class="nav-link">
          Home
        </Link>
        <Link to="/" activeClassName="active" class="nav-link">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
