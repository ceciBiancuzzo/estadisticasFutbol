import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, UncontrolledAlert } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
//Actions de Redux
import { crearNuevoPartidoAction } from "../../actions/partidoActions";
import { ocultarAlertaAction } from "../../actions/alertaActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const NuevoPartido = ({ history }) => {
  
  //State del componente
 // const [fecha, guardarFecha] = useState("");
  //resolucion warning
 const [fecha, guardarFecha] = useState(() => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
});
 const [cancha, guardarCancha] = useState("");
  const [division, guardarDivision] = useState("");
  const [hora, guardarHora] = useState("");
  //const [fechaSeleccionada,cambiarFechaSeleccionada]=useState(new Date());
  //utilizar useDispach y te crea una nueva funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.partidos.loading);
  const error = useSelector((state) => state.partidos.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const iniciar = useSelector((state) => state.alerta.iniciarSesion);

  //Manda a llamar el action de productoAction
  const agregarPartido = (partido) =>
    dispatch(crearNuevoPartidoAction(partido));

  //cuando el partido haga submit
  const submitNuevoPartido = (e) => {
    e.preventDefault();
// Crear objeto FormData con los datos del formulario



    //validar Formulario
    // if (
    //   nombre.trim() === "" ||
    //   edad === 0 ||
    //   correo.trim() === "" ||
    //   password.trim() === ""
    // ) {
    //   const alerta = {
    //     msg: "Ambos campos son obligatorios",
    //     clases: "alert alert-danger text-center text-uppercase p3",
    //   };
    //   dispatch(mostrarAlerta(alerta));
    //   return;
    // }

    //si no hay errores
    dispatch(ocultarAlertaAction());
    //crear nuevo partidos
    agregarPartido({ cancha,division,fecha, hora });


    if (cookies.get("id")) {
      
       history.push("/");
    } else {
      
      history.push("/partidos");
      
    }
  };
  //acceder al state del store
const volver=()=>{

history.push('/inicio')

}
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Cancha
            </h2>
            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoPartido}>
              <div className="form-group">
                <label> Cancha</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Cancha"
                  name="cancha"
                  value={cancha}
                  onChange={(e) => guardarCancha(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Division</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Division"
                  name="division"
                  value={division}
                  onChange={(e) => guardarDivision(e.target.value)}
                />
              </div>
              <div className="form-group"></div>
                <label> Fecha</label>
                <input
                   type="date"
                 // selected={input.value ? new Date(input.value) : null}
                  className="form-control "
                  placeholder="Seleccione una Fecha"
                  name="fecha"
                  value={fecha}
                  onChange={(e) => guardarFecha(e.target.value)}
                />
              <div className="form-group">
                <label>Hora</label>
                <input
                   type="time"
                   value={hora}
                  //selected={hora}
                  onChange={(e) => guardarHora(e.target.value)}
                  //  showTimeSelect
                  //  showTimeSelectOnly
                  //timeIntervals={15}
                 // dateFormat="h:mm aa"
                  className="form-control"
                  placeholder="Seleccione una hora"
                />
              </div>
              {/* <dvi className="contenedor">
                <div className="grupo">
                <label> Hora</label>
                <TimePicker value={hora} onChange={cambiarFechaSeleccionada}/>

                </div>

              </dvi> */}

              {/* <div className="form-group">
              <label>Fecha</label>
              <DatePicker
            className="form-control"
            selected={fecha}
             onChange={(e) => guardarFecha(e.target.value)}
           />
            </div> */}

          
              
              <button
                type="submit"
                className="btn btn-editar font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
              <br></br>
              {iniciar ? null :<div className="text-center"><button
                type="submit"
                className="btn btn-eliminar font-weight-bold text-uppercase  "
                onClick={volver}
              >
                Volver
              </button></div>}
              
              
            </form>
            <div className="container text-center mt-5  ">
              {cargando ? <Spinner type="grow" color="primary" /> : null}
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

export default NuevoPartido;
