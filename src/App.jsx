import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ModifierCouleur from "./pages/ModifierCouleur";
import UsersList from "./pages/UsersList";
import UserForm from "./pages/UserForm";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="modifier-couleur" element={<ModifierCouleur />} />

          <Route
            path="users"
            element={
              <AdminRoute>
                <UsersList />
              </AdminRoute>
            }
          />

          <Route
            path="users/new"
            element={
              <AdminRoute>
                <UserForm />
              </AdminRoute>
            }
          />

          <Route
            path="users/:id/edit"
            element={
              <AdminRoute>
                <UserForm />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}