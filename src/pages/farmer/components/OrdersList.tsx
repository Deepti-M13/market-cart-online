import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Order } from "@/types";
import { useState, useEffect } from "react";

interface OrdersListProps {
  orders: Order[];
  status: 'pending' | 'processing' | 'shipped';
  title: string;
}

const OrdersList = ({ orders, status, title }: OrdersListProps) => {
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);

  useEffect(() => {
    setLocalOrders(orders);
  }, [orders]);

  if (!localOrders?.length) return null;
  
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-green-500';
      default: return '';
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: 'processing' | 'shipped') => {
    // Get all orders from localStorage
    const savedOrders = localStorage.getItem('farmMarketOrders');
    if (!savedOrders) return;
    
    const allOrders: Order[] = JSON.parse(savedOrders);
    
    // Find and update the specific order
    const updatedOrders = allOrders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    // Save back to localStorage
    localStorage.setItem('farmMarketOrders', JSON.stringify(updatedOrders));
    
    // Update local state to reflect the change
    setLocalOrders(prev => 
      prev.map(order => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
    
    toast.success(`Order #${orderId} has been ${newStatus === 'processing' ? 'processed' : 'shipped'}`);
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {localOrders.map(order => (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-md">Order #{order.id}</CardTitle>
                <Badge className={getBadgeColor(status)}>{status}</Badge>
              </div>
              <CardDescription>
                Placed on {new Date(order.createdAt).toLocaleDateString()} by {order.buyerName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                {order.items.map(item => (
                  <li key={item.product.id} className="flex justify-between">
                    <span>{item.quantity}x {item.product.name}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <li className="pt-2 border-t flex justify-between font-medium">
                  <span>Total:</span>
                  <span>${order.total.toFixed(2)}</span>
                </li>
              </ul>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {status !== 'shipped' && (
                  <Button 
                    size="sm" 
                    className="bg-farm-green hover:bg-farm-green/90"
                    onClick={() => handleUpdateOrderStatus(
                      order.id, 
                      status === 'pending' ? 'processing' : 'shipped'
                    )}
                  >
                    {status === 'pending' ? 'Process Order' : 'Mark as Shipped'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
