import React from "react";
import CardItem from "../components/CardItem";
import "./Cards.css";

function Cards() {
  return (
    <div className="cards">
      <h1>Check out these epic destinations!</h1>
      <div className="cards__container">
        <ul className="cards__items">
          <CardItem
            src="images/waterfall.jpg"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu cursus mauris. Pellentesque eleifend luctus lacus nec molestie. Vivamus id tempor erat. In hac habitasse platea dictumst. Etiam vel orci venenatis, efficitur quam eget, sagittis nibh. Integer sit amet iaculis urna, consequat sollicitudin justo. Nulla congue a odio dapibus pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc faucibus enim felis, et pellentesque lorem condimentum id. Integer malesuada turpis neque, id mollis urna vestibulum quis."
            label="Adventure"
            path="/services"
          />
          <CardItem
            src="images/waterfall.jpg"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu cursus mauris. Pellentesque eleifend luctus lacus nec molestie. Vivamus id tempor erat. In hac habitasse platea dictumst. Etiam vel orci venenatis, efficitur quam eget, sagittis nibh. Integer sit amet iaculis urna, consequat sollicitudin justo. Nulla congue a odio dapibus pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc faucibus enim felis, et pellentesque lorem condimentum id. Integer malesuada turpis neque, id mollis urna vestibulum quis."
            label="Luxury"
            path="/services"
          />
          <CardItem
            src="images/waterfall.jpg"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu cursus mauris. Pellentesque eleifend luctus lacus nec molestie. Vivamus id tempor erat. In hac habitasse platea dictumst. Etiam vel orci venenatis, efficitur quam eget, sagittis nibh. Integer sit amet iaculis urna, consequat sollicitudin justo. Nulla congue a odio dapibus pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc faucibus enim felis, et pellentesque lorem condimentum id. Integer malesuada turpis neque, id mollis urna vestibulum quis."
            label="Adventure"
            path="/services"
          />
          <CardItem
            src="images/waterfall.jpg"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eu cursus mauris. Pellentesque eleifend luctus lacus nec molestie. Vivamus id tempor erat. In hac habitasse platea dictumst. Etiam vel orci venenatis, efficitur quam eget, sagittis nibh. Integer sit amet iaculis urna, consequat sollicitudin justo. Nulla congue a odio dapibus pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc faucibus enim felis, et pellentesque lorem condimentum id. Integer malesuada turpis neque, id mollis urna vestibulum quis."
            label="Adventure"
            path="/services"
          />
        </ul>
      </div>
    </div>
  );
}

export default Cards;
