import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OrderPage from "./pages/public/order";
import AdminPanel from "./pages/admin/AdminPanel";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute"; 
import RoleProtectedRoute from "./components/RoleProtectedRoute"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-panel"
            element={
              <RoleProtectedRoute role="Admin">
                <AdminPanel />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
