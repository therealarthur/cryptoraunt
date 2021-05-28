import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [addressStreet, setaddressStreet] = useState("");
  const [addressCity, setaddressCity] = useState("");
  const [addressState, setaddressState] = useState("");
  const [addressZip, setaddressZip] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setSelectedRestaurant(response.data);
        setName(response.data.name);
        setaddressStreet(response.data.street);
        setaddressCity(response.data.city);
        setaddressState(response.data.city);
        setaddressZip(response.data.zip);
        setCuisine(response.data.cuisine);
        setPhone(response.data.phone);
        setWebsite(response.data.website);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedRestaurant = await RestaurantFinder.put(
        `/restaurants/update`,
        {
          id,
          name,
          addressStreet,
          addressCity,
          addressState,
          addressZip,
          cuisine,
          phone,
          website,
        }
      );
      console.log(updatedRestaurant);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="Name"
            className="form-control"
            type="text"
            defaultValue={selectedRestaurant.name}
          />
        </div>

        <div className="form-group">
          <label htmlFor="addressStreet">Street Address</label>
          <input
            value={addressStreet}
            onChange={(e) => setaddressStreet(e.target.value)}
            id="addressStreet"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressCity">City</label>
          <input
            value={addressCity}
            onChange={(e) => setaddressCity(e.target.value)}
            id="addressCity"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressState">State</label>
          <input
            value={addressState}
            onChange={(e) => setaddressState(e.target.value)}
            id="addressState"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="addressZip">Zip</label>
          <input
            value={addressZip}
            onChange={(e) => setaddressZip(e.target.value)}
            id="addressZip"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cuisine">Cuisine</label>
          <input
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            id="cuisine"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            id="website"
            className="form-control"
            type="text"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
