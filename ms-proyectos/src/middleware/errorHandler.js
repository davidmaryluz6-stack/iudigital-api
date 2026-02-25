// ms-proyectos/src/middleware/errorHandler.js

function notFound(req, res, next) {
  res.status(404).json({
    message: `Ruta no encontrada: ${req.method} ${req.originalUrl}`,
  });
}

function errorHandler(err, req, res, next) {
  console.error("❌ Error:", err);

  if (res.headersSent) return next(err);

  let status = err.statusCode || err.status || 500;
  let message = err.message || "Error interno del servidor";

  // Mongoose/Mongo comunes
  if (err.name === "CastError") {
    status = 400;
    message = "ID inválido";
  }

  if (err.name === "ValidationError") {
    status = 400;
    return res.status(status).json({
      message: "Error de validación",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    status = 409;
    const campo = Object.keys(err.keyValue || {})[0] || "campo";
    const valor = (err.keyValue && err.keyValue[campo]) || "";
    message = `Ya existe un registro con ${campo}: ${valor}`;
  }

  res.status(status).json({ message });
}

module.exports = { notFound, errorHandler };