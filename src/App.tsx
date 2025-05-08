import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/layout";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";
import { LoginPage } from "./pages/login";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { UserRole } from "./types/user-role";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute accessRole={[UserRole.ADMIN]}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
