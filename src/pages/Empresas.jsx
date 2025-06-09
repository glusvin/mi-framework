import React, { useState, useEffect } from "react";
import API from "../services/axiosConfig";
import ModalEmpresa from "../components/ModalEmpresa";
import Swal from "sweetalert2";
import { showToast } from "../utils/toast";

const Empresa = () => {
  const [empresas, setEmpresas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  const obtenerEmpresas = async () => {
    try {
      const res = await API.get("/companies");
      setEmpresas(res.data.data);
    } catch (error) {
      console.error("Error al cargar empresas:", error);
    }
  };

  const handleNuevo = () => {
    setSelectedEmpresa(null);
    setModalOpen(true);
  };

  const handleEditar = (empresa) => {
    setSelectedEmpresa(empresa);
    setModalOpen(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta empresa?")) return;
    try {
      await API.delete(`/companies/${id}`);
      obtenerEmpresas();
      showToast("success", "Empresa eliminada correctamente");
    } catch (error) {
      console.error("Error al eliminar:", error);
      Swal.fire("Error", "No se pudo eliminar la empresa", "error");
    }
  };

  const handleGuardar = async (empresa) => {
    try {
      if (selectedEmpresa) {
        await API.put(`/companies/${selectedEmpresa.em_id}`, {
          ...empresa,
          em_usuario_mod: "Administrador",
        });
        showToast("success", "Empresa actualizada");
      } else {
        await API.post("/companies", {
          ...empresa,
          em_usuario_mod: "Administrador",
        });
        showToast("success", "Empresa creada");
      }

      setModalOpen(false);
      obtenerEmpresas();
    } catch (error) {
      console.error("Error al guardar empresa:", error);
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
      <h2>Empresas</h2>
      <button className="btn btn-primary mb-3" onClick={handleNuevo}>
        Nueva Empresa
      </button>

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Razón Social</th>
              <th>Dirección</th>
              <th>NIT</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr key={empresa.em_id}>
                <td>{empresa.em_nombre}</td>
                <td>{empresa.em_razon_social}</td>
                <td>{empresa.em_direccion}</td>
                <td>{empresa.em_nit}</td>
                <td>{empresa.em_telefono_1}</td>
                <td>{empresa.em_email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEditar(empresa)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(empresa.em_id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {empresas.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  No hay empresas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ModalEmpresa
        empresa={selectedEmpresa}
        onSave={handleGuardar}
        onClose={() => setModalOpen(false)}
        show={modalOpen}
      />
    </div>
  );
};

export default Empresa;
