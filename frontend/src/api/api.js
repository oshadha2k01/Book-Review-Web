import axios from 'axios';

//API URL
const API_URL = 'http://localhost:5000/reviews';

//API functions to interact with backend
export const getReviews = async () => await axios.get(API_URL);
export const getReviewById = async (id) => await axios.get(`${API_URL}/${id}`);
export const createReview = async (data) => await axios.post(API_URL, data);
export const updateReview = async (id, data) => await axios.put(`${API_URL}/${id}`, data);
export const deleteReview = async (id) => await axios.delete(`${API_URL}/${id}`);
