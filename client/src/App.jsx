import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OrderPage from "./pages/public/order";
import AdminPanel from "./pages/admin/AdminPanel";
import ProductPanel from "./pages/admin/ProductPanel";
import EmployeePanel from "./pages/admin/EmployeePanel";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import PedidoDetail from "./pages/public/pedido";
import PedidosPanel from "./pages/admin/PedidosPanel";
import UsuariosPanel from "./pages/admin/UsuariosPanel";

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

          <Route
            path="/productos-panel"
            element={
              <RoleProtectedRoute role="Admin">
                <ProductPanel />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/pedidos-panel"
            element={
              <RoleProtectedRoute role="Admin">
                <PedidosPanel />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/usuarios-panel"
            element={
              <RoleProtectedRoute role="Admin">
                <UsuariosPanel />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/empleados-panel"
            element={
              <RoleProtectedRoute role="Admin">
                <EmployeePanel />
              </RoleProtectedRoute>
            }
          />
          <Route
            path="/pedido/:pedidoId"
            element={
              <ProtectedRoute>
                <PedidoDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
