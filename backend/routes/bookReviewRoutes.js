const express = require('express');
const router = express.Router();
const {
//Importing all the functions from the controller
    getReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview,
    
} = require('../controllers/bookReviewController');

//All routes
router.get('/', getReviews);
router.get('/:id', getReviewById);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);


module.exports = router;