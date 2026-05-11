import "./HistorySection.css";

function HistorySection({
  historial,
  obtenerHistorial,
  loadingHistorial,
}) {
  return (
    <>
      <button className="historial" onClick={obtenerHistorial}>
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
                    {Number(
                      item["Intereses ganados"]
                    ).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td>
                    $
                    {Number(
                      item["Monto total"]
                    ).toLocaleString("es-AR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default HistorySection;