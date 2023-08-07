import React, { Component } from "react";
import { NavLink } from "react-router-dom";

function MenuIzquierdo() {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink exact={true} className="nav-link" to={"/"}>
              Inicio
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact={true} className="nav-link" to={"/clases"}>
              Clases
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact={true} className="nav-link" to={"/abonos"}>
              Abonos
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink exact={true} className="nav-link" to={"/clientes"}>
              Clientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact={true} className="nav-link" to={"/turnos"}>
              Turnos Reservados
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default MenuIzquierdo;