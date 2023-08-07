const express = require("express");
const cors = require("cors");
const app = express();

//setting
app.set("port", process.env.PORT || 5000);

//middlewares
app.use(cors()); //permite que el servidor responda a solicitudes desde diferentes orígenes (dominios) 
//sin restricciones de seguridad del navegador.
app.use(express.json()); //Agrega el middleware express.json() 
//para analizar el cuerpo de las solicitudes entrantes en formato JSON y convertirlos en objetos JavaScript.
//routers

app.use("/usuarios", require("./routers/Usuario"));
app.use("/partidos", require("./routers/Partido"));
app.use("/estadisticas", require("./routers/Estadistica"));
app.use("/auth", require("./routers/auth"));

module.exports = app;
