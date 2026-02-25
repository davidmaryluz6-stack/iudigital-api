const TipoProyecto = require("../models/TipoProyecto");
const ProyectoRef = require("../models/ProyectoRef");

exports.listar = async (req, res) => {
  const data = await TipoProyecto.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.crear = async (req, res) => {
  const { nombre } = req.body;
  const creado = await TipoProyecto.create({ nombre });
  res.status(201).json(creado);
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  const actualizado = await TipoProyecto.findByIdAndUpdate(id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ message: "Tipo de proyecto no encontrado" });
  res.json(actualizado);
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;

  const tieneProyectos = await ProyectoRef.exists({ tipoProyectoId: id });
  if (tieneProyectos) {
    return res.status(409).json({
      message: "No se puede eliminar el tipo de proyecto: existen proyectos asociados.",
    });
  }

  const eliminado = await TipoProyecto.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ message: "Tipo de proyecto no encontrado" });

  res.json({ message: "Tipo de proyecto eliminado" });
};