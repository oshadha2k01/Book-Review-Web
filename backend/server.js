const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectionDatabse = require('./config/database');
const bookReviewRoutes = require('./routes/bookReviewRoutes');

dotenv.config();
connectionDatabse();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/reviews', bookReviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
