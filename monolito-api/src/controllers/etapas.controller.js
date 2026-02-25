const Etapa = require("../models/Etapa");
const ProyectoRef = require("../models/ProyectoRef"); 

exports.listar = async (req, res) => {
  const data = await Etapa.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.crear = async (req, res) => {
  const { nombre } = req.body;
  const creado = await Etapa.create({ nombre });
  res.status(201).json(creado);
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  const actualizado = await Etapa.findByIdAndUpdate(id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ message: "Etapa no encontrada" });
  res.json(actualizado);
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;

  const tieneProyectos = await ProyectoRef.exists({ etapaId: id });
  if (tieneProyectos) {
    return res.status(409).json({
      message: "No se puede eliminar la etapa: existen proyectos asociados.",
    });
  }

  const eliminado = await Etapa.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ message: "Etapa no encontrada" });

  res.json({ message: "Etapa eliminada" });
};