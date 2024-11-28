import React, { useEffect, useState } from 'react';
import { getReviews } from '../api/api';
import ReviewItem from './ReviewItem';
import { useNavigate } from 'react-router-dom';

const ReviewList = () => {
    // Initialize state variables
    const [reviews, setReviews] = useState([]);
    const [notification, setNotification] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); 

    // Initialize navigate function
    const navigate = useNavigate();

    // Fetch all book reviews
    useEffect(() => {
        const fetchReviews = async () => {
            const { data } = await getReviews();
            setReviews(data);
        };
        fetchReviews();
    }, []);

    // Handle delete  book review
    const handleDelete = (id) => {
        setReviews(reviews.filter((review) => review._id !== id));
        setNotification('Review deleted successfully!');

        setTimeout(() => {
            setNotification('');
        }, 3000);
    };

    // Searching and filtering book reviews using book title
    const filteredReviews = reviews.filter((review) =>
        review.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

   //Book review list
    return (
        <div className="container my-4 p-6 rounded-md lavender-bg">
            <div className="d-flex justify-content-between align-items-center mb-4">

                {/* Add main title */}
                <h1 className="text-2xl font-semibold text-center">Book Reviews Web</h1>

                {/* Add button to navigate to add book review form */}
                <button
                    className="btn btn-primary"
                    onClick={() => navigate('/book-review')}
                >
                    Add Review
                </button>
            </div>

            {/* Add search bar */}
            <div className="mb-4 rounded-md">
                <input
                    type="text"
                    placeholder="Search by Book Title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control border border-black"
                />
            </div>
            
            {/* Add success notification */}
            {notification && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {notification}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setNotification('')}
                    ></button>
                </div>
            )}
            
            {/*  View book reviews */}
            <div className="row">
                {filteredReviews.length > 0 ? (
                    filteredReviews.map((review) => (
                        
                        <div key={review._id} className="col-md-6 col-lg-4 mb-4">
                            <ReviewItem review={review} onDelete={handleDelete} />
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p className="text-center text-muted">No reviews found!!!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewList;
