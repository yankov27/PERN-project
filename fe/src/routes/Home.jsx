import React from "react";
import Header from "../components/Header";
import AddRestraurant from "../components/AddRestaurant";
import RestaurantList from "../components/RestaurantsList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddRestraurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
