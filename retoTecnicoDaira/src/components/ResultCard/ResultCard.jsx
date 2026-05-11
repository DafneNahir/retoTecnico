import "./ResultCard.css";
import flecha from "../../assets/icons/arrowtailupregular.svg"
import descargar from "../../assets/icons/downloadregular.svg"

function ResultCard({ resultado }) {
  if (!resultado) {
    return null;
  }

  return (
    <div className="result-card">
      <h2>Resultado de simulación</h2>

      <div className="result-top">
        <div className="result-box">
          <p>Intereses ganados</p>
          <div className="green">
            <h3>+ $
              {Number(resultado.intereses).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <div className="rendimiento">
              <img src={flecha} alt="flecha"/>
              <p className="green">{resultado.tna}% de rendimiento</p>
            </div>
          </div>          
        </div>

        <div className="result-box result-box-monto">
          <p>Monto total estimado</p>
          <div className="blue">
            <h3>+ $
              {Number(resultado.total).toLocaleString("es-AR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h3>
            <p className="p-blue">Al finalizar el período</p>
          </div>
          
        </div>
      </div>

      <div className="result-bottom">
        <div className="result-info">
          <p>TEP (Tasa Efectiva Periodo)</p>
          <h4>{resultado.tna}%</h4>
        </div>

        <div className="result-info">
          <p>Vencimiento</p>
          <h4>{resultado.plazo} días</h4>
        </div>
      </div>
      
      <div className="btn-download">
        <button className="download-btn">
          <img src={descargar} alt="Descargar"/>
        Descargar PDF
      </button></div>      
    </div>
  );
}

export default ResultCard;