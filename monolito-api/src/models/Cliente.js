const mongoose = require("mongoose");

const ClienteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cliente", ClienteSchema);