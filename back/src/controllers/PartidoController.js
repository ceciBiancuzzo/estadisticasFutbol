const PartidoController = {};
const Partido = require("../models/Partido");
const { validationResult } = require("express-validator");


PartidoController.getPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find({});
   // console.log("Obteniendo listado de partidos...");
    res.send(partidos);
  } catch (error) {
    //console.log(error);
    res.status(400).json({  //primer error encontrado, es res no req
      ok: false,
      message: "No se pudo consultar a la base de datos",
    });
  }
};
PartidoController.createPartido = async (req, res) => {
  //Revisar si hay errores

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
    // Obtener los valores del cuerpo de la solicitud
  const {cancha,division,fecha,hora}=req.body;

  const newPartido = new Partido({
    cancha,
    division,
    fecha,
    hora
  });

  try {
    let partido = await Partido.findOne({ cancha,division,fecha,hora});
    if (partido) {
      return res.status(400).json({
        msg: " EL partido ya existe",
      });
    }

    await newPartido.save();
    res.status(200).json({ msg: "Partido creado correctamente" }); //agregado
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      ok: false,
      message: "No se pudo grabar en la base de datos",
    });
  }
};

PartidoController.updatePartido = async (req, res) => {
  const { cancha, division, fecha,hora } = req.body;
 // console.log(req.params.id);
  await Partido.findByIdAndUpdate({ _id: req.params.id },
 {
      cancha,
      division,
      fecha,
      hora
    }
  );
  // await User.findOneAndUpdate(req.params.id,{
  // userName,correo,password
  // });
 // console.log("se modifico partido: " + req.params.id, cancha,division,fecha,hora);

  res.status(200).json({ msg: "Partido actualizado correctamente" });
};

PartidoController.getPartido = async (req, res) => {
  const partido = await Partido.findById(req.params.id);

  res.json(partido);
 // console.log("obteniendo partido: " + req.params.id);
};

PartidoController.deletePartido = async (req, res) => {
  try {
    const id = await Partido.findByIdAndDelete(req.params.id );

    res.status(201).json({
      ok: true,
      message: "Se borro un partido",
    });
    //console.log(`se elimino id: ${id}`);
  } catch (error) {
   // console.log(error);
    res.status(400).json({
      ok: false,
      message: "No se pudo eliminar de la BD",
    });
  }
};

module.exports = PartidoController;
