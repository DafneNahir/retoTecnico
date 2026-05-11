import { useState } from "react";
import flecha from "../../assets/icons/arrowdownregular.svg"
import "./FormCard.css";

function FormCard({ setResultado }) {
  const [capital, setCapital] = useState("");
  const [plazo, setPlazo] = useState("");
  const [tna, setTna] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingCalculo, setLoadingCalculo] = useState(false);

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

      setCapital("");
      setPlazo("");
      setTna("");
      setErrors({});
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCalculo(false);
    }
  };

  return (

    <div className="form-card">
        <h2>Simulación de inversión</h2>
        <div className="input-group">
            <label>Monto ($)</label>
            <input
                type="number"
                min="1000"
                placeholder="Ej: 10000"
                value={capital}
                onChange={(e) => setCapital(e.target.value)}    
            />
            {errors.capital && (
                <span className="error">{errors.capital}</span>
            )}
        </div>

        <div className="input-row">
            <div className="input-group">
                <label>Plazo (días)</label>
                <div className="input-icon">
                    <input
                        type="number"
                        min="30"
                        placeholder="30"
                        value={plazo}
                        onChange={(e) => setPlazo(e.target.value)}
                    />
                    {errors.plazo && (
                        <p className="error">{errors.plazo}</p>
                    )}
                    <img src={flecha} alt="flecha"/>
                </div>                
            </div>

            <div className="input-group">
                <label>Tasa de interés anual (%)</label>
                <div className="input-icon">                    
                    <input
                        type="number"
                        max="50"
                        placeholder="TNA (%)"
                        value={tna}
                        onChange={(e) => setTna(e.target.value)}
                    />
                    <img src={flecha} alt="flecha"/>
                    {errors.tna && (
                        <p className="error">{errors.tna}</p>
                    )}                    
                </div>
            </div>
        </div>

        <button onClick={calcularPlazoFijo}>
            {loadingCalculo ? "Calculando..." : "Calcular rendimiento"}
        </button>
    </div>
  );
}

export default FormCard;

