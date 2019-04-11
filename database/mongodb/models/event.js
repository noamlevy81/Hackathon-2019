const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    location: { type: [Number, Number] },
    adminUser: { type:String }, // acsses token
    name: { type: String },
    category:{ type: String },
    maxCapacity: { type: Number },
    participants: { type: [String] }, // each string is a profile id
    description: { type: String },
    equipment: { type: [String] }

});

module.exports = mongoose.model('event', eventSchema);

