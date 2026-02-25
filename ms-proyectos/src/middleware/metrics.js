// ms-proyectos/src/middleware/metrics.js

const metrics = {
  startedAt: new Date().toISOString(),
  totalRequests: 0,
  byRoute: {}, // key: "GET /api/proyectos"
};

function metricsMiddleware(req, res, next) {
  metrics.totalRequests += 1;

  // Usa baseUrl + path para tener algo estable
  const routeKey = `${req.method} ${req.baseUrl || ""}${req.path || ""}`.trim();

  metrics.byRoute[routeKey] = (metrics.byRoute[routeKey] || 0) + 1;

  next();
}

function getMetrics() {
  return metrics;
}

module.exports = { metricsMiddleware, getMetrics };