import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

const CheckoutSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { checkout } = useCart();
  
  const paymentMethod = location.state?.paymentMethod || "card";
  const address = location.state?.address;
  const city = location.state?.city;
  const state = location.state?.state;
  const zipCode = location.state?.zipCode;
  
  useEffect(() => {
    // Process the checkout when the success page loads
    checkout();
    
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, [checkout]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle2 className="h-16 w-16 mx-auto mb-6 text-farm-green" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="mb-8 text-gray-600">
          Your order has been successfully placed. You will receive a confirmation email shortly with all the order details.
        </p>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-medium mb-4">Order Details</h2>
          
          <div className="text-left space-y-2 mb-6">
            <p><span className="font-medium">Payment Method:</span> {paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}</p>
            <p><span className="font-medium">Delivery Address:</span> {address}</p>
            <p><span className="font-medium">City:</span> {city}</p>
            <p><span className="font-medium">State:</span> {state}</p>
            <p><span className="font-medium">ZIP Code:</span> {zipCode}</p>
          </div>

          <h2 className="text-xl font-medium mb-4">What Happens Next?</h2>
          <p className="mb-4 text-left">
            <span className="font-medium">Payment Method:</span>{" "}
            {paymentMethod === "cod" ? "Cash on Delivery" : "Credit/Debit Card"}
          </p>
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
              <span>{paymentMethod === "cod" ? "Pay when your order is delivered" : "Your payment has been processed"}</span>
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
