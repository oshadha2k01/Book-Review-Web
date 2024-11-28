const BookReview = require('../models/Review');

// Get all book reviews entered
const getReviews = async (req, res) => {
    const reviews = await BookReview.find();
    res.status(200).json(reviews);
};

//Get book review by ID
const getReviewById = async (req, res) => {
    const { id } = req.params; 

    try {
        
        const review = await BookReview.findById(id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        return res.status(200).json(review); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' }); 
    }
};

// Create  new book review
const createReview = async (req, res) => {
    const { bookTitle, author, rating, reviewText } = req.body;
    const review = await BookReview.create({ bookTitle, author, rating, reviewText });
    res.status(201).json(review);
};

// Update enter book review
const updateReview = async (req, res) => {
    const { id } = req.params;
    try {
        const review = await BookReview.findByIdAndUpdate(id, req.body, { new: true });
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Error updating review", error });
    }
};


// Delete the entered book review
const deleteReview = async (req, res) => {
    const { id } = req.params;
    await BookReview.findByIdAndDelete(id);
    res.status(204).send();
};




module.exports = { getReviews, getReviewById, createReview, updateReview, deleteReview };
