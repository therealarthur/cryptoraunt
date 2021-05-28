import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const UpdateMenu = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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
      <h1>Update Menu Item</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Menu Item</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="Name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Item Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
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

export default UpdateMenu;
