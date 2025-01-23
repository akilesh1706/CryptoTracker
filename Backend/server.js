const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const cryptoRoutes = require('./routes/CryptoRoutes');
const connectToMongoDB = require('./db/mongodb_connection');
const redisClient = require('./db/redis_connection');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/currencies', cryptoRoutes);

const startServer = async () => {
    // await connectToMongoDB();
    // const PORT = process.env.PORT || 5000;
    // app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
    try {
        await connectToMongoDB();
        redisClient.connect().then(() => {
            console.log('Redis connected successfully');
            const PORT = process.env.PORT || 5000;
            app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
        }).catch((err) => {
            console.error('Failed to connect to Redis:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
};
startServer();