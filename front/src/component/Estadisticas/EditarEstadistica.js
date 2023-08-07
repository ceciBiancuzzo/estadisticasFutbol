import React, { useState, useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Estadisticas from "./Estadisticas";
import { editarEstadisticaAction } from "../../actions/estadisticaActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// import { UncontrolledAlert } from "reactstrap";
import UncontrolledAlert from "reactstrap/lib/UncontrolledAlert";

 import { iniciarSesionAction } from "../../actions/estadisticaActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const EditarEstadistica = () => {
  const error = useSelector((state) => state.estadisticas.error);
  const history = useHistory();
  //Nuevo state del partido
  const [estadistica, guardarEstadistica] = useState({
    asistencias: "",
    id: "",
    pases_buenos:"", //valor iicial de fecha
     pases_malos:"",
     tarjetas_amarillas:"",
    tarjetas_rojas:"" ,
    goles:"",
    faltas:"",
    pelotas_recuperadas:"",
  });


  //agregar estado para la fecha
  const usuarios=useSelector((state)=>state.usuarios.usuarios);
 // console.log(usuarios);
  const [usuario,setUsuario]= useState(null);
  //partido a editar
  const estadisticaEditar = useSelector((state) => state.estadisticas.estadisticaEditar);  //agregue una o 
  const dispatch = useDispatch();
  //if (!producto) return <Productos />;
  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false, null));
    }
    if(estadisticaEditar){
      guardarEstadistica(estadisticaEditar);
      setUsuario(estadisticaEditar.usuario);
    }
 
    // if (estadisticaEditar) {
      // Extraer solo la fecha de MongoDB
     // const fechaMongoDB = estadisticaEditar.fecha?.split("T")[0];
 
   }, [estadisticaEditar]);

   
  //Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarEstadistica({
      ...estadistica,
      
      [e.target.name]: e.target.value,
    });
  };

  const { asistencias,pases_buenos,pases_malos,tarjetas_amarillas,tarjetas_rojas,goles,faltas,pelotas_recuperadas } = estadistica;

  const submitEditarEstadistica = (e) => {
    e.preventDefault();
    //26/06
     // Agregar el campo 'usuario' al objeto estadistica
  const estadisticaConUsuario = { ...estadistica, usuario };
    
  dispatch(editarEstadisticaAction(estadisticaConUsuario));
    //console.log(_id,nombre,precio)
    history.push("/estadisticas");  //para que una vez que guarde se vaya al inicio
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">Editar Estadistica</h2>
            <form onSubmit={submitEditarEstadistica}>
           
            <div className="form-group">
            <label>Jugador</label>
             <select
            className="form-control"
            name="usuario"
              value={usuario}
           onChange={(e) => setUsuario(e.target.value)}
  >
    <option value="">Seleccionar jugador</option>
    {usuarios &&
      usuarios.map((usuario) => (
        <option key={usuario._id} value={usuario._id}>
          {usuario.apellido}
        </option>
      ))}
  </select>
</div>
 
              <div className="form-group">
                <label> Asistencias</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Asistencias"
                  onChange={onChangeFormulario}
                  name="asistencias"
                  value={asistencias}
                />
              </div>
              <div className="form-group">
                <label> Pases Buenos</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Pases Buenos"
                  onChange={onChangeFormulario}
                  name="pases_buenos"
                  value={pases_buenos}
                />
              </div>

              
              <div className="form-group">
                <label> Pases Malos</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="pases malos"
                  name="pases_malos"
                  value={pases_malos}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label> Tarjetas Amarillas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Tarjetas Amarillas"
                  name="tarjetas_amarillas"
                  value={tarjetas_amarillas}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label> Tarjetas Rojas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Tarjetas Rojas"
                  name="tarjetas_rojas"
                  value={tarjetas_rojas}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label> Goles</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Goles"
                  name="goles"
                  value={goles}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label> Faltas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Faltas"
                  name="faltas"
                  value={faltas}
                  onChange={onChangeFormulario}
                />
              </div>
              <div className="form-group">
                <label> Pelotas Recuperadas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Pelotas Recuperadas"
                  name="pelotas_recuperadas"
                  value={pelotas_recuperadas}
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

export default EditarEstadistica;
