import { useState } from "react";
import FormCard from "./components/FormCard/FormCard";
import ResultCard from "./components/ResultCard/ResultCard";
import HistorySection from "./components/HistorySection/HistorySection";
import dashboardIcon from "../src/assets/icons/dashboardregular.svg";
import simuladorIcon from "../src/assets/icons/backupdataregular.svg";
import reportesIcon from "../src/assets/icons/analysisregular.svg";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  const obtenerHistorial = async () => {
    try {
      setLoadingHistorial(true);

      const response = await fetch(
        "https://auto.dairaitgroup.com.ar/webhook/7c682683-153c-4543-87ef-bdf7b52745ee"
      );

      const data = await response.json();

      setHistorial(data.data.slice(0, 20));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingHistorial(false);
    }
  };

  return (
    <div className="app-container">

      <aside className="sidebar">
        <div>
          <div>
            <img className="logo-daira" src={logo} alt="Logo"/>
          </div>

          <div className="menu">
            <div className="menu-item">
              <img src={dashboardIcon} alt="dashboard" />
              <span>Dashboard</span>
            </div>

            <div className="menu-item active">
              <img src={simuladorIcon} alt="simulador" />
              <span>Simulador</span>
            </div>

            <div className="menu-item">
              <img src={reportesIcon} alt="reportes" />
              <span>Reportes</span>
            </div>
          </div>
        </div>

        <div className="user-section">
          Nombre de usuario
        </div>
      </aside>

      <main className="main-content">

        <div className="mobile-header">
          <span className="hamburger">☰</span>
          <span className="mobile-logo">DAIRA</span>
        </div>

        <h1>Simulador de plazo fijo</h1>
        <p className="subtitle">
          Calculadora de rendimiento de inversiones
        </p>

        <div className="cards-container">
          <FormCard setResultado={setResultado} />
          <ResultCard resultado={resultado} />
        </div>

        <div className="history-section">
          <HistorySection
            historial={historial}
            obtenerHistorial={obtenerHistorial}
            loadingHistorial={loadingHistorial}
          />
        </div>

      </main>
    </div>
  );
}

export default App;