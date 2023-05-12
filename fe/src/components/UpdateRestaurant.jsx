import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantsContext } from "../contex/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useNavigate } from "react-router-dom";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setName(response.data.data.restaurant.name);
        setLocation(response.data.data.restaurant.location);
        setPriceRange(response.data.data.restaurant.price_range);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate(`/`, { replace: true });
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            id="price_range"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ float: "right" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
