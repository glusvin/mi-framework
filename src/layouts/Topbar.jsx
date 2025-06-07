// src/layouts/Topbar.jsx
import React from "react";

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="mb-3">
      <a
        href="#"
        className="burger-btn"
        onClick={(e) => {
          e.preventDefault();
          toggleSidebar();
        }}
        style={{ fontSize: "1.5rem", display: "inline-block" }}
      >
        <i className="bi bi-justify"></i>
      </a>
    </header>
  );
};

export default Topbar;

