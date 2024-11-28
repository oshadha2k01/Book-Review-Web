const mongoose = require('mongoose');

const connectionDatabse = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectionDatabse;
