import React, { useState, useEffect } from "react";

const ModalEmpresa = ({ show, onClose, onSave, empresa }) => {
  const [formData, setFormData] = useState({
    em_nombre: "",
    em_razon_social: "",
    em_direccion: "",
    em_nit: "",
    em_telefono_1: "",
    em_telefono_2: "",
    em_telefono_3: "",
    em_email: "",
  });

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (empresa) {
      setFormData({
        em_nombre: empresa.em_nombre,
        em_razon_social: empresa.em_razon_social,
        em_direccion: empresa.em_direccion,
        em_nit: empresa.em_nit,
        em_telefono_1: empresa.em_telefono_1,
        em_telefono_2: empresa.em_telefono_2,
        em_telefono_3: empresa.em_telefono_3,
        em_email: empresa.em_email,
      });
    } else {
      setFormData({
        em_nombre: "",
        em_razon_social: "",
        em_direccion: "",
        em_nit: "",
        em_telefono_1: "",
        em_telefono_2: "",
        em_telefono_3: "",
        em_email: "",
      });
    }
    setValidated(false);
  }, [empresa, show]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const camposObligatorios = [
      "em_nombre",
      "em_razon_social",
      "em_direccion",
      "em_nit",
      "em_telefono_1",
      "em_email",
    ];

    const camposIncompletos = camposObligatorios.some(
      (campo) => formData[campo].trim() === ""
    );

    if (camposIncompletos) {
      setValidated(true);
      return;
    }

    onSave(formData);
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <form
          className={validated ? "was-validated" : ""}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {empresa ? "Editar Empresa" : "Nueva Empresa"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {/* Grupo: Datos Generales */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="em_nombre" className="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_nombre"
                    value={formData.em_nombre}
                    onChange={handleChange}
                    maxLength={128}
                    required
                  />
                  <div className="invalid-feedback">
                    El nombre es obligatorio.
                  </div>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="em_razon_social" className="form-label">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_razon_social"
                    value={formData.em_razon_social}
                    onChange={handleChange}
                    maxLength={128}
                    required
                  />
                  <div className="invalid-feedback">
                    La razón social es obligatoria.
                  </div>
                </div>

                {/* Grupo: Dirección y NIT */}
                <div className="col-md-8 mb-3">
                  <label htmlFor="em_direccion" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_direccion"
                    value={formData.em_direccion}
                    onChange={handleChange}
                    maxLength={256}
                    required
                  />
                  <div className="invalid-feedback">
                    La dirección es obligatoria.
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="em_nit" className="form-label">
                    NIT
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_nit"
                    value={formData.em_nit}
                    onChange={handleChange}
                    maxLength={16}
                    required
                  />
                  <div className="invalid-feedback">El NIT es obligatorio.</div>
                </div>

                {/* Grupo: Contacto */}
                <div className="col-md-4 mb-3">
                  <label htmlFor="em_telefono_1" className="form-label">
                    Teléfono 1
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_telefono_1"
                    value={formData.em_telefono_1}
                    onChange={handleChange}
                    maxLength={10}
                    required
                  />
                  <div className="invalid-feedback">
                    El teléfono 1 es obligatorio.
                  </div>
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="em_telefono_2" className="form-label">
                    Teléfono 2
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_telefono_2"
                    value={formData.em_telefono_2}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>

                <div className="col-md-4 mb-3">
                  <label htmlFor="em_telefono_3" className="form-label">
                    Teléfono 3
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="em_telefono_3"
                    value={formData.em_telefono_3}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="em_email" className="form-label">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="em_email"
                    value={formData.em_email}
                    onChange={handleChange}
                    maxLength={128}
                    required
                  />
                  <div className="invalid-feedback">
                    El correo electrónico es obligatorio.
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEmpresa;
