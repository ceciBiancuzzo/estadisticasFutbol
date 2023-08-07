import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerPartidosAction, iniciarSesionAction } from "../../actions/partidoActions";
import Partido from "../Partidos/Partido";
//import { CSVLink } from "react-csv";
import Cookies from "universal-cookie";
import '../../hojas-de-estilo/Header.css';

//importar a pdf
import { useReactToPrint } from 'react-to-print';


const cookies = new Cookies();


const Partidos = ({ history }) => {

  const componentRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false, null))
    }
    setTimeout(function () {
      cargarPartidos();
    }, 100);

    //eslint-disable-next-line
  }, []);


 
  const cargarPartidos = () => dispatch(obtenerPartidosAction());
  //obtener el state
  const partidos = useSelector((state) => state.partidos.partidos);
  const error = useSelector((state) => state.partidos.error);
  const cargando = useSelector((state) => state.partidos.loading);

 //PDF
 
  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lista de Partidos",
  //  onAfterPrint: () => alert("Datos Guardados en Pdf")
  });

//estilos para el pdf
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

const thStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  textAlign: "center",
  fontSize: "2.5em", // Ajusta el tamaño de la letra aquí
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center",
  fontSize: "2em", // Ajusta el tamaño de la letra aquí
};
const trStyle = {
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  fontWeight: "bold",
};



  return (
    <Fragment>
      <h2 className="text-center my-5">Listado de Partidos</h2>
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
              <th scope="col">Cancha</th>
              <th scope="col">Division</th>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          {partidos.length === 0
            ?(
            <tr>
              <td colSpan="9" No hay partidos>

              </td>
           </tr>

           ) : partidos.map((partido) => (
              <Partido key={partido._id} partido={partido} />
            ))}
        </table>

        
      </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
        <button className="btn btn-pdf" onClick={generatePDF}>PDF</button>
      </div>

      {/* Contenido que se imprimirá en el PDF */}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
        <table style={tableStyle}>
          
              <tr  style={trStyle}>
              <td colSpan="9">
              <strong style={{ fontSize: "2em" }}>Listado de Partidos</strong>
               </td> 
               </tr>
               <tr>
                <th style={thStyle}>Cancha</th>
                <th style={thStyle}>Division</th>
                <th style={thStyle}>Fecha</th>
                <th style={thStyle}>Hora</th>
              </tr>
        
            <tbody>
              {partidos.map((partido) => (
                <tr key={partido._id}>
                  <td style={tdStyle}>{partido.cancha}</td>
                  <td style={tdStyle}>{partido.division}</td>
                  <td style={tdStyle}>{partido.fecha.split("T")[0]}</td>
                  <td style={tdStyle}>{partido.hora}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default Partidos;