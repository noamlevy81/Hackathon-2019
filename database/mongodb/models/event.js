const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    location: { type: [Number, Number] },
    adminUser: { type:String },
    name: { type: String },
    category:{ type: String },
    maxCapacity: { type: Number },
    participantsNum : { type: Number },
    description: { type: String },
    equipment: { type: [String] }

});

module.exports = mongoose.model('event', eventSchema);

