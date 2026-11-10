const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "real_state" });
    console.log("Database Connected ...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database Disconnected ...");
  } catch (error) {
    console.error(error.message);
  }
};

const handleShutdown = async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed through app termination");
  process.exit(0);
};

process.on("SIGINT", handleShutdown); // For Ctrl+C
process.on("SIGTERM", handleShutdown);

module.exports = { connectDB, disconnectDB };
