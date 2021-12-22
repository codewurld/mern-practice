const mongoose = require('mongoose');

// create Schema
const countriesSchema = new mongoose.Schema({
    country: {
        name: String,
        continent: String,
        visited: Boolean,
        required: true
    }
})

// connect Schema to DB
const Countries = mongoose.model('countries', countriesSchema);

// export Schema for global access
module.exports = Countries;
