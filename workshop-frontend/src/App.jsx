import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Toaster from "./components/Common/Toaster";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Layout from "./components/Navigation/Layout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WorkshopListPage from "./pages/WorkshopListPage";
import WorkshopDetailsPage from "./pages/WorkshopDetailsPage";
import StatisticsPage from "./pages/StatisticsPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import PasswordChangePage from "./pages/PasswordChangePage";
import ProposePage from "./pages/ProposePage";

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <HomePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/workshops"
          element={
            <PrivateRoute>
              <Layout>
                <WorkshopListPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/workshop/:id"
          element={
            <PrivateRoute>
              <Layout>
                <WorkshopDetailsPage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/workshop/propose"
          element={
            <PrivateRoute>
              <Layout>
                <ProposePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/statistics/public"
          element={
            <Layout>
              <StatisticsPage />
            </Layout>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <ProfilePage />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/password-change"
          element={
            <PrivateRoute>
              <Layout>
                <PasswordChangePage />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
