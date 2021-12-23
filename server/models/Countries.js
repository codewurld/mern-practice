const mongoose = require('mongoose');

// create schema
const CountriesSchema = new mongoose.Schema({
    countryName: {
        type: String,
        required: true,
    },
    visited: {
        type: Boolean,
        required: true,
    },
    timesVisited: {
        type: Number,
        required: false,
    },
});

// connect schema to DB

const Country = mongoose.model('countries', CountriesSchema);

// export schema for global access
module.exports = Country;