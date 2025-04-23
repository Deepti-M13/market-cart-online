
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { getFarmerOrders, getFarmerProducts } from "@/data/mockData";
import { Package, Plus } from "lucide-react";
import { Order } from "@/types";
import { Badge } from "@/components/ui/badge";
import FarmerProductsList from "./FarmerProductsList";
import AddProductModal from "./AddProductModal";

const FarmerDashboardPage = () => {
  const { user } = useAuth();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  
  if (!user) return null;
  
  const farmerProducts = getFarmerProducts(user.id);
  const farmerOrders = getFarmerOrders(user.id);

  // Group orders by status
  const ordersByStatus = farmerOrders.reduce<Record<string, Order[]>>((acc, order) => {
    if (!acc[order.status]) {
      acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
  }, {});

  // Get counts for each status
  const pendingCount = ordersByStatus.pending?.length || 0;
  const processingCount = ordersByStatus.processing?.length || 0;
  const shippedCount = ordersByStatus.shipped?.length || 0;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <Button onClick={() => setShowAddProductModal(true)} className="bg-farm-green hover:bg-farm-green/90">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Products</CardTitle>
            <CardDescription>Your current inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{farmerProducts.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Orders</CardTitle>
            <CardDescription>Orders needing attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingCount + processingCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Shipped Orders</CardTitle>
            <CardDescription>Orders on their way</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{shippedCount}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="mt-8">
        <TabsList className="mb-8">
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="orders">
            Orders
            {pendingCount > 0 && (
              <Badge className="ml-2 bg-farm-orange text-white">
                {pendingCount} New
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <FarmerProductsList products={farmerProducts} />
        </TabsContent>
        
        <TabsContent value="orders">
          {farmerOrders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-4 text-lg font-medium">No Orders Yet</h3>
              <p className="mt-1 text-gray-500">When customers place orders for your products, they will appear here.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Pending Orders */}
              {ordersByStatus.pending?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Pending Orders</h3>
                  <div className="space-y-4">
                    {ordersByStatus.pending.map(order => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-md">Order #{order.id}</CardTitle>
                            <Badge className="bg-yellow-500">Pending</Badge>
                          </div>
                          <CardDescription>
                            Placed on {new Date(order.createdAt).toLocaleDateString()} by {order.buyerName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mb-4">
                            {order.items
                              .filter(item => item.product.farmerId === user.id)
                              .map(item => (
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
                            <Button size="sm" className="bg-farm-green hover:bg-farm-green/90">
                              Process Order
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Processing Orders */}
              {ordersByStatus.processing?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Processing Orders</h3>
                  <div className="space-y-4">
                    {ordersByStatus.processing.map(order => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-md">Order #{order.id}</CardTitle>
                            <Badge className="bg-blue-500">Processing</Badge>
                          </div>
                          <CardDescription>
                            Placed on {new Date(order.createdAt).toLocaleDateString()} by {order.buyerName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2 mb-4">
                            {order.items
                              .filter(item => item.product.farmerId === user.id)
                              .map(item => (
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
                            <Button size="sm" className="bg-farm-green hover:bg-farm-green/90">
                              Mark as Shipped
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Shipped Orders */}
              {ordersByStatus.shipped?.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-4">Shipped Orders</h3>
                  <div className="space-y-4">
                    {ordersByStatus.shipped.map(order => (
                      <Card key={order.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-md">Order #{order.id}</CardTitle>
                            <Badge className="bg-green-500">Shipped</Badge>
                          </div>
                          <CardDescription>
                            Placed on {new Date(order.createdAt).toLocaleDateString()} by {order.buyerName}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {order.items
                              .filter(item => item.product.farmerId === user.id)
                              .map(item => (
                                <li key={item.product.id} className="flex justify-between">
                                  <span>{item.quantity}x {item.product.name}</span>
                                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </li>
                              ))}
                          </ul>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddProductModal 
        open={showAddProductModal} 
        onClose={() => setShowAddProductModal(false)} 
      />
    </div>
  );
};

export default FarmerDashboardPage;
