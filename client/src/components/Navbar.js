import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  function LogOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  }

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src="/images/logo.png" />
          <img src="/images/companyName.png" />
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/"
              className={click ? "nav-links-mobile" : "nav-links"}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/home"
              className={click ? "nav-links-mobile" : "nav-links"}
              onClick={closeMobileMenu}
            >
              Tour Packages
            </Link>
          </li>
          {user ? (
            <>
              <div class="dropdown">
                <button
                  class={
                    click ? "nav-links-mobile" : "nav-links dropdown-toggle"
                  }
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa fa-user"></i> {user.name}
                </button>
                <ul class="dropdown-menu">
                  <li>
                    <a class="dropdown-item" href="/profile">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#" onClick={LogOut}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link
                  to="/register"
                  className={click ? "nav-links-mobile" : "nav-links"}
                  onClick={closeMobileMenu}
                >
                  Sign Up
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  className="nav-links-mobile"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
        {button && !user && (
          <Button buttonStyle="btn--outline">
            <i className="fa-solid fa-user" style={{ color: "#0B3942" }} /> Log
            In
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

/*
const user = JSON.parse(localStorage.getItem('currentUser'));

    function LogOut() {
        localStorage.removeItem('currentUser')
        window.location.href = '/login'
    }

<nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Batanes I.B.S. Travel & Tours</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"><i class="fa fa-bars" style={{ color: 'white' }}></i></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            {user ? (
                                <>
                                    <div class="dropdown">
                                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa fa-user"></i> {user.name}
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="/profile">Profile</a></li>
                                            <li><a class="dropdown-item" href="#" onClick={LogOut}>Logout</a></li>
                                        </ul>
                                    </div>
                                </>
                            ) : (<>
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/register">Register</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/login">Login</a>
                                </li>
                            </>)}
                        </ul>
                    </div>
                </div>
            </nav> */
