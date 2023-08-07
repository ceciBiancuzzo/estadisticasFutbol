import React, { Fragment, useEffect,useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { obtenerUsuariosAction,iniciarSesionAction } from "../../actions/usuarioActions";
import Usuario from "../Usuarios/Usuario";
//import {CSVLink} from "react-csv"; 
import Cookies from "universal-cookie";
import '../../hojas-de-estilo/Header.css';
//importar a pdf
import { useReactToPrint } from 'react-to-print';

const cookies = new Cookies();
const Usuarios = ({ history }) => {
  const componentRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false,null))
  
      }
    setTimeout(function () {
      cargarUsuarios();
    }, 100);

    //eslint-disable-next-line
  }, []);

  const cargarUsuarios = () => dispatch(obtenerUsuariosAction());
  //obtener el state
  const usuarios = useSelector((state) => state.usuarios.usuarios);
  const error = useSelector((state) => state.usuarios.error);
  const cargando = useSelector((state) => state.usuarios.loading);
  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Lista de Jugadoras",
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
   <div>
      <h2 className="text-center my-5">Listado de Jugadoras</h2>
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
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Edad</th>
            <th scope="col">Dni</th>
            <th scope="col">Correo</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
         
        {usuarios.length === 0
          ? (
            <tr>
              <td colSpan="9">No hay jugadores</td>
            </tr>
          
          ): (  
            usuarios.map((usuario) => (
              <Usuario key={usuario._id} usuario={usuario} />
          ))
            )}
   </tbody>
      </table>
    </div>
      <div className="d-grid d-md-flex justify-content-md-end mb-3">
        <button className="btn btn-pdf" onClick={generatePDF}>PDF</button>
      </div>
      {/* Contenido que se imprimirá en el PDF */}
      <div style={{ display: "none" }}>
        <div ref={componentRef}>
        <table style={tableStyle}>
        <tbody>
        <tr  style={trStyle}>
              <td colSpan="9">
              <strong style={{ fontSize: "2em" }}>Listado de Jugadoras</strong>
               </td> 
               </tr>
              <tr>
                <th style={thStyle}>Nombre</th>
                <th style={thStyle}>Apellido</th>
                <th style={thStyle}>Edad</th>
                <th style={thStyle}>Dni</th>
                <th style={thStyle}>Correo</th>
              
              </tr>
           
          
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td style={tdStyle}>{usuario.nombre}</td>
                  <td style={tdStyle}>{usuario.apellido}</td>
                  <td style={tdStyle}>{usuario.edad}</td>
                  <td style={tdStyle}>{usuario.dni}</td>
                  <td style={tdStyle}>{usuario.correo}</td>
                </tr>
              ))}
                </tbody>
          </table>
        </div>
      </div>
      </div>
  
  );
};

export default Usuarios;
