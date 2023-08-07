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
  INICIAR_SESION,
  INICIANDO_COOKIE,
  ELIMINANDO_COOKIE,
  CERRAR_SESION,
} from "../types";
import clienteAxios from "../config/axios";
import swal from "sweetalert2";
import Cookies from "universal-cookie";
const cookies = new Cookies();
//crear nuevos partidos
export function crearNuevoPartidoAction(partido) {
  return async (dispatch) => {
    //insertar en la api
    dispatch(agregarPartido());

    try {
      const res = await clienteAxios.post("partidos", partido);

      dispatch(agregarPartidoExito(partido, res.data));
      //Alerta
      swal.fire("Correcto", "El partido se agrego correctamente", "success");
    } catch (error) {
      //console.log(error.response.data);
      //si hay un error, cambiamos el state
      dispatch(agregarPartidoError(true));
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
//Insertar partidos en la base de datos
const agregarPartido = () => ({
  type: AGREGAR_PARTIDO,
  payload: true,
});

const agregarPartidoExito = (partido, res) => ({
  type: AGREGAR_PARTIDO_EXITO,
  payload: res,
});
const agregarPartidoError = (valor) => ({
  type: AGREGAR_PARTIDO_ERROR,
  payload: valor,
});

//Obtener partidos desde la base de datos
export function obtenerPartidosAction() {
  return async (dispatch) => {
    dispatch(descargarPartidos());
    try {
      const respuesta = await clienteAxios.get("partidos");
      //console.log(respuesta.data)
      dispatch(descargaPartidosExitosa(respuesta.data));
    } catch (error) {
     // console.log(error);
      dispatch(descargaPartidosError());
    }
  };
}
const descargarPartidos = () => ({
  type: COMENZAR_DESCARGA_PARTIDOS,
  payload: true,
});
const descargaPartidosExitosa = (partidos) => ({
  type: DESCARGA_PARTIDOS_EXITO,
  payload: partidos,
});
const descargaPartidosError = () => ({
  type: DESCARGA_PARTIDOS_ERROR,
  payload: true,
});

export function borrarPartidoAction(id) {
  return async (dispatch) => {
    dispatch(obtenerPartidoEliminar(id));
    //console.log(id);
    try {
      await clienteAxios.delete(`partidos/${id}`);
      dispatch(eliminarPartidoExito());
      //si se elimina, mostramos alerta
      swal.fire("Eliminado!", "El partido fue eliminado.", "success");
    } catch (error) {
     // console.log(error);
      dispatch(eliminarPartidoError());
    }
  };
}
const obtenerPartidoEliminar = (id) => ({
  type: OBTENER_PARTIDO_ELIMINAR,
  payload: id,
});
const eliminarPartidoExito = () => ({
  type: PARTIDO_ELIMINADO_EXITO,
});
const eliminarPartidoError = () => ({
  type: PARTIDO_ELIMINADO_ERROR,
  payload: true,
});

//Colocar producto en edicion
export function obtenerPartidoEditar(partido) {
  return (dispatch) => {
    dispatch(obtenerPartidoEditarAction(partido));
   // console.log(partido._id);
  };
}
const obtenerPartidoEditarAction = (partido) => ({
  type: OBTENER_PARTIDO_EDITAR,
  payload: partido,
});
//Edita un registro en la api y en el state
export function editarPartidoAction(partido) {
  return (dispatch) => {
    dispatch(editarPartido());

    try {
      clienteAxios.put(`partidos/${partido._id}`, partido);
      dispatch(editarPartidoExito());

      swal.fire("Correcto", "El partido se modifico correctamente", "success");
    } catch (error) {
     //console.log(error);
      dispatch(editarPartidoError());
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
const editarPartido = () => ({
  type: COMENZAR_EDICION_PARTIDO,
});
const editarPartidoExito = (partido) => ({
  type: PARTIDO_EDITAR_EXITO,
  payload: partido,
});
const editarPartidoError = () => ({
  type: PARTIDO_EDITAR_ERROR,
  payload: true,
});

//Iniciar sesion
export function iniciarSesionAction(datoIniciar, cookie) {
  return async (dispatch) => {
    try {
      dispatch({
        type: INICIAR_SESION,
        payload: datoIniciar,
      });
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
    //console.log("desde eliminar " + cookies.get("id"));
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
