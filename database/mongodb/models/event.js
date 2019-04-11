const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    location: { type: [Number, Number], required : true },
    adminUser: { type:String, required: true },
    name: { type: String, required: true },
    Category:{ type: String, required: true },
    maxCapacity: { type: Number },
    participantsNum : { type: Number },
    description: { type: String },
    equipment: { type: [String] }

});

module.exports = mongoose.model('event', eventSchema);

