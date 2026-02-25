const router = require("express").Router();
const asyncHandler = require("../middleware/asyncHandler");
const c = require("../controllers/universidades.controller");

router.get("/", asyncHandler(c.listar));
router.post("/", asyncHandler(c.crear));
router.put("/:id", asyncHandler(c.actualizar));
router.delete("/:id", asyncHandler(c.eliminar));

module.exports = router;