import React, { useState } from "react";
// import RestaurantFinder from "../apis/RestaurantFinder";
// import { RestaurantsContext } from "../contexts/RestaurantsContext";
import { useLocation, useHistory } from "react-router-dom";

const AddRestaurants = () => {
  // const { addRestaurant } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [addressStreet, setaddressStreet] = useState("");
  const [addressCity, setaddressCity] = useState("");
  const [addressState, setaddressState] = useState("");
  const [addressZip, setaddressZip] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const location = useLocation();
  const history = useHistory();

  const Axios = require("axios");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMITTED!");
    try {
      const response = await Axios.post(
        "http://localhost:6969/api/restaurant/create",
        {
          name,
          addressStreet,
          addressCity,
          addressZip,
          addressState,
          cuisine,
          phone,
          website,
        }
      );

      history.push(location.pathname);
      // redirect to dashboard
      history.push("/");
      // addRestaurant(response.data.data.restaurant);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Restaurant Name"
            />
          </div>
          <div className="col">
            <input
              value={addressStreet}
              onChange={(e) => setaddressStreet(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Street Address"
            />
          </div>
          <div className="col">
            <input
              value={addressCity}
              onChange={(e) => setaddressCity(e.target.value)}
              type="text"
              className="form-control"
              placeholder="City"
            />
          </div>
          <div className="col">
            <input
              value={addressState}
              onChange={(e) => setaddressState(e.target.value)}
              type="text"
              className="form-control"
              placeholder="State"
            />
          </div>
          <div className="col">
            <input
              value={addressZip}
              onChange={(e) => setaddressZip(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Zip"
            />
          </div>
          <div className="col">
            <input
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Cuisine"
            />
          </div>
          <div className="col">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Phone Number"
            />
          </div>
          <div className="col">
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Website"
            />
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurants;
