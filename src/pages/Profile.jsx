import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);

  return (
    <div className="card border-0 shadow-sm rounded-4 p-4">
      <h2 className="mb-3">Mon Profile</h2>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Nom</div>
            <div className="value">{user?.nom}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Prénom</div>
            <div className="value">{user?.prenom}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Email</div>
            <div className="value">{user?.email}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Pseudo</div>
            <div className="value">{user?.pseudo}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Pays</div>
            <div className="value">{user?.Pays}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Devise</div>
            <div className="value">{user?.Devise}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Admin</div>
            <div className="value">{user?.admin ? "Oui" : "Non"}</div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="info-box">
            <div className="label">Couleur</div>
            <div className="value d-flex align-items-center gap-2">
              <span className="color-dot" style={{ background: user?.couleur || "#0d6efd" }} />
              {user?.couleur}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}