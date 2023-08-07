import React, { useState, useEffect } from "react";
//import Usuarios from "./Usuarios";
import { editarUsuarioAction } from "../../actions/usuarioActions";
import { useDispatch, useSelector } from "react-redux";
import {useHistory} from 'react-router-dom'
import {UncontrolledAlert } from "reactstrap";
import { iniciarSesionAction } from "../../actions/usuarioActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const EditarUsuario = () => {
  const error = useSelector((state) => state.usuarios.error);
  const history = useHistory();
  //Nuevo state del usuario
  const [usuario, guardarUsuario] = useState({
    nombre:"",
    apellido: "",
    correo: "",
    id: "",

  });

  //partido a editar
  const usuarioEditar = useSelector((state) => state.usuarios.usuarioeditar);
  const dispatch = useDispatch();
  //if (!producto) return <Productos />;
  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false, null));

    }
    guardarUsuario(usuarioEditar);
  }, [usuarioEditar]);

  //Leer los datos del formulario
  const onChangeFormulario = (e) => {
    guardarUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
    
  };

  const { nombre,correo,apellido,dni} = usuario;

  const submitEditarUsuario = (e) => {
    e.preventDefault();
    dispatch(editarUsuarioAction(usuario));

    history.push("/usuarios");
  };
  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Editar Jugadora
            </h2>
            <form onSubmit={submitEditarUsuario}>
              <div className="form-group">
                <label> Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={onChangeFormulario}
                  name="nombre"
                  value={nombre}
                />
              </div>
              
              <div className="form-group">
                <label> Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apellido"
                  onChange={onChangeFormulario}
                  name="apellido"
                  value={apellido}
                />
              </div>
              <div className="form-group">
                <label> Dni</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Dni"
                  onChange={onChangeFormulario}
                  name="dni"
                  value={dni}
                />
              </div>
              <div className="form-group">
                <label> correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  onChange={onChangeFormulario}
                  name="correo"
                  value={correo}
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

export default EditarUsuario;
