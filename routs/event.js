const express = require("express")
const router = express.Router()
const Event = require('../database/mongodb/models/event')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Profile = require('../database/mongodb/models/profile')

router.post('/', (req, res) => {
    Profile.findOne({email: jwt.decode(req.headers.authorization.split(" ")[1]).email}).exec().then(profile => {
        const event= new Event({
            _id: mongoose.Types.ObjectId(),
            location: [req.body.long, req.body.lat],
            adminUser: profile._id,
            name: req.body.name,
            category: req.body.category,
            maxCapacity: req.body.maxCapacity,
            participants: null,
            description: req.body.description,
            equipment: req.body.equipment,
        })
        return event.save()
        .then((result) => {
            res.status(201).json({
                message: "event created sucessfuly",
                createdOrder: {
                    _id: new mongoose.Types.ObjectId(),
                    location: result.location,
                    adminUser: profile._id,
                    name: result.name,
                    category: result.category,
                    maxCapacity: result.maxCapacity,
                    participants: null,
                    description: result.description,
                    equipment: result.equipment,
                },
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    })
})

router.get('/', (req, res) => {
    Event.find()
    .exec()
    .then(events => {
        res.status(200).json({
            count: events.length,
            events: events,
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:coordinates', (req, res) => {
    
    const {longtitude, latitude} = req.query.coordinates 
    Event.find()
    .exec()
    .then(events => {
        res.status(200).json({
            count: events.length,
            events: events,
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router


