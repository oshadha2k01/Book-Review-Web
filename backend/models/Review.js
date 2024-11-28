//Book review mongodb schema
const mongoose = require('mongoose');

const BookReviewSchema = new mongoose.Schema({
    bookTitle: { type: String, required: true },
    author: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Review', BookReviewSchema);
