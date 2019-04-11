const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    location: {
        type: [Number],
        index: '2dsphere',
      },
    adminUser: { type:String }, // access token
    name: { type: String },
    category:{ type: String },
    maxCapacity: { type: Number },
    participants: { type: [String] }, // each string is a profile id
    description: { type: String },
    equipment: { type: [String] }

});

module.exports = mongoose.model('Event', eventSchema);

