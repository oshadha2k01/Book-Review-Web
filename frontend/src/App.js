import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReviewList from "./components/ReviewList";
import ReviewForm from "./components/ReviewForm";
import ReviewEdit from "./components/ReviewEdit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReviewList />} />
        <Route path="/book-review" element={<ReviewForm />} />
        <Route path="/edit-review/:id" element={<ReviewEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
