// EstadosUsuarios.jsx
import React, { useState, useEffect } from "react";
import API from "../services/axiosConfig";
import ModalEstadoUsuario from "../components/ModalEstadoUsuario";
import Swal from "sweetalert2";
import { showToast } from "../utils/toast";

const EstadosUsuarios = () => {
  const [estados, setEstados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEstado, setSelectedEstado] = useState(null);

  useEffect(() => {
    obtenerEstados();
  }, []);

  const obtenerEstados = async () => {
    try {
      const res = await API.get("/user-status");
      setEstados(res.data.data);
    } catch (error) {
      console.error("Error al cargar estados:", error);
    }
  };

  const handleNuevo = () => {
    setSelectedEstado(null);
    setModalOpen(true);
  };

  const handleEditar = (estado) => {
    setSelectedEstado(estado);
    setModalOpen(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este estado de usuario?")) return;
    try {
      await API.delete(`/user-status/${id}`);
      obtenerEstados();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleGuardar = async (estado) => {
    try {
      if (selectedEstado) {
        await API.put(`/user-status/${estado.eu_estado}`, {
          eu_descripcion: estado.eu_descripcion,
          eu_usuario_mod: "Administrador",
        });
      } else {
        await API.post(`/user-status`, {
          eu_estado: estado.eu_estado,
          eu_descripcion: estado.eu_descripcion,
          eu_usuario_mod: "Administrador",
        });
      }

      setModalOpen(false);
      obtenerEstados();
      showToast(
        "success",
        selectedEstado
          ? "Estado de usuario actualizado"
          : "Estado de usuario creado"
      );
    } catch (error) {
      console.error("Error al guardar:", error);
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado.";
      Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: message,
      });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Estados de Usuario</h2>
      <button className="btn btn-primary mb-3" onClick={handleNuevo}>
        Nuevo Estado
      </button>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Estado</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estados.map((estado) => (
            <tr key={estado.eu_estado}>
              <td>{estado.eu_estado}</td>
              <td>{estado.eu_descripcion}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditar(estado)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(estado.eu_estado)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {estados.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center">
                No hay estados registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ModalEstadoUsuario
        estadoUsuario={selectedEstado}
        onSave={handleGuardar}
        onClose={() => setModalOpen(false)}
        show={modalOpen}
      />
    </div>
  );
};

export default EstadosUsuarios;
