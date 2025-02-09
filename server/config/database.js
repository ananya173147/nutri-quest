require('dotenv').config();
const mongoose = require('mongoose');
const mongoURI = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
/*const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});*/

async function connectDB() {
  try {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'HackNC' })
    .then(() => {
      console.log('Connected to MongoDB Atlas');
    })
  } catch (err) {
    console.log('Error connecting to MongoDB Atlas:', err);
  }
}

module.exports = { connectDB };