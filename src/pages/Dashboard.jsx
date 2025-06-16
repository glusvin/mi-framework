import React from "react";

const Dashboard = () => {
  return (
    <div className="row">
      {/* Card 1 */}
      <div className="col-6 col-lg-3 col-md-6">
        <div className="card">
          <div className="card-body px-3 py-4-5">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="stats-icon purple d-flex justify-content-center align-items-center">
                  <i className="bi bi-people fs-2"></i>
                </div>
              </div>
              <div className="col-md-8">
                <h6 className="text-muted font-semibold">Usuarios</h6>
                <h6 className="font-extrabold mb-0">1,234</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="col-6 col-lg-3 col-md-6">
        <div className="card">
          <div className="card-body px-3 py-4-5">
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="stats-icon blue d-flex justify-content-center align-items-center">
                  <i className="bi bi-bar-chart-line fs-2"></i>
                </div>
              </div>
              <div className="col-md-8">
                <h6 className="text-muted font-semibold">Ventas</h6>
                <h6 className="font-extrabold mb-0">15,800</h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Puedes agregar más cards siguiendo este formato */}
    </div>
  );
};

export default Dashboard;
