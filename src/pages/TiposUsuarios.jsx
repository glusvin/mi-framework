import React, { useState } from "react";
import ModalTipoUsuario from "../components/ModalTipoUsuario";

const TiposUsuarios = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editTipoUsuario, setEditTipoUsuario] = useState(null);

  // Lista inicial con ejemplos
  const [tipos, setTipos] = useState([
    { tu_tipo: "A", tu_descripcion: "Administrador" },
    { tu_tipo: "U", tu_descripcion: "Usuario" },
  ]);

  const abrirNuevo = () => {
    setEditTipoUsuario(null);
    setModalOpen(true);
  };

  const abrirEditar = (tipoUsuario) => {
    setEditTipoUsuario(tipoUsuario);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const guardarTipoUsuario = (datos) => {
    // Si editTipoUsuario es null => Nuevo, si no => Editar
    if (editTipoUsuario) {
      setTipos((prev) =>
        prev.map((t) => (t.tu_tipo === datos.tu_tipo ? datos : t))
      );
    } else {
      setTipos((prev) => [...prev, datos]);
    }
    cerrarModal();
  };

  return (
    <div className="container mt-4">
      <h2>Tipos de Usuario</h2>
      <button className="btn btn-success mb-3" onClick={abrirNuevo}>
        Nuevo Tipo de Usuario
      </button>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center">
                No hay tipos de usuario registrados.
              </td>
            </tr>
          )}
          {tipos.map((tipo) => (
            <tr key={tipo.tu_tipo}>
              <td>{tipo.tu_tipo}</td>
              <td>{tipo.tu_descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => abrirEditar(tipo)}
                  title="Editar"
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Seguro que deseas eliminar este tipo de usuario?"
                      )
                    ) {
                      setTipos((prev) =>
                        prev.filter((t) => t.tu_tipo !== tipo.tu_tipo)
                      );
                    }
                  }}
                  title="Eliminar"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalTipoUsuario
        show={modalOpen}
        onClose={cerrarModal}
        onSave={guardarTipoUsuario}
        tipoUsuario={editTipoUsuario}
      />
    </div>
  );
};

export default TiposUsuarios;
