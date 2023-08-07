import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_EXITO,
  AGREGAR_USUARIO_ERROR,
  COMENZAR_DESCARGA_USUARIOS,
  DESCARGA_USUARIOS_EXITO,
  DESCARGA_USUARIOS_ERROR,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_ELIMINADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  OBTENER_USUARIO_EDITAR,
  COMENZAR_EDICION_USUARIO,
  USUARIO_EDITAR_EXITO,
  USUARIO_EDITAR_ERROR,
  INICIAR_SESION,
  INICIANDO_COOKIE,
  ELIMINANDO_COOKIE,
  CERRAR_SESION,
} from "../types";

//cada reducers tiene su propio state
const initialState = {
  usuarios: [],
  error: null,
  loading: false,
  usuarioEliminar: null,
  usuariooeditar: null,
  iniciarSesion: false,
  cookie: null,

};
export default function USUARIOS_REDUCER(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_USUARIOS:
    case AGREGAR_USUARIO:
      return {
        ...state,
        loading: action.payload,
      };
    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        usuarios: [...state.usuarios, action.payload],
      };
    case DESCARGA_USUARIOS_ERROR:
    case AGREGAR_USUARIO_ERROR:
    case USUARIO_ELIMINADO_ERROR:
    case USUARIO_EDITAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DESCARGA_USUARIOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        usuarios: action.payload,
      };
    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        usuarioEliminar: action.payload,
      };
    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        usuarios: state.usuarios.filter(
          (usuario) => usuario._id !== state.usuarioEliminar
        ),
        usuarioEliminar: null,
      };
    case OBTENER_USUARIO_EDITAR:
      return {
        ...state,
        usuarioeditar: action.payload,
      };
    case COMENZAR_EDICION_USUARIO:
      return {
        ...state,
        usuarioeditar: action.payload,
      };
    case USUARIO_EDITAR_EXITO:
      return {
        ...state,
        usuarioeditar: null,
        usuarios: state.usuarios.map((usuario) =>
          usuario === action.payload ? (usuario = action.payload) : usuario //agregue._id
        ),
      };
    case INICIAR_SESION:
      return {
        ...state,
        iniciarSesion: action.payload,
      };
    case INICIANDO_COOKIE:
      return {
        ...state,
        cookie: action.payload,
      };
    case CERRAR_SESION:
      return {
        ...state,
        iniciarSesion: action.payload,
      };
    case ELIMINANDO_COOKIE:
      return {
        ...state,
        cookie: null,
      };
    default:
      return state;
  }
}
