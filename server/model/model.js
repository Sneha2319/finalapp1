const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    main_complaint : {
        type: String,
        required: true
    },
    past_history : {
        type: String,
        required: true
    },
    bp : {
        type: String,
        required: true
    },
    pulse_rate : {
        type: String,
        required: true
    },
    lmp : {
        type: Date,
    },
    investigation : {
        type: String
    },
    treatment_given : {
        type: String
    }
    
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;