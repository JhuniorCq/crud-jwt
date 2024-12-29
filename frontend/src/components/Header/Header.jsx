import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header className="header">
      <img src="" alt="Logo" className="header__logo" />

      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item">
            <NavLink to="/register" className="hader__nav-link">
              Registro
            </NavLink>
          </li>
          <li className="header__nav-item">
            <NavLink to="/login" className="header__nav-link">
              Iniciar Sesión
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
