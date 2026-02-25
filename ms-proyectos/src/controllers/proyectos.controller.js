const Proyecto = require("../models/Proyecto");

exports.listar = async (req, res) => {
  const data = await Proyecto.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.crear = async (req, res) => {
  const creado = await Proyecto.create(req.body);
  res.status(201).json(creado);
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  const actualizado = await Proyecto.findByIdAndUpdate(id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ message: "Proyecto no encontrado" });
  res.json(actualizado);
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;
  const eliminado = await Proyecto.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ message: "Proyecto no encontrado" });
  res.json({ message: "Proyecto eliminado" });
};