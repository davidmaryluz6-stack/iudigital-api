const Cliente = require("../models/Cliente");
const ProyectoRef = require("../models/ProyectoRef"); 

exports.listar = async (req, res) => {
  const data = await Cliente.find().sort({ createdAt: -1 });
  res.json(data);
};

exports.crear = async (req, res) => {
  const { nombre, email } = req.body;
  const creado = await Cliente.create({ nombre, email });
  res.status(201).json(creado);
};

exports.actualizar = async (req, res) => {
  const { id } = req.params;
  const actualizado = await Cliente.findByIdAndUpdate(id, req.body, { new: true });
  if (!actualizado) return res.status(404).json({ message: "Cliente no encontrado" });
  res.json(actualizado);
};


exports.eliminar = async (req, res) => {
  const { id } = req.params;

  // Bloquear si hay proyectos asociados
  const tieneProyectos = await ProyectoRef.exists({ clienteId: id });
  if (tieneProyectos) {
    return res.status(409).json({
      message: "No se puede eliminar el cliente: existen proyectos asociados.",
    });
  }

  const eliminado = await Cliente.findByIdAndDelete(id);
  if (!eliminado) return res.status(404).json({ message: "Cliente no encontrado" });

  res.json({ message: "Cliente eliminado" });
};