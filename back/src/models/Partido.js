const { Schema, model } = require("mongoose");

const PartidoSchema = new Schema(
  {
    cancha: {
      type: String,
      //required: true,
      trim: true,
      //unique: true
    },
    division: {
      type: String,
      //required: true,
      trim: true,
      //unique: true
    },
     fecha: {
       type: Date,
    //   default: Date.now, // Valor por defecto: fecha actual
    },
    hora: {
      type: String,
   //   default: Date.now, // Valor por defecto: fecha actual
   },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Partido", PartidoSchema);
