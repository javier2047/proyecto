
//import navList from "../../../data/navItem";
//import NavItem from "./NavItem";
import "./sideBar.css";
function SideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item mb-2">
          <a className="nav-link" href="/dashboard">
            <i className="bi bi-bar-chart-line"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/estado">
            <i className="bi bi-calendar-check"></i>
            <span>Admin.Cancelaciones</span>
          </a>
        </li>
        {/* <li className="nav-heading">Pages</li>
        {navList.map(nav=>(
          <NavItem key={nav._id} nav={nav} />
        ))} */}
      </ul>
    </aside>
  );
}

export default SideBar;
