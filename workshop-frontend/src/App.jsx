import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toaster from './components/Common/Toaster';
import PrivateRoute from './components/Auth/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function HomePage() {
  return <div className="p-8 text-2xl font-bold">Home Page</div>;
}

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}