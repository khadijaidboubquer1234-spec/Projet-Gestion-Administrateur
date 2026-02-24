import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers, updateUserApi } from "../features/users/usersSlice";
import { showToast } from "../features/ui/uiSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const isEdit = !!params.id;
  const { list } = useSelector((s) => s.users);

  useEffect(() => {
    if (list.length === 0) dispatch(fetchUsers());
  }, [dispatch, list.length]);

  const userToEdit = useMemo(() => {
    if (!isEdit) return null;
    return list.find((u) => u.id === params.id);
  }, [isEdit, list, params.id]);

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    pseudo: "",
    age: "18",
    admin: false,
    MotDePasse: "",
    couleur: "#0d6efd",
    Pays: "Morocco",
    Devise: "MAD",
    avatar: "",
    photo: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setForm((p) => ({
        ...p,
        ...userToEdit,
        admin: !!userToEdit.admin,
      }));
    }
  }, [userToEdit]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.nom || !form.prenom || !form.email || !form.pseudo) {
      dispatch(showToast({ type: "danger", message: "Veuillez remplir les champs obligatoires." }));
      return;
    }

    if (!isEdit && !form.MotDePasse) {
      dispatch(showToast({ type: "danger", message: "Mot de passe obligatoire." }));
      return;
    }

    if (String(form.MotDePasse).length > 0 && String(form.MotDePasse).length < 6) {
      dispatch(showToast({ type: "danger", message: "Mot de passe minimum 6 caractères." }));
      return;
    }

    if (isEdit) {
      const action = await dispatch(updateUserApi({ id: params.id, payload: form }));
      if (updateUserApi.fulfilled.match(action)) {
        dispatch(showToast({ type: "success", message: "Utilisateur modifié." }));
        navigate("/users");
      }
    } else {
      const action = await dispatch(addUser(form));
      if (addUser.fulfilled.match(action)) {
        dispatch(showToast({ type: "success", message: "Utilisateur ajouté." }));
        navigate("/users");
      }
    }
  };

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="mb-3">{isEdit ? "Modifier Utilisateur" : "Ajouter Utilisateur"}</h2>

      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nom *</label>
          <input className="form-control" value={form.nom} onChange={(e) => set("nom", e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Prénom *</label>
          <input className="form-control" value={form.prenom} onChange={(e) => set("prenom", e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email *</label>
          <input className="form-control" value={form.email} onChange={(e) => set("email", e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Pseudo *</label>
          <input className="form-control" value={form.pseudo} onChange={(e) => set("pseudo", e.target.value)} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Age</label>
          <input className="form-control" value={form.age} onChange={(e) => set("age", e.target.value)} />
        </div>

        <div className="col-md-4">
          <label className="form-label">Admin</label>
          <select className="form-select" value={form.admin ? "1" : "0"} onChange={(e) => set("admin", e.target.value === "1")}>
            <option value="0">Non</option>
            <option value="1">Oui</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Couleur</label>
          <input type="color" className="form-control form-control-color" value={form.couleur} onChange={(e) => set("couleur", e.target.value)} />
        </div>

        <div className="col-md-6">
          <label className="form-label">{isEdit ? "Mot de passe (optionnel)" : "Mot de passe *"}</label>
          <input type="text" className="form-control" value={form.MotDePasse} onChange={(e) => set("MotDePasse", e.target.value)} />
        </div>

        <div className="col-12 d-flex gap-2">
          <button className="btn btn-dark">Enregistrer</button>
          <button type="button" className="btn btn-outline-dark" onClick={() => navigate("/users")}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}