import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingCart, Trash2, CreditCard, DollarSign } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import QuantitySelector from "@/components/QuantitySelector";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");

  const handleQuantityChange = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const handleCheckout = (formData: any) => {
    if (!user) {
      navigate("/auth/login", { state: { from: "/cart" } });
      return;
    }

    setIsProcessing(true);
    // Simulate checkout process
    setTimeout(() => {
      checkout();
      navigate("/checkout/success", { 
        state: { 
          paymentMethod,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        } 
      });
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="py-16">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="mb-8 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 font-medium">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {items.map((item) => (
              <div key={item.product.id} className="border-t p-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="md:col-span-6 flex gap-4 items-center">
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link to={`/products/${item.product.id}`} className="font-medium hover:text-farm-green">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500">From: {item.product.farmerName}</p>
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <div className="md:hidden text-sm text-gray-500">Price:</div>
                    ${item.product.price.toFixed(2)}
                  </div>
                  
                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="md:hidden text-sm text-gray-500 mr-2 mt-1">Quantity:</div>
                    <QuantitySelector
                      initialQuantity={item.quantity}
                      max={item.product.stock}
                      onQuantityChange={(quantity) => handleQuantityChange(item.product.id, quantity)}
                    />
                  </div>
                  
                  {/* Total */}
                  <div className="md:col-span-2 flex md:justify-end items-center justify-between">
                    <div className="md:hidden text-sm text-gray-500">Total:</div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/products')}
              className="text-gray-600"
            >
              Continue Shopping
            </Button>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>$0.00</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium mb-3">Payment Method</h3>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) => setPaymentMethod(value as "card" | "cod")}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    Cash on Delivery (COD)
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            <CheckoutForm 
              onSubmit={handleCheckout}
              paymentMethod={paymentMethod}
            />
            
            {!user && (
              <p className="text-sm text-center text-gray-500 mt-2">
                You'll need to <Link to="/auth/login" className="text-farm-green hover:underline">log in</Link> before completing your purchase.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
