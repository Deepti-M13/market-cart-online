
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  productsCount: number;
  activeOrdersCount: number;
  shippedOrdersCount: number;
}

const DashboardStats = ({ productsCount, activeOrdersCount, shippedOrdersCount }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Total Products</CardTitle>
          <CardDescription>Your current inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{productsCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Active Orders</CardTitle>
          <CardDescription>Orders needing attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{activeOrdersCount}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Shipped Orders</CardTitle>
          <CardDescription>Orders on their way</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{shippedOrdersCount}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
