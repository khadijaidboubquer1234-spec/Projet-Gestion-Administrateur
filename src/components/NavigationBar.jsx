import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const fullName = user ? `${user.nom || ""} ${user.prenom || ""}`.trim() : "";

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="navbar navbar-dark bg-dark px-3 shadow-sm"
    >
      <div className="d-flex align-items-center gap-3">
        <div className="logo-box">Logo</div>
        <span className="text-white-50 small">Gestion Stagiaires</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {user && (
          <div className="d-flex align-items-center gap-2">
            <div className="color-dot" style={{ background: user.couleur || "#0d6efd" }} />
            <span className="text-white">
              Bonjour <b>{fullName}</b>
            </span>
          </div>
        )}

        <button className="btn btn-outline-light btn-sm" onClick={onLogout}>
          Se Déconnecter
        </button>
      </div>
    </motion.nav>
  );
}