import React, { useState, useEffect } from "react";

const ModalTipoUsuario = ({ show, onClose, onSave, tipoUsuario }) => {
  const [tuTipo, setTuTipo] = useState("");
  const [tuDescripcion, setTuDescripcion] = useState("");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (tipoUsuario) {
      setTuTipo(tipoUsuario.tu_tipo);
      setTuDescripcion(tipoUsuario.tu_descripcion);
    } else {
      setTuTipo("");
      setTuDescripcion("");
    }
    setValidated(false); // reset validation when modal opens
  }, [tipoUsuario, show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación manual
    if (tuTipo.trim() === "" || tuDescripcion.trim() === "") {
      setValidated(true);
      return;
    }

    onSave({ tu_tipo: tuTipo.trim(), tu_descripcion: tuDescripcion.trim() });
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
                {tipoUsuario
                  ? "Editar Tipo de Usuario"
                  : "Nuevo Tipo de Usuario"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="tuTipo" className="form-label">
                  Tipo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tuTipo"
                  value={tuTipo}
                  onChange={(e) => setTuTipo(e.target.value.toUpperCase())}
                  maxLength={1}
                  required
                  disabled={!!tipoUsuario} // no permitir editar clave primaria si ya existe
                />
                <div className="invalid-feedback">
                  El tipo es obligatorio (1 carácter).
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="tuDescripcion" className="form-label">
                  Descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tuDescripcion"
                  value={tuDescripcion}
                  onChange={(e) => setTuDescripcion(e.target.value)}
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

export default ModalTipoUsuario;
