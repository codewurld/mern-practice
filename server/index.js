const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8081
const FoodModel = require('./models/Food')

// const dotenv = require('dotenv')

// middleware - allows us to receive info in json format from the frontend
app.use(express.json());

// connect MongoDB
mongoose.connect("mongodb://sholaq:testtest@food-shard-00-00.kivqf.mongodb.net:27017,food-shard-00-01.kivqf.mongodb.net:27017,food-shard-00-02.kivqf.mongodb.net:27017/food?ssl=true&replicaSet=atlas-s95yql-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

app.get("/", async (req, res) => {
    const food = new FoodModel({
        foodName: "Tuna Toast",
        spicy: false,
        portions: 2,
    })
    try {
        await food.save();
        res.send("data inserted")
    } catch (err) {
        console.log(err)
    }
})


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})