const mongoose = require("mongoose");
const Event = require('../database/mongodb/models/event')
const jwt = require('jsonwebtoken')
const Profile = require('../database/mongodb/models/profile')

exports.postEvent = (req, res) => {
    Profile.findOne({email: jwt.decode(req.headers.authorization.split(" ")[1]).email}).exec()
    .then(profile => {
        if(req.headers.authorization === null) {
            res.status(res.status(500).json({
                error: 'no access token exists'
            }))
        }
        else {
            const event= new Event({
                _id: mongoose.Types.ObjectId(),
                location: [req.body.long, req.body.lat],
                adminUser: profile._id,
                name: req.body.name,
                category: req.body.category,
                maxCapacity: req.body.maxCapacity,
                participants: new Array(),
                description: req.body.description,
                equipment: req.body.equipment,
                
            })
            event.save()
            .then((result) => {
                res.status(201).json({
                    message: "event created sucessfuly",
                    createdEvent: {
                        _id: new mongoose.Types.ObjectId(),
                        location: result.location,
                        adminUser: profile._id,
                        name: result.name,
                        category: result.category,
                        maxCapacity: result.maxCapacity,
                        participants: new Array(),
                        description: result.description,
                        equipment: result.equipment,
                    },
                })
                profile.adminEvents.push(result._id)
                profile.save()
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
        }
    })
}

exports.getEvent = (req,res) => {
    
    // get event by id
    if ('id' in req.query) {
        const eventId = req.query.id
        return Event.findById(eventId).exec()
        .then(event => {
            res.status(201).json({
                event: event
            })
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            })
        })
    }
    
    // get all events by radius
    else if('long' in req.query && 'lat' in req.query && 'radius' in req.query) {
        const coords = [req.query.long,req.query.lat]
        const radius = req.query.radius
        return Event.find({location: {
            $near:{
                $geometry:{
                    type: 'Point',
                    coordinates: coords,
                },
                $maxDistance: radius
            }
        }})
        .exec()
        .then((events)=> {
            res.status(200).json({
                count: events.length,
                events: events.map((event) => event._id),
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
    else if ('key' in req.query)
    {
        var query = {}
        query[req.query.key] = req.query.val
        return Event.find(query).exec().then(events =>{
            res.status(200).json({
                count: events.length,
                events: events.map((event) => event._id),
            });
        })
        
        .catch(err =>{
            res.status(500).json({
                error:err
            })
        })
    }
    // get all events
    else {
        return Event.find()
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
    }
}
