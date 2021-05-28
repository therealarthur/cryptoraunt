import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router";
import RestaurantFinder from "../apis/RestaurantFinder";
import AddMenu from "./AddMenu";
const Menu = () => {
  const { id } = useParams();
  const itemRef = useRef();
  const itemPriceRef = useRef();
  const [menu, setMenu] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  let history = useHistory();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await RestaurantFinder.get(`/restaurants/${id}/menu`);
        // const menu_items = response.data;
        setMenu(response.data);
        // console.log(menu);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMenu();
  }, []);

  // const createMenu = async (e) => {
  //   try {
  //     e.preventDefault();
  //     console.log("creating menu item! ");
  //     setItem(itemRef.current.value);
  //     setPrice(itemPriceRef.current.value);
  //     // console.log(itemRef.current.value, itemPriceRef.current.value);
  //     console.log(item, price);
  //     const response = await RestaurantFinder.post(`/review/create`, {
  //       restaurant_id: id,
  //       menu_item: item,
  //       price: price,
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdate = (e, id) => {
    console.log("clicked!");
    // e.stopPropagation();
    history.push(`/restaurants/${id}/menuItem/update`);
  };

  const handleDelete = (e, id) => {
    try {
      const response = RestaurantFinder.delete(`/menu_item/${id}`);
      setMenu(
        menu.filter((menu) => {
          return menu.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="list-group">
        <table className="table table-hover table-dark">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Item Name</th>
              <th scope="col">Price</th>
              <th scope="col" className="text-center">
                Update
              </th>
              <th scope="col" className="text-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {menu != "" &&
              menu.map((menu) => {
                return (
                  <tr key={menu.id}>
                    <td>{menu.menu_item}</td>
                    <td>{menu.price}</td>
                    <td align="center">
                      <Button
                        onClick={(e) => {
                          console.log("clicked update!");
                          handleUpdate(e, menu.id);
                        }}
                        className="btn btn-warning"
                      >
                        Update
                      </Button>
                    </td>
                    <td align="center">
                      <Button
                        onClick={(e) => {
                          console.log("clicked delete!");
                          handleDelete(e, menu.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            {/* <tbody>
              <tr>
                <td>McChicken</td>
                <td>1.99</td>
                <td align="center">
                  <button className="btn btn-warning">Update</button>
                </td>
                <td align="center">
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Large Fries</td>
                <td>3.99</td>
                <td align="center">
                  <button className="btn btn-warning">Update</button>
                </td>
                <td align="center">
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody> */}
          </tbody>
        </table>
        <AddMenu id={id} />
        {/* <Form onSubmit={createMenu}>
          <Form.Group id="item">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              ref={itemRef}
              required
              placeholder="Item Name"
            />
          </Form.Group>
          <Form.Group id="item-price">
            <Form.Label>Item Price</Form.Label>
            <Form.Control
              type="text"
              ref={itemPriceRef}
              required
              placeholder="Item Price"
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Add Menu Item
          </Button>
        </Form> */}
      </div>
    </div>
  );
};

export default Menu;
