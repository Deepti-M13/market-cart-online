
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package } from "lucide-react";
import { Order } from "@/types";

interface OrdersListProps {
  orders: Order[];
  status: 'pending' | 'processing' | 'shipped';
  title: string;
}

const OrdersList = ({ orders, status, title }: OrdersListProps) => {
  if (!orders?.length) return null;
  
  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'processing': return 'bg-blue-500';
      case 'shipped': return 'bg-green-500';
      default: return '';
    }
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-4">
        {orders.map(order => (
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
              </ul>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {status !== 'shipped' && (
                  <Button size="sm" className="bg-farm-green hover:bg-farm-green/90">
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
