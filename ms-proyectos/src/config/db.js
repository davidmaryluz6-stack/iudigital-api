const mongoose = require("mongoose");

async function connectDB(uri) {
  if (!uri) throw new Error("MONGO_URI no está definida");

  mongoose.set("strictQuery", true);

  await mongoose.connect(uri);
  console.log("✅ MongoDB conectado");
}

module.exports = { connectDB };