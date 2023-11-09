import React from "react";
import CardItem from "../components/CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <div className="cards__header">
        <h1>Explore These Breathtaking Destinations</h1>
      </div>
      <div className="cards__container">
        <div className="cards__items">
          <CardItem
            src="images/tower.jpg"
            text="Iconic Batanes Tower offers breathtaking views of nature's beauty."
            
            path="/services"
          />
          <CardItem
            src="images/hills.jpg"
            text="Scenic Batanes Hills and Coastal Road offer picturesque drives through stunning landscapes."
            
            path="/services"
          />
          <CardItem
            src="images/water.jpg"
            text="Explore the pristine coastal seas of Batanes, where crystal-clear waters meet dramatic coastlines for a truly captivating experience."
            
            path="/services"
          />
          <CardItem
            src="images/rocks.jpg"
            text="Batanes' coastal seas shine even brighter on a sunny day, creating a picturesque paradise."
            
            path="/services"
          />
        </div>
      </div>
    </div>
  );
}

export default Cards;
