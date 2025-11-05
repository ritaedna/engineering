const mongoose = require("mongoose");

console.log("🔹 Node is running testMongo.js!");

// MongoDB connection string (straight quotes only)
const mongoURI = "mongodb+srv://ritaedna6_db_user:is3PxQyLbZLZKxy9@cluster0.cnldtwg.mongodb.net/ognordest?retryWrites=true&w=majority";

console.log("🔹 Attempting to connect to MongoDB...");

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed!");
    console.error("Error details:", err);
    process.exit(1);
  });

