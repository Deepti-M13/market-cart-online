
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/data/mockData";

const HomePage = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-farm-green to-farm-lightGreen py-20 mb-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fresh From Farm to Your Table
            </h1>
            <p className="text-lg mb-6">
              Support local farmers and enjoy the freshest produce delivered directly to you.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg" className="bg-farm-orange hover:bg-farm-orange/90 text-white">
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-farm-green">
                <Link to="/auth/signup">Join as Farmer</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2074&auto=format&fit=crop" 
              alt="Fresh farm produce" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-farm-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-farm-green">1</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Browse Products</h3>
              <p className="text-gray-600">
                Find fresh fruits and vegetables from local farmers in your area.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-farm-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-farm-green">2</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Place Your Order</h3>
              <p className="text-gray-600">
                Add items to your cart and checkout with secure payment options.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-farm-lightGreen rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-farm-green">3</span>
              </div>
              <h3 className="text-xl font-medium mb-3">Enjoy Fresh Produce</h3>
              <p className="text-gray-600">
                Receive farm-fresh goods directly from local producers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="outline">
              <Link to="/products">View All</Link>
            </Button>
          </div>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Farmer CTA */}
      <section className="py-12 bg-farm-beige">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop" 
                alt="Farmer in field" 
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-4">Are You a Farmer?</h2>
              <p className="text-lg mb-6">
                Join our marketplace to connect directly with customers and sell your products without middlemen. Enjoy fair prices and build relationships with your community.
              </p>
              <Button asChild size="lg" className="bg-farm-green hover:bg-farm-green/90">
                <Link to="/auth/signup">Join as Farmer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
