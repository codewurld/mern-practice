const mongoose = require('mongoose');

// create Schema
const FoodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
    },
    spicy: {
        type: Boolean,
        required: true,
    },
    portions: {
        type: Number,
    }
});

// connect Schema to DB
const Food = mongoose.model('Food', FoodSchema);

// export Schema for global access
module.exports = Food;
