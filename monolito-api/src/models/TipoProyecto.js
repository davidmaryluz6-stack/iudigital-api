const mongoose = require("mongoose");

const TipoProyectoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TipoProyecto", TipoProyectoSchema);