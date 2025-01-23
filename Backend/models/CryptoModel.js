const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    uuid: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    marketCap: { type: String, required: true },
});


module.exports = mongoose.model('Crypto', CryptoSchema);