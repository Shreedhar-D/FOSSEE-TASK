import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/Auth/PrivateRoute";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import { usePageTitle } from "./hooks/usePageTitle";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const WorkshopListPage = lazy(() => import("./pages/WorkshopListPage"));
const WorkshopDetailsPage = lazy(() => import("./pages/WorkshopDetailsPage"));
const StatisticsPage = lazy(() => import("./pages/StatisticsPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const PasswordChangePage = lazy(() => import("./pages/PasswordChangePage"));
const Layout = lazy(() => import("./components/Navigation/Layout"));

function AppRoutes() {
  // Hook to update page title on route change
  usePageTitle();

  return (
    <Suspense fallback={<LoadingSpinner />}>
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
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
