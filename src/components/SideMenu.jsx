import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SideMenu() {
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="side-menu">
      <div className="menu-title">Navigation</div>

      <NavLink to="/" className="menu-link">
        Accueil
      </NavLink>

      <NavLink to="/profile" className="menu-link">
        Voir Mon Profile
      </NavLink>

      <NavLink to="/modifier-couleur" className="menu-link">
        Modifier Couleur
      </NavLink>

      {user?.admin && (
        <>
          <div className="menu-title mt-3">Admin</div>

          <NavLink to="/users" className="menu-link">
            Liste Utilisateurs
          </NavLink>

          <NavLink to="/users/new" className="menu-link">
            Ajouter Utilisateur
          </NavLink>
        </>
      )}
    </div>
  );
}