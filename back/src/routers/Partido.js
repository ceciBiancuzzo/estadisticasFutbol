const { Router } = require("express");
const router = Router();
const {
  getPartidos,
  createPartido,
  updatePartido,
  getPartido,
  deletePartido,
} = require("../controllers/PartidoController");


router
  .route("/")
  .get(getPartidos)
  .post(
    
    createPartido
  );

router.route("/:id").get(getPartido)
.put(updatePartido)
.delete(deletePartido);

module.exports = router;
