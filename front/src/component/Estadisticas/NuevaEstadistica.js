import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, UncontrolledAlert } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
//Actions de Redux
import { crearNuevaEstadisticaAction } from "../../actions/estadisticaActions";
import { ocultarAlertaAction } from "../../actions/alertaActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const NuevaEstadistica = ({ history }) => {
  //State del componente
  const [asistencias, guardarAsistencias] = useState("");
  const [pases_buenos, guardarPasesBuenos] = useState("");
  const [pases_malos, guardarPasesMalos] = useState("");
  const [tarjetas_amarillas, guardarTarjetasAmarillas] = useState("");
  const [tarjetas_rojas, guardarTarjetasRojas] = useState("");
  const [faltas, guardarFaltas] = useState("");
  const [goles, guardarGoles] = useState("");
  const [pelotas_recuperadas, guardarPelotasRecuperadas] = useState("");
  const [usuario,guardarUsuario]= useState("");
  //utilizar useDispach y te crea una nueva funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.estadisticas.loading);
  const error = useSelector((state) => state.estadisticas.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const iniciar = useSelector((state) => state.alerta.iniciarSesion);
  // const usuarios = useSelector((state) => state.usuarios.listaUsuarios);


  //Manda a llamar el action de CrearNuevaEstadisticaAction
  const agregarEstadistica = (estadistica) =>
    dispatch(crearNuevaEstadisticaAction(estadistica));

  //cuando el partido haga submit
  const submitNuevaEstadistica = (e) => {
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
    agregarEstadistica({ usuario,
      asistencias,
      pases_buenos,
      pases_malos,
      tarjetas_amarillas,
      tarjetas_rojas,goles,
    faltas,
    pelotas_recuperadas });

    if (cookies.get("id")) {
      history.push("/");
    } else {
      history.push("/estadisticas");
    }
  };
  //acceder al state del store
  const volver = () => {
    history.push("/inicio");
  };

  const usuarios=useSelector((state)=>state.usuarios.usuarios);
  // console.log(usuarios);

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Estadistica
            </h2>
            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevaEstadistica}>

            <div className="form-group">
                <label>Jugador</label>
                <select
                  className="form-control"
                  name="usuario"
                  value={usuario}
                  onChange={(e) => guardarUsuario(e.target.value)}
                >
                  <option value="">Seleccionar jugador</option>
                  {usuarios && usuarios.map((usuario) => (
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
                  className="form-control "
                  placeholder="asistencias"
                  name="asistencias"
                  value={asistencias}
                  onChange={(e) => guardarAsistencias(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Pases Buenos</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="pases buenos"
                  name="pases buenos"
                  value={pases_buenos}
                  onChange={(e) => guardarPasesBuenos(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Pases Malos</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="pases malos"
                  name="pases malos"
                  value={pases_malos}
                  onChange={(e) => guardarPasesMalos(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Tarjetas Amarillas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="tarjetas amarillas"
                  name="tarjetas amarillas"
                  value={tarjetas_amarillas}
                  onChange={(e) => guardarTarjetasAmarillas(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label> Tarjetas Rojas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="tarjetas rojas"
                  name="tarjetas rojas"
                  value={tarjetas_rojas}
                  onChange={(e) => guardarTarjetasRojas(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Goles</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="goles"
                  name="goles"
                  value={goles}
                  onChange={(e) => guardarGoles(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Faltas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="faltas"
                  name="faltas"
                  value={faltas}
                  onChange={(e) => guardarFaltas(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Pelotas Recuperadas</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="pelotas recuperadas"
                  name="pelotas recuperadas"
                  value={pelotas_recuperadas}
                  onChange={(e) => guardarPelotasRecuperadas(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-editar font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
              <br></br>
              {iniciar ? null : (
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-eliminar font-weight-bold text-uppercase  "
                    onClick={volver}
                  >
                    Volver
                  </button>
                </div>
              )}
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

export default NuevaEstadistica;
