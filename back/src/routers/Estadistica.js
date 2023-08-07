const { Router } = require("express");
const router = Router();
const {
  getEstadisticas,
  createEstadistica,
  updateEstadistica,
  getEstadistica,
  deleteEstadistica,
} = require("../controllers/EstadisticaController");


router
  .route("/")
  .get(getEstadisticas)
  .post(
    
    createEstadistica
  );

router.route("/:id").get(getEstadistica)
.put(updateEstadistica)
.delete(deleteEstadistica);

module.exports = router;
