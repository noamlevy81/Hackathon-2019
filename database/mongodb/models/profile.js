const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String,require:true},
    adminEvents:{type:String,require:true},
    attendingEvents:{type:String,require:true},
    pendingEvents:{type:String,require:true},
    age:Number

});

module.exports = mongoose.model('Profile', profileSchema);

