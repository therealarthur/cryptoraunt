import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../contexts/RestaurantsContext";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";
import Menu from "../components/Menu";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant, reviews, setReviews } =
    useContext(RestaurantsContext);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("selected restaurant id: ", id);
        const response = await RestaurantFinder.get(`/restaurants/${id}`);
        setSelectedRestaurant(response.data);
        setName(response.data.name);
        // console.log("selected restaurant", response.data);
        const reviewData = await RestaurantFinder.get(
          `/restaurants/${id}/reviews`
        );
        setReviews(reviewData);
        // console.log("restaurant reviews", reviewData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Restaurant Details">
      {selectedRestaurant && (
        <h1 className="text-center display-1">
          {selectedRestaurant.name}'s Menu
        </h1>
      )}
      <Menu />
      <AddReview />
      {reviews != "" && (
        <div className="mt-3">
          <h1>{selectedRestaurant.name}'s Reviews</h1>
          <Reviews reviews={reviews.data} />
        </div>
      )}
      {/* {selectedRestaurant && (
        <>
          <h1 className="text-center display-1">{selectedRestaurant.restaurant.name}</h1>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews}/>
          </div>
          <AddReview />
          <Menu />
        </>
      )} */}
    </div>
  );
};

export default RestaurantDetailPage;
