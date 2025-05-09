import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layouts/layout";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";
import Login from "./pages/login";
import ProtectedRoute from "./components/protected-routes/protected-route";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="login" element={<Login />} />
        <Route
          path="home"
          element={
            <ProtectedRoute requiredRoles={["USER", "ADMIN"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="about"
          element={
            <ProtectedRoute requiredRoles={["ADMIN"]}>
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredRoles={["USER", "ADMIN"]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
