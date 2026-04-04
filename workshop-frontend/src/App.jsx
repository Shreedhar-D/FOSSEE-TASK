import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Toaster from './components/Common/Toaster';

function HomePage() {
  return <div className="p-8 text-2xl font-bold">Home Page</div>;
}

function LoginPage() {
  return <div className="p-8 text-2xl font-bold">Login Page</div>;
}

export default function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}