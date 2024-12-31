import { NavLink, useLocation } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/AuthContext/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const publicRoutes = ["/", "/register", "/login"];
  const isPublicRoute = publicRoutes.includes(pathname);

  return (
    <header className="header">
      <img src="" alt="Logo" className="header__logo" />

      <nav className="header__nav">
        <ul className="header__nav-list">
          {user && !isPublicRoute ? (
            <>
              <li>Bienvenido {user.username} !!</li>
              <li>
                <NavLink to="/create-task">Crear Tarea</NavLink>
              </li>
              <li>
                <NavLink to="/tasks">Ver Tareas</NavLink>
              </li>
              <li>
                <NavLink to="/profile">Perfil</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
