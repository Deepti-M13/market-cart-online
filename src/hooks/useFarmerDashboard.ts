
import { useState, useEffect } from "react";
import { getFarmerOrders, getFarmerProducts } from "@/data/mockData";
import { Order, Product } from "@/types";
import { useAuth } from "@/context/AuthContext";

export const useFarmerDashboard = () => {
  const { user } = useAuth();
  const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
  const [farmerOrders, setFarmerOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    if (user) {
      const products = getFarmerProducts(user.id);
      const orders = getFarmerOrders(user.id);
      
      setFarmerProducts(products);
      setFarmerOrders(orders);
    }
  }, [user]);

  // Set up polling for new orders every 30 seconds
  useEffect(() => {
    if (!user) return;
    
    const intervalId = setInterval(() => {
      const updatedOrders = getFarmerOrders(user.id);
      setFarmerOrders(updatedOrders);
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, [user]);

  // Group orders by status
  const ordersByStatus = farmerOrders.reduce<Record<string, Order[]>>((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
  }, {});

  const counts = {
    pending: ordersByStatus.pending?.length || 0,
    processing: ordersByStatus.processing?.length || 0,
    shipped: ordersByStatus.shipped?.length || 0,
  };

  return {
    farmerProducts,
    setFarmerProducts,
    ordersByStatus,
    counts,
  };
};
