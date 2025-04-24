
import { Package } from "lucide-react";
import OrdersList from "./OrdersList";
import { Order } from "@/types";

interface OrdersTabProps {
  ordersByStatus: Record<string, Order[]>;
  pendingCount: number;
}

const OrdersTab = ({ ordersByStatus, pendingCount }: OrdersTabProps) => {
  if (Object.values(ordersByStatus).flat().length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-4 text-lg font-medium">No Orders Yet</h3>
        <p className="mt-1 text-gray-500">When customers place orders for your products, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {ordersByStatus.pending?.length > 0 && (
        <OrdersList 
          orders={ordersByStatus.pending} 
          status="pending" 
          title="Pending Orders" 
        />
      )}
      
      {ordersByStatus.processing?.length > 0 && (
        <OrdersList 
          orders={ordersByStatus.processing} 
          status="processing" 
          title="Processing Orders" 
        />
      )}
      
      {ordersByStatus.shipped?.length > 0 && (
        <OrdersList 
          orders={ordersByStatus.shipped} 
          status="shipped" 
          title="Shipped Orders" 
        />
      )}
    </div>
  );
};

export default OrdersTab;
