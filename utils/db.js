const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const password = encodeURIComponent(`${process.env.DB_PASS}`);
const uri =
  `mongodb+srv://${process.env.DB_USER}:${password}@cluster0.2fdqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};
const db = client.db("SmartBazar");
// run().catch(console.dir);
module.exports = {
  db,
  connectDB,
};
