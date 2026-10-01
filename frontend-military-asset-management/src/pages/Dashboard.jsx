
import { useEffect, useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

function Dashboard() {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const [baseId, setBaseId] = useState(3);
  const [equipmentTypeId, setEquipmentTypeId] = useState(1);

  const loadDashboard = async () => {

    try {

      setError("");

      const response = await api.get(
        `/api/dashboard?baseId=${baseId}&equipmentTypeId=${equipmentTypeId}`
      );

      setData(response.data);

    } catch (error) {

      console.error(error);
      setError("Unable to load dashboard");

    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <div>

      <main className="dashboard-container">

        <div className="page-header">

          <div>
            <h1>Dashboard</h1>
            <p>Overview of military asset movements and utilization</p>
          </div>

          <button
            className="refresh-btn"
            onClick={loadDashboard}
          >
            ↻ Refresh
          </button>

        </div>


        {/* Filters */}

        <div className="filters-card">

          <div className="filter-group">

            <label>Base</label>

            <select
              value={baseId}
              onChange={(e) => setBaseId(e.target.value)}
            >
              <option value="3">Base Alpha</option>
            </select>

          </div>


          <div className="filter-group">

            <label>Equipment Type</label>

            <select
              value={equipmentTypeId}
              onChange={(e) => setEquipmentTypeId(e.target.value)}
            >
              <option value="1">Rifle</option>
            </select>

          </div>


          <button
            className="apply-btn"
            onClick={loadDashboard}
          >
            Apply Filters
          </button>

        </div>


        {error && (
          <div className="error-box">
            {error}
          </div>
        )}


        {data && (

          <>

            {/* Main Metrics */}

            <div className="metrics-grid">

              <div className="metric-card">
                <span className="metric-label">
                  Opening Balance
                </span>

                <strong className="metric-value">
                  {data.openingBalance}
                </strong>
              </div>


              <div className="metric-card">
                <span className="metric-label">
                  Closing Balance
                </span>

                <strong className="metric-value">
                  {data.closingBalance}
                </strong>
              </div>


              <div className="metric-card highlight">
                <span className="metric-label">
                  Net Movement
                </span>

                <strong className="metric-value">
                  {data.netMovement}
                </strong>

                <small>
                  Purchases + Transfer In - Transfer Out
                </small>
              </div>


              <div className="metric-card">
                <span className="metric-label">
                  Assigned
                </span>

                <strong className="metric-value">
                  {data.assigned}
                </strong>
              </div>


              <div className="metric-card">
                <span className="metric-label">
                  Expended
                </span>

                <strong className="metric-value">
                  {data.expended}
                </strong>
              </div>

            </div>


            {/* Movement Details */}

            <div className="section-title">
              <h2>Movement Summary</h2>
              <p>Asset movement breakdown</p>
            </div>


            <div className="movement-grid">

              <div className="movement-card">
                <div className="movement-icon">+</div>

                <div>
                  <span>Purchases</span>
                  <strong>{data.purchases}</strong>
                </div>
              </div>


              <div className="movement-card">
                <div className="movement-icon">↓</div>

                <div>
                  <span>Transfer In</span>
                  <strong>{data.transferIn}</strong>
                </div>
              </div>


              <div className="movement-card">
                <div className="movement-icon">↑</div>

                <div>
                  <span>Transfer Out</span>
                  <strong>{data.transferOut}</strong>
                </div>
              </div>

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default Dashboard;