const mongoose = require("mongoose");

const UniversidadSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, unique: true },
    direccion: { type: String, required: true, trim: true },
    telefono: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Universidad", UniversidadSchema);