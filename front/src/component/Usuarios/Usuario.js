import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
  borrarUsuarioAction,
  obtenerUsuarioEditar,
} from "../../actions/usuarioActions";
import Cookies from "universal-cookie";
import "../../hojas-de-estilo/Header.css";

const cookies = new Cookies();
const Usuario = ({ usuario }) => {
  const dispatch = useDispatch();
  const history = useHistory(); //habilitar history para redireccion
  const confirmarUsuarioEliminar = (id) => {
    //preguntar al usuario
    Swal.fire({
      title: "Estas seguro de eliminar?",
      text: "No se podra recuperar el cliente!",
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
            title: "Usuario en uso",
          });
        } else {
          dispatch(borrarUsuarioAction(id));
        }
      }
    });
  };

  //Funcion que redirige de forma programada
  const redireccionarEdicion = (usuario) => {
    dispatch(obtenerUsuarioEditar(usuario));
    history.push(`/usuarios/editar/${usuario._id}`);
  };
  // const user=[usuario];
  return (

      <tr>
        <td>
          <strong>{usuario.nombre}</strong>
        </td>
        <td>
          <strong>{usuario.apellido}</strong>
        </td>
        <td>
          <strong>{usuario.edad}</strong>
        </td>
        <td>
          <strong>{usuario.dni}</strong>
        </td>
        <td>
          <strong>{usuario.correo}</strong>
        </td>
        <td className="acciones">
        <div className="d-flex justify-content-md-end mb-3">
          <button
            type="button"
            onClick={() => redireccionarEdicion(usuario)}
            className="btn btn-editar mr-2"
          >
             <FontAwesomeIcon icon={faEdit} className="mr-2" /> 
          </button>
          <button
            type="button"
            className="btn btn-eliminar mr-2"
            onClick={() => confirmarUsuarioEliminar(usuario._id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
          </button>
          </div>
        </td>
      </tr>
 
  );
};

export default Usuario;
