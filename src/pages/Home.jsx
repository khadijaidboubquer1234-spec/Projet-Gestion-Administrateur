import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Home() {
  const user = useSelector((s) => s.auth.user);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="card border-0 shadow-sm rounded-4 p-4"
    >
      <h2 className="mb-2">Accueil</h2>
      <p className="text-muted mb-0">
        Bienvenue <b>{user?.nom} {user?.prenom}</b>.👋 .
      </p>
    </motion.div>
  );
}