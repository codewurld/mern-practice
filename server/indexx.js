const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8088;
const CountryModel = require('./models/Countries')

// middleware
app.use(express.json());

// connect to MongoDB
mongoose.connect("mongodb://sholaqq:mongotest@test-for-mongo-shard-00-00.s1ugo.mongodb.net:27017,test-for-mongo-shard-00-01.s1ugo.mongodb.net:27017,test-for-mongo-shard-00-02.s1ugo.mongodb.net:27017/touristCountry?ssl=true&replicaSet=atlas-3cqyf6-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

// add to DB
app.get("/", async (req, res) => {
    const country = new CountryModel(
        {
            countryName: "Italy",
            visited: true,
            timesVisited: 1
        })
    try {
        await country.save()
        res.send("data inserted")
    } catch (err) {
        console.log(err);
    }
})


app.listen(PORT, () => {
    console.log(`Server now running on PORT ${PORT}`)
})
