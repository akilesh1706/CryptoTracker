const mongoose = require('mongoose');

const connectToMongoDB = async() => {
    try {
        await mongoose.connect('mongodb://root:example@52.221.255.84:27017/CryptoDB_Collection?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');        
    } catch (error) {
        console.error('MongoDB connection error', error);
    }
};

module.exports = connectToMongoDB;
