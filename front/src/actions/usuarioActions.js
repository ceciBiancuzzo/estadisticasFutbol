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
import clienteAxios from "../config/axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();
//crear nuevos usuarios
export function crearNuevoUsuarioAction(usuario) {
  return async (dispatch) => {
    //insertar en la api
    dispatch(agregarUsuario());

    try {
      const res = await clienteAxios.post("usuarios", usuario);

      dispatch(agregarUsuarioExito(usuario, res.data));
      //Alerta
      swal.fire("Correcto", "El usuario se agrego correctamente", "success");
    } catch (error) {
     // console.log(error.response.data);
      //si hay un error, cambiamos el state
      dispatch(agregarUsuarioError(true));
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
//Insertar usuarios en la base de datos
const agregarUsuario = () => ({
  type: AGREGAR_USUARIO,
  payload: true,
});

const agregarUsuarioExito = (usuario, res) => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: res,
});
const agregarUsuarioError = (valor) => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: valor,
});

//Obtener usuarios desde la base de datos
export function obtenerUsuariosAction() {
  return async (dispatch) => {
    dispatch(descargarUsuarios());
    try {
      const respuesta = await clienteAxios.get("usuarios");
      //console.log(respuesta.data)
      dispatch(descargaUsuariosExitosa(respuesta.data));
    } catch (error) {
      //console.log(error);
      dispatch(descargaUsuariosError());
    }
  };
}
const descargarUsuarios = () => ({
  type: COMENZAR_DESCARGA_USUARIOS,
  payload: true,
});
const descargaUsuariosExitosa = (usuarios) => ({
  type: DESCARGA_USUARIOS_EXITO,
  payload: usuarios,
});
const descargaUsuariosError = () => ({
  type: DESCARGA_USUARIOS_ERROR,
  payload: true,
});

export function borrarUsuarioAction(id) {
  return async (dispatch) => {
    dispatch(obtenerUsuarioEliminar(id));
    //console.log(id);
    try {
      await clienteAxios.delete(`usuarios/${id}`);
      dispatch(eliminarUsuarioExito());
      //si se elimina, mostramos alerta
      swal.fire("Eliminado!", "El usuario fue eliminado.", "success");
    } catch (error) {
      //console.log(error);
      dispatch(eliminarUsuarioError());
    }
  };
}
const obtenerUsuarioEliminar = (id) => ({
  type: OBTENER_USUARIO_ELIMINAR,
  payload: id,
});
const eliminarUsuarioExito = () => ({
  type: USUARIO_ELIMINADO_EXITO,
});
const eliminarUsuarioError = () => ({
  type: USUARIO_ELIMINADO_ERROR,
  payload: true,
});

//Colocar producto en edicion
export function obtenerUsuarioEditar(usuario) {
  return (dispatch) => {
    dispatch(obtenerUsuarioEditarAction(usuario));
    //console.log(usuario._id);
  };
}
const obtenerUsuarioEditarAction = (usuario) => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: usuario,
});
//Edita un registro en la api y en el state
export function editarUsuarioAction(usuario) {
  return (dispatch) => {
    dispatch(editarUsuario());

    try {
      clienteAxios.put(`usuarios/${usuario._id}`, usuario);
      dispatch(editarUsuarioExito());

      swal.fire("Correcto", "El usuario se modifico correctamente", "success");
    } catch (error) {
      //console.log(error);
      dispatch(editarUsuarioError());
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
const editarUsuario = () => ({
  type: COMENZAR_EDICION_USUARIO,
});
const editarUsuarioExito = (usuario) => ({
  type: USUARIO_EDITAR_EXITO,
  payload: usuario,
});
const editarUsuarioError = () => ({
  type: USUARIO_EDITAR_ERROR,
  payload: true,
});

//Iniciar sesion
export function iniciarSesionAction(datoIniciar,cookie) {
  return async (dispatch) => {
    try {
      
      
      dispatch({
        type: INICIAR_SESION,
        payload: datoIniciar
      }
        );
      dispatch(cookieSesion(cookie));
    } catch (error) {
      //console.log(error);
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }

  };
}


const cookieSesion = (cookie) => ({
  type: INICIANDO_COOKIE,
  payload: cookie,
});

export function cerrarSesionAction() {
  return (dispatch) => {
   // console.log("desde eliminar " + cookies.get("id"));
    if (cookies.get("id")) {
      cookies.remove("id", { path: "/" });
      dispatch(cerrarSesion(false));
      dispatch(borrarCookie());
    }
  };
}
const cerrarSesion = (dato) => ({
  type: CERRAR_SESION,
  payload: dato,
});
const borrarCookie = () => ({
  type: ELIMINANDO_COOKIE,
});
