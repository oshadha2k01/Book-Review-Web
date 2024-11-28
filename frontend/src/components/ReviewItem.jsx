import React from "react";
import { deleteReview } from "../api/api";
import { useNavigate } from "react-router-dom";

const ReviewItem = ({ review, onDelete }) => {
  // Initialize navigate function
  const navigate = useNavigate();
  
  // Handle delete review
  const handleDelete = async () => {
    await deleteReview(review._id);
    onDelete(review._id);
  };
  
  //Book review details
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">

        {/* Book Title details */}
        <div className="mb-3">
          <label
            htmlFor="bookTitle"
            className="form-label text-blue-500  font-semibold"
          >
            Book Title
          </label>
          <h5 className="card-title" id="bookTitle">
            {review.bookTitle}
          </h5>
        </div>

        {/* Author details */}
        <div className="mb-3">
          <label
            htmlFor="author"
            className="form-label  text-blue-500  font-semibold"
          >
            Author
          </label>
          <h6 className="card-subtitle mb-2 text-muted" id="author">
            {review.author}
          </h6>
        </div>

        {/* Rating details */}
        <div className="mb-3">
          <label
            htmlFor="rating"
            className="form-label text-blue-500 font-semibold"
          >
            Rating
          </label>
          <div>
            <span className="" id="rating">
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index}
                  style={{
                    color: index < review.rating ? "#FFD700" : "#D3D3D3", // Gold color for star  rating using Unicode character
                    fontSize: "24px",
                  }} 
                >
                  &#9733; 
                </span>
              ))}
            </span>
          </div>
        </div>

       {/* Review Text details */}
        <div className="mb-3">
          <label
            htmlFor="reviewText"
            className="form-label text-blue-500  font-semibold "
          >
            Review Text
          </label>
          <p className="card-text" id="reviewText">
            {review.reviewText}
          </p>
        </div>

        {/* Edit and Delete buttons */}
        <button
          className="btn btn-sm btn-success me-2"
          onClick={() => navigate(`/edit-review/${review._id}`)}
        >
          Edit
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {/* Date Added details */}
      <div className="card-footer text-muted">
        Added on {new Date(review.dateAdded).toLocaleDateString()}
      </div>
    </div>
  );
};

export default ReviewItem;
