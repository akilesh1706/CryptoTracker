const mongoose = require('mongoose');

const connectToMongoDB = async() => {
    try {
        await mongoose.connect('mongodb://root:example@13.229.81.168:27017/CryptoDB_Collection?authSource=admin', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');        
    } catch (error) {
        console.error('MongoDB connection error', error);
    }
};

module.exports = connectToMongoDB;
