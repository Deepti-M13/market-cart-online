import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FarmerProductsList from "./FarmerProductsList";
import AddProductModal from "./AddProductModal";
import DashboardStats from "./components/DashboardStats";
import OrdersTab from "./components/OrdersTab";
import { useFarmerDashboard } from "@/hooks/useFarmerDashboard";
import { Product } from "@/types";

const FarmerDashboardPage = () => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const { farmerProducts, setFarmerProducts, ordersByStatus, counts } = useFarmerDashboard();

  const handleProductAdded = (newProduct: Product) => {
    setFarmerProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Farmer Dashboard</h1>
        <Button 
          onClick={() => setShowAddProductModal(true)} 
          className="bg-farm-green hover:bg-farm-green/90"
          aria-label="Add New Product"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </div>

      <DashboardStats 
        productsCount={farmerProducts.length}
        activeOrdersCount={counts.pending + counts.processing}
        shippedOrdersCount={counts.shipped}
      />

      <Tabs defaultValue="products" className="mt-8">
        <TabsList className="mb-8">
          <TabsTrigger value="products">My Products</TabsTrigger>
          <TabsTrigger value="orders">
            Orders
            {counts.pending > 0 && (
              <Badge variant="destructive" className="ml-2">
                {counts.pending} New
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <FarmerProductsList 
            products={farmerProducts} 
            onAddClick={() => setShowAddProductModal(true)} 
            onProductAdded={handleProductAdded}
          />
        </TabsContent>
        
        <TabsContent value="orders">
          <OrdersTab 
            ordersByStatus={ordersByStatus} 
            pendingCount={counts.pending}
          />
        </TabsContent>
      </Tabs>

      <AddProductModal 
        open={showAddProductModal} 
        onClose={() => setShowAddProductModal(false)} 
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default FarmerDashboardPage;
