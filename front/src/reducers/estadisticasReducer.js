import {
  AGREGAR_ESTADISTICA,
  AGREGAR_ESTADISTICA_EXITO,
  AGREGAR_ESTADISTICA_ERROR,
  COMENZAR_DESCARGA_ESTADISTICAS,
  DESCARGA_ESTADISTICAS_EXITO,
  DESCARGA_ESTADISTICAS_ERROR,
  OBTENER_ESTADISTICA_ELIMINAR,
  ESTADISTICA_ELIMINADO_EXITO,
  ESTADISTICA_ELIMINADO_ERROR,
  OBTENER_ESTADISTICA_EDITAR,
  COMENZAR_EDICION_ESTADISTICA,
  ESTADISTICA_EDITAR_EXITO,
  ESTADISTICA_EDITAR_ERROR,
  // INICIAR_SESION,
  // INICIANDO_COOKIE,
  // ELIMINANDO_COOKIE,
  // CERRAR_SESION,
} from "../types";

//cada reducers tiene su propio state
const initialState = {
  estadisticas: [],
  error: null,
  loading: false,
  estadisticaEliminar: null,
  estadisticaEditar: null,
//  iniciarSesion: false,
 // cookie: null,
};
export default function ESTADISTICAS_REDUCER(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_ESTADISTICAS:
    case AGREGAR_ESTADISTICA:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_ESTADISTICA_EXITO:
      return {
        ...state,
        loading: false,
        estadisticas: [...state.estadisticas, action.payload],
      };
    case DESCARGA_ESTADISTICAS_ERROR:
    case AGREGAR_ESTADISTICA_ERROR:
    case ESTADISTICA_ELIMINADO_ERROR:
    case ESTADISTICA_EDITAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_ESTADISTICAS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        estadisticas: action.payload,
      };
    case OBTENER_ESTADISTICA_ELIMINAR:
      return {
        ...state,
        estadisticaEliminar: action.payload,
      };
    case ESTADISTICA_ELIMINADO_EXITO:
      return {
        ...state,
        estadisticas: state.estadisticas.filter(
          (estadistica) => estadistica._id !== state.estadisticaEliminar
        ),
        estadisticaEliminar: null,
      };
    case OBTENER_ESTADISTICA_EDITAR:
      return {
        ...state,
        estadisticaEditar: action.payload,
      };
    case COMENZAR_EDICION_ESTADISTICA:
      return {
        ...state,
        estadisticaEditar: action.payload,
      };
    case ESTADISTICA_EDITAR_EXITO:
      return {
        ...state,
        estadisticaEditar: null,
        estadisticas: state.estadisticas.map((estadistica) =>
          estadistica === action.payload ? (estadistica = action.payload) : estadistica
        ),
      };

    default:
      return state;
  }
}
