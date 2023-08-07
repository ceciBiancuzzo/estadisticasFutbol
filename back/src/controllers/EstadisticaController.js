const EstadisticaController = {};
const Estadistica = require("../models/Estadistica");
const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

EstadisticaController.getEstadisticas = async (req, res) => {
  try {
    const estadisticas = await Estadistica.find({})
    
    // mostraJugador;
    .populate("usuario","apellido")
    //console.log("Obteniendo listado de estadisticas...");
    res.send(estadisticas);
  } catch (error) {
    //console.log(error);
    req.status(400).json({
      ok: false,
      message: "No se pudo consultar a la base de datos",
    });
  }
};
//const jugadorId=Estadistica.usuario;


EstadisticaController.createEstadistica = async (req, res) => {
  //Revisar si hay errores

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  const {
    usuario,
    asistencias,
    pases_buenos,
    pases_malos,
    tarjetas_amarillas,
    tarjetas_rojas,
    goles,
    faltas,
    pelotas_recuperadas,
  } = req.body;
  

  const newEstadistica = new Estadistica({
    // usuario:jugadorId,
    usuario,
    asistencias,
    pases_buenos,
    pases_malos,
    tarjetas_amarillas,
    tarjetas_rojas,
    goles,
    faltas,
    pelotas_recuperadas,
  });

  try {

    
    const estadistica = await Estadistica.findOne({
      usuario,
      asistencias,
      pases_buenos,
      pases_malos,
      tarjetas_amarillas,
      tarjetas_rojas,
      goles,
      faltas,
      pelotas_recuperadas,
    });
    if (estadistica) {
      return res.status(400).json({
        msg: " la estadistica ya existe",
      });
    }
    

    await newEstadistica.save();
    res.status(200).json({ msg: "Estadistica creada correctamente" }); //agregado

    // res.status(201).json({
    //   ok: true,
    //   message: `se ha creado el usuario ${nombre}`,
    // });
    // console.log(`se ha creado el usuario ${nombre}`);
  } catch (error) {
   // console.log(error);
    res.status(400).json({
      ok: false,
      message: "No se pudo grabar en la base de datos",
    });
  }
};
EstadisticaController.updateEstadistica = async (req,res) => {
  const {
    usuario,
    asistencias,
    pases_buenos,
    pases_malos,
    tarjetas_amarillas,
    tarjetas_rojas,
    goles,
    faltas,
    pelotas_recuperadas,
  } = req.body;
  //console.log(req.params.id);
  await Estadistica.findByIdAndUpdate(
    { _id: req.params.id },
    {
      usuario,
      asistencias,
      pases_buenos,
      pases_malos,
      tarjetas_amarillas,
      tarjetas_rojas,
      goles,
      faltas,
      pelotas_recuperadas,
    }
  );
  // await User.findOneAndUpdate(req.params.id,{
  // userName,correo,password
  // });
  // console.log(
  //   "se modifico la estadistica: " + req.params.id,
  //   usuario,
  //   asistencias,
  //   pases_buenos,
  //   pases_malos,
  //   tarjetas_amarillas,
  //   tarjetas_rojas,
  //   goles,
  //   faltas,
  //   pelotas_recuperadas
  // );
  res.status(200).json({ msg: "Estadistica actualizada correctamente" });
};

EstadisticaController.getEstadistica = async (req, res) => {
  const estadistica = await Estadistica.findById(req.params.id);

  res.json(estadistica);
 // console.log("obteniendo estadistica: " + req.params.id);
};

EstadisticaController.deleteEstadistica = async (req, res) => {
  try {
    const id = await Estadistica.findByIdAndRemove({ _id: req.params.id });

    res.status(201).json({
      ok: true,
      message: "Se borro la estadistica",
    });
    //console.log(`se elimino id: ${id}`);
  } catch (error) {
   // console.log(error);
    req.status(400).json({
      ok: false,
      message: "No se pudo eliminar de la BD",
    });
  }
 

};


module.exports = EstadisticaController;


