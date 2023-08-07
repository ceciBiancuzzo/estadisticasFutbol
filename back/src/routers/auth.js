//Ruta para autenticar al usuario
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {autenticarUsuario} = require("../controllers/authController");
router.post('/',
  [
    check("correo", "Agrega un correo valido").isEmail(),
    check("password", "El password debe ser minimi de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  autenticarUsuario
);

module.exports = router;
