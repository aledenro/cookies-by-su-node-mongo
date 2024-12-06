import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../../components/ui";
import { loginSchema } from "../../schemas/auth";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signin(data); 
      localStorage.setItem("clienteId", response.id); 
      reset();
      navigate("/"); 
    } catch (error) {
      console.error("Error durante el login:", error);
    }
  };


  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        {Array.isArray(loginErrors) && loginErrors.length > 0 && (
          <div className="space-y-2 mb-4">
            {loginErrors.map((error, i) => (
              <Message key={i} message={error} />
            ))}
          </div>
        )}

        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="email">Correo:</Label>
            <Input
              type="email"
              name="email"
              placeholder="tucorreo@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </Button>
        </form>

        <p className="text-center mt-6">
          No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Registrate
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default LoginPage;
