const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    dni: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    edad: {
      type: Number,
      required: true,

      //unique: true
    },
    //data almacena los datos binarios de la imagen y contentType almacena el tipo de
    //contenido de la imagen(porej:'image/jpg' o 'image/png')
    // imagen:{
    // data: Buffer,
    // contetType:String,
    // },

    correo: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
      //unique: true
    },
    // estadistica: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Estadistica",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Usuario", UsuarioSchema);
