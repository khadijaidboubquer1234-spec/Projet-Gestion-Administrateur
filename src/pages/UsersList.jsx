import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../features/users/usersSlice";
import Loading from "../components/Loading";
import { showToast } from "../features/ui/uiSlice";
import { Link } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((s) => s.users);

  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return list;

    return list.filter((u) => {
      const nom = (u.nom || "").toLowerCase();
      const prenom = (u.prenom || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      return nom.includes(s) || prenom.includes(s) || email.includes(s);
    });
  }, [q, list]);

  const onDelete = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    await dispatch(deleteUser(id));
    dispatch(showToast({ type: "info", message: "Utilisateur supprimé." }));
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Liste Utilisateurs</h2>
        <Link to="/users/new" className="btn btn-dark">
          + Ajouter
        </Link>
      </div>

      <input
        className="form-control mb-3"
        placeholder="Rechercher par nom, prénom, email..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {loading ? (
        <Loading />
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Age</th>
                <th>Admin</th>
                <th>Couleur</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u, i) => (
                <tr key={u.id}>
                  <td>{i + 1}</td>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.email}</td>
                  <td>{u.age}</td>
                  <td>
                    <span className={`badge ${u.admin ? "text-bg-success" : "text-bg-secondary"}`}>
                      {u.admin ? "Oui" : "Non"}
                    </span>
                  </td>
                  <td>
                    <span className="color-dot me-2" style={{ background: u.couleur || "#0d6efd" }} />
                    <span className="text-muted small">{u.couleur}</span>
                  </td>
                  <td className="text-end">
                    <Link to={`/users/${u.id}/edit`} className="btn btn-sm btn-success me-2">
                      Modifier
                    </Link>
                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(u.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    Aucun utilisateur.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}