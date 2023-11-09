import React from "react";

import "../App.css";
import "./LandingScreen.css";
import { Button } from "../components/Button";
import Cards from "./Cards";
import Footer from "./Footer";

function LandingScreen() {
  return (
    <>
      <div className="hero-container">
        <video src="batanes.mp4" autoPlay loop muted />
        <h1 className="landing-page-text">Adventure awaits</h1>
        <p>Let's make your dream vacation come true...</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      </div>
      <div>
        <Cards />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

export default LandingScreen;
