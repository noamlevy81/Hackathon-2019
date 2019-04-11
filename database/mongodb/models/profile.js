const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
      //  required: true, 
      //  unique: true, 
       // match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String },
    adminEvents:{ type:[String] },
    attendingEvents:{ type:[String] },
    pendingEvents:{ type:[String] },
});

module.exports = mongoose.model('Profile', profileSchema);

