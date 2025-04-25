import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem, Product, Order } from "../types";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";
import { toast as sonnerToast } from "sonner";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  checkout: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const savedCart = localStorage.getItem('farmMarketCart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('farmMarketCart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(
        item => item.product.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated to ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${quantity} ${product.name} added to your cart`,
        });
        
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems => {
      return prevItems.map(item => {
        if (item.product.id === productId) {
          return { ...item, quantity };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.product.id === productId);
      
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.product.name} removed from your cart`,
        });
      }
      
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const checkout = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Login required",
        description: "Please login before checking out",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        variant: "destructive",
        title: "Empty cart",
        description: "Your cart is empty",
      });
      return;
    }

    const itemsByFarmer: Record<string, CartItem[]> = {};
    items.forEach(item => {
      const farmerId = item.product.farmerId;
      if (!itemsByFarmer[farmerId]) {
        itemsByFarmer[farmerId] = [];
      }
      itemsByFarmer[farmerId].push(item);
    });

    Object.entries(itemsByFarmer).forEach(([farmerId, farmerItems]) => {
      const orderTotal = farmerItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      const newOrder: Order = {
        id: `order-${Date.now()}-${farmerId}`,
        buyerId: user.id,
        buyerName: user.name,
        items: farmerItems,
        total: orderTotal,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const savedOrders = localStorage.getItem('farmMarketOrders') || '[]';
      const orders = JSON.parse(savedOrders);
      orders.push(newOrder);
      localStorage.setItem('farmMarketOrders', JSON.stringify(orders));
    });

    sonnerToast.success("Orders placed successfully!");
    clearCart();
  };

  const cartTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout,
        cartTotal,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
