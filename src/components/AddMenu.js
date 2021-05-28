import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useHistory, useLocation } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddMenu = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  let history = useHistory();
  const location = useLocation();

  const createMenu = async (e) => {
    try {
      e.preventDefault();
      const response = await RestaurantFinder.post(`/menuItem/create`, {
        restaurant_id: id,
        menu_item: item,
        price: price,
      });
      console.log(response.data);
      history.push("/");
      history.push(location.pathname);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {" "}
      <Form onSubmit={createMenu}>
        <Form.Group id="item">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            required
            placeholder="Item Name"
          />
        </Form.Group>
        <Form.Group id="item-price">
          <Form.Label>Item Price</Form.Label>
          <Form.Control
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            placeholder="Item Price"
          />
        </Form.Group>
        <Button variant="dark" type="submit">
          Add Menu Item
        </Button>
      </Form>
    </div>
  );
};

export default AddMenu;
