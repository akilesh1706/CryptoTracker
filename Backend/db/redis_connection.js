const redis = require('redis');
require('dotenv').config();

const redisClient = redis.createClient({
    // host: '127.0.0.1',
    // port: 6379,

    //url: 'redis://127.0.0.1:6379',
    url: 'redis://18.143.107.83:6379',
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
    console.log('Redis error: ', err);
});

module.exports = redisClient;
