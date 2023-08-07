const { Router } = require("express");
const router = Router();
const {
  getUsuarios,
  createUsuario,
  updateUsuario,
  getUsuario,
  deleteUsuario,
} = require("../controllers/UsuarioController");
const { check } = require("express-validator");

router
  .route("/")
  .get(getUsuarios)
  .post(
    [check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "Agrega un correo valido").isEmail(),
    check("password", "El password debe ser minimi de 6 caracteres").isLength({min:6})
],
    createUsuario
  );

router.route("/:id").get(getUsuario).put(updateUsuario).delete(deleteUsuario);

module.exports = router;
