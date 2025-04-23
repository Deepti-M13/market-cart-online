
import { Product, Order } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Organic Tomatoes",
    description: "Fresh, locally grown organic tomatoes. Perfect for salads and cooking.",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?q=80&w=2070&auto=format&fit=crop",
    category: "vegetable",
    farmerId: "farmer-1",
    farmerName: "Green Valley Farm",
    stock: 50,
    unit: "lb"
  },
  {
    id: "2",
    name: "Fresh Spinach",
    description: "Nutrient-rich spinach leaves, perfect for salads and cooking.",
    price: 3.49,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=2080&auto=format&fit=crop",
    category: "vegetable",
    farmerId: "farmer-1",
    farmerName: "Green Valley Farm",
    stock: 30,
    unit: "bunch"
  },
  {
    id: "3",
    name: "Sweet Corn",
    description: "Hand-picked sweet corn, perfect for grilling or boiling.",
    price: 0.99,
    image: "https://images.unsplash.com/photo-1605465943330-78f2cc0ed1fd?q=80&w=1944&auto=format&fit=crop",
    category: "vegetable",
    farmerId: "farmer-2",
    farmerName: "Sunrise Acres",
    stock: 100,
    unit: "ear"
  },
  {
    id: "4",
    name: "Organic Apples",
    description: "Crisp and sweet organic apples. Great for snacking or baking.",
    price: 1.49,
    image: "https://images.unsplash.com/photo-1631160299486-62c4a1f4d7cc?q=80&w=2072&auto=format&fit=crop",
    category: "fruit",
    farmerId: "farmer-2",
    farmerName: "Sunrise Acres",
    stock: 75,
    unit: "lb"
  },
  {
    id: "5",
    name: "Fresh Strawberries",
    description: "Sweet and juicy strawberries, freshly picked from our fields.",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=2071&auto=format&fit=crop",
    category: "fruit",
    farmerId: "farmer-1",
    farmerName: "Green Valley Farm",
    stock: 40,
    unit: "pint"
  },
  {
    id: "6",
    name: "Red Bell Peppers",
    description: "Crisp, sweet red bell peppers. Great for salads or roasting.",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=1974&auto=format&fit=crop",
    category: "vegetable",
    farmerId: "farmer-1",
    farmerName: "Green Valley Farm",
    stock: 35,
    unit: "each"
  },
  {
    id: "7",
    name: "Organic Blueberries",
    description: "Plump, sweet organic blueberries. Perfect for snacking or baking.",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=2069&auto=format&fit=crop",
    category: "fruit",
    farmerId: "farmer-2",
    farmerName: "Sunrise Acres",
    stock: 25,
    unit: "pint"
  },
  {
    id: "8",
    name: "Fresh Carrots",
    description: "Sweet and crunchy carrots. Great for snacking or cooking.",
    price: 1.79,
    image: "https://images.unsplash.com/photo-1598170845056-d762032df1dc?q=80&w=2070&auto=format&fit=crop",
    category: "vegetable",
    farmerId: "farmer-2",
    farmerName: "Sunrise Acres",
    stock: 60,
    unit: "bunch"
  }
];

export const mockOrders: Order[] = [
  {
    id: "order-1",
    buyerId: "buyer-1",
    buyerName: "Demo Buyer",
    items: [
      {
        product: mockProducts[0],
        quantity: 2
      },
      {
        product: mockProducts[4],
        quantity: 1
      }
    ],
    total: 2 * mockProducts[0].price + mockProducts[4].price,
    status: "pending",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "order-2",
    buyerId: "buyer-1",
    buyerName: "Demo Buyer",
    items: [
      {
        product: mockProducts[2],
        quantity: 5
      },
      {
        product: mockProducts[7],
        quantity: 2
      }
    ],
    total: 5 * mockProducts[2].price + 2 * mockProducts[7].price,
    status: "shipped",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

// Function to get orders for a specific farmer
export const getFarmerOrders = (farmerId: string): Order[] => {
  return mockOrders.filter(order => 
    order.items.some(item => item.product.farmerId === farmerId)
  );
};

// Function to get products for a specific farmer
export const getFarmerProducts = (farmerId: string): Product[] => {
  return mockProducts.filter(product => product.farmerId === farmerId);
};
