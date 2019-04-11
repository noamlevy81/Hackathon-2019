const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Profile = require('../database/mongodb/models/profile')
const mongoose = require('mongoose')
require('dotenv').config()

router.post("/signup", (req, res) => {
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
                        //adminEvents:,
                        //attendingEvents:,
                        //pendingEvents:,
                        age:req.body.age
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
})

router.post('/login', (req, res) => {
    Profile.findOne({ email: req.body.email })
    .exec()
    .then(profile => {
        if (profile === null) {
            return res.status(401).json({
                message: "Auth failed"
            })
        }
        bcrypt.compare(req.body.password, profile.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Auth failed"
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
                        expiresIn: "1h"
                    })
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    })
                }
                res.status(401).json({
                    message: "Auth failed"
                })
            })
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
module.exports = router