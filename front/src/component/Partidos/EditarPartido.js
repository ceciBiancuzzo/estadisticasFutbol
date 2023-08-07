import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Partidos from "./Partidos";
import { editarPartidoAction } from "../../actions/partidoActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { UncontrolledAlert } from "reactstrap";
import UncontrolledAlert from "reactstrap/lib/UncontrolledAlert";

 import { iniciarSesionAction } from "../../actions/partidoActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const EditarPartido = () => {
  const error = useSelector((state) => state.partidos.error);
  const history = useHistory();
  //Nuevo state del partido
  const [partido, guardarPartido] = useState({
    cancha: "",
    id: "",
    fecha:"", //valor iicial de fecha
     hora:""
  });
  //agregar estado para la fecha
  
  //partido a editar
  const partidoEditar = useSelector((state) => state.partidos.partidooeditar);  //agregue una o 
  const dispatch = useDispatch();
  //if (!producto) return <Productos />;
  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false, null));
    }
    if (partidoEditar) {
      // Extraer solo la fecha de MongoDB
      const fechaMongoDB = partidoEditar.fecha?.split("T")[0];
      guardarPartido({
        ...partidoEditar,
        fecha: fechaMongoDB,
      });
    }
  }, [partidoEditar]);

  //Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarPartido({
      ...partido,
      [e.target.name]: e.target.value,
    });
  };

  const { cancha,division,fecha,hora } = partido;

  const submitEditarPartido = (e) => {
    e.preventDefault();
    dispatch(editarPartidoAction(partido));
  
    history.push("/partidos");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Editar Cancha</h2>
            <form onSubmit={submitEditarPartido}>
              <div className="form-group">
                <label> Cancha</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cancha"
                  onChange={onChangeFormulario}
                  name="cancha"
                  value={cancha}
                />
              </div>
              <div className="form-group">
                <label> Division</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Division"
                  onChange={onChangeFormulario}
                  name="division"
                  value={division}
                />
              </div>

              
              <div className="form-group">
                <label> Fecha</label>
                <input
                  type="date"
                  className="form-control "
                  placeholder="Seleccione una Fecha"
                  name="fecha"
                  value={fecha}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label> Hora</label>
                <input
                  type="time"
                  className="form-control "
                  placeholder="Seleccione una Hora"
                  name="hora"
                  value={hora}
                  onChange={onChangeFormulario}
                />
              </div>

              <button
                type="submit"
                className="btn btn-editar font-weight-bold text-uppercase d-block w-100"
              >
                Guardar cambios
              </button>
            </form>
            <div className="container text-center mt-5  ">
              {error ? (
                <UncontrolledAlert color="danger">
                  Hubo un error de conexion con el servidor!
                </UncontrolledAlert>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarPartido;
