import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReview } from "../api/api"; 

const ReviewForm = ({ onSave }) => {
   // Initialize state variables
  const [formData, setFormData] = useState({
    bookTitle: "",
    author: "",
    rating: 1,
    reviewText: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Initialize navigate function
  const navigate = useNavigate();

// Handle book rview field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle book review  submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check empty filed validation
    if (!formData.bookTitle || !formData.author || !formData.reviewText) {
      setErrorMessage("Please fill in all the required fields.");
      return;
    }

    //Book title validation
    if (formData.bookTitle.length < 3 || formData.bookTitle.length > 100) {
      setErrorMessage("Book title must be between 3 and 100 characters.");
      return;
    }
    const titleRegex = /^[a-zA-Z0-9.,'"\s-]+$/;
    if (!titleRegex.test(formData.bookTitle)) {
      setErrorMessage("Book title contains invalid characters.");
      return;
    }

    //Author validation
    if (formData.author.length < 3 || formData.author.length > 100) {
      setErrorMessage("Author must be between 3 and 100 characters.");
      return;
    }
    const authorRegex = /^[a-zA-Z\s]+$/;
    if (!authorRegex.test(formData.author)) {
      setErrorMessage("Author name should only contain alphabets and spaces.");
      return;
    }

    //Review text validation
    if (formData.reviewText.length < 10 || formData.reviewText.length > 1000) {
      setErrorMessage("Review text must be between 10 and 1000 characters.");
      return;
    }

    //Submit book review  data
    try {
      await createReview(formData);
      setSuccessMessage("Review created successfully!");
      setErrorMessage("");
      onSave && onSave();
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setErrorMessage(
        "An error occurred while submitting the review. Please try again."
      );
      setSuccessMessage("");
    }
  };

  //Book review form
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded shadow-md max-w-md mx-auto mt-4"
    >
      {/* Add form  main title */}  
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Add New Review
      </h2>

      {/* Add success and error messages */}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

    {/* Add form field for book title */}
      <div className="mb-3">
        <label className="form-label">Book Title</label>
        <input
          type="text"
          className="form-control border border-black rounded-lg"
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          required
        />

      {/* Add form field for author */}
      </div>
      <div className="mb-3">
        <label className="form-label">Author</label>
        <input
          type="text"
          className="form-control border border-black rounded-lg"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />

     {/* Add form field for rating */}
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <select
          className="form-select border border-black rounded-lg"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          required
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <option key={star} value={star}>
              {star} Star{star > 1 && "s"}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Review Text</label>
        <textarea
          className="form-control border border-black rounded-lg"
          name="reviewText"
          rows="5"
          value={formData.reviewText}
          onChange={handleChange}
          required
        />
      </div>

      {/* Add submit button */}
      <button type="submit" className="btn btn-primary w-full">
        Add Review
      </button>
    </form>
  );
};

export default ReviewForm;
