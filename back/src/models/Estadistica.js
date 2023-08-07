const { Schema, model } = require("mongoose");

const EstadisticaSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      
     
    },
    asistencias: {
      type: Number,
      // required: true,
      //trim: true,
      //unique: true
    },
    pases_buenos: {
      type: Number,
      // required: true,
      // trim: true,
      //unique: true
    },
    pases_malos: {
      type: Number,
      //required: true,
      //trim: true,
      //unique: true
    },
    tarjetas_amarillas: {
      type: Number,
      //required: true,
      //trim: true,
      //unique: true
    },
    tarjetas_rojas: {
      type: Number,
      //required: true,
      //trim: true,
      //unique: true
    },
    goles: {
      type: Number,
      //required: true,

      //unique: true
    },
    faltas: {
      type: Number,
      // required: true,

      //unique: true
    },
    pelotas_recuperadas: {
      type: Number,
      // required: true,

      //unique: true
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Estadistica", EstadisticaSchema);
