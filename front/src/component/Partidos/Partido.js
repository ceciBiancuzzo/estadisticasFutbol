import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
//import {CSVLink} from "react-csv";
import { useDispatch } from "react-redux";
import { borrarPartidoAction,obtenerPartidoEditar } from "../../actions/partidoActions";
import Cookies from "universal-cookie";
import '../../hojas-de-estilo/Header.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const cookies = new Cookies();
const Partido = ({ partido }) => {
  
 // Obtener solo la fecha en formato "YYYY-MM-DD"
 const fechaFormateada = partido.fecha.split("T")[0];

  const dispatch = useDispatch();
  const history = useHistory(); //habilitar history para redireccion
  const confirmarPartidoEliminar = (id) => {
    //preguntar al partido
    Swal.fire({
      title: "Estas seguro de eliminar?",
      text: "No se podra recuperar el partido!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "SI",
      cancelButtonText: "NO"
    }).then((result) => {
      if (result.isConfirmed) {
        //pasarlo al action
        if(cookies.get("id")===id){
          Swal.fire({
            icon: "error",
            title: "Partido en uso",
          });
        }else{
          dispatch(borrarPartidoAction(id));
        }       
        
      }
    });
  }; 
 
  //Funcion que redirige de forma programada
  const redireccionarEdicion = partido=>{
    dispatch(obtenerPartidoEditar(partido))
    history.push(`/partidos/editar/${partido._id}`)
  }
  // const user=[partido];
  return (
    <tbody>
    <tr>

      <td><strong>{partido.cancha}</strong></td>
      <td><strong>{partido.division}</strong></td>
      <td><strong>{fechaFormateada}</strong></td>
      <td><strong>{partido.hora}</strong></td>
      <td className="acciones">
        <button
          type="button"
          onClick={()=>redireccionarEdicion(partido)}
          className="btn btn-editar mr-2"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" /> 
        </button>
        <button
          type="button"
          className="btn btn-eliminar mr-2"
          onClick={() => confirmarPartidoEliminar(partido._id)}
        >
           <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
        </button>
    
      </td>
    </tr>
    </tbody>
  );
};

export default Partido;
