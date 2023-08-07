//Combina todos los reducers
import { combineReducers } from "redux";
import usuariosReducer from "./usuariosReducer";
import partidosReducer from "./partidosReducer";
import estadisticasReducer from "./estadisticasReducer";
import alertaReducer from "./alertaReducer";

export default combineReducers({
  usuarios: usuariosReducer,
  partidos: partidosReducer,
  estadisticas: estadisticasReducer,
  alerta: alertaReducer,
});
