import React from "react";

const Dashboard = () => {
  return (
    <div className="row">
      {/* Card 1 */}
      <div className="col-6 col-lg-3 col-md-6">
        <div className="card">
          <div className="card-body px-3 py-4-5">
            <div className="row">
              <div className="col-md-4">
                <div className="stats-icon purple">
                  <i className="bi bi-people"></i>
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
            <div className="row">
              <div className="col-md-4">
                <div className="stats-icon blue">
                  <i className="bi bi-bar-chart-line"></i>
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

      {/* Agrega más cards según necesites */}
    </div>
  );
};

export default Dashboard;
