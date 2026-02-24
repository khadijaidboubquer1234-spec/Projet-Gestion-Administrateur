import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../features/ui/uiSlice";
import { AnimatePresence, motion } from "framer-motion";

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((s) => s.ui.toast);

  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="toast-fixed"
        >
          <div className={`alert alert-${toast.type} shadow-lg d-flex justify-content-between align-items-center`}>
            <span>{toast.message}</span>
            <button className="btn btn-sm btn-outline-dark" onClick={() => dispatch(hideToast())}>
              X
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}