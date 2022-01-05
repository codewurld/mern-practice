const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = 8089;
const CountryModel = require('./models/Countries')

// middleware allows parsing of objects from front end into JSON objects
app.use(express.json());
app.use(cors());

// connect to MongoDB
mongoose.connect("mongodb://sholaqq:mongotest@test-for-mongo-shard-00-00.s1ugo.mongodb.net:27017,test-for-mongo-shard-00-01.s1ugo.mongodb.net:27017,test-for-mongo-shard-00-02.s1ugo.mongodb.net:27017/touristCountry?ssl=true&replicaSet=atlas-3cqyf6-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
})

// add to DB
app.post("/addvisit", async (req, res) => {

    // get dynamic access to objects from front end passed through axios:
    // then pass dynamically into new CountryModel

    const countryName = req.body.countryName;
    const timesVisited = req.body.timesVisited;

    const country = new CountryModel(
        {
            countryName: countryName,
            timesVisited: timesVisited
        });
    try {
        await country.save()
        res.send("data inserted")
    } catch (err) {
        console.log(err);
    }
})

// display information from DB
app.get("/display", async (req, res) => {

    // empty object gets all results
    // to specify result => {$where: {countryName: "The Netherlands"}
    CountryModel.find({}, (err, result) => {
        if (err) {
            res.send(err)
        }
        // if no error display data
        res.send(result);
    })

});


// update post
app.put("/update", async (req, res) => {

    // get dynamic access to objects from front end passed through axios:
    // then pass dynamically into new CountryModel

    const newCountryName = req.body.newCountryName;
    const id = req.body.id;

    // find specific country by its id and change the country name to the newCountryName
    try {
        await CountryModel.findById(id, (err, updatedCountry) => {
            updatedCountry.countryName = newCountryName;
            updatedCountry.save();
            res.send("data updated")
        });
    } catch (err) {
        console.log(err);
    }
})

app.delete("/delete/:id", async (req, res) => {
    // id is derived from parameters in our request
    const id = req.params.id;

    // findById --> mongoose methods
    await CountryModel.findByIdAndRemove(id).exec();
    res.send("Country Deleted");
})


app.listen(PORT, () => {
    console.log(`Server now running on PORT ${PORT}`)
})
