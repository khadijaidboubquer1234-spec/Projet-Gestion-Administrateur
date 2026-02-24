export default function Loading({ text = "Chargement..." }) {
  return (
    <div className="d-flex align-items-center gap-2 text-muted">
      <div className="spinner-border spinner-border-sm" role="status"></div>
      <span>{text}</span>
    </div>
  );
}