import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserApi } from "../features/users/usersSlice";
import { updateUser } from "../features/auth/authSlice";
import { showToast } from "../features/ui/uiSlice";

export default function ModifierCouleur() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  const [color, setColor] = useState(user?.couleur || "#0d6efd");
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    if (!user) return;

    // شرط non-admin: age >= 15
    if (!user.admin) {
      const age = Number(user.age || 0);
      if (age < 15) {
        dispatch(showToast({ type: "danger", message: "Accès refusé: âge < 15 ans." }));
        return;
      }
    }

    setLoading(true);
    try {
      const action = await dispatch(updateUserApi({ id: user.id, payload: { couleur: color } }));
      if (updateUserApi.fulfilled.match(action)) {
        dispatch(updateUser({ couleur: action.payload.couleur }));
        dispatch(showToast({ type: "success", message: "Couleur mise à jour." }));
      } else {
        dispatch(showToast({ type: "danger", message: "Erreur lors de la mise à jour." }));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="mb-3">Modifier Couleur</h2>

      <div className="row g-3 align-items-end">
        <div className="col-md-6">
          <label className="form-label">Choisir une couleur</label>
          <input
            type="color"
            className="form-control form-control-color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <button className="btn btn-dark w-100" onClick={onSave} disabled={loading}>
            {loading ? "Validation..." : "Valider"}
          </button>
        </div>
      </div>
    </div>
  );
}