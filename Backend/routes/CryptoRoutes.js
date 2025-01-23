const express = require('express');
const Crypto = require('../models/CryptoModel');
const redisClient = require('../db/redis_connection');


const router = express.Router();

// Add cryptocurrency to the database
router.post('/', async (req, res) => {
    try {
        const crypto = new Crypto(req.body);
        const savedCrypto = await crypto.save(); //added
        // await crypto.save();
        await redisClient.setEx(//added
            `crypto:${savedCrypto.name}`,
            3600,
            JSON.stringify(savedCrypto)
        );
        console.log('Added successfully');
        res.status(201).send(savedCrypto);//changed from crypto to savedCrypto
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete cryptocurrency from the database
router.delete('/:id', async (req, res) => {
    console.log('Delete request ID: ', req.params.id);
    try {
        // Find the crypto entry by uuid before deletion
        const cryptoToDelete = await Crypto.findOne({ uuid: req.params.id });

        if (!cryptoToDelete) {
            return res.status(404).send({ message: 'Cryptocurrency not found' });
        }

        // Delete from MongoDB
        const deletedCrypto = await Crypto.deleteOne({ uuid: req.params.id });
        console.log('Delete result: ', deletedCrypto);

        if (deletedCrypto.deletedCount === 0) {
            return res.status(404).send({ message: 'Cryptocurrency not found' });
        }

        // Delete from Redis using the name stored in MongoDB
        await redisClient.del(`crypto:${cryptoToDelete.name}`);
        console.log(`Deleted from Redis: crypto:${cryptoToDelete.name}`);

        res.status(200).send({ message: 'Cryptocurrency deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});


module.exports = router;
