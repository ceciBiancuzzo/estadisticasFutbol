const UsuarioController = {};
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
UsuarioController.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({});
   // console.log("Obteniendo listado de usuarios...");
    res.send(usuarios);
  } catch (error) {
   // console.log(error);
    req.status(400).json({
      ok: false,
      message: "No se pudo consultar a la base de datos",
    });
  }
};
UsuarioController.createUsuario = async (req, res) => {
  //Revisar si hay errores

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const newUsuario = new Usuario(req.body);

  const { nombre, password, correo,apellido,dni,imagen } = newUsuario;

  try {
    let user = await Usuario.findOne({ correo });
    if (user) {
      return res
        .status(400)
        .json( {
          msg: " EL usuario ya existe",
        });
    }
    const salt = await bcryptjs.genSalt(10);
    newUsuario.password = await bcryptjs.hash(password, salt);

    await newUsuario.save();

    //crear y firmar JWT
    const payload = {
      usuario:{
        id:newUsuario.id
      }
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error,token) => {
        if (error) throw error;
        res.json({ token });
      }
    );

    // res.status(201).json({
    //   ok: true,
    //   message: `se ha creado el usuario ${nombre}`,
    // });
    // console.log(`se ha creado el usuario ${nombre}`);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: "No se pudo grabar en la base de datos",
    });
  }
};
UsuarioController.updateUsuario = async (req) => {
  const { nombre, correo,apellido,dni } = req.body;
 // console.log(req.params.id);
  await Usuario.findByIdAndUpdate(
    { _id: req.params.id },
    {
      nombre,
      correo,
      apellido,
      dni,

    }
  );
  // await User.findOneAndUpdate(req.params.id,{
  // userName,correo,password
  // });
  //console.log("se modifico usuario: " + req.params.id,nombre,correo,apellido,dni);
};

UsuarioController.getUsuario = async (req, res) => {
  const usuario = await Usuario.findById(req.params.id);

  res.json(usuario);
//  console.log("obteniendo usuario: " + req.params.id);
};

UsuarioController.deleteUsuario = async (req, res) => {
  try {
    const id = await Usuario.findByIdAndRemove({ _id: req.params.id });

    res.status(201).json({
      ok: true,
      message: "Se borro un usuario",
    });
   // console.log(`se elimino id: ${id}`);
  } catch (error) {
   //console.log(error);
    req.status(400).json({
      ok: false,
      message: "No se pudo eliminar de la BD",
    });
  }
};

module.exports = UsuarioController;
