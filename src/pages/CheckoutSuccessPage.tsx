
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

const CheckoutSuccessPage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-farm-green" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="mb-8 text-gray-600">
          Your order has been successfully placed. You will receive a confirmation email shortly with all the order details.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">What Happens Next?</h2>
          <ul className="text-left space-y-4">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-farm-lightGreen text-farm-green font-bold mr-3 flex-shrink-0">1</span>
              <span>Farmers will begin preparing your fresh produce</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-farm-lightGreen text-farm-green font-bold mr-3 flex-shrink-0">2</span>
              <span>You'll receive updates on your order status</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-farm-lightGreen text-farm-green font-bold mr-3 flex-shrink-0">3</span>
              <span>Your order will be delivered fresh to your door</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline">
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button asChild className="bg-farm-green hover:bg-farm-green/90">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccessPage;
