import React, { useState, useEffect } from "react";
import API from "../services/axiosConfig"; // Usamos la instancia
import ModalTipoUsuario from "../components/ModalTipoUsuario";
import Swal from "sweetalert2";
import { showToast } from "../utils/toast";

const TiposUsuarios = () => {
  const [tipos, setTipos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState(null);

  useEffect(() => {
    obtenerTipos();
  }, []);

  const obtenerTipos = async () => {
    try {
      const res = await API.get("/user-types");
      setTipos(res.data.data);
    } catch (error) {
      console.error("Error al cargar tipos:", error);
    }
  };

  const handleNuevo = () => {
    setSelectedTipo(null);
    setModalOpen(true);
  };

  const handleEditar = (tipo) => {
    setSelectedTipo(tipo);
    setModalOpen(true);
  };

  const handleEliminar = async (tu_tipo) => {
    if (!window.confirm("¿Eliminar este tipo de usuario?")) return;
    try {
      await API.delete(`/user-types/${tu_tipo}`);
      obtenerTipos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const handleGuardar = async (tipo) => {
    try {
      if (selectedTipo) {
        await API.put(`/user-types/${tipo.tu_tipo}`, {
          tu_descripcion: tipo.tu_descripcion,
          tu_usuario_mod: "Administrador",
        });
      } else {
        await API.post(`/user-types`, {
          tu_tipo: tipo.tu_tipo,
          tu_descripcion: tipo.tu_descripcion,
          tu_usuario_mod: "Administrador",
        });
      }

      setModalOpen(false);
      obtenerTipos();
      showToast(
        "success",
        selectedTipo ? "Tipo de usuario actualizado" : "Tipo de usuario creado"
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
      <h2>Tipos de Usuario</h2>
      <button className="btn btn-primary mb-3" onClick={handleNuevo}>
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
          {tipos.map((tipo) => (
            <tr key={tipo.tu_tipo}>
              <td>{tipo.tu_tipo}</td>
              <td>{tipo.tu_descripcion}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditar(tipo)}
                >
                  <i className="bi bi-pencil"></i>
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(tipo.tu_tipo)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
          {tipos.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center">
                No hay tipos de usuario registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <ModalTipoUsuario
        tipoUsuario={selectedTipo}
        onSave={handleGuardar} // unifica nombres con el modal
        onClose={() => setModalOpen(false)}
        show={modalOpen} // pasar el estado de visibilidad
      />
    </div>
  );
};

export default TiposUsuarios;
