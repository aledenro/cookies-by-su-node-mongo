import { useEffect, createContext, useContext, useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]); // Inicializado correctamente como array
  const [loading, setLoading] = useState(true);

  // Limpiar errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Registrar usuario
  const signup = async (userData) => {
    try {
      const res = await registerRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(Array.isArray(error.response?.data?.message)
        ? error.response?.data?.message
        : [error.response?.data?.message || "An error occurred"]);
    }
  };

  // Iniciar sesión
  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data); // Asegúrate de que `res.data` contiene el campo `roles`
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(Array.isArray(error.response?.data?.message)
        ? error.response?.data?.message
        : [error.response?.data?.message || "Invalid login credentials"]);
    }
  };
  

  // Cerrar sesión
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Verificar sesión al cargar la app
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest();
        setUser(res.data);
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
