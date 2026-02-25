const mongoose = require("mongoose");

const ProyectoSchema = new mongoose.Schema(
  {
    numero: { type: Number, required: true, unique: true },
    titulo: { type: String, required: true, trim: true },
    fechaIniciacion: { type: Date, required: true },
    fechaEntrega: { type: Date, required: true },
    valor: { type: Number, required: true },

    clienteId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Cliente" },
    tipoProyectoId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "TipoProyecto" },
    universidadId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Universidad" },
    etapaId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Etapa" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proyecto", ProyectoSchema);