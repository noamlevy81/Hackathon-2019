const express = require("express")
const router = express.Router()
const Event = require('../database/mongodb/models/event')
const mongoose = require('mongoose')

router.post('/', (req, res) => {
    const event= new Event({
        _id: mongoose.Types.ObjectId(),
        location: req.body.location,
        name: req.body.name,
        category: req.body.category,
        maxCapacity: req.body.maxCapacity,
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
                //adminUser: result.adminUser,
                name: result.name,
                category: result.category,
                maxCapacity: result.maxCapacity,
                //participantsNum : result.participantsNum,
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
    
    const longtitude = req.query.longtitude
    const latitude = req.query.latitude
    Event.find({location:[longtitude,latitude]})
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

router.get('/in-radius',(req,res) =>{
    const longtitude = req.query.longtitude
    const latitude = req.query.latitude
    Event.find()
    .exec()
    .then()
    .catch()
})

/*

   Street.find(
        {
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: coords,
                    },
                    $maxDistance: maxDistance,
                    $minDistance: minDistance,
                },
            },
        })
*/

module.exports = router


