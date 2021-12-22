const mongoose = require('mongoose');



// connect MONGODB
const connectDB = async () => {
    mongoose.connect(MONGO_DB, () => {
        useNewUrlParser: true,
            useUnifiedTopology: true,
    })

}
