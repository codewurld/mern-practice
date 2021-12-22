const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 3001
const CountriesModel = require('./models/Countries')

// const dotenv = require('dotenv')

// middleware
app.use(express.json());

// connect MongoDB
mongoose.connect("mongodb://shola:urlshortener@cluster0-shard-00-00.ofmq0.mongodb.net:27017,cluster0-shard-00-01.ofmq0.mongodb.net:27017,cluster0-shard-00-02.ofmq0.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-oov2af-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

app.get("/", async (req, res) => {
    const country = new CountriesModel({
        name: "The Netherlands",
        continent: "Europe",
        visited: true,
    })
    try {
        await country.save();
    } catch (err) {
        console.log(err)
    }
})


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
})