
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const handleAddToCart = () => {
    addToCart(product, 1);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-gray-900 hover:text-farm-green transition-colors">{product.name}</h3>
          </Link>
          <span className="text-farm-green font-semibold">${product.price.toFixed(2)}</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3">{product.description.length > 70 
          ? `${product.description.substring(0, 70)}...` 
          : product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">From: {product.farmerName}</span>
          {(user?.role === 'buyer' || !user) && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddToCart}
              className="text-farm-green border-farm-green hover:bg-farm-green hover:text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
