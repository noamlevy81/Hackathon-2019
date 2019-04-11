const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Profile = require('../database/mongodb/models/profile')
const Event = require('../database/mongodb/models/event')
const mongoose = require('mongoose')
require('dotenv').config()


exports.enroll = (req, res) => {
    Event.findById(req.query.id).exec()
    .then(event => {
        if(event.maxCapacity === event.participants.length){
            return res.status(401).json({error: 'Event reached maximum capacity'})
        }
        else {
            Profile.findOne({email: jwt.decode(req.headers.authorization.split(" ")[1]).email}).exec()
            .then(profile => {
                if(event.participants.contains(profile._id) || event.adminUser === profile._id){
                    return res.status(409).json({message: "cannot join to already enrolled event"})
                }
                profile.attendingEvents.push(event._id) 
                event.participants.push(profile._id)
                res.status(200).json({message: `user id ${profile._id} enrolled to event id ${event._id}`})
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            })
        }
    })
}

exports.login = (req, res) => {
    Profile.findOne({ email: req.body.email })
    .exec()
    .then(profile => {
        if (profile === null) {
            return res.status(401).json({
                
                message: "Authentication failed"
            })
        }
        bcrypt.compare(req.body.password, profile.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Authentication failed"
                })
            }
            if(result) {
                const token = jwt.sign({
                    email: profile.email,
                    userId: profile._id
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "24h"
                })
                return res.status(200).json({
                    message: "Authentication successful",
                    token: token
                })
            }
            res.status(401).json({
                message: "Authentication failed"
            })
        })
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}

exports.signup = (req, res) => {
    Profile.findOne({ email: req.body.email })
    .exec()
    .then(profile => {
        if (profile !== null) {
            return res.status(409).json({
                message: "Mail already exists"
            })
        } 
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } 
                else {
                    const profile = new Profile({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash,
                        adminEvents: new Array(),
                        attendingEvents: new Array(),
                        pendingEvents: new Array(),
                    })
                    profile.save()
                    .then(result => {
                        res.status(201).json({
                            message: "User created sucessfuly"
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({
                            error: err
                        })
                    })
                }
            })
        }
    })
}

exports.getEvents = (req, res) => {
    
    let requestType
    if('attending' in req.query) {
        requestType = attendingEvents
    }
    else if('admin' in req.query) {
        requestType = adminEvents
    }
    Profile.findOne({email: jwt.decode(req.headers.authorization.split(" ")[1]).email}).exec()
    .then((profile) => {
        if(profile !== null) {
            return res.status(201).json({adminEvents: profile[`${requestType}`]})
        }
        else {
            return res.status(500).json({message: 'profile doesn\'t exist'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}