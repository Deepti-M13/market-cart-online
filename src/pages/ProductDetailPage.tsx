
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import QuantitySelector from "@/components/QuantitySelector";
import { ShoppingCart } from "lucide-react";

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const product = mockProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/products")}>Back to Products</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-2xl text-farm-green font-semibold">${product.price.toFixed(2)}</span>
            <span className="text-sm text-gray-500">per {product.unit}</span>
          </div>
          
          <p className="mb-6 text-gray-700">{product.description}</p>
          
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Product Details:</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium capitalize">{product.category}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Farmer:</span>
                <span className="font-medium">{product.farmerName}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-600">Availability:</span>
                <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.stock > 0 ? `${product.stock} ${product.unit}s in stock` : 'Out of stock'}
                </span>
              </li>
            </ul>
          </div>
          
          {(user?.role === 'buyer' || !user) && product.stock > 0 && (
            <div className="flex items-center gap-4">
              <QuantitySelector 
                initialQuantity={quantity}
                max={product.stock}
                onQuantityChange={handleQuantityChange}
              />
              <Button 
                onClick={handleAddToCart}
                className="bg-farm-green hover:bg-farm-green/90 flex-grow"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          )}
          
          <div className="mt-8">
            <Button variant="outline" onClick={() => navigate("/products")}>
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
