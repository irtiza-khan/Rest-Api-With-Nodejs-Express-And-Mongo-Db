const express = require('express');
const router = express.Router();
const Subcriber = require('../modals/subscriber');
//! CRUD RESTFUL API WITH MONGO DB

//Getting all
router.get('/', async(req, res) => {
    try {
        const subscriber = await Subcriber.find();
        res.json(subscriber);

    } catch (error) {
        res.status(500).json({ message: error.message });

    }

})

//Getting One
router.get('/:id', async(req, res) => {
    const id = req.params.id;
    try {
        const subscriber = await Subcriber.findOne({ _id: id });
        if (subscriber === null) {
            return res.status(404).json({ message: 'Cant Find Subscriber' });
        } else {
            res.send(subscriber.name);
        }


    } catch (error) {
        res.status(500).json({ messsage: error.message })

    }

})

//Creating one
router.post('/', (req, res) => {

    const { name, channel } = req.body;
    const newSubscriber = new Subcriber({
        name: name,
        channel: channel
    });

    newSubscriber.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch((err) => {
            res.status(401).json({ message: err.message });
        })


})

//Updating one
router.patch('/:id', getSubcribers, async(req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name;

    }
    if (req.body.channel != null) {
        res.subscriber.channel = req.body.channel;
    }

    try {
        const updateSubscriber = await res.subscriber.save();
        res.json(updateSubscriber);
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

})

//Deleting one
router.delete('/:id', getSubcribers, async(req, res) => {
    try {
        await res.subscriber.remove();
        res.json({ message: 'Record Delete From Database' })
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

})


async function getSubcribers(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subcriber.findById(req.params.id);
        if (!subscriber) {
            return res.status(404).json({ message: 'Cant Find Subscriber' });
        }

    } catch (error) {
        res.status(500).json({ messsage: error.message })

    }
    res.subscriber = subscriber;
}
module.exports = router;