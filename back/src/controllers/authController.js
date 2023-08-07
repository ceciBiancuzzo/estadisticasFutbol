const authController = {};
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

authController.autenticarUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const { correo, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    let usuario = await Usuario.findOne({ correo });
    /*  if (!usuario){
        return res.status(400).json({msg:'El usuario no existe'},console.log('El usuario no existe'))
      } */
    //revisar el password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);

    if (!passCorrecto) {
      return res.status(400).json({ msg: "El Password es incorrecto" });
    }

    res.json(usuario);
  } catch (error) {
    console.log(error);
  }
};

module.exports = authController;
