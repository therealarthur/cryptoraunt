import React, { useEffect, useContext, useState, useRef } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../contexts/RestaurantsContext";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Search = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  const [cuisine, setCuisine] = useState("");
  const [crypto, setCrypto] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [state, setState] = useState("");
  //   const cuisineRef = useRef();
  let history = useHistory();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await RestaurantFinder.get("/restaurants");
  //         setRestaurants(response.data);
  //         console.log(response.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const handleRestaurantSelect = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (cuisine && !crypto && !city && !zip && !state) {
        console.log("Search cuisine");
        const response = await RestaurantFinder.get(
          `/restaurant/cuisine/${cuisine}`,
          { cuisine }
        );
        setRestaurants(response.data);
      } else if (!cuisine && crypto) {
        console.log("search crypto");
        const response = await RestaurantFinder.get(
          `/restaurants/crypto/${crypto}`,
          { name: crypto }
        );
        setRestaurants(response.data);
        console.log(response);
      } else if (cuisine && crypto) {
        console.log("Search cuisine and crypto");
        const response = await RestaurantFinder.get(
          `/restaurant/cuisine/${cuisine}/currency/${crypto}`,
          { cuisine, currency: crypto }
        );
        setRestaurants(response.data);
      } else if (cuisine && city) {
        console.log("Search cuisine and city");
        const response = await RestaurantFinder.get(
          `/restaurant/cuisine/${cuisine}/city/${city}`,
          { cuisine, city }
        );
        setRestaurants(response.data);
      } else if (cuisine && zip) {
        console.log("Search cuisine and zip");
        const response = await RestaurantFinder.get(
          `/restaurant/cuisine/${cuisine}/zip/${zip}`,
          { cuisine, zip }
        );
        setRestaurants(response.data);
      } else if (cuisine && state) {
        console.log("Search cuisine and state");
        const response = await RestaurantFinder.get(
          `/restaurant/cuisine/${cuisine}/state/${state}`,
          { cuisine, state }
        );
        setRestaurants(response.data);
      } else if (state) {
        console.log("search state");
        const response = await RestaurantFinder.get(
          `/restaurants/in/${state}`,
          {
            state,
          }
        );
        setRestaurants(response.data);
      }
      console.log(cuisine, crypto, city, zip, state);
    } catch (error) {
      console.log(error);
    }

    setCuisine("");
    setCrypto("");
    setState("");
    setCity("");
    setZip("");
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group id="cuisine">
          <Form.Label>Cuisine</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setCuisine(e.target.value)}
            value={cuisine}
            custom
          >
            <option value="">Choose Cuisine</option>
            <option value="italian">Italian</option>
            <option value="BBQ">BBQ</option>
            <option value="Fine Dining">Fine Dining</option>
            <option value="Burgers">Burgers</option>
            <option value="Korean">Korean</option>
            <option value="Pastries">Pastries</option>
            <option value="Wings">Wings</option>
            <option value="Chinese">Chinese</option>
            <option value="Sushi">Sushi</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cryptocurrency</Form.Label>
          <Form.Control
            as="select"
            value={crypto}
            onChange={(e) => setCrypto(e.target.value)}
            custom
          >
            <option value="">Choose Cryptocurrency</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="DogeCoin">DogeCoin</option>
            <option value="Mana">Mana</option>
            <option value="Ethereum Classic">Ethereum Classic</option>
            <option value="Basic_Attention_Token">Basic_Attention_Token</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder="City"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
            placeholder="Zip"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setState(e.target.value)}
            value={state}
            placeholder="State"
          ></Form.Control>
        </Form.Group>
        <Button variant="dark" type="submit">
          Search
        </Button>
      </Form>
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Restaurant</th>
            <th scope="col">Address</th>
            <th scope="col">Cuisine</th>
            <th scope="col">Phone</th>
            <th scope="col">Website</th>
            <th scope="col">Ratings</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr
                  onClick={() => handleRestaurantSelect(restaurant.id)}
                  key={restaurant.id}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.street}, {restaurant.city}, {restaurant.state},
                    {restaurant.zip}
                  </td>
                  <td>{restaurant.cuisine}</td>
                  <td>{restaurant.phone_number}</td>
                  <td>{restaurant.website}</td>
                  <td>{restaurant.yelp_rating}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
