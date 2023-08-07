import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner, UncontrolledAlert } from "reactstrap";
//Actions de Redux
import { crearNuevoUsuarioAction } from "../../actions/usuarioActions";
import { mostrarAlerta, ocultarAlertaAction } from "../../actions/alertaActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const NuevoUsuario = ({ history }) => {
  //State del componente
  const [nombre, guardarNombre] = useState("");
  const [apellido, guardarApellido] = useState("");
  const [correo, guardarCorreo] = useState("");
  const [password, guardarPassword] = useState("");
  const [edad, guardarEdad] = useState("");
  const [dni,guardarDni] = useState("");
  //utilizar useDispach y te crea una nueva funcion
  const dispatch = useDispatch();

  //Acceder al state del store
  const cargando = useSelector((state) => state.usuarios.loading);
  const error = useSelector((state) => state.usuarios.error);
  const alerta = useSelector((state) => state.alerta.alerta);
  const iniciar = useSelector((state) => state.alerta.iniciarSesion);

  //Manda a llamar el action de productoAction
  const agregarUsuario = (usuario) =>
    dispatch(crearNuevoUsuarioAction(usuario));

  //cuando el usuario haga submit
  const submitNuevoUsuario = (e) => {
    e.preventDefault();
// Crear objeto FormData con los datos del formulario



    //validar Formulario
    if (
      nombre.trim() === "" ||
      edad === 0 ||
      correo.trim() === "" ||
      password.trim() === ""
    ) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        clases: "alert alert-danger text-center text-uppercase p3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    //si no hay errores
    dispatch(ocultarAlertaAction());
    //crear nuevo usuario
    agregarUsuario({ nombre, correo, password, edad,apellido,dni });


    if (cookies.get("id")) {
      
       history.push("/");
    } else {
      
      history.push("/usuarios");
      
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
              Agregar Jugadora
            </h2>
            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : null}
            <form onSubmit={submitNuevoUsuario}>
              <div className="form-group">
                <label> Nombre</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Nombre usuario"
                  name="nombre"
                  value={nombre}
                  onChange={(e) => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Apellido Jugadora</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Apellido Jugadora"
                  name="apellido"
                  value={apellido}
                  onChange={(e) => guardarApellido(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Dni</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Dni"
                  name="dni"
                  value={dni}
                  onChange={(e) => guardarDni(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Edad</label>
                <input
                  type="number"
                  className="form-control "
                  placeholder="Edad"
                  name="edad"
                  value={edad}
                  onChange={(e) => guardarEdad(e.target.value)}
                />
              </div>
         
           
              <div className="form-group">
                <label> Correo</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Correo"
                  name="correo"
                  value={correo}
                  onChange={(e) => guardarCorreo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label> Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => guardarPassword(e.target.value)}
                />
              </div>
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

export default NuevoUsuario;
