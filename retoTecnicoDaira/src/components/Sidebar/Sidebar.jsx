import "./Sidebar.css";


function Sidebar() {
  return (
    <aside className="sidebar">
       <ul>
        <li>Dashboard</li>
        <li className="active">Simulador</li>
        <li>Reportes</li>
      </ul>
    </aside>
  );
}

export default Sidebar;