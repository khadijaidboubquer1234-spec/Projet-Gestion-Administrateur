import NavigationBar from "./NavigationBar";
import SideMenu from "./SideMenu";
import Toast from "./Toast";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppLayout() {
  return (
    <div className="app-shell">
      <NavigationBar />
      <Toast />

      <div className="app-body">
        <SideMenu />

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          className="content-zone"
        >
          <Outlet />
          <footer className="mt-4 pt-3 border-top text-muted small">
            <div>Adresse: ISTA Hay Salam - Salé</div>
            <div className="d-flex gap-2 mt-1">
              <a href="#" className="text-decoration-none">Facebook</a>
              <a href="#" className="text-decoration-none">Instagram</a>
              <a href="#" className="text-decoration-none">LinkedIn</a>
            </div>
          </footer>
        </motion.div>
      </div>
    </div>
  );
}