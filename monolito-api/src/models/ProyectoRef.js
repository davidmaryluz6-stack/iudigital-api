const mongoose = require("mongoose");

// Solo para consultar la colección "proyectos" del microservicio
const ProyectoRefSchema = new mongoose.Schema(
  {
    numero: Number,
    titulo: String,
    fechaIniciacion: Date,
    fechaEntrega: Date,
    valor: Number,
    clienteId: mongoose.Schema.Types.ObjectId,
    tipoProyectoId: mongoose.Schema.Types.ObjectId,
    universidadId: mongoose.Schema.Types.ObjectId,
    etapaId: mongoose.Schema.Types.ObjectId,
  },
  { collection: "proyectos", timestamps: true }
);

module.exports = mongoose.model("ProyectoRef", ProyectoRefSchema);