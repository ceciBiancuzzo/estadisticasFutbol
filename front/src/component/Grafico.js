import { React, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { obtenerUsuariosAction } from "../actions/usuarioActions";
import { iniciarSesionAction } from "../actions/usuarioActions";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function Grafico({history}) {
  const [nombre, setNombre] = useState([]);
  const [edad, setEdad] = useState([]);
  const [apellido, setApellido] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
      dispatch(iniciarSesionAction(false, null));

    }
    setTimeout(function () {
      mostrar();
      prueba();
    }, 100);

    //eslint-disable-next-line
  }, []);

  const cargarEdad = () => {
    dispatch(obtenerUsuariosAction());
  };
  //obtener el state
  const usuarios = useSelector((state) => state.usuarios.usuarios);

  const mostrar = () => {
    cargarEdad();
    var AuxNombre = [];
    var AuxEdad = [];
    var AuxApellido=[];
    
    usuarios.map((usuario) => {
        AuxNombre.push(usuario.nombre);
        AuxEdad.push(usuario.edad);
        AuxApellido.push(usuario.apellido)
      });
    
    setNombre(AuxNombre);
    setEdad(AuxEdad);
    setApellido(AuxApellido);
  };
  //const [contEdad, setContEdad] = useState([]);
  const prueba = () => {
    
      const edadReduce = edad.reduce((acc, i) => {
        acc[i] = (acc[i] || 0) + 1;
        return acc;
      }, {});
    //  console.log(edadReduce);
    
    
  };
  
  const data = {
    labels: nombre,apellido,
    datasets: [
      {
        label: "Edad",
        backgroundColor: "rgba(0,0,255,0.2)",
        bordercolor: "black",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(0,0,255,0.1",
        hoverBorderColor: "#FFFFFF",
        data: edad,
      },
    ],
  };
  const opciones = {
    maintainAspectRatio: false,
    responsive: true,
  };
  return (
    <div>
      <h2 className="text-center mb-3">Edad </h2>
      <Bar data={data} option={opciones} />
    </div>
  );
}
