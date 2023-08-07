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
export function crearNuevaEstadisticaAction(estadistica) {
  return async (dispatch) => {
    //insertar en la api
    dispatch(agregarEstadistica());

    try {
      const res = await clienteAxios.post("estadisticas", estadistica);

      dispatch(agregarEstadisticaExito(estadistica, res.data));
      //Alerta
      swal.fire(
        "Correcto",
        "La estadistica se agrego correctamente",
        "success"
      );
    } catch (error) {
     // console.log(error.response.data);
      //si hay un error, cambiamos el state
      dispatch(agregarEstadisticaError(true));
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
//Insertar partidos en la base de datos
const agregarEstadistica = () => ({
  type: AGREGAR_ESTADISTICA,
  payload: true,
});

const agregarEstadisticaExito = (estadistica, res) => ({
  type: AGREGAR_ESTADISTICA_EXITO,
  payload: res,
});
const agregarEstadisticaError = (valor) => ({
  type: AGREGAR_ESTADISTICA_ERROR,
  payload: valor,
});

//Obtener partidos desde la base de datos
export function obtenerEstadisticasAction(usuario) {
  return async (dispatch) => {
    dispatch(descargarEstadisticas());
    try {
      const respuesta = await clienteAxios.get("estadisticas");
      const estadisticas = respuesta.data;

      // agregar informacion del usuario a cada estadistica
      const estadisticasConUsuario = estadisticas.map((estadistica) => {
        return {
          ...estadistica,
          usuario: usuario,
    
        };
      });
      //console.log(respuesta.data)
      dispatch(descargaEstadisticasExitosa(estadisticasConUsuario));
    } catch (error) {
      //console.log(error);
      dispatch(descargaEstadisticasError());
    }
  };
}
const descargarEstadisticas = () => ({
  type: COMENZAR_DESCARGA_ESTADISTICAS,
  payload: true,
});
const descargaEstadisticasExitosa = (estadisticas) => ({
  type: DESCARGA_ESTADISTICAS_EXITO,
  payload: estadisticas,
});
const descargaEstadisticasError = () => ({
  type: DESCARGA_ESTADISTICAS_ERROR,
  payload: true,
});

export function borrarEstadisticaAction(id) {
  return async (dispatch) => {
    dispatch(obtenerEstadisticaEliminar(id));
   // console.log(id);
    try {
      await clienteAxios.delete(`estadisticas/${id}`);
      dispatch(eliminarEstadisticaExito());
      //si se elimina, mostramos alerta
      swal.fire("Eliminada!", "La estadistica fue eliminada.", "success");
    } catch (error) {
     // console.log(error);
      dispatch(eliminarEstadisticaError());
    }
  };
}
const obtenerEstadisticaEliminar = (id) => ({
  type: OBTENER_ESTADISTICA_ELIMINAR,
  payload: id,
});
const eliminarEstadisticaExito = () => ({
  type: ESTADISTICA_ELIMINADO_EXITO,
});
const eliminarEstadisticaError = () => ({
  type: ESTADISTICA_ELIMINADO_ERROR,
  payload: true,
});

//Colocar producto en edicion
export function obtenerEstadisticaEditar(estadistica) {
  return (dispatch) => {
    dispatch(obtenerEstadisticaEditarAction(estadistica));
   // console.log(estadistica._id);
  };
}
const obtenerEstadisticaEditarAction = (estadistica) => ({
  type: OBTENER_ESTADISTICA_EDITAR,
  payload: estadistica,

});
//Edita un registro en la api y en el state
export function editarEstadisticaAction(estadistica) {
  return (dispatch) => {
    dispatch(editarEstadistica());

    try {
      clienteAxios.put(`estadisticas/${estadistica._id}`, estadistica);
      dispatch(editarEstadisticaExito());

      swal.fire(
        "Correcto",
        "La estadistica se modifico correctamente",
        "success"
      );
    } catch (error) {
      //console.log(error);
      dispatch(editarEstadisticaError());
      swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo",
      });
    }
  };
}
const editarEstadistica = () => ({
  type: COMENZAR_EDICION_ESTADISTICA,
});
const editarEstadisticaExito = (estadistica) => ({
  type: ESTADISTICA_EDITAR_EXITO,
  payload: estadistica,
});
const editarEstadisticaError = () => ({
  type: ESTADISTICA_EDITAR_ERROR,
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
