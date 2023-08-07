import {
  AGREGAR_PARTIDO,
  AGREGAR_PARTIDO_EXITO,
  AGREGAR_PARTIDO_ERROR,
  COMENZAR_DESCARGA_PARTIDOS,
  DESCARGA_PARTIDOS_EXITO,
  DESCARGA_PARTIDOS_ERROR,
  OBTENER_PARTIDO_ELIMINAR,
  PARTIDO_ELIMINADO_EXITO,
  PARTIDO_ELIMINADO_ERROR,
  OBTENER_PARTIDO_EDITAR,
  COMENZAR_EDICION_PARTIDO,
  PARTIDO_EDITAR_EXITO,
  PARTIDO_EDITAR_ERROR,
  // INICIAR_SESION,
  // INICIANDO_COOKIE,
  // ELIMINANDO_COOKIE,
  // CERRAR_SESION,
} from "../types";

//cada reducers tiene su propio state
const initialState = {
  partidos: [],
  error: null,
  loading: false,
  partidoEliminar: null,
  partidooeditar: null,
//  iniciarSesion: false,
 // cookie: null,
};
export default function PARTIDOS_REDUCER(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_PARTIDOS:
    case AGREGAR_PARTIDO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_PARTIDO_EXITO:
      return {
        ...state,
        loading: false,
        partidos: [...state.partidos, action.payload],
      };
    case DESCARGA_PARTIDOS_ERROR:
    case AGREGAR_PARTIDO_ERROR:
    case PARTIDO_ELIMINADO_ERROR:
    case PARTIDO_EDITAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_PARTIDOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        partidos: action.payload,
      };
    case OBTENER_PARTIDO_ELIMINAR:
      return {
        ...state,
        partidoEliminar: action.payload,
      };
    case PARTIDO_ELIMINADO_EXITO:
      return {
        ...state,
        partidos: state.partidos.filter(
          (partido) => partido._id !== state.partidoEliminar
        ),
        partidoEliminar: null,
      };
    case OBTENER_PARTIDO_EDITAR:
      return {
        ...state,
        partidooeditar: action.payload,
      };
    case COMENZAR_EDICION_PARTIDO:
      return {
        ...state,
        partidooeditar: action.payload,
      };
    case PARTIDO_EDITAR_EXITO:
      return {
        ...state,
        partidooeditar: null,
        partidos: state.partidos.map((partido) =>
          partido === action.payload ? (partido = action.payload) : partido
        ),
      };
 
    default:
      return state;
  }
}
