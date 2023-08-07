import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  obtenerEstadisticasAction,
  iniciarSesionAction,
} from "../../actions/estadisticaActions";
import Estadistica from "../Estadisticas/Estadistica";
import Cookies from "universal-cookie";
import "../../hojas-de-estilo/Header.css";
import Usuario from "../Usuarios/Usuario";

import { useReactToPrint } from "react-to-print";

const cookies = new Cookies();

const Estadisticas = ({ history }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false, null));
    }

    setTimeout(function () {
      cargarEstadisticas();
    }, 100);

    //eslint-disable-next-line
  }, []);

  const cargarEstadisticas = () => dispatch(obtenerEstadisticasAction());
  const estadisticas = useSelector((state) => state.estadisticas.estadisticas);
  //mostrarJugador
  const usuarios = useSelector((state) => state.usuarios.usuarios);
 
  //  const usuario = useSelector((state) => state.usuario.usuarios);
  const error = useSelector((state) => state.estadisticas.error);
  const cargando = useSelector((state) => state.estadisticas.loading);

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lista de Estadisticas",
   // onAfterPrint: () => alert("Datos Guardados en Pdf"),
  });

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
    fontSize: "2em", //  tamaño de la letra
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    fontSize: "2em", //  tamaño de la letra
  };
  const trStyle = {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
  };

  return (
    <Fragment>
      <div className="container">
        <h2 className="text-center my-5">Listado de Estadisticas</h2>
        {error ? (
          <p className="font-weight-bold alert alert-danger text-center mt-4">
            Hubo un error
          </p>
        ) : null}
        {cargando ? <p className="text-center">cargando...</p> : null}
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className=" table-dark">
              <tr>
                <th scope="col">Jugador</th>
                <th scope="col">Asistencias</th>
                <th scope="col">Pases Buenos</th>
                <th scope="col">Pases Malos</th>
                <th scope="col">Tarjetas Amarillas</th>
                <th scope="col">Tarjetas Rojas</th>
                <th scope="col">Goles</th>
                <th scope="col">Faltas</th>
                <th scope="col">Pelotas Recuperadas</th>

                <th scope="col">Acciones</th>
              </tr>
            </thead>
            
            {estadisticas.length === 0 ? (
              <tr>
                <td colSpan="9"> No hay estadisticas
                  
                </td>
              </tr>
            ) : (
              estadisticas.map((estadistica) => (
                <Estadistica
                  key={estadistica._id}
                  estadistica={estadistica}
                  // usuario={estadistica.usuario}
                  usuario={estadistica.usuario}
                />
              ))
            )}
          </table>
        </div>
        <div className="d-grid d-md-flex justify-content-md-end mb-3">
          <button className="btn btn-pdf" onClick={generatePDF}>
            PDF
          </button>
        </div>
        <div style={{ display: "none" }}>
          <div ref={componentRef}>
            <table style={tableStyle}>
              <tr style={trStyle}>
                <td colSpan="9">
                  <strong style={{ fontSize: "2em" }}>
                    Listado de estadisticas
                  </strong>
                </td>
              </tr>
              <tr>
                <th style={thStyle}>Jugador</th>
                <th style={thStyle}>Asistencias</th>
                <th style={thStyle}>Pases Buenos</th>
                <th style={thStyle}>Pases Malos</th>
                <th style={thStyle}>Tarjetas Amarillas</th>
                <th style={thStyle}>Tarjetas Rojas</th>
                <th style={thStyle}>Goles</th>
                <th style={thStyle}>Faltas</th>
                <th style={thStyle}>Pelotas Recuperadas</th>
              </tr>

              <tbody>
                {estadisticas.map((estadistica) => (
                  <tr
                    key={estadistica._id}
                    // estadistica={estadistica}
                    usuario={estadistica.usuarios}
                  >
                    {/* usuario={estadistica.usuario} */}

                    <td style={tdStyle}>{estadistica.usuario}</td>
                    <td style={tdStyle}>{estadistica.asistencias}</td>
                    <td style={tdStyle}>{estadistica.pases_buenos}</td>
                    <td style={tdStyle}>{estadistica.pases_malos}</td>
                    <td style={tdStyle}>{estadistica.tarjetas_amarillas}</td>
                    <td style={tdStyle}>{estadistica.tarjetas_rojas}</td>
                    <td style={tdStyle}>{estadistica.goles}</td>
                    <td style={tdStyle}>{estadistica.faltas}</td>
                    <td style={tdStyle}>{estadistica.pelotas_recuperadas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Estadisticas;
