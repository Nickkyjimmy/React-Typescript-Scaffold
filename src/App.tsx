import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/layout";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/not-found";

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
  );
};

export default App;
