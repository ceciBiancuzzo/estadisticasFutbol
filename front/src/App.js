import React from "react";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Usuarios
import Usuarios from "./component/Usuarios/Usuarios";
import NuevoUsuario from "./component/Usuarios/NuevoUsuario";
import EditarUsuario from "./component/Usuarios/EditarUsuario";
//Partidos
import Partidos from "./component/Partidos/Partidos";
import NuevoPartido from "./component/Partidos/NuevoPartido";
import EditarPartido from "./component/Partidos/EditarPartido";
//Estadisticas
import Estadisticas from "./component/Estadisticas/Estadisticas";
import NuevaEstadistica from "./component/Estadisticas/NuevaEstadistica";
import EditarEstadistica from "./component/Estadisticas/EditarEstadistica";
import Grafico from "./component/Grafico";
import Login from "./component/Login";
import { Provider } from "react-redux";
import store from "./store";
import { useSelector } from "react-redux";
import Imagen from "./component/Imagen";




function App() {
  const inicioSesion = useSelector((state) => state.usuarios.cookie);

  return (
    <Router>
      <Route exact path="/" component={Login} />

      <Provider store={store}>
    
        {inicioSesion ? <Header /> : null}
        <div className="container mt-5">
          <Switch>
            <Route exact path="/inicio" component={Imagen}/>
            <Route exact path="/usuarios" component={Usuarios} />
            <Route exact path="/partidos" component={Partidos} />
            <Route exact path="/estadisticas" component={Estadisticas} />
            <Route exact path="/estadisticaEdad" component={Grafico} />
         
            <Route exact path="/usuarios/editar/:id" component={EditarUsuario}/>
            <Route exact path="/partidos/editar/:id" component={EditarPartido}/>
            <Route exact path="/estadisticas/editar/:id" component={EditarEstadistica}/>
          </Switch>
        </div>
      </Provider>
      
      <Route exact path="/usuarios/nuevo" component={NuevoUsuario} />
      <Route exact path="/partidos/nuevo" component={NuevoPartido} />
      <Route exact path="/estadisticas/nuevo" component={NuevaEstadistica} />
    </Router>
    
  );
}

export default App;
