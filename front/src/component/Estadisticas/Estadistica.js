import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  borrarEstadisticaAction,
  obtenerEstadisticaEditar,
} from "../../actions/estadisticaActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import "../../hojas-de-estilo/Header.css";
//import Usuario from "../Usuarios/Usuario";
const cookies = new Cookies();
//mostrarJugador agrego usuario

const Estadistica = ({ estadistica, usuario }) => {
  const dispatch = useDispatch();
  const history = useHistory(); //habilitar history para redireccion
  const confirmarEstadisticaEliminar = (id) => {
    //preguntar a la estadística
    Swal.fire({
      title: "Estas seguro de eliminar?",
      text: "No se podra recuperar la estadistica!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        //pasarlo al action
        if (cookies.get("id") === id) {
          Swal.fire({
            icon: "error",
            title: "Estadistica en uso",
          });
        } else {
          dispatch(borrarEstadisticaAction(id));
        }
      }
    });
  };

  //Funcion que redirige de forma programada
  const redireccionarEdicion = (estadistica) => {
    dispatch(obtenerEstadisticaEditar(estadistica));
    history.push(`/estadisticas/editar/${estadistica._id}`);
  };
  // const user=[estadistica];
  return (
    <tbody>
      <tr>
        {/* <td>
     

          <strong>{estadistica.usuario? estadistica.usuario.apellido:'Apellido no disponible'}</strong>
        </td> */}
        <td>
          <strong>
            {(usuario &&
              usuario.find((u) => u._id === estadistica.usuario)?.apellido) ||
              "Apellido no disponible"}
          </strong>
        </td>
        <td>
          <strong>{estadistica.asistencias}</strong>
        </td>

        <td>
          <strong>{estadistica.pases_buenos}</strong>
        </td>
        <td>
          <strong>{estadistica.pases_malos}</strong>
        </td>
        <td>
          <strong>{estadistica.tarjetas_amarillas}</strong>
        </td>
        <td>
          <strong>{estadistica.tarjetas_rojas}</strong>
        </td>
        <td>
          <strong>{estadistica.goles}</strong>
        </td>
        <td>
          <strong>{estadistica.faltas}</strong>
        </td>
        <td>
          <strong>{estadistica.pelotas_recuperadas}</strong>
        </td>

        <td className="acciones">
          <div className="d-flex justify-content-md-end mb-3">
            <button
              type="button"
              onClick={() => redireccionarEdicion(estadistica)}
              className="btn btn-editar mr-2"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" /> 
            </button>
            <button
              type="button"
              className="btn btn-eliminar mr-2"
              onClick={() => confirmarEstadisticaEliminar(estadistica._id)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> 
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export default Estadistica;
