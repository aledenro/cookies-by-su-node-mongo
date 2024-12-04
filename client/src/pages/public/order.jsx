import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login"); 
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Order Page</h1>
      <p>Welcome to the order page!</p>
    </div>
  );
};

export default OrderPage;
