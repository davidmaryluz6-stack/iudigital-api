const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const { notFound, errorHandler } = require("./middleware/errorHandler");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => res.json({ ok: true, service: "monolito-api" }));

app.use("/api/clientes", require("./routes/clientes.routes"));
app.use("/api/universidades", require("./routes/universidades.routes"));
app.use("/api/etapas", require("./routes/etapas.routes"));
app.use("/api/tipos-proyecto", require("./routes/tiposProyecto.routes"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;