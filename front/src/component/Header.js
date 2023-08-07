//import React from "react";
import React, { useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cerrarSesionAction } from "../actions/usuarioActions";
import "../hojas-de-estilo/Header.css";
import imagenes from "../imagenes/escudo-impsa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { IconName } from "react-icons/fa6";
//import MenuIzquierdo from "./MenuIzquierdo";

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const finalizarSesion = () => {
    history.push("/");

  //  alert("Redirigiendo");
    dispatch(cerrarSesionAction());
  };


  return (
    <div>
      <Navbar
        expand="lg"
        className="navbar-expand-lg navbar-dark my-custom-color justify-content-between"
      >
        <Container>
          <Navbar.Brand className="navbar-brand custom-font-size">
            <img src={imagenes} width="70" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => setExpanded(expanded ? false : "expanded")}
          />
          <Navbar.Collapse id="basic-navbar-nav" expanded={expanded}>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to={"/inicio"}>
                IMPSA-Futsal
              </Nav.Link>
              <NavDropdown title="Jugadoras" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"/usuarios/nuevo"}>
                  Agregar Jugadora
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to={"/usuarios"}>
                  Ver Lista Jugadoras
                </NavDropdown.Item>
              </NavDropdown>

              <NavDropdown className="" title="Partidos" id="basic-nav-dropdown">
            
            <NavDropdown.Item as={Link} to={"/partidos/nuevo"}>
               Agregar Partido
              </NavDropdown.Item>
              
              <NavDropdown.Item as={Link} to={"/partidos"}>
                Ver Lista Partidos
              </NavDropdown.Item>
             
             
           
            </NavDropdown>

              <NavDropdown title="Estadisticas" id="basic-nav-dropdown"
              className="custom-dropdown"
              >
                <NavDropdown.Item as={Link}
                 to={"/estadisticaEdad"}
                 className="custom-dropdown-item"
                 >
                  Ver Estadistica
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/estadisticas/nuevo"}
                className="custom-dropdown-item"
                >
               Agregar Estadistica
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/estadisticas"}
              className="custom-dropdown-item">
                Ver Lista Estadisticas
              </NavDropdown.Item>
              </NavDropdown>
            </Nav>
       
          </Navbar.Collapse>
        </Container>
        <Nav className="ml-auto">
        
        <button
  onClick={finalizarSesion}
  className="btn btn-dark nuevo-post d-block d-md-incline-block center-button btn-cerrar-sesion justify-content-between"
>
  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" /> Salir
</button>
      
             
            </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
