import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";
import { login } from "../features/auth/authSlice";
import { showToast } from "../features/ui/uiSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list, loading } = useSelector((s) => s.users);
  const isAuth = useSelector((s) => s.auth.isAuthenticated);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const id = identifier.trim().toLowerCase();
    const pass = password.trim();

    if (!id || !pass) {
      dispatch(showToast({ type: "danger", message: "Veuillez remplir tous les champs." }));
      return;
    }

    const found = list.find((u) => {
      const email = (u.email || "").toLowerCase();
      const pseudo = (u.pseudo || "").toLowerCase();
      return (email === id || pseudo === id) && (u.MotDePasse || "") === pass;
    });

    if (!found) {
      dispatch(showToast({ type: "danger", message: "Identifiants incorrects." }));
      return;
    }

    dispatch(login(found));
    dispatch(showToast({ type: "success", message: `Bienvenue ${found.nom} ${found.prenom}` }));
    navigate("/");
  };

  return (
    <div className="container py-5">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="mb-1">Connexion</h3>
              <p className="text-muted mb-4">Email ou pseudo + mot de passe</p>

              <form onSubmit={onSubmit} className="d-grid gap-3">
                <input
                  className="form-control"
                  placeholder="Email ou pseudo"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />

                <input
                  className="form-control"
                  placeholder="Mot de passe"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button className="btn btn-dark" disabled={loading}>
                  {loading ? "Chargement..." : "Se connecter"}
                </button>

                <div className="text-muted small">
                  Admin exemple: <b>ybenzguer@gmail.com</b> / <b>Yassine@123</b>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}