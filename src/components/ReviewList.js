import React, { useEffect, useContext } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const ReviewList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //"http://localhost:5000/api/v1/restaurants/"
        const response = await RestaurantFinder.get("/");
        setRestaurants(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    try {
      // const response = await RestaurantFinder.delete(`/${id}`);
      // // console.log(response);
      // setRestaurants(restaurants.filter((restaurant) => {
      //     return restaurant.id !== id;
      // }))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">User</th>
            <th scope="col">Rating</th>
            <th scope="col">Review Date</th>
            <th scope="col">Review</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants &&
            restaurants.map((restaurant) => {
              return (
                <tr key={restaurants.id}>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{restaurant.cuisine}</td>
                  <td>{restaurant.phone}</td>
                  <td>Reviews</td>
                  <td>
                    <button className="btn btn-warning">Update</button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(restaurant.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
                        <td>mcdonalds</td>
                        <td>new york</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
                    <tr>
                        <td>mcdonalds</td>
                        <td>new york</td>
                        <td>$$</td>
                        <td>Rating</td>
                        <td><button className="btn btn-warning">Update</button></td>
                        <td><button className="btn btn-danger">Delete</button></td>
                    </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewList;
