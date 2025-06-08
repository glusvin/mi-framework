import React, { useState, useEffect } from "react";

const ModalEstadoUsuario = ({ show, onClose, onSave, estadoUsuario }) => {
  const [euEstado, setEuEstado] = useState("");
  const [euDescripcion, setEuDescripcion] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (estadoUsuario) {
      setEuEstado(estadoUsuario.eu_estado);
      setEuDescripcion(estadoUsuario.eu_descripcion);
    } else {
      setEuEstado("");
      setEuDescripcion("");
    }
    setValidated(false);
  }, [estadoUsuario, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (euEstado.trim() === "" || euDescripcion.trim() === "") {
      setValidated(true);
      return;
    }

    onSave({
      eu_estado: euEstado.trim().toUpperCase(),
      eu_descripcion: euDescripcion.trim(),
    });
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <form
          className={validated ? "was-validated" : ""}
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {estadoUsuario
                  ? "Editar Estado de Usuario"
                  : "Nuevo Estado de Usuario"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="euEstado" className="form-label">
                  Estado
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="euEstado"
                  value={euEstado}
                  onChange={(e) => setEuEstado(e.target.value.toUpperCase())}
                  maxLength={1}
                  required
                  disabled={!!estadoUsuario}
                />
                <div className="invalid-feedback">
                  El estado es obligatorio (1 carácter).
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="euDescripcion" className="form-label">
                  Descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="euDescripcion"
                  value={euDescripcion}
                  onChange={(e) => setEuDescripcion(e.target.value)}
                  maxLength={32}
                  required
                />
                <div className="invalid-feedback">
                  La descripción es obligatoria.
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

export default ModalEstadoUsuario;
