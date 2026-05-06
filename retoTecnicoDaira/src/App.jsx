import { useState } from "react";
import "./App.css";

function App() {
  const [capital, setCapital] = useState("");
  const [plazo, setPlazo] = useState("");
  const [tna, setTna] = useState("");

  const [errors, setErrors] = useState({});
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);

  const [loadingCalculo, setLoadingCalculo] = useState(false);
  const [loadingHistorial, setLoadingHistorial] = useState(false);

  const validarFormulario = () => {
    let nuevosErrores = {};

    if (capital === "" || Number(capital) < 1000) {
      nuevosErrores.capital = "El monto mínimo permitido es $1000";
    }

    if (plazo === "" || Number(plazo) < 30) {
      nuevosErrores.plazo = "El plazo mínimo permitido es de 30 días";
    }

    if (tna === "" || Number(tna) > 50) {
      nuevosErrores.tna = "La TNA máxima permitida es 50%";
    }

    setErrors(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const calcularPlazoFijo = async () => {
    if (!validarFormulario()) return;

    try {
      setLoadingCalculo(true);

      const response = await fetch(
        "https://auto.dairaitgroup.com.ar/webhook/67479a90-b220-4b6a-b082-54ae3de35fe4",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            capital_invertido: Number(capital),
            plazo_en_dias: Number(plazo),
            tna: Number(tna),
          }),
        }
      );

      const data = await response.json();

      const montoTotal =
        Number(data.capital_invertido) + Number(data.interes_ganado);

      setResultado({
        capital: Number(data.capital_invertido).toFixed(2),
        plazo: data.plazo_en_dias,
        tna: data.tna,
        intereses: Number(data.interes_ganado).toFixed(2),
        total: montoTotal.toFixed(2),
      });

      // limpiar formulario luego de cálculo exitoso
      setCapital("");
      setPlazo("");
      setTna("");

      // limpiar errores previos
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCalculo(false);
    }
  };

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
    <div className="container">
      <h1>Simulador de Plazo Fijo</h1>

      <div className="formulario">
        <div className="input-group">
          <input
            type="number"
            min="1000"
            placeholder="Monto a invertir (mínimo $1000)"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
          />
          {errors.capital && (
            <span className="error">{errors.capital}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="number"
            min="30"
            placeholder="Plazo en días (mínimo 30 días)"
            value={plazo}
            onChange={(e) => setPlazo(e.target.value)}
          />
          {errors.plazo && (
            <span className="error">{errors.plazo}</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="number"
            max="50"
            placeholder="TNA (%) (máximo 50%)"
            value={tna}
            onChange={(e) => setTna(e.target.value)}
          />
          {errors.tna && (
            <span className="error">{errors.tna}</span>
          )}
        </div>

        <button onClick={calcularPlazoFijo}>
          {loadingCalculo ? "Calculando..." : "Calcular"}
        </button>
      </div>

      {resultado && (
        <div className="resultado">
          <h2>Resultado de la simulación</h2>

          <p>
            <span>Capital invertido:</span>
            <span>${resultado.capital}</span>
          </p>

          <p>
            <span>Plazo en días:</span>
            <span>{resultado.plazo}</span>
          </p>

          <p>
            <span>TNA aplicada:</span>
            <span>{resultado.tna}%</span>
          </p>

          <p>
            <span>Intereses ganados:</span>
            <span>${resultado.intereses}</span>
          </p>

          <p>
            <span>Monto total:</span>
            <span>${resultado.total}</span>
          </p>
        </div>
      )}

      <button onClick={obtenerHistorial}>
        {loadingHistorial
          ? "Cargando historial..."
          : "Ver historial de simulaciones"}
      </button>

      {historial.length > 0 && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Capital</th>
                <th>Plazo</th>
                <th>TNA</th>
                <th>Intereses</th>
                <th>Monto total</th>
              </tr>
            </thead>

            <tbody>
              {historial.map((item, index) => (
                <tr key={index}>
                  <td>
                    $
                    {Number(item.Capital).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td>{item["Plazo en días"]}</td>

                  <td>{item["TNA aplicada"]}%</td>

                  <td>
                    $
                    {Number(item["Intereses ganados"]).toLocaleString(
                      "es-AR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </td>

                  <td>
                    $
                    {Number(item["Monto total"]).toLocaleString(
                      "es-AR",
                      {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;