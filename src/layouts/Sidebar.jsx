// src/layouts/Sidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/mazer/images/logo/logo.png";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [openConfig, setOpenConfig] = useState(false);

  return (
    <div id="sidebar" className={isOpen ? "active" : ""}>
      <div className="sidebar-wrapper active">
        <div className="sidebar-header">
          <img src={logo} alt="Logo" />
        </div>
        <div className="sidebar-menu">
          <ul className="menu">
            <li className="sidebar-title">Menu</li>

            <li className="sidebar-item">
              <Link to="/" className="sidebar-link">
                <i className="bi bi-grid-fill"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li className="sidebar-item">
              <Link to="/usuarios" className="sidebar-link">
                <i className="bi bi-people-fill"></i>
                <span>Usuarios</span>
              </Link>
            </li>

            <li className={`sidebar-item has-sub ${openConfig ? "active" : ""}`}>
              <a
                href="#"
                className="sidebar-link"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenConfig(!openConfig);
                }}
              >
                <i className="bi bi-gear"></i>
                <span>Configuración</span>
              </a>
              <ul className={`submenu ${openConfig ? "active" : ""}`}>
                <li className="submenu-item">
                  <Link to="/tipos-usuarios">Tipos de Usuarios</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/estado-usuarios">Estado de Usuarios</Link>
                </li>
                <li className="submenu-item">
                  <Link to="/usuarios">Usuarios</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <button
          className="sidebar-toggler btn x"
          onClick={() => setIsOpen(false)}
        >
          <i className="bi bi-x"></i>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
