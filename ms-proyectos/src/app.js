const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const os = require("os"); // ✅ ADD

const { metricsMiddleware, getMetrics } = require("./middleware/metrics");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health
app.get("/health", (req, res) => res.json({ ok: true, service: "ms-proyectos" }));

// ✅ Whoami (para evidenciar balanceo)
app.get("/whoami", (req, res) =>
  res.json({
    ok: true,
    service: "ms-proyectos",
    host: os.hostname(),
  })
);

// Metrics (antes de las rutas para contar todo)
app.use(metricsMiddleware);

// Endpoint para ver métricas
app.get("/metrics", (req, res) => res.json(getMetrics()));

// Rutas de negocio
app.use("/api/proyectos", require("./routes/proyectos.routes"));

// 404 + errores
app.use(notFound);
app.use(errorHandler);

module.exports = app;