const Universidad = require("../models/Universidad");
const ProyectoRef = require("../models/ProyectoRef"); 

exports.listar = async (req, res) => {
  const data = await Universidad.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.crear = async (req, res) => {
  const { nombre, direccion, telefono } = req.body;
  const creado = await Universidad.create({ nombre, direccion, telefono });
  res.status(201).json(creado);
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  const actualizado = await Universidad.findByIdAndUpdate(id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ message: "Universidad no encontrada" });
  res.json(actualizado);
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;

  const tieneProyectos = await ProyectoRef.exists({ universidadId: id });
  if (tieneProyectos) {
    return res.status(409).json({
      message: "No se puede eliminar la universidad: existen proyectos asociados.",
    });
  }

  const eliminado = await Universidad.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ message: "Universidad no encontrada" });

  res.json({ message: "Universidad eliminada" });
};