import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("1");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      // const test = {
      //   restaurant_id: id,
      //   restaurant_review: review,
      //   rating,
      // };
      // console.log(test);
      const response = await RestaurantFinder.post(`/review/create`, {
        restaurant_id: id,
        restaurant_review: review,
        rating,
      });
      console.log(response);
      history.push("/");
      history.push(location.pathname);
    } catch (err) {}
  };

  return (
    <div className="mb-2">
      <h2>Add a review</h2>
      <form action="">
        <div className="form-row">
          {/* <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              placeholder="Name"
              type="text"
              className="form-control"
            />
          </div> */}
          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              className="custom-select"
            >
              {/* <option disabled>Rating</option> */}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="Review">Review</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            id="Review"
            className="form-control"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={handleSubmitReview}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>

    // <div>
    //   <form action="">
    //     <div className="form-row">
    //       <div className="col">
    //         <input
    //           value={date}
    //           onChange={(e) => setDate(e.target.value)}
    //           type="text"
    //           className="form-control"
    //           placeholder="Date"
    //         />
    //       </div>
    //       <div className="col">
    //         <input
    //           value={review}
    //           onChange={(e) => setReview(e.target.value)}
    //           type="text"
    //           className="form-control"
    //           placeholder="Review"
    //         />
    //       </div>
    //       <div className="col">
    //         <input
    //           value={rating}
    //           onChange={(e) => setRating(e.target.value)}
    //           type="text"
    //           className="form-control"
    //           placeholder="Rating"
    //         />
    //       </div>
    //       <button
    //         onClick={handleSubmitReview}
    //         type="submit"
    //         className="btn btn-primary"
    //       >
    //         Add
    //       </button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default AddReview;
